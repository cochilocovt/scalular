import { cn } from '@/lib/utils';
import React from 'react';

export function StatPill({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-neutral-100 shadow-sm backdrop-blur-md border border-neutral-200/20 bg-primary/60',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
