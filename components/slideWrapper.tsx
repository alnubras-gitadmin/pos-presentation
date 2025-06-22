// components/SlideWrapper.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react';

interface Props {
  mdxSource: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>;
  frontMatter: { title?: string };
  index: number;
  total: number;
  components?: Record<string, React.ComponentType<any>>;
}

export default function SlideWrapper({
  mdxSource,
  frontMatter,
  index,
  total,
  components = {}
}: Props) {
  const router = useRouter();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [mouseTimer, setMouseTimer] = useState<NodeJS.Timeout | null>(null);

  const go = (delta: number) => {
    const next = index + delta;
    if (next >= 0 && next < total) {
      const key = String(next + 1).padStart(2, '0');
      router.push(`/slides/${key}`);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (mouseTimer) clearTimeout(mouseTimer);
    
    const timer = setTimeout(() => {
      if (isFullscreen) setShowControls(false);
    }, 3000);
    
    setMouseTimer(timer);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'f' || e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
      }
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener('keydown', onKey);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      document.removeEventListener('mousemove', handleMouseMove);
      if (mouseTimer) clearTimeout(mouseTimer);
    };
  }, [index, total, isFullscreen, mouseTimer]);

 

  const progressPercentage = Math.round(((index + 1) / total) * 100);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col relative overflow-hidden ${isFullscreen ? 'cursor-none' : ''}`}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.25) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Header - Hidden in fullscreen when controls are hidden */}
      <header className={`relative z-10 transition-all duration-500 ${isFullscreen && !showControls ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="px-4 lg:px-16 pt-6 pb-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-6">
                <div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-[0.2em]">
                  Slide {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              
              <Image src={"/logo.jpeg"} alt='logo' height={200} width={200} className='h-10 w-auto object-contain'/>
              <div className="flex items-center space-x-6">
                <span className="text-xs text-slate-400 font-mono tracking-wider">
                  {index + 1} / {total}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleFullscreen}
                  className="h-8 w-8 rounded-lg bg-white/50 backdrop-blur-sm border border-slate-200 hover:bg-white hover:border-slate-300 transition-all duration-200"
                >
                  {isFullscreen ? 
                    <Minimize className="w-4 h-4 text-slate-600" /> : 
                    <Maximize className="w-4 h-4 text-slate-600" />
                  }
                </Button>
              </div>
            </div>
            
            {/* Ultra-minimal progress bar */}
            <div className="relative">
              <div className="h-[4px] bg-slate-200 w-full"></div>
              <div 
                className="absolute top-0 left-0 h-[4px] bg-gradient-to-r from-slate-600 to-slate-900 transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Full viewport utilization */}
      <main className="flex-1 relative z-10 px-4 lg:px-16 pb-8">
        <div className="max-w-7xl mx-auto h-full">
          <div className="h-full flex items-center justify-center">
            <div className="w-full max-w-6xl">
              {/* Optional slide title */}
              {frontMatter.title && (
                <div className="text-center mb-16">
                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-extralight text-slate-900 leading-[0.9] tracking-tight mb-8">
                    {frontMatter.title}
                  </h1>
                  <div className="w-24 h-[1px] bg-slate-400 mx-auto"></div>
                </div>
              )}
              
              {/* MDX Content - Centered and spacious */}
              <div className="prose prose-xl prose-slate max-w-none ">
                <div className="space-y-8">
                  <MDXRemote {...mdxSource} components={components} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Navigation - Hidden in fullscreen when controls are hidden */}
      <footer className={`relative z-10 transition-all duration-500 ${isFullscreen && !showControls ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="px-8 lg:px-16 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center items-center space-x-12">
              {/* Previous button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => go(-1)}
                disabled={index === 0}
                className="group h-14 w-14 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-lg hover:bg-white hover:border-slate-300 hover:shadow-xl disabled:opacity-30 disabled:hover:bg-white/80 disabled:hover:border-slate-200/80 disabled:hover:shadow-lg transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6 text-slate-600 group-hover:text-slate-900 transition-colors duration-200" />
              </Button>
              
              {/* Slide indicators */}
              <div className="flex space-x-3">
                {Array.from({ length: total }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const key = String(i + 1).padStart(2, '0');
                      router.push(`/slides/${key}`);
                    }}
                    className={`transition-all duration-500 rounded-full ${
                      i === index 
                        ? 'w-8 h-2 bg-slate-900' 
                        : i < index 
                          ? 'w-2 h-2 bg-slate-500 hover:bg-slate-600' 
                          : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              
              {/* Next button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => go(1)}
                disabled={index === total - 1}
                className="group h-14 w-14 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-lg hover:bg-white hover:border-slate-300 hover:shadow-xl disabled:opacity-30 disabled:hover:bg-white/80 disabled:hover:border-slate-200/80 disabled:hover:shadow-lg transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6 text-slate-600 group-hover:text-slate-900 transition-colors duration-200" />
              </Button>
            </div>
            
            {/* Keyboard shortcuts hint */}
            {!isFullscreen && (
              <div className="text-center mt-6">
                <p className="text-xs text-slate-400 font-mono tracking-wide">
                  Use arrow keys or space to navigate • Press F to go fullscreen
                </p>
              </div>
            )}
          </div>
        </div>
      </footer>

      {/* Fullscreen overlay instructions */}
      {isFullscreen && showControls && (
        <div className="absolute top-8 right-8 z-20 bg-black/20 backdrop-blur-md rounded-lg px-4 py-2">
          <p className="text-xs text-white/80 font-medium">
            Press ESC to exit fullscreen
          </p>
        </div>
      )}
    </div>
  );
}