import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import portfolioData from "@/public/portfolio.json";

export default function Home() {
  return (
    <>
      <Head>
        <title>LunarMake 3D Print | Premium Additive Manufacturing</title>
        <meta
          name="description"
          content="LunarMake 3D Print provides premium, industrial-grade 3D printing services. Estimate costs with our precision calculator or view our product showcase."
        />
      </Head>
      <div className="relative h-screen w-full overflow-hidden">
        {/* Scrolling background grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 absolute inset-0 w-full h-full">
          {[0, 1, 2, 3, 4].map((colIndex) => {
            const shiftedData = [
              ...portfolioData.slice(colIndex),
              ...portfolioData,
              ...portfolioData.slice(0, colIndex),
            ];

            let visibilityClass = "flex";
            if (colIndex === 2) {
              visibilityClass = "hidden md:flex";
            } else if (colIndex >= 3) {
              visibilityClass = "hidden lg:flex";
            }

            return (
              <div
                key={colIndex}
                className={`${visibilityClass} animate-scroll-up flex flex-col gap-4`}
                style={{ animationDelay: `-${colIndex * 4.5}s` }}
              >
                {[...shiftedData, ...shiftedData].map((item, i) => (
                  <div
                    key={i}
                    className="relative w-full h-[250px] md:h-[300px] lg:h-[350px] flex-shrink-0 rounded-lg overflow-hidden"
                  >
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <div className="absolute inset-0 bg-black/30 z-10" />

        <div className="z-50 flex-col mx-auto my-auto shadow-2xl rounded-xl p-5 bg-surface absolute inset-0 w-fit h-fit">
          <div className="relative h-64 w-64 overflow-hidden mx-auto my-auto">
            <Image
              src="/logoNoText.png"
              alt="LunarMake Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-primary text-5xl font-heading text-center mb-4">LunarMake 3D Print</h1>
          <h2 className="text-primary text-2xl text-center mb-3">Premium Additive Manufacturing</h2>
        </div>
      </div>
    </>
  );
}
