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
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-2 w-full">
      {items.map((item, i) => (
        <div
          key={i}
          className="glass-card rounded-2xl overflow-hidden"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left gap-4 hover:bg-surface-hover transition-colors"
          >
            <span className="font-bold text-text-primary text-sm md:text-base leading-snug">
              {item.question}
            </span>
            <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
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
                <p className="px-6 pb-5 text-sm text-text-secondary leading-relaxed">
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
