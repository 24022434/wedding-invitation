import React, { useState, useEffect } from 'react';

import Envelope from './components/Envelope';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import MusicPlayer from './components/MusicPlayer';
const CoupleSection = React.lazy(() => import('./components/CoupleSection'));
const EventsSection = React.lazy(() => import('@/components/EventsSection'));
const GallerySection = React.lazy(() => import('./components/GallerySection'));

const metallicGradients = [
    'linear-gradient(135deg, #F8F7F6, #E0DEDD)',
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
        let animationFrameId: number;

        const createParticle = (x: number, y: number) => {
            const now = Date.now();
            if (now - lastTime < 100) return; // Increased throttle to 100ms
            lastTime = now;

            animationFrameId = requestAnimationFrame(() => {
                const gradient =
                    metallicGradients[Math.floor(Math.random() * metallicGradients.length)];

                const t = Math.random() * Math.PI * 2;

                // ❤️ Parametric heart (trail dài hơn)
                const scale = 26;
                const dx = scale * Math.pow(Math.sin(t), 3);
                const dy = -(
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
                el.style.willChange = 'transform, opacity'; // Optimization

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

                setTimeout(() => {
                    if (el && el.parentNode) {
                        el.parentNode.removeChild(el);
                    }
                }, 2200);
            });
        };

        const handleMouseMove = (e: MouseEvent) => {
            createParticle(e.clientX, e.clientY);
        };

        const handleTouchMove = (e: TouchEvent) => {
            const t = e.touches[0];
            if (t) createParticle(t.clientX, t.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [isEnvelopeOpened]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-wedding-cream">
            <Envelope onOpen={handleEnvelopeOpen} />

            {isEnvelopeOpened && (
                <div className="animate-fade-in-up">
                    <Navigation />
                    <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

                    <main>
                        <HeroSection />
                        <React.Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
                            <CoupleSection />
                            <EventsSection />
                            <GallerySection />
                        </React.Suspense>
                    </main>

                    <Footer />
                </div>
            )}
        </div>
    );
};

export default App;
