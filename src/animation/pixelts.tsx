import React, { useEffect, useRef } from 'react';

interface PixelTrailProps {
  gridSize?: number;
  trailSize?: number;
  maxAge?: number;
  color?: string;
  gooeyFilter?: {
    id: string;
    strength: number;
  };
}

const PixelTrail: React.FC<PixelTrailProps> = ({
  gridSize = 20,
  trailSize = 0.2,
  maxAge = 200,
  color = '#3B82F6',
  gooeyFilter
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    let mouseX = 0;
    let mouseY = 0;
    let isInside = false;
    
    // Create pixel grid
    const pixels: HTMLDivElement[] = [];
    const pixelStates: {age: number, active: boolean}[] = [];
    
    // Create pixels
    for (let i = 0; i < gridSize; i++) {
      const pixel = document.createElement('div');
      pixel.style.position = 'absolute';
      pixel.style.width = `${trailSize * 20}px`;
      pixel.style.height = `${trailSize * 20}px`;
      pixel.style.borderRadius = '50%';
      pixel.style.backgroundColor = color;
      pixel.style.opacity = '0';
      pixel.style.pointerEvents = 'none';
      pixel.style.transition = 'opacity 0.3s ease';
      container.appendChild(pixel);
      
      pixels.push(pixel);
      pixelStates.push({ age: 0, active: false });
    }
    
    // Add gooey filter if requested
    if (gooeyFilter) {
      const filterId = gooeyFilter.id;
      const filterStrength = gooeyFilter.strength;
      
      // Check if filter already exists
      if (!document.getElementById(filterId)) {
        const svgFilter = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgFilter.setAttribute('style', 'position: absolute; width: 0; height: 0');
        svgFilter.innerHTML = `
          <defs>
            <filter id="${filterId}">
              <feGaussianBlur in="SourceGraphic" stdDeviation="${filterStrength}" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="gooey" />
            </filter>
          </defs>
        `;
        document.body.appendChild(svgFilter);
        container.style.filter = `url(#${filterId})`;
      } else {
        container.style.filter = `url(#${filterId})`;
      }
    }
    
    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const containerRect = container.getBoundingClientRect();
      mouseX = e.clientX - containerRect.left;
      mouseY = e.clientY - containerRect.top;
    };
    
    const handleMouseEnter = () => {
      isInside = true;
    };
    
    const handleMouseLeave = () => {
      isInside = false;
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    // Animation loop
    let currentPixel = 0;
    
    const animate = () => {
      // Add new pixel at mouse position if mouse is inside
      if (isInside) {
        const pixel = pixels[currentPixel];
        const state = pixelStates[currentPixel];
        
        pixel.style.left = `${mouseX - (parseFloat(pixel.style.width) / 2)}px`;
        pixel.style.top = `${mouseY - (parseFloat(pixel.style.height) / 2)}px`;
        pixel.style.opacity = '0.8';
        
        state.age = 0;
        state.active = true;
        
        currentPixel = (currentPixel + 1) % gridSize;
      }
      
      // Update all pixels
      for (let i = 0; i < gridSize; i++) {
        const state = pixelStates[i];
        if (state.active) {
          state.age++;
          
          if (state.age > maxAge) {
            pixels[i].style.opacity = '0';
            state.active = false;
          } else {
            pixels[i].style.opacity = `${0.8 * (1 - state.age / maxAge)}`;
          }
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    let animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      
      // Clean up pixels
      pixels.forEach(pixel => {
        if (pixel.parentNode === container) {
          container.removeChild(pixel);
        }
      });
    };
  }, [gridSize, trailSize, maxAge, color, gooeyFilter]);
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-10 pointer-events-auto"
    />
  );
};

export default PixelTrail;