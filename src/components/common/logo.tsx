"use client"

import Link from "next/link"
import Image from "next/image"
import { siteConfig } from "@/config/site"

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      <div className="flex items-center">
        <div className="relative w-10 h-10 mr-2 transition-transform duration-300 group-hover:scale-110">
          <Image
            src="/logo-icone.png"
            alt="Xelkoom-AI Logo"
            fill
            sizes="40px"
            className="object-contain"
            priority
          />
        </div>
        <span className="font-bold text-xl bg-gradient-to-r [--tw-gradient-from:var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
          {siteConfig.name}
        </span>
      </div>
    </Link>
  )
}
