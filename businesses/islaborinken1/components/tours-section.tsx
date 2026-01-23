import { ArrowRight } from "lucide-react"
import Image from "next/image"

const tours = [
  {
    id: 1,
    title: "Rainforest & Natural Waterslide Guided Tour",
    description:
      "Experience the thrill of sliding down natural rock formations carved by centuries of flowing water. Navigate through lush trails, swim in crystal-clear pools, and discover the magic of El Yunque's hidden natural waterslides with an expert local guide.",
    image: "/images/waterslide-tour.jpg",
  },
  {
    id: 2,
    title: "Rainforest Adventure & Luquillo (Transportation Included)",
    description:
      "The ultimate full-day Puerto Rican experience. Explore the mystical El Yunque rainforest trails, swim beneath waterfalls, then relax on the golden sands of Luquillo Beach. Includes round-trip transportation, making your adventure completely stress-free.",
    image: "/images/luquillo-tour.jpg",
  },
  {
    id: 3,
    title: "Rainforest Adventure (No Transportation)",
    description:
      "Perfect for travelers with their own transportation. Dive deep into the heart of El Yunque National Rainforest with Marlon as your guide. Trek hidden trails, discover secret waterfalls, and immerse yourself in the authentic beauty of Puerto Rico's jungle paradise.",
    image: "/images/rainforest-tour.jpg",
  },
]

function TourCard({
  title,
  description,
  image,
}: {
  title: string
  description: string
  image: string
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="relative h-64 md:h-80">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6 md:p-8">
        <h3 className="font-serif text-xl md:text-2xl font-bold text-[#1a5c4c] mb-4">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-6">{description}</p>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a5c4c] hover:bg-[#15493d] text-[#a8e6cf] font-medium rounded-full transition-colors">
          Read More
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export function ToursSection() {
  return (
    <section id="tours" className="bg-[#f5f2eb] py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif italic text-3xl md:text-4xl lg:text-5xl text-[#1a5c4c] mb-4">
            Explore Our Adventures
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose your perfect El Yunque experience. Every tour is crafted to
            showcase the natural wonders of Puerto Rico.
          </p>
        </div>

        {/* Tour Cards */}
        <div className="flex flex-col gap-8">
          {tours.map((tour) => (
            <TourCard
              key={tour.id}
              title={tour.title}
              description={tour.description}
              image={tour.image}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
