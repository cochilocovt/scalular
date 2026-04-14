import Link from "next/link";
import { Button } from "@/components/ui/shadcn-button";
import { ChevronRight } from "lucide-react";

interface GetStartedButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  href?: string;
  target?: string;
}

export function GetStartedButton({
  label = 'Get Started',
  onClick,
  className,
  size = 'lg',
  href,
  target,
}: GetStartedButtonProps) {
  const content = (
    <>
      <span className="mr-8 font-semibold tracking-wide transition-opacity duration-500 group-hover:opacity-0 relative z-20">
        {label}
      </span>
      <i className="absolute right-1 top-1 bottom-1 rounded-sm z-10 grid w-1/4 place-items-center transition-all duration-500 bg-white/10 group-hover:bg-white group-hover:shadow-[0_0_20px_var(--glow-primary)] group-hover:w-[calc(100%-0.5rem)] group-active:scale-95 text-white group-hover:text-primary">
        <ChevronRight size={16} strokeWidth={2.5} aria-hidden="true" />
      </i>
      {/* Decorative colored glow underneath */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </>
  );

  const sharedClasses = `group relative overflow-hidden bg-primary text-white border border-primary-hover shadow-lg hover:bg-primary-hover transition-all duration-500 ${className || ''}`;

  if (href) {
    return (
      <Button asChild className={sharedClasses} size={size}>
        <Link href={href} target={target} onClick={onClick} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
          {content}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      className={sharedClasses}
      size={size}
      onClick={onClick}
    >
      {content}
    </Button>
  );
}
