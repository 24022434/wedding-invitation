import React from 'react';
import { ChevronDown } from 'lucide-react';
import { HERO_IMAGE, WEDDING_DATE, WEDDING_TIME, LUNAR_DATE } from '../constants';

const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden pt-20 pb-10">
      
      {/* Main Content Container with Animation */}
        <div className="w-full max-w-4xl mx-auto px-4 animate-fade-in-up text-center">

            {/* Invitation Header */}
            <div
                className={`text-center mb-12 transition-opacity duration-700 'opacity-0' : 'opacity-100'
                }`}
            >
                {/* Upper small text */}
                <p className="  font-serif text-4xl italic text-gray-500 text-wedding-text font-semibold uppercase text-sm mb-4">
                    Thư
                </p>

                {/* Main title */}
                <h1 className="font-script text-5xl md:text-7xl text-wedding-gold mb-2">
                    Mời Cưới
                </h1>
            </div>

        {/* Rising Image */}
        <div className="relative mx-auto w-full max-w-[400px] aspect-[3/4] rounded-t-[100px] overflow-hidden shadow-2xl border-4 border-white">
           <img 
             src={HERO_IMAGE} 
             alt="Wedding Couple" 
             className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
           <div className="absolute bottom-6 w-full text-center text-white">
              <p className="font-script text-3xl md:text-5xl drop-shadow-lg">We are getting married</p>
           </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-wedding-gold opacity-60" />
      </div>
    </section>
  );
};

export default HeroSection;
