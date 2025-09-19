import { useEffect, useState, useRef } from "react";

const sections = [
  { id: "hero", label: "Hero" },
  { id: "speed", label: "Test" },
  { id: "demos", label: "Demos" },
  { id: "features", label: "Features" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [hideNav, setHideNav] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && scrollPosition >= section.offsetTop) {
          setActive(sections[i].id);
          break;
        }
      }

      if (window.scrollY > lastScroll && window.scrollY > 100) {
        setHideNav(true);
      } else {
        setHideNav(false);
      }

      // 🔑 Close expanded menu while scrolling
      setMenuOpen(false);

      setLastScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <nav
      ref={navRef}
      onClick={() => setMenuOpen(!menuOpen)} // tap anywhere toggles (mobile only)
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-3xl rounded-2xl bg-white/30 backdrop-blur-lg px-6 transition-all duration-500 overflow-hidden ${
        hideNav ? "-translate-y-24" : "translate-y-0"
      } ${menuOpen ? "py-4" : "py-3"}`}
      style={{ cursor: "pointer" }}
    >
      {/* ✅ Desktop: one-line navbar */}
      <div className="hidden md:flex items-center justify-between">
        <div className="text-xl font-bold text-black select-none">SPEEDY</div>
        <div className="flex space-x-6">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className={`px-2 py-1 rounded-lg transition-all duration-300 ${
                active === sec.id ? "font-semibold" : "hover:font-medium"
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ Mobile: logo + dots */}
      <div className="flex items-center justify-between md:hidden">
        <div className="text-xl font-bold text-black select-none">SPEEDY</div>
        <div className="text-2xl font-bold">⋯</div>
      </div>

      {/* ✅ Mobile expand-down list */}
      <div
        className={`md:hidden grid transition-all duration-500 ${
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden flex flex-col space-y-2">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={(e) => {
                e.stopPropagation(); // prevent re-toggling
                scrollToSection(sec.id);
              }}
              className={`w-full text-left px-2 py-2 rounded-lg transition-all duration-300 ${
                active === sec.id ? "font-semibold" : "hover:font-medium"
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
