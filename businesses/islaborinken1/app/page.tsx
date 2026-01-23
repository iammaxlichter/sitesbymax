import { Hero } from "@/components/hero"
import { ToursSection } from "@/components/tours-section"
import { GuideSection } from "@/components/guide-section"
import { GallerySection } from "@/components/gallery-section"
import { FooterSection } from "@/components/footer-section"

export default function Home() {
  return (
    <main>
      <Hero />
      <GuideSection />
      <ToursSection />
      <GallerySection />
      <FooterSection />
    </main>
  )
}
