"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ImageGalleryProps {
  images: string[]
  alt: string
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0] || "/placeholder.svg")
  const [open, setOpen] = useState(false)
  const [currentZoomIndex, setCurrentZoomIndex] = useState(0)

  const handleThumbnailClick = (image: string) => {
    setMainImage(image)
  }

  const handleMainImageClick = () => {
    setCurrentZoomIndex(images.indexOf(mainImage))
    setOpen(true)
  }

  const goToNextImage = () => {
    setCurrentZoomIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const goToPreviousImage = () => {
    setCurrentZoomIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex + 1))
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg cursor-pointer">
        <Image
          src={mainImage || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-cover"
          priority
          onClick={handleMainImageClick}
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative aspect-[3/4] cursor-pointer overflow-hidden rounded-lg border-2 ${
                mainImage === image ? "border-primary" : "border-transparent"
              }`}
              onClick={() => handleThumbnailClick(image)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${alt} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, (max-width: 1200px) 15vw, 10vw"
              />
            </div>
          ))}
        </div>
      )}

      {/* Zoom Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl h-[90vh] p-0 flex flex-col">
          <div className="relative flex-1 w-full h-full">
            <Image
              src={images[currentZoomIndex] || "/placeholder.svg"}
              alt={`${alt} zoomed view`}
              fill
              className="object-contain"
            />
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-white/80 hover:text-white hover:bg-black/30 transition-colors duration-300 z-10"
                  onClick={(e) => {
                    e.stopPropagation()
                    goToPreviousImage()
                  }}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 hover:text-white hover:bg-black/30 transition-colors duration-300 z-10"
                  onClick={(e) => {
                    e.stopPropagation()
                    goToNextImage()
                  }}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
