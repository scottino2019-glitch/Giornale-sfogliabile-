import React, { useState, useEffect } from "react";
import { NewspaperPage, Newspaper } from "../types";
import { ChevronLeft, ChevronRight, BookOpen, Layers, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import NewspaperPageRenderer from "./NewspaperPageRenderer";

interface NewspaperBookProps {
  newspaper: Newspaper;
  onSelectPage: (pageId: number) => void;
  selectedPageId: number;
}

export default function NewspaperBook({ newspaper, onSelectPage, selectedPageId }: NewspaperBookProps) {
  const { pages } = newspaper;
  const [currentSpread, setCurrentSpread] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(620);

  // Monitor mobile viewport sizing and scale the desk height dynamically
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const width = entry.contentRect.width;
          if (width < 768) {
            // Mobile single-page aspect ratio
            const targetHeight = Math.min(540, Math.max(420, width * 1.45));
            setContainerHeight(targetHeight);
          } else {
            // Desktop double-page spread aspect ratio (~1.4 width-to-height for pages)
            const innerWidth = width - 48; // Subtract padding
            const innerHeight = innerWidth / 1.4;
            const targetHeight = Math.min(620, Math.max(460, innerHeight + 48));
            setContainerHeight(targetHeight);
          }
        }
      });
      resizeObserver.observe(containerRef.current);
      return () => {
        window.removeEventListener("resize", handleResize);
        resizeObserver.disconnect();
      };
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Derive total spreads in desktop layout:
  // Spread 0: Desk (Left) - Page 1 (Right Cover)
  // Spread 1: Page 2 (Left) - Page 3 (Right)
  // Spread 2: Page 4 (Left) - Page 5 (Right)
  // Spread 3: Page 6 (Left) - Page 7 (Right)
  // Spread 4: Page 8 (Left Back) - Desk (Right)
  const totalSpreads = Math.ceil((pages.length + 2) / 2);

  // Keep selected page in sync with the current visible spread
  useEffect(() => {
    // If user selects a page in the editor, auto-flip the book to that spread!
    const pageObj = pages.find((p) => p.id === selectedPageId);
    if (pageObj) {
      let targetSpread = 0;
      if (pageObj.id === 1) {
        targetSpread = 0;
      } else if (pageObj.id === pages.length) {
        targetSpread = totalSpreads - 1;
      } else {
        targetSpread = Math.floor(pageObj.id / 2);
      }
      
      if (targetSpread !== currentSpread) {
        setDirection(targetSpread > currentSpread ? "next" : "prev");
        setCurrentSpread(targetSpread);
      }
    }
  }, [selectedPageId]);

  // Handle manual spread turns
  const turnNext = () => {
    if (isMobile) {
      if (selectedPageId < pages.length) {
        onSelectPage(selectedPageId + 1);
      }
    } else {
      if (currentSpread < totalSpreads - 1) {
        setDirection("next");
        const nextSpread = currentSpread + 1;
        setCurrentSpread(nextSpread);
        
        // Auto-select the first page of the new spread
        if (nextSpread === totalSpreads - 1) {
          onSelectPage(pages.length); // Back cover
        } else {
          onSelectPage(nextSpread * 2); // Left page of new spread
        }
      }
    }
  };

  const turnPrev = () => {
    if (isMobile) {
      if (selectedPageId > 1) {
        onSelectPage(selectedPageId - 1);
      }
    } else {
      if (currentSpread > 0) {
        setDirection("prev");
        const prevSpread = currentSpread - 1;
        setCurrentSpread(prevSpread);
        
        // Auto-select the first page of the previous spread
        if (prevSpread === 0) {
          onSelectPage(1); // Cover
        } else {
          onSelectPage(prevSpread * 2); // Left page of prev spread
        }
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") turnNext();
      if (e.key === "ArrowLeft") turnPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSpread]);

  // Determine which page IDs are currently shown on screen in Desktop view
  // Left page: spreadIndex * 2 (or null for spread 0)
  // Right page: spreadIndex * 2 + 1 (or null for last spread)
  const leftPageId = currentSpread === 0 ? null : currentSpread * 2;
  const rightPageId = currentSpread === totalSpreads - 1 ? null : currentSpread * 2 + 1;

  const leftPage = leftPageId ? pages.find((p) => p.id === leftPageId) : null;
  const rightPage = rightPageId ? pages.find((p) => p.id === rightPageId) : null;

  // Variants for transition animations (realistic sliding page flip)
  const turnVariants = {
    enter: (dir: "next" | "prev" | null) => ({
      rotateY: dir === "next" ? 30 : -30,
      opacity: 0,
      scale: 0.96,
      x: dir === "next" ? 100 : -100,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1], // easeOutQuart
      }
    },
    exit: (dir: "next" | "prev" | null) => ({
      rotateY: dir === "next" ? -30 : 30,
      opacity: 0,
      scale: 0.96,
      x: dir === "next" ? -100 : 100,
      transition: {
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1],
      }
    }),
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Wooden Desktop Canvas Background */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-5xl rounded-2xl shadow-2xl p-3 md:p-6 flex items-center justify-center overflow-hidden border border-amber-950/20"
        style={{
          height: containerHeight,
          background: "radial-gradient(circle, #3d281a 0%, #1e110a 100%)",
          boxShadow: "inset 0 0 100px rgba(0,0,0,0.8)"
        }}
      >
        {/* Subtle physical desk props: glowing light source or metallic accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-black/[0.3] rounded-full blur-3xl pointer-events-none" />

        {/* Realistic Book shadow on table */}
        <div className="absolute w-[92%] h-[82%] bg-black/60 blur-2xl rounded-lg transform translate-y-4 pointer-events-none z-0" />

        {/* 3D DOUBLE SPREAD DESKTOP DISPLAY */}
        <div className="hidden md:flex w-full h-[96%] max-w-4xl relative z-10 select-none preserve-3d">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSpread}
              custom={direction}
              variants={turnVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full h-full flex"
            >
              
              {/* LEFT PAGE OF SPREAD */}
              <div className="w-1/2 h-full relative" style={{ perspective: "1500px" }}>
                {leftPage ? (
                  <div 
                    onClick={() => onSelectPage(leftPage.id)}
                    className={`w-full h-full cursor-pointer relative overflow-hidden transition-all duration-300 transform-gpu hover:brightness-[101%] border-r-0 rounded-l-md shadow-lg
                      ${selectedPageId === leftPage.id ? "ring-2 ring-amber-500/80 z-20" : "z-10"}`}
                  >
                    <NewspaperPageRenderer 
                      page={leftPage} 
                      paperTitle={newspaper.name} 
                      paperDate={newspaper.date} 
                    />
                    
                    {/* Shadow reflecting folding depth near spine (right edge of left page) */}
                    <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-black/[0.18] to-transparent pointer-events-none z-20" />
                    
                    {/* Spine highlight white edge */}
                    <div className="absolute top-0 right-0 w-1 h-full bg-white/[0.05] pointer-events-none z-20" />

                    {/* Outer page turn drag indicator (bottom-left corner hover peel) */}
                    <div className="absolute bottom-0 left-0 w-8 h-8 group pointer-events-auto z-20">
                      <div className="absolute bottom-0 left-0 w-0 h-0 border-t-[12px] border-l-[12px] border-t-transparent border-l-black/10 group-hover:border-t-[18px] group-hover:border-l-[18px] transition-all duration-300" />
                    </div>
                  </div>
                ) : (
                  /* Empty Left Side (Closed Cover) */
                  <div className="w-full h-full flex flex-col justify-center items-center p-8 bg-amber-950/10 text-amber-50/20 border border-white/[0.02] rounded-l-md">
                    <BookOpen className="w-12 h-12 stroke-[1.5] mb-2" />
                    <span className="text-xs font-mono tracking-widest uppercase">Copertina</span>
                  </div>
                )}
              </div>

              {/* VERTICAL MIDDLE SPINE BINDING */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-1.5 h-full bg-gradient-to-r from-[#21140c] via-black to-[#21140c] shadow-2xl z-30 flex items-center justify-center">
                <div className="w-[1px] h-[95%] bg-white/10 opacity-60" />
              </div>

              {/* RIGHT PAGE OF SPREAD */}
              <div className="w-1/2 h-full relative" style={{ perspective: "1500px" }}>
                {rightPage ? (
                  <div 
                    onClick={() => onSelectPage(rightPage.id)}
                    className={`w-full h-full cursor-pointer relative overflow-hidden transition-all duration-300 transform-gpu hover:brightness-[101%] border-l-0 rounded-r-md shadow-lg
                      ${selectedPageId === rightPage.id ? "ring-2 ring-amber-500/80 z-20" : "z-10"}`}
                  >
                    <NewspaperPageRenderer 
                      page={rightPage} 
                      paperTitle={newspaper.name} 
                      paperDate={newspaper.date} 
                    />
                    
                    {/* Shadow reflecting folding depth near spine (left edge of right page) */}
                    <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-black/[0.18] to-transparent pointer-events-none z-20" />
                    
                    {/* Spine highlight white edge */}
                    <div className="absolute top-0 left-0 w-1 h-full bg-white/[0.05] pointer-events-none z-20" />

                    {/* Outer page turn drag indicator (bottom-right corner hover peel) */}
                    <div className="absolute bottom-0 right-0 w-8 h-8 group pointer-events-auto z-20">
                      <div className="absolute bottom-0 right-0 w-0 h-0 border-t-[12px] border-r-[12px] border-t-transparent border-r-black/10 group-hover:border-t-[18px] group-hover:border-r-[18px] transition-all duration-300" />
                    </div>
                  </div>
                ) : (
                  /* Empty Right Side (Back Cover closed) */
                  <div className="w-full h-full flex flex-col justify-center items-center p-8 bg-amber-950/10 text-amber-50/20 border border-white/[0.02] rounded-r-md">
                    <BookOpen className="w-12 h-12 stroke-[1.5] mb-2" />
                    <span className="text-xs font-mono tracking-widest uppercase">Ultima Pagina</span>
                  </div>
                )}
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* 2D SINGLE-PAGE RESPONSIVE MOBILE DISPLAY */}
        <div className="flex md:hidden w-full h-[98%] relative z-10 select-none">
          {/* Active mobile page is tracked by selectedPageId */}
          {pages.map((p) => {
            if (p.id !== selectedPageId) return null;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full h-full rounded-md shadow-2xl overflow-hidden"
              >
                <NewspaperPageRenderer 
                  page={p} 
                  paperTitle={newspaper.name} 
                  paperDate={newspaper.date} 
                />
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* CONTROLS BAR: BRASS & LEATHER STYLED NAVIGATION */}
      <div className="w-full max-w-xl mt-4 flex flex-col items-center gap-3">
        
        {/* Previous / Spread / Next Selector */}
        <div className="flex items-center justify-between w-full bg-stone-900/95 border border-stone-800 text-stone-100 rounded-lg px-4 py-2.5 shadow-md">
          {/* Prev Button */}
          <button
            onClick={turnPrev}
            disabled={isMobile ? selectedPageId === 1 : currentSpread === 0}
            className="flex items-center justify-center w-9 h-9 rounded-md bg-stone-800 border border-stone-700 hover:bg-amber-800/80 hover:border-amber-700/80 text-stone-300 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200"
            title="Sfoglia Indietro (Tasto Sinistra)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Spread Timeline Indicator */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-amber-500 font-bold">
              <Layers className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>SFOGLIA GIORNALE</span>
            </div>
            
            {/* Display spread indexes or active pages */}
            <div className="text-xxs font-mono text-stone-400 mt-0.5">
              {isMobile ? (
                <span className="text-amber-200">Pagina {selectedPageId} di {pages.length}</span>
              ) : currentSpread === 0 ? (
                <span className="text-amber-200">Copertina (Pagina 1)</span>
              ) : currentSpread === totalSpreads - 1 ? (
                <span className="text-amber-200">Retro (Pagina {pages.length})</span>
              ) : (
                <span>Pagine {currentSpread * 2} - {currentSpread * 2 + 1} di {pages.length}</span>
              )}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={turnNext}
            disabled={isMobile ? selectedPageId === pages.length : currentSpread === totalSpreads - 1}
            className="flex items-center justify-center w-9 h-9 rounded-md bg-stone-800 border border-stone-700 hover:bg-amber-800/80 hover:border-amber-700/80 text-stone-300 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200"
            title="Sfoglia Avanti (Tasto Destra)"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Page Picker Dots (Responsive Shortcut) */}
        <div className="flex items-center justify-center gap-2 mt-1 py-1">
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                onSelectPage(p.id);
                // Also trigger internal spread navigation for desktop sync
                let targetSpread = 0;
                if (p.id === 1) targetSpread = 0;
                else if (p.id === pages.length) targetSpread = totalSpreads - 1;
                else targetSpread = Math.floor(p.id / 2);
                setCurrentSpread(targetSpread);
              }}
              className={`h-2 rounded-full transition-all duration-300 
                ${selectedPageId === p.id 
                  ? "w-6 bg-amber-500" 
                  : "w-2 bg-stone-400 hover:bg-stone-600"}`}
              title={`Vai a Pagina ${p.id}`}
            >
              <span className="sr-only">Pagina {p.id}</span>
            </button>
          ))}
        </div>

        <div className="text-xxs text-stone-500 font-mono text-center flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>SUGGERIMENTO: Clicca su qualsiasi pagina per modificarla o usa le frecce della tastiera!</span>
        </div>
      </div>

    </div>
  );
}
