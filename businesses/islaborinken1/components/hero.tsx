"use client"

import { ChevronDown } from "lucide-react"

export function Hero() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/images/hero-waterfall.jpg')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
        <h1 className="font-serif italic text-5xl md:text-6xl lg:text-7xl text-[#F5F0E8] mb-6 text-balance">
          Welcome to Puerto Rico
        </h1>

        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl leading-relaxed">
          At Isla Borinken we offer unforgettable outdoor adventures guided by a
          Puerto Rican born and raised on the island.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-8 py-4 bg-[#4A7C59] hover:bg-[#3d6649] text-white font-medium rounded-full transition-colors text-lg">
            Explore Tours
          </button>
          <button className="px-8 py-4 bg-transparent border-2 border-white/80 hover:bg-white/10 text-white font-medium rounded-full transition-colors text-lg">
            Meet Your Guide
          </button>
        </div>
      </div>

      {/* Explore Prompt */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer"
      >
        <span className="text-sm tracking-widest uppercase">Explore</span>
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </button>
    </section>
  )
}
