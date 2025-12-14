import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
}

const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const handleClick = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => {
      setIsHidden(true);
      onOpen();
    }, 60);
  };

  if (isHidden) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-wedding-cream h-screen w-screen overflow-hidden">
      {/* Introduction Text */}
      <div
        className={`text-center mb-12 transition-opacity duration-700 ${isOpen ? 'opacity-0' : 'opacity-100'
          }`}
      >
        <p className="font-sans tracking-[0.2em] text-wedding-text uppercase text-sm mb-4">
          You are invited to
        </p>
        <h1 className="font-script text-5xl md:text-7xl text-wedding-gold mb-2">
          The Wedding
        </h1>
        <p className="font-serif text-xl italic text-gray-500">
          of Công Tuyền & Thảo Anh
        </p>
      </div>

      {/* Envelope Wrapper */}
      <div
        className={`
          relative perspective-1000 cursor-pointer group
          transition-transform duration-700
          ${isOpen ? 'scale-100' : 'animate-envelope-strong hover:scale-110'}
        `}
        onClick={handleClick}
      >
        <div className="relative w-[300px] h-[200px] md:w-[400px] md:h-[260px]">
          {/* Envelope Body */}
          <div className="absolute inset-0 bg-[#E8E6E4] shadow-2xl rounded-sm z-10 flex items-end justify-center overflow-hidden">
            <div className="w-0 h-0 border-l-[150px] md:border-l-[200px] border-r-[150px] md:border-r-[200px] border-b-[100px] md:border-b-[130px] border-l-transparent border-r-transparent border-b-[#DCDAD8] absolute bottom-0"></div>
            <div className="w-0 h-0 border-l-[150px] md:border-l-[200px] border-r-[150px] md:border-r-[200px] border-b-[100px] md:border-b-[130px] border-l-transparent border-r-transparent border-b-[#D0CECC] opacity-40 absolute bottom-0 scale-95"></div>
          </div>

          {/* Envelope Flap */}
          <div
            className={`
              absolute top-0 w-full h-0
              border-l-[150px] md:border-l-[200px]
              border-r-[150px] md:border-r-[200px]
              border-t-[100px] md:border-t-[130px]
              border-l-transparent border-r-transparent border-t-[#DCDAD8]
              z-20 origin-top transform-style-3d shadow-sm
              transition-transform duration-700
              ${isOpen ? 'rotate-x-180 z-0' : 'rotate-x-0'}
            `}
          >
            <div className="absolute -top-[100px] md:-top-[130px] left-1/2 -translate-x-1/2 translate-y-[85px] md:translate-y-[110px]">
              <div className="w-10 h-10 rounded-full bg-[#A08C8C] flex items-center justify-center shadow-lg border-2 border-[#8C7878]">
                <Heart className="w-5 h-5 text-[#F2F0F0] fill-current" />
              </div>
            </div>
          </div>
        </div>

        {/* Click Prompt */}
        <div
          className={`absolute -bottom-16 w-full text-center transition-opacity duration-500 ${isOpen ? 'opacity-0' : 'opacity-100'
            }`}
        >
          <p className="font-sans text-xs tracking-widest text-gray-400 animate-bounce">
            CHẠM ĐỂ MỞ THIỆP
          </p>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .rotate-x-180 {
          transform: rotateX(180deg);
        }
        .origin-top {
          transform-origin: top;
        }
        /* Apple-style easing */
        .transition-transform {
          transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }
        /* STRONG idle animation */
        @keyframes envelopeStrong {
          0% {
            transform: scale(0.94);
          }
          50% {
            transform: scale(1.02);
          }
          100% {
            transform: scale(0.94);
          }
        }
        .animate-envelope-strong {
          animation: envelopeStrong 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default Envelope;