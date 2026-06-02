import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => router.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant bg-surface-container-lowest shadow-sm">
      <div className="mx-auto flex h-20 max-w-container_max_width items-center px-margin_mobile md:px-margin_desktop relative">
        <Link
          href="/"
          className="flex items-center gap-5 transition-opacity hover:opacity-90 ml-5"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative h-15 w-15 overflow-hidden">
            <Image
              src="/logoNoText.png"
              alt="LunarMake Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="font-heading text-xl font-semibold text-primary">
            LunarMake 3D Printing
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-10 font-sans text-body-lg absolute left-1/2 -translate-x-1/2">
          <Link
            href="/pricecalculator"
            className={`pb-1 transition-colors ${isActive("/pricecalculator")
              ? "font-bold text-primary border-b-2 border-primary"
              : "text-on-surface-variant hover:text-primary"
              }`}
          >
            Price Calculator
          </Link>
          <Link
            href="/productportfolio"
            className={`pb-1 transition-colors ${isActive("/productportfolio")
              ? "font-bold text-primary border-b-2 border-primary"
              : "text-on-surface-variant hover:text-primary"
              }`}
          >
            Product Portfolio
          </Link>
          <Link
            href="/colors"
            className={`pb-1 transition-colors ${isActive("/colors")
              ? "font-bold text-primary border-b-2 border-primary"
              : "text-on-surface-variant hover:text-primary"
              }`}
          >
            Available Colors
          </Link>
          <Link
            href="/contact"
            className={`pb-1 transition-colors ${isActive("/contact")
              ? "font-bold text-primary border-b-2 border-primary"
              : "text-on-surface-variant hover:text-primary"
              }`}
          >
            Contact Info
          </Link>
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex md:hidden ml-auto mr-5 p-2 text-primary hover:bg-primary-container/20 rounded-xl transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <span className="material-symbols-outlined text-3xl">
            {isOpen ? "close" : "menu"}
          </span>
        </button>

        {/* Mobile menu overlay */}
        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant shadow-md flex flex-col p-6 gap-4 z-40 animate-fade-in">
            <Link
              href="/pricecalculator"
              onClick={() => setIsOpen(false)}
              className={`py-2.5 px-4 rounded-xl transition-colors font-sans text-body-lg ${isActive("/pricecalculator")
                ? "font-bold text-primary bg-primary-container/10"
                : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
                }`}
            >
              Price Calculator
            </Link>
            <Link
              href="/productportfolio"
              onClick={() => setIsOpen(false)}
              className={`py-2.5 px-4 rounded-xl transition-colors font-sans text-body-lg ${isActive("/productportfolio")
                ? "font-bold text-primary bg-primary-container/10"
                : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
                }`}
            >
              Product Portfolio
            </Link>
            <Link
              href="/colors"
              onClick={() => setIsOpen(false)}
              className={`py-2.5 px-4 rounded-xl transition-colors font-sans text-body-lg ${isActive("/colors")
                ? "font-bold text-primary bg-primary-container/10"
                : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
                }`}
            >
              Available Colors
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className={`py-2.5 px-4 rounded-xl transition-colors font-sans text-body-lg ${isActive("/contact")
                ? "font-bold text-primary bg-primary-container/10"
                : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
                }`}
            >
              Contact Info
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
