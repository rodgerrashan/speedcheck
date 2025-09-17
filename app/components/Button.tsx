import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

// Utility function to merge Tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
}

export function Button({ className, children, href, ...props }: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-base font-semibold text-white shadow-sm transition-all duration-300 ease-in-out hover:bg-accent-hover hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

  if (href) {
    return (
      <Link to={href} className={cn(baseClasses, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cn(baseClasses, className)} {...props}>
      {children}
    </button>
  );
}