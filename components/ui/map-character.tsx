"use client"

import { useState, useEffect } from "react"

interface MapCharacterProps {
  characterSrc: string
  hoverSrc?: string
  position: {
    right?: string
    left?: string
    top: string
  }
  size?: {
    width?: string
    height?: string
  }
  shadowConfig?: {
    top?: string
    left?: string
    width?: string
    height?: string
    blur?: string
  }
}

export function MapCharacter({ 
  characterSrc,
  hoverSrc,
  position, 
  size = { width: "w-42", height: "h-44" },
  shadowConfig = {}
}: MapCharacterProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  const positionStyle = {
    top: position.top,
    ...(position.right && { 
      right: isMobile ? '2%' : `${Number(position.right) * 4}px` 
    }),
    ...(position.left && { 
      left: isMobile ? '2%' : `${Number(position.left) * 4}px` 
    }),
  }
  
  const defaultShadow = {
    top: "top-40.5",
    left: "left-20.5",
    width: "w-25",
    height: "h-8",
    blur: "3px"
  }
  
  const shadow = { ...defaultShadow, ...shadowConfig }
  const currentSrc = isHovered && hoverSrc ? hoverSrc : characterSrc
  
  return (
    <div 
      className={`absolute z-10 pointer-events-auto cursor-pointer ${isMobile ? 'hidden' : 'block'}`}
      style={positionStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Character shadow - elliptical shape */}
      <div 
        className={`absolute ${shadow.top} ${shadow.left} -translate-x-1/2 ${shadow.width} ${shadow.height} rounded-full`}
        style={{
          background: 'radial-gradient(ellipse, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.15) 40%, transparent 70%)',
          filter: `blur(${shadow.blur})`,
        }}
      />
      {/* Character image - instant swap on hover */}
      <img 
        src={currentSrc} 
        alt="Character" 
        className={`${size.width} ${size.height} object-contain relative`}
      />
    </div>
  )
}
