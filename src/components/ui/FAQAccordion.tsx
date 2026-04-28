'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  darkMode?: boolean;
}

export function FAQAccordion({ items, darkMode = false }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  const cardCls = darkMode
    ? 'bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden'
    : 'glass-card rounded-2xl overflow-hidden';

  const hoverCls = darkMode
    ? 'hover:bg-white/[0.06]'
    : 'hover:bg-surface-hover';

  return (
    <div className="flex flex-col gap-2 w-full">
      {items.map((item, i) => (
        <div key={i} className={cardCls}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className={`w-full flex items-center justify-between px-6 py-4 text-left gap-4 ${hoverCls} transition-colors`}
          >
            <span className={`font-bold text-sm md:text-base leading-snug ${darkMode ? 'text-white' : 'text-text-primary'}`}>
              {item.question}
            </span>
            <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${darkMode ? 'bg-[#0EA5E9]/10 text-[#0EA5E9]' : 'bg-primary/10 text-primary'}`}>
              {open === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </span>
          </button>

          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className={`px-6 pb-5 text-sm leading-relaxed ${darkMode ? 'text-white/60' : 'text-text-secondary'}`}>
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
