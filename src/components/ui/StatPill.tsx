import { cn } from '@/lib/utils';
import React from 'react';

export function StatPill({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white/90 shadow-sm backdrop-blur-md border border-white/10 bg-[#0D1830]/60',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
