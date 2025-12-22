"use client"

import Image from "next/image"

interface FullLogoProps {
  className?: string
  width?: number
  height?: number
}

export function FullLogo({ className = "", width = 400, height = 120 }: FullLogoProps) {
  return (
    <div className={className}>
      <Image
        src="/logo.png"
        alt="Xelkoom-AI - Solutions d'Intelligence Artificielle"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
    </div>
  )
}
