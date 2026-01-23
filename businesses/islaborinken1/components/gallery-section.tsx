"use client"

import Image from "next/image"
import { Star } from "lucide-react"

const galleryImages = [
  { src: "/images/gallery-1.jpg", alt: "Waterfall adventure in El Yunque", tall: true },
  { src: "/images/gallery-2.jpg", alt: "Natural rock pool swimming", tall: false },
  { src: "/images/gallery-3.jpg", alt: "Hiking through lush rainforest trails", tall: false },
  { src: "/images/gallery-4.jpg", alt: "Group enjoying natural waterslide", tall: true },
  { src: "/images/gallery-5.jpg", alt: "Scenic rainforest viewpoint", tall: false },
  { src: "/images/gallery-6.jpg", alt: "Crystal clear river exploration", tall: false },
]

const reviews = [
  {
    name: "Sarah M.",
    location: "New York, USA",
    rating: 5,
    text: "Marlon showed us hidden waterfalls we never would have found on our own. An absolutely magical experience!",
  },
  {
    name: "James & Emily",
    location: "London, UK",
    rating: 5,
    text: "The natural waterslides were incredible! Marlon's knowledge of the rainforest made every moment educational and fun.",
  },
  {
    name: "Carlos R.",
    location: "Miami, USA",
    rating: 5,
    text: "Best tour in Puerto Rico, hands down. Felt like exploring with a friend who knows all the secrets.",
  },
]

export function GallerySection() {
  return (
    <section className="bg-[#f5f2eb] py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1a5745] italic mb-4">
            Unforgettable Moments in El Yunque
          </h2>
          <p className="text-[#4a5568] text-lg max-w-2xl mx-auto">
            Real adventures, real memories. See what awaits you in the heart of Puerto Rico.
          </p>
        </div>

        {/* Masonry Gallery */}
        <div className="columns-2 md:columns-3 gap-4 mb-16">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="mb-4 break-inside-avoid overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                width={400}
                height={image.tall ? 500 : 300}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* Reviews Section */}
        <div className="mb-8">
          <h3 className="font-serif text-2xl md:text-3xl text-[#1a5745] text-center mb-10">
            What Adventurers Are Saying
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[#f4b942] text-[#f4b942]"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-[#4a5568] mb-4 leading-relaxed">
                  {'"'}{review.text}{'"'}
                </p>

                {/* Reviewer Info */}
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-semibold text-[#1a5745]">{review.name}</p>
                  <p className="text-sm text-[#6b7280]">{review.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
