import { Link, NavLink } from 'react-router-dom';

const navLinks = [
  { name: 'Demos', path: '/demos' },
  { name: 'Analytics', path: '/analytics' },
  { name: 'About 5G', path: '/about-5g' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="text-xl font-bold tracking-tight">
          EngEx <span className="text-accent">5G</span>
        </Link>
        <nav className="hidden items-center space-x-6 text-sm md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `transition-colors hover:text-primary ${
                  isActive ? 'text-primary' : 'text-secondary'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
        {/* Mobile menu button can be added here */}
      </div>
    </header>
  );
}