import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Enhanced Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div
            onClick={() => scrollToSection("hero")}
            className="text-2xl font-bold text-primary-600 cursor-pointer">
            SocialAnalytics
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-600 hover:text-primary-600 transition-colors">
              Features
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="text-gray-600 hover:text-primary-600 transition-colors">
              Team
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-600 hover:text-primary-600 transition-colors">
              Contact
            </button>
            <Link
              to="/dashboard"
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2">
              Get Started
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-primary-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4">
            <div className="flex flex-col gap-4 px-4">
              <button
                onClick={() => scrollToSection("features")}
                className="text-gray-600 hover:text-primary-600 transition-colors py-2">
                Features
              </button>
              <button
                onClick={() => scrollToSection("team")}
                className="text-gray-600 hover:text-primary-600 transition-colors py-2">
                Team
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-600 hover:text-primary-600 transition-colors py-2">
                Contact
              </button>
              <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2">
                Get Started
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
