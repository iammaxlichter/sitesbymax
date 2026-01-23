import Link from "next/link"
import { Button } from "@/components/ui/button"

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  )
}

export function GuideSection() {
  return (
    <section id="guide" className="bg-[#f5f2eb] py-16 md:py-24">
      <div className="container mx-auto max-w-3xl px-6">
        {/* Top decorative border */}
        <div className="flex items-center justify-between mb-10">
          <LeafIcon className="text-[#2a7d6a] rotate-[-30deg]" />
          <div className="flex-1 h-px bg-[#c9d4a9] mx-4" />
          <LeafIcon className="text-[#2a7d6a] rotate-[30deg] scale-x-[-1]" />
        </div>

        {/* Content */}
        <div className="space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1a4d3e] text-balance">
            Meet Your Favorite Tour Guide
          </h2>

          <p className="text-[#3d3d3d] leading-relaxed text-lg">
            My name is <span className="text-[#2a7d6a] font-semibold">Marlon</span>, born in Carolina, Puerto Rico. As a child, I was always exploring the mountains, caves, rivers, and beaches of my island.
          </p>

          <p className="text-[#3d3d3d] leading-relaxed text-lg">
            Growing up surrounded by the lush beauty of El Yunque National Rainforest, I developed a deep connection with nature and a passion for sharing Puerto Rico{"'"}s hidden treasures with visitors from around the world.
          </p>

          <p className="text-[#3d3d3d] leading-relaxed text-lg">
            With over 10 years of experience leading tours through the rainforest, I bring authentic local knowledge, stories passed down through generations, and a genuine love for this magical place. Every adventure is personal, safe, and unforgettable.
          </p>

          <p className="text-[#3d3d3d] leading-relaxed text-lg">
            Let me show you the Puerto Rico that only locals know—the secret waterfalls, the best natural slides, and the stories that make this island truly special.
          </p>
        </div>

        {/* Bottom decorative border */}
        <div className="flex items-center justify-between mt-10 mb-8">
          <LeafIcon className="text-[#2a7d6a] rotate-[30deg]" />
          <div className="flex-1 h-px bg-[#c9d4a9] mx-4" />
          <LeafIcon className="text-[#2a7d6a] rotate-[-30deg] scale-x-[-1]" />
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <Button
            asChild
            className="bg-[#2a7d6a] hover:bg-[#1f5f52] text-white px-8 py-6 text-lg rounded-full"
          >
            <Link href="#book">Book Your Adventure</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
