import React, { useState, useEffect } from 'react';

import Envelope from './components/Envelope';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import CoupleSection from './components/CoupleSection';

import MusicPlayer from './components/MusicPlayer';
import GallerySection from './components/GallerySection';
import Footer from './components/Footer';
import EventsSection from "@/components/EventsSection.tsx";

const metallicGradients = [
    'linear-gradient(135deg, #F8F7F6, #E0DEDD)', // light cool grey
    'linear-gradient(135deg, #F2F0F0, #D8D6D4)', // soft grey
    'linear-gradient(135deg, #ECEAE9, #CFCDCB)', // muted grey
];

const App: React.FC = () => {
    const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleEnvelopeOpen = () => {
        setIsEnvelopeOpened(true);
        setIsPlaying(true);
    };

    // 💎 LUXURY METALLIC HEART TRAIL
    useEffect(() => {
        if (!isEnvelopeOpened) return;

        let lastTime = 0;

        const createParticle = (x: number, y: number) => {
            const now = Date.now();
            if (now - lastTime < 60) return; // ✨ throttle luxury
            lastTime = now;

            const gradient =
                metallicGradients[Math.floor(Math.random() * metallicGradients.length)];

            const t = Math.random() * Math.PI * 2;

            // ❤️ Parametric heart (trail dài hơn)
            const scale = 26;
            const dx = scale * Math.pow(Math.sin(t), 3);
            const dy =
                -(
                    18 * Math.cos(t) -
                    7 * Math.cos(2 * t) -
                    3 * Math.cos(3 * t)
                );

            const el = document.createElement('span');
            el.innerText = '❤';

            el.style.position = 'fixed';
            el.style.left = `${x}px`;
            el.style.top = `${y}px`;
            el.style.pointerEvents = 'none';
            el.style.fontSize = '18px';
            el.style.zIndex = '9999';
            el.style.opacity = '0.95';

            // 🌟 metallic text
            el.style.background = gradient;
            el.style.backgroundClip = 'text';
            el.style.webkitBackgroundClip = 'text';
            el.style.color = 'transparent';

            // 🕯️ candle glow
            el.style.filter =
                'blur(0.25px) drop-shadow(0 6px 14px rgba(230, 201, 138, 0.55))';

            el.style.setProperty('--dx', `${dx}px`);
            el.style.setProperty('--dy', `${dy}px`);

            el.style.animation =
                'lux-heart 2.2s cubic-bezier(0.22, 1, 0.36, 1) forwards';

            document.body.appendChild(el);

            setTimeout(() => el.remove(), 2200);
        };

        const handleMouseMove = (e: MouseEvent) => {
            createParticle(e.clientX, e.clientY);
        };

        const handleTouchMove = (e: TouchEvent) => {
            const t = e.touches[0];
            if (t) createParticle(t.clientX, t.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [isEnvelopeOpened]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-wedding-cream">
            {/* ✨ LUXURY HEART ANIMATION */}
            <style>
                {`
          @keyframes lux-heart {
            0% {
              transform: translate(-50%, -50%) scale(0.6);
              opacity: 0;
            }
            25% {
              opacity: 1;
            }
            100% {
              transform:
                translate(
                  calc(-50% + var(--dx)),
                  calc(-50% + var(--dy))
                )
                scale(1.35);
              opacity: 0;
            }
          }
        `}
            </style>

            <Envelope onOpen={handleEnvelopeOpen} />

            {isEnvelopeOpened && (
                <div className="animate-fade-in-up">
                    <Navigation />
                    <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

                    <main>
                        <HeroSection />
                        <CoupleSection />
                        <EventsSection />
                        <GallerySection />

                    </main>

                    <Footer />
                </div>
            )}
        </div>
    );
};

export default App;
