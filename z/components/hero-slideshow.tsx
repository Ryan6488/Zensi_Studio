"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Slide {
  imageUrl: string
  tagline: string
  ctaText: string
  ctaLink: string
}

interface HeroSlideshowProps {
  slides: Slide[]
  interval?: number // Auto-advance interval in ms
}

export function HeroSlideshow({ slides, interval = 5000 }: HeroSlideshowProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1))
    }, interval)
  }, [slides.length, interval])

  useEffect(() => {
    resetTimeout()
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentSlideIndex, resetTimeout])

  const goToNextSlide = useCallback(() => {
    setCurrentSlideIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1))
    resetTimeout()
  }, [slides.length, resetTimeout])

  const goToPreviousSlide = useCallback(() => {
    setCurrentSlideIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1))
    resetTimeout()
  }, [slides.length, resetTimeout])

  if (slides.length === 0) {
    return null // Or a fallback for no slides
  }

  const currentSlide = slides[currentSlideIndex]

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Image
        src={currentSlide.imageUrl || "/placeholder.svg"}
        alt={currentSlide.tagline}
        fill
        className="object-cover object-center transition-opacity duration-1000 ease-in-out"
        priority
        sizes="100vw" // Corrected: removed the extra backslash
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6 font-serif text-black font-extrabold space-y-0">
        <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl text-foreground leading-tight drop-shadow-lg uppercase animate-in fade-in slide-in-from-top-10 duration-1000">
          {""}
        </h1>
        <p className="max-w-3xl text-lg md:text-xl drop-shadow-md animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300 text-black font-semibold">
          {currentSlide.tagline}
        </p>
        <Link href={currentSlide.ctaLink}>
          <Button
            size="lg"
            className="px-8 py-3 text-lg font-bold rounded-full shadow-lg transition-transform transform hover:scale-105 bg-cta-highlight text-background hover:bg-cta-highlight/90 animate-in fade-in zoom-in-90 duration-1000 delay-600"
          >
            {currentSlide.ctaText}
          </Button>
        </Link>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/80 hover:text-primary hover:bg-white/10 transition-colors duration-300 z-10"
            onClick={goToPreviousSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/80 hover:text-primary hover:bg-white/10 transition-colors duration-300 z-10"
            onClick={goToNextSlide}
            aria-label="Next slide"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                idx === currentSlideIndex ? "bg-primary scale-125" : "bg-muted-foreground/50 hover:bg-primary/80"
              }`}
              onClick={() => {
                setCurrentSlideIndex(idx)
                resetTimeout()
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
