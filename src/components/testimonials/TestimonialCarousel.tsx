"use client";

import { useEffect, useState } from "react";
import { getTestimonials } from "@/data/testimonials";
import { Icon } from "@/components/icons/Icon";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";

export function TestimonialCarousel({ locale }: { locale: Locale }) {
  const [index, setIndex] = useState(0);
  const testimonials = getTestimonials(locale);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  const testimonial = testimonials[index];

  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="glass rounded-3xl p-8 text-center shadow-lg shadow-slate-900/5 sm:p-12">
        <div className="flex justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Icon
              key={i}
              name="star"
              className={cn("h-5 w-5", i < testimonial.rating ? "text-electric-500" : "text-slate-200")}
              fill="currentColor"
              strokeWidth={0}
            />
          ))}
        </div>
        <blockquote className="mt-6 text-lg font-medium leading-relaxed text-navy-950 sm:text-xl">
          “{testimonial.quote}”
        </blockquote>
        <div className="mt-6">
          <p className="font-semibold text-navy-950">{testimonial.name}</p>
          <p className="text-sm text-slate-500">
            {testimonial.role ? `${testimonial.role} · ` : ""}
            {testimonial.location}
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((t, i) => (
          <button
            key={t.id}
            type="button"
            aria-label={`Show testimonial ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === index ? "w-7 bg-electric-500" : "w-2 bg-slate-200 hover:bg-slate-300"
            )}
          />
        ))}
      </div>
    </div>
  );
}
