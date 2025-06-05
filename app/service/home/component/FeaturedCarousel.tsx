"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const SERVICES_PER_VIEW = 3;

export default function FeaturedCarousel({ services }: { services: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);

  // Show 3 services per page on desktop, 1 on mobile
  const SERVICES_PER_VIEW_DESKTOP = 3;
  const SERVICES_PER_VIEW_MOBILE = 1;

  // Track window width to decide SERVICES_PER_VIEW dynamically
  const [servicesPerView, setServicesPerView] = useState(
    SERVICES_PER_VIEW_MOBILE
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // md breakpoint and above, 3 cards
        setServicesPerView(SERVICES_PER_VIEW_DESKTOP);
      } else {
        // below md, 1 card
        setServicesPerView(SERVICES_PER_VIEW_MOBILE);
      }
    };
    handleResize(); // initialize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(services.length / servicesPerView);

  const scrollToPage = (page: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;

    // Scroll by container width * page
    const scrollAmount = container.offsetWidth * page;
    container.scrollTo({ left: scrollAmount, behavior: "smooth" });
    setActivePage(page);
  };

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
  }, [activePage, totalPages]);

  return (
    <section className="py-12 px-4 bg-gray-50">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Featured Services
      </h2>

      <div className="relative max-w-6xl mx-auto">
        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto sm:overflow-x-hidden  md:overflow-x-hidden lg:overflow-x-hidden scroll-smooth snap-x snap-mandatory no-scrollbar"
          style={{
            gap: "1.5rem", // gap between cards, adjust as you like
            scrollSnapType: "x mandatory",
          }}
        >
          {services.map((service, idx) => (
            <div
              key={idx}
              className="snap-start bg-white rounded-lg shadow hover:shadow-lg transition box-border"
              style={{
                flex: `0 0 calc((100% - ${
                  (servicesPerView - 1) * 16
                }px) / ${servicesPerView})`,
                // Explanation:
                // 16px = 1rem gap between cards,
                // (servicesPerView - 1) * gap is total gap width,
                // subtract total gaps from 100% width,
                // divide remainder equally by number of cards
                maxWidth: "400px", // optional max width so cards don't get too wide on huge desktops
              }}
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
  
