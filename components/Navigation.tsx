import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-wedding-cream/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
          }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">

          <div className={`font-script text-2xl md:text-3xl text-wedding-gold cursor-pointer ${isScrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`} onClick={() => scrollToSection('hero')}>
            Wedding
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.to}
                onClick={() => scrollToSection(item.to)}
                className="text-gray-600 hover:text-wedding-gold font-sans text-sm uppercase tracking-wider transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-gray-600" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-wedding-cream flex flex-col items-center justify-center space-y-8 animate-fade-in-up">
          <button className="absolute top-6 right-6 p-2" onClick={() => setMobileMenuOpen(false)}>
            <X className="w-8 h-8 text-gray-600" />
          </button>

          <h2 className="font-script text-5xl text-wedding-gold mb-8">Menu</h2>

          {NAV_ITEMS.map((item) => (
            <button
              key={item.to}
              onClick={() => scrollToSection(item.to)}
              className="text-gray-800 text-xl font-serif hover:text-wedding-gold transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Navigation;
