"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

export default function Realisations() {
  const projets = [
    { titre: "Installation chaudière basse température", img: "/images/clim1.jpg" },
    { titre: "Pose d’une pompe à chaleur", img: "/images/clim2.jpg" },
    { titre: "Climatisation réversible", img: "/images/pac1.jpg" },
    { titre: "Installation chaudière basse température", img: "/images/clim1.jpg" },
    { titre: "Pose d’une pompe à chaleur", img: "/images/clim2.jpg" },
    { titre: "Climatisation réversible", img: "/images/pac1.jpg" },
  ];

  return (
    <section id="realisations" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-serif text-[#1C4A6E] mb-12">Réalisations</h2>
        <p className="text-gray-600 mb-6">
          Quelques exemples de nos installations récentes.
        </p>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {projets.map((projet, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition">
                <div className="relative h-60 w-full">
                  <Image
                    src={projet.img}
                    alt={projet.titre}
                    fill
                    className="object-cover"
                    priority={i < 2}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
