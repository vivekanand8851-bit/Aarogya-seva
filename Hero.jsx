import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../mock/mockData';

export default function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % HERO_SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  const slide = HERO_SLIDES[idx];

  return (
    <section className="relative overflow-hidden bg-[#0f3d2e]">
      <div className="relative h-[520px] md:h-[620px]">
        {HERO_SLIDES.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={s.image}
              alt={s.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b2a20]/85 via-[#0b2a20]/60 to-transparent" />
          </div>
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="max-w-xl">
            <span className="inline-block bg-[#e6b64c] text-[#0f3d2e] font-bold text-xs tracking-widest px-3 py-1.5 rounded">
              {slide.tag}
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-semibold text-white mt-5 leading-[1.05]">
              {slide.title}
            </h1>
            <p className="text-[#e8dcc0] mt-5 text-base md:text-lg leading-relaxed max-w-md">
              {slide.subtitle}
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                to={slide.link}
                className="inline-flex items-center gap-2 bg-[#e6b64c] hover:bg-[#d4a238] text-[#0f3d2e] font-semibold px-6 py-3.5 rounded-lg transition group"
              >
                {slide.cta}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/consult"
                className="inline-flex items-center gap-2 border border-white/40 hover:bg-white/10 text-white font-medium px-6 py-3.5 rounded-lg transition"
              >
                Free Consultation
              </Link>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIdx((p) => (p - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur text-white flex items-center justify-center transition"
          aria-label="prev"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={() => setIdx((p) => (p + 1) % HERO_SLIDES.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur text-white flex items-center justify-center transition"
          aria-label="next"
        >
          <ChevronRight size={22} />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-8 bg-[#e6b64c]' : 'w-2 bg-white/40'}`}
              aria-label={`slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
