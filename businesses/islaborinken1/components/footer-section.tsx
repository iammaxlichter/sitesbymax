"use client"

import React from "react"

import { useState } from "react"
import { Mail, MapPin, Send } from "lucide-react"

export function FooterSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <footer className="relative">
      {/* Wave Divider */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg
          className="relative block w-full h-16 md:h-24"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-[#f5f2eb]"
          />
        </svg>
      </div>

      <div className="bg-[#1a3a2a] pt-24 md:pt-32 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Contact Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Contact Info */}
            <div>
              <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0E8] mb-6">
                Get In Touch
              </h2>
              <p className="text-[#d4cfc4] mb-8 leading-relaxed">
                Ready to explore the hidden wonders of Puerto Rico? Reach out and
                {"let's"} plan your unforgettable adventure together.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:islaborinkentours@gmail.com"
                  className="flex items-center gap-3 text-[#d4cfc4] hover:text-[#F5F0E8] transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#4A7C59]" />
                  <span>islaborinkentours@gmail.com</span>
                </a>
                <div className="flex items-center gap-3 text-[#d4cfc4]">
                  <MapPin className="w-5 h-5 text-[#4A7C59]" />
                  <span>Carolina 00983, PR</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#2a4a3a] border border-[#3a5a4a] rounded-lg text-[#F5F0E8] placeholder-[#8a9a8a] focus:outline-none focus:border-[#4A7C59] transition-colors"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#2a4a3a] border border-[#3a5a4a] rounded-lg text-[#F5F0E8] placeholder-[#8a9a8a] focus:outline-none focus:border-[#4A7C59] transition-colors"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#2a4a3a] border border-[#3a5a4a] rounded-lg text-[#F5F0E8] placeholder-[#8a9a8a] focus:outline-none focus:border-[#4A7C59] transition-colors resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-[#4A7C59] hover:bg-[#3d6649] text-white font-medium rounded-full transition-colors"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Divider */}
          <div className="border-t border-[#3a5a4a] pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Logo / Brand */}
              <div className="font-serif italic text-2xl text-[#F5F0E8]">
                Isla Borinken
              </div>

              {/* Navigation */}
              <nav className="flex items-center gap-8">
                <a
                  href="#"
                  className="text-[#d4cfc4] hover:text-[#F5F0E8] transition-colors"
                >
                  Home
                </a>
                <a
                  href="#gallery"
                  className="text-[#d4cfc4] hover:text-[#F5F0E8] transition-colors"
                >
                  Gallery
                </a>
                <a
                  href="#contact"
                  className="text-[#d4cfc4] hover:text-[#F5F0E8] transition-colors"
                >
                  Contact Us
                </a>
              </nav>

              {/* Copyright */}
              <p className="text-[#8a9a8a] text-sm">
                © 2025 Isla Borinken Tours. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
