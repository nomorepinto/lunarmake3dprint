import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();

  const isActive = (path: string) => router.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant bg-surface-container-lowest shadow-sm">
      <div className="mx-auto flex h-20 max-w-container_max_width items-center px-margin_mobile md:px-margin_desktop relative">
        <Link href="/" className="flex items-center gap-5 transition-opacity hover:opacity-90 ml-5">
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
        </nav>
      </div>
    </header>
  );
}
