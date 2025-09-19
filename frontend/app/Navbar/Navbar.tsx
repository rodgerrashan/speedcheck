import { useEffect, useState } from "react";

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      // Highlight active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && scrollPosition >= section.offsetTop) {
          setActive(sections[i].id);
          break;
        }
      }

      // Hide/show navbar like Apple
      if (window.scrollY > lastScroll && window.scrollY > 100) {
        setHideNav(true); // scrolling down
      } else {
        setHideNav(false); // scrolling up
      }
      setLastScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-2xl rounded-full bg-white/30 backdrop-blur-lg px-6 py-3 flex items-center justify-between transition-transform duration-500 ${
        hideNav ? "-translate-y-24" : "translate-y-0"
      }`}
    >
      {/* Logo */}
      <div className="text-xl font-bold text-black select-none">SPEEDY</div>

      {/* Nav buttons */}
      <div className="flex space-x-4">
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            className={`px-1 py-1 rounded-lg transition-all duration-300 ${
              active === sec.id
                ? "font-semibold"
                : "hover:font-medium"
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
