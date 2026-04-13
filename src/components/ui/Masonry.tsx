"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => values[queries.findIndex(q => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(q).matches;
  })] ?? defaultValue;

  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => window.matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => window.matchMedia(q).removeEventListener('change', handler));
  }, [queries]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

interface MasonryItem {
  id: string;
  img: string;
  name: string;
  tagline: string;
  description: string;
  height: number;
}

interface GridItem extends MasonryItem {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  isTriggered?: boolean;
  onItemClick?: (id: string) => void;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.8,
  stagger = 0.05,
  animateFrom = 'bottom',
  isTriggered = false,
  onItemClick
}) => {
  const columns = useMedia(
    ['(min-width:1200px)', '(min-width:900px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const isSmallMobile = useMedia(['(max-width:480px)'], [1], 0);

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const gap = isSmallMobile ? 12 : 24;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;
    
    // Calculate centering offset if items are fewer than columns
    const usedColumns = Math.min(items.length, columns);
    const contentWidth = usedColumns * columnWidth + (usedColumns - 1) * gap;
    const centeringOffset = (width - contentWidth) / 2;

    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = (col * (columnWidth + gap)) + centeringOffset;
      // Scale height for mobile to avoid massive cards
      const baseHeight = (child.height || 400); 
      const height = isSmallMobile ? baseHeight * 0.55 : baseHeight;
      const y = colHeights[col];

      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width, isSmallMobile]);

  const containerHeight = useMemo(() => {
    if (grid.length === 0) return 0;
    const totalHeight = Math.max(...grid.map(i => i.y + i.h));
    return isSmallMobile ? totalHeight + 100 : totalHeight;
  }, [grid, isSmallMobile]);

  useLayoutEffect(() => {
    if (!imagesReady || !isTriggered || hasRevealed || grid.length === 0) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      
      gsap.fromTo(
        selector,
        {
          opacity: 0,
          y: item.y + 100,
          scale: 0.9,
          filter: 'blur(10px)'
        },
        {
          opacity: 1,
          x: item.x,
          y: item.y,
          width: item.w,
          height: item.h,
          scale: 1,
          filter: 'blur(0px)',
          duration: duration,
          ease: ease,
          delay: index * stagger,
          overwrite: 'auto'
        }
      );
    });

    setHasRevealed(true);
  }, [grid, imagesReady, isTriggered, stagger, duration, ease, hasRevealed]);

  useLayoutEffect(() => {
    if (!hasRevealed) return;

    grid.forEach((item) => {
      const selector = `[data-key="${item.id}"]`;
      gsap.to(selector, {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
  }, [grid, hasRevealed]);

  const handleMouseEnter = (element: HTMLElement) => {
    gsap.to(element, { scale: 0.98, duration: 0.3 });
  };

  const handleMouseLeave = (element: HTMLElement) => {
    gsap.to(element, { scale: 1, duration: 0.3 });
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full mb-20"
      style={{ height: containerHeight }}
    >
      {grid.map(item => (
        <div
          key={item.id}
          data-key={item.id}
          className="absolute box-border cursor-pointer overflow-hidden group rounded-lg"
          style={{ 
            willChange: 'transform, width, height, opacity',
            width: item.w, 
            height: item.h,
            left: 0,
            top: 0,
            transform: `translate(${item.x}px, ${item.y}px)`
          }}
          onMouseEnter={e => handleMouseEnter(e.currentTarget)}
          onMouseLeave={e => handleMouseLeave(e.currentTarget)}
          onClick={() => onItemClick?.(item.id)}
        >
          {/* Card Wrapper */}
          <div className="relative w-full h-full bg-noir border border-noir/10 group-hover:border-transparent overflow-hidden transition-colors duration-500">
            {/* Image */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img 
                src={item.img} 
                alt={item.name} 
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            </div>

            {/* Static Title */}
            <div className="absolute bottom-6 left-6 right-6 z-10 transition-transform duration-500 group-hover:translate-y-[-4px]">
              <span className="text-primary font-heading text-[9px] tracking-[0.4em] uppercase block mb-1 opacity-70 group-hover:opacity-100 transition-opacity">
                {item.tagline}
              </span>
              <h3 className="card-title text-white font-heading text-xl md:text-3xl uppercase tracking-tighter leading-none pointer-events-none">
                {item.name}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Masonry;
