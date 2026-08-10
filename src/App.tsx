import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const IMAGES = [
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png',
    bg: '#F4845F',
    panel: '#F79B7F',
  },
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png',
    bg: '#6BBF7A',
    panel: '#85CC92',
  },
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png',
    bg: '#E882B4',
    panel: '#ED9DC4',
  },
  {
    src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png',
    bg: '#6EB5FF',
    panel: '#8DC4FF',
  },
];

type Role = 'center' | 'left' | 'right' | 'back';

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  // Preload images on mount
  useEffect(() => {
    IMAGES.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });
  }, []);

  // Update mobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigate = useCallback(
    (direction: 'next' | 'prev') => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActiveIndex((prev) =>
        direction === 'next' ? (prev + 1) % 4 : (prev + 3) % 4
      );
      setTimeout(() => {
        setIsAnimating(false);
      }, 650);
    },
    [isAnimating]
  );

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigate('prev');
      } else if (e.key === 'ArrowRight') {
        navigate('next');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const getRole = (index: number): Role => {
    if (index === activeIndex) return 'center';
    if (index === (activeIndex + 3) % 4) return 'left';
    if (index === (activeIndex + 1) % 4) return 'right';
    return 'back';
  };

  const getRoleStyle = (role: Role) => {
    switch (role) {
      case 'center':
        return {
          transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
          filter: 'blur(0px)',
          opacity: 1,
          zIndex: 20,
          left: '50%',
          height: isMobile ? '60%' : '92%',
          bottom: isMobile ? '22%' : '0',
        };
      case 'left':
        return {
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(2px)',
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? '20%' : '30%',
          height: isMobile ? '16%' : '28%',
          bottom: isMobile ? '32%' : '12%',
        };
      case 'right':
        return {
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(2px)',
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? '80%' : '70%',
          height: isMobile ? '16%' : '28%',
          bottom: isMobile ? '32%' : '12%',
        };
      case 'back':
        return {
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(4px)',
          opacity: 1,
          zIndex: 5,
          left: '50%',
          height: isMobile ? '13%' : '22%',
          bottom: isMobile ? '32%' : '12%',
        };
    }
  };

  const noiseDataUri = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.08'/></svg>`;

  return (
    <div
      id="toonhub-hero-outer"
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
        transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        id="toonhub-hero-container"
        className="relative w-full overflow-hidden"
        style={{ height: '100vh' }}
      >
        {/* 1. Grain Overlay */}
        <div
          id="grain-overlay"
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 50,
            backgroundImage: `url("${noiseDataUri}")`,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
            opacity: 0.4,
          }}
        />

        {/* 2. Giant Ghost Text "AI AVATAR" */}
        <div
          id="giant-ghost-text"
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none uppercase tracking-tight"
          style={{
            top: '18%',
            zIndex: 2,
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(90px, 28vw, 380px)',
            fontWeight: 900,
            color: '#FFFFFF',
            opacity: 1,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
          }}
        >
          AI AVATAR
        </div>

        {/* 3. Top-left brand label "TOONHUB | AI数字人" */}
        <div
          id="brand-label"
          className="absolute top-6 left-4 sm:left-8 text-xs font-semibold uppercase text-white opacity-90 tracking-[0.18em]"
          style={{ zIndex: 60 }}
        >
          TOONHUB | AI数字人
        </div>

        {/* 4. Carousel */}
        <div id="carousel-wrapper" className="absolute inset-0" style={{ zIndex: 3 }}>
          {IMAGES.map((item, index) => {
            const role = getRole(index);
            const roleStyle = getRoleStyle(role);

            return (
              <div
                key={index}
                id={`carousel-item-${index}`}
                onClick={() => {
                  if (role === 'left') navigate('prev');
                  if (role === 'right') navigate('next');
                }}
                className={`absolute ${role === 'left' || role === 'right' ? 'cursor-pointer' : ''}`}
                style={{
                  aspectRatio: '0.6 / 1',
                  transition:
                    'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1), height 650ms cubic-bezier(0.4,0,0.2,1), bottom 650ms cubic-bezier(0.4,0,0.2,1)',
                  willChange: 'transform, filter, opacity, left',
                  ...roleStyle,
                }}
              >
                <img
                  src={item.src}
                  alt={`ToonHub 3D数字人 ${index + 1}`}
                  draggable={false}
                  className="w-full h-full object-contain object-bottom pointer-events-none select-none"
                />
              </div>
            );
          })}
        </div>

        {/* 5. Bottom-left text + nav buttons */}
        <div
          id="bottom-left-panel"
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24 max-w-[320px]"
          style={{ zIndex: 60 }}
        >
          <p
            id="panel-title"
            className="font-bold uppercase tracking-widest text-white text-base sm:text-[22px] mb-2 sm:mb-3 opacity-95"
            style={{ letterSpacing: '0.02em' }}
          >
            TOONHUB 3D数字人
          </p>
          <p
            id="panel-description"
            className="hidden sm:block text-xs sm:text-sm text-white opacity-85 leading-[1.6] mb-4 sm:mb-5"
          >
            次世代超真实 3D AI 数字人形象，融合智能交互与高精度三维建模，呈现极致视觉体验。即刻订制专属数字分身。
          </p>
          <div id="nav-buttons" className="flex items-center gap-3">
            <button
              id="prev-button"
              onClick={() => navigate('prev')}
              aria-label="上一形象"
              disabled={isAnimating}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-transparent border-2 border-white text-white flex items-center justify-center transition-all duration-150 hover:scale-[1.08] hover:bg-white/12 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>
            <button
              id="next-button"
              onClick={() => navigate('next')}
              aria-label="下一形象"
              disabled={isAnimating}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-transparent border-2 border-white text-white flex items-center justify-center transition-all duration-150 hover:scale-[1.08] hover:bg-white/12 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* 6. Bottom-right link "立即探索" */}
        <div
          id="bottom-right-link-container"
          className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10"
          style={{ zIndex: 60 }}
        >
          <a
            id="discover-link"
            href="#discover"
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-2 sm:gap-3 text-white no-underline uppercase opacity-95 hover:opacity-100 transition-opacity duration-200 cursor-pointer font-bold tracking-tight"
            style={{
              fontSize: 'clamp(20px, 4vw, 52px)',
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            <span>立即探索</span>
            <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8" strokeWidth={2.25} />
          </a>
        </div>
      </div>
    </div>
  );
}
