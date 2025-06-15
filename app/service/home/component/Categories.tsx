"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

const SERVICES_PER_VIEW = 3;

type Service = {
  img: string;
  name: string;
  type: string;
  location: string;
};

export default function FeaturedCarousel({
  services,
}: {
  services: Service[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const totalPages = Math.ceil(services.length / SERVICES_PER_VIEW);

  const scrollToPage = useCallback((page: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = container.offsetWidth * page;
    container.scrollTo({ left: scrollAmount, behavior: "smooth" });
    setActivePage(page);
  }, []);

  // Sync scroll position to page index
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const container = scrollRef.current;
      const newPage = Math.round(container.scrollLeft / container.offsetWidth);
      setActivePage(newPage);
    };
    const container = scrollRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto scroll every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      scrollToPage((activePage + 1) % totalPages);
    }, 5000);
    return () => clearInterval(interval);
  }, [activePage, totalPages, scrollToPage]);

  return (
    <section className="py-12 px-4 bg-gray-50">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Featured Services
      </h2>

      <div className="relative max-w-6xl mx-auto">
        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto sm:overflow-x-hidden md:overflow-x-hidden lg:overflow-x-hidden scroll-smooth snap-x snap-mandatory space-x-4 pb-2 no-scrollbar"
        >
          {services.map((service, idx) => (
            <div
              key={idx}
              className="min-w-[300px] md:min-w-[30%] snap-start shrink-0 bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              <Image
                src={service.img}
                alt={service.name}
                width={500}
                height={300}
                className="rounded-t-lg object-cover w-full h-[200px]"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{service.name}</h3>
                <p className="text-gray-500">{service.type}</p>
                <p className="text-sm text-gray-400">{service.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Prev/Next Buttons */}
        {/* <div className="flex  mt-6 px-4">
          <button
            onClick={() => scrollToPage(Math.max(0, activePage - 1))}
            className="px-4 py-2 bg-blue-100 rounded hover:bg-blue-200"
            disabled={activePage === 0}
          >
            ◀
          </button>
          <button
            onClick={() =>
              scrollToPage(Math.min(totalPages - 1, activePage + 1))
            }
            className="px-4 py-2 bg-blue-100 rounded hover:bg-blue-200"
            disabled={activePage === totalPages - 1}
          >
            ▶
          </button>
        </div> */}

        {/* Dot Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <span
              key={i}
              onClick={() => scrollToPage(i)}
              className={`w-3 h-3 rounded-full cursor-pointer transition ${
                activePage === i ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}
