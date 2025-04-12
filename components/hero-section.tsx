"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"

const slides = [
  {
    title: "Connect",
    description: "Build meaningful relationships with fellow students, faculty, and alumni in your academic community.",
  },
  {
    title: "Collaborate",
    description: "Work together on projects, share knowledge, and solve problems as a team.",
  },
  {
    title: "Succeed",
    description: "Achieve your academic and professional goals with support from your GW network.",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="relative h-[600px] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://www.gwu.edu/sites/g/files/zaxdzs5066/files/2024-03/main_gw_hero_ver_6_compressed.mp4"
        />
        <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center">
          <div className="slider-container w-full max-w-[800px] overflow-hidden">
            <div
              className="slider-track flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="slider-slide w-full flex-shrink-0 px-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white mb-2">
                    {slide.title}
                  </h1>
                  <p className="mt-4 max-w-[700px] text-lg text-white md:text-xl mx-auto">{slide.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex justify-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link href="/register">
              <Button size="lg" className="bg-[#0033A0] hover:bg-[#002180]">
                Join Now
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="bg-white/20 text-white border-white hover:bg-white/30">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
