import React from 'react';
import { GROOM, BRIDE } from '../constants';
import { Heart } from 'lucide-react';

const CoupleSection: React.FC = () => {
  return (
    <section id="couple" className="py-20 bg-wedding-cream">
      <div className="container mx-auto px-4">

        <div className="text-center mb-16">
          <Heart className="w-8 h-8 text-wedding-gold mx-auto mb-4 fill-current" />
          <h2 className="font-script text-5xl md:text-6xl text-wedding-gold mb-2">Groom & Bride</h2>
          <p className="font-sans text-gray-400 tracking-widest uppercase text-sm">Tình yêu diệu kỳ</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">

          {/* Groom */}
          <div className="flex flex-col items-center text-center max-w-sm group">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-wedding-cream shadow-xl mb-6 relative">
              <img src={GROOM.image} alt={GROOM.name} className="w-full h-full w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110" />
            </div>
            <h3 className="font-serif text-3xl text-gray-800 mb-1">{GROOM.name}</h3>
            <p className="font-sans text-wedding-gold text-sm font-bold uppercase tracking-widest mb-4">{GROOM.role}</p>
            <p className="font-sans text-gray-500 text-sm leading-relaxed px-4">
              {GROOM.description}
            </p>
          </div>

          {/* Divider/Icon for Desktop */}
          <div className="hidden md:flex items-center justify-center">
            <div className="w-[1px] h-32 bg-wedding-gold/30"></div>
          </div>

          {/* Bride */}
          <div className="flex flex-col items-center text-center max-w-sm group">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-wedding-cream shadow-xl mb-6 relative">
              <img src={BRIDE.image} alt={BRIDE.name} className="w-full h-full w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110" />
            </div>
            <h3 className="font-serif text-3xl text-gray-800 mb-1">{BRIDE.name}</h3>
            <p className="font-sans text-wedding-gold text-sm font-bold uppercase tracking-widest mb-4">{BRIDE.role}</p>
            <p className="font-sans text-gray-500 text-sm leading-relaxed px-4">
              {BRIDE.description}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CoupleSection;
