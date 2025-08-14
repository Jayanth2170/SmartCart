"use client"

import { useRef, useEffect, useState } from "react"
import { loadScannerLogic } from "./ScannerLogic.js"

const CameraView = ({ isScanning, onDetection, onDetectionStatus, onLatencyUpdate }) => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const scannerRef = useRef(null)
  const animationRef = useRef(null)
  const [cameraError, setCameraError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Stable detection logic - exactly like Android
  const previousLabelRef = useRef("")
  const sameLabelCountRef = useRef(0)
  const requiredStableFrames = 3

  useEffect(() => {
    if (isScanning) {
      initializeCamera()
      initializeScanner()
    } else {
      cleanup()
    }

    return cleanup
  }, [isScanning])

  const initializeCamera = async () => {
    try {
      setIsLoading(true)
      setCameraError(null)

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 640 },
          facingMode: "environment", // Use back camera on mobile
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream

        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play()
          setIsLoading(false)
          startDetection()
        }
      }
    } catch (error) {
      console.error("Camera access error:", error)
      setCameraError("Camera access denied or not available")
      setIsLoading(false)
      onDetection("Camera access error")
    }
  }

  const initializeScanner = async () => {
    try {
      scannerRef.current = await loadScannerLogic()
    } catch (error) {
      console.error("Scanner initialization error:", error)
      onDetection("Scanner initialization failed")
    }
  }

  const startDetection = () => {
    const detectFrame = async () => {
      if (!isScanning || !videoRef.current || !canvasRef.current || !scannerRef.current) {
        return
      }

      const video = videoRef.current
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      // Set canvas size to match video
      canvas.width = video.videoWidth || 640
      canvas.height = video.videoHeight || 640

      // Draw current frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      try {
        const startTime = performance.now()

        // Get image data and run detection
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const result = await scannerRef.current.detect(imageData)

        const endTime = performance.now()
        const latency = Math.round(endTime - startTime)

        if (result.detections && result.detections.length > 0) {
          const detection = result.detections[0] // Get best detection
          const label = detection.label

          onLatencyUpdate(result.latency || latency)

          if (label === previousLabelRef.current) {
            sameLabelCountRef.current++
          } else {
            previousLabelRef.current = label
            sameLabelCountRef.current = 1
          }

          if (sameLabelCountRef.current >= requiredStableFrames) {
            onDetection(`Detected: ${label}`)
            onDetectionStatus(true)
          } else {
            onDetection("Detecting...")
            onDetectionStatus(false)
          }
        } else {
          // No detection found
          previousLabelRef.current = ""
          sameLabelCountRef.current = 0
          onDetection("No object detected")
          onDetectionStatus(false)
        }
      } catch (error) {
        console.error("Detection error:", error)
        onDetection("Detection error")
        onDetectionStatus(false)
      }

      // Continue detection loop at ~10 FPS like Android
      setTimeout(() => {
        animationRef.current = requestAnimationFrame(detectFrame)
      }, 100)
    }

    detectFrame()
  }

  const cleanup = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }

    // Reset detection state
    previousLabelRef.current = ""
    sameLabelCountRef.current = 0
  }

  if (cameraError) {
    return (
      <div className="text-center p-10 bg-red-50 rounded-xl border border-red-200">
        <div className="text-lg text-red-600 mb-2">📷 Camera Error</div>
        <div className="text-sm text-red-900">{cameraError}</div>
      </div>
    )
  }

  return (
    <div className="text-center">
      <div className="relative inline-block rounded-2xl overflow-hidden shadow-2xl shadow-black/12">
        {isLoading && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-black/80 text-white px-5 py-3 rounded-lg text-sm">
            Loading camera...
          </div>
        )}

        <video ref={videoRef} className="w-full max-w-sm h-auto block" playsInline muted />

        {/* Scanning overlay */}
        <div className="absolute top-5 left-5 right-5 bottom-5 border-2 border-green-600 rounded-lg pointer-events-none animate-pulse" />

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  )
}

export default CameraView
