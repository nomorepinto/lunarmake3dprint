import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import portfolioData from "@/public/portfolio.json";

interface Badge {
  text: string;
  bgColor: string;
  textColor: string;
}

interface PortfolioItem {
  id: number;
  image: string;
  badge: Badge | null;
  alt: string;
}

export default function ProductPortfolio() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Close lightbox on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Head>
        <title>Product Portfolio | LunarMake 3D Print</title>
        <meta
          name="description"
          content="Explore LunarMake 3D Print's showcase of high-precision components, scale models, and specialized parts."
        />
      </Head>

      <div className="flex-grow max-w-container_max_width w-full px-margin_mobile md:px-margin_desktop py-10 px-5">
        {/* Portfolio Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {(portfolioData as PortfolioItem[]).map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item.image)}
              className="relative aspect-square bg-white border border-outline-variant rounded-lg overflow-hidden cursor-pointer group shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Custom Mini Card / Badge on the Left */}
              {item.badge && (
                <div
                  style={{
                    backgroundColor: item.badge.bgColor,
                    color: item.badge.textColor,
                  }}
                  className="absolute top-4 left-4 z-10 px-3 py-1 rounded-md text-sm font-mono uppercase tracking-wider shadow-sm font-bold"
                >
                  {item.badge.text}
                </div>
              )}

              {/* Product Photo */}
              <div className="relative w-full h-full">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={item.id <= 3}
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-4xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  fullscreen
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Overlay */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-surface/80 backdrop-blur-xl p-margin_mobile md:p-margin_desktop transition-opacity duration-300"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 text-primary p-2 hover:bg-primary-container/20 rounded-full transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>

          {/* Full-size Image Container */}
          <div
            className="relative max-w-4xl w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
          >
            <img
              alt="Full size preview"
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl animate-scale-up"
              src={selectedImage}
            />
          </div>
        </div>
      )}
    </>
  );
}
