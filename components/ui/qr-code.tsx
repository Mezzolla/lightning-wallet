"use client"

import { useEffect, useRef } from "react"
import QRCodeLibrary from "qrcode"

interface QRCodeProps {
  value: string
  size?: number
  level?: "L" | "M" | "Q" | "H"
  bgColor?: string
  fgColor?: string
}

export function QRCode({ value, size = 200, level = "M", bgColor = "#ffffff", fgColor = "#000000" }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    QRCodeLibrary.toCanvas(
      canvasRef.current,
      value,
      {
        width: size,
        margin: 1,
        errorCorrectionLevel: level,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      },
      (error) => {
        if (error) console.error("Error generating QR code:", error)
      },
    )
  }, [value, size, level, bgColor, fgColor])

  return <canvas ref={canvasRef} />
}
