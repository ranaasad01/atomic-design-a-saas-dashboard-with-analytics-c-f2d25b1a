"use client";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const switchLocale = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    router.refresh();
    setOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        {open && (
          <div className="absolute bottom-full right-0 mb-2 bg-white border border-[var(--brand-card-border)] rounded-lg shadow-lg overflow-hidden min-w-[120px]">
            <button
              onClick={() => switchLocale("en")}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-[var(--brand-primary-light)] transition-colors ${locale === "en" ? "text-[var(--brand-primary)] font-semibold" : "text-[var(--color-on-surface)]"}`}
            >
              English
            </button>
            <button
              onClick={() => switchLocale("es")}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-[var(--brand-primary-light)] transition-colors ${locale === "es" ? "text-[var(--brand-primary)] font-semibold" : "text-[var(--color-on-surface)]"}`}
            >
              Español
            </button>
          </div>
        )}
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-10 h-10 rounded-full bg-[var(--brand-primary)] text-white flex items-center justify-center shadow-lg hover:bg-[var(--brand-primary-dark)] transition-colors duration-200"
          aria-label="Switch language"
        >
          <Globe className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}