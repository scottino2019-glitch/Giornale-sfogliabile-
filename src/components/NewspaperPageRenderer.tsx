import React from "react";
import { NewspaperPage } from "../types";
import { Quote, Feather, Bookmark, Compass, Landmark } from "lucide-react";

interface PageRendererProps {
  page: NewspaperPage;
  paperTitle?: string;
  paperDate?: string;
  isEditing?: boolean;
}

export default function NewspaperPageRenderer({ page, paperTitle = "L'ECO DEL TEMPO", paperDate = "Domenica, 28 Giugno 1926", isEditing = false }: PageRendererProps) {
  const {
    type,
    style,
    category,
    title,
    subtitle,
    author,
    location,
    date,
    paragraphs,
    pullQuote,
    imageUrl,
    orientalDetails
  } = page;

  // Render Cover Page
  if (type === "cover") {
    const isOriental = style === "oriental";
    const isModern = style === "modern";

    return (
      <div className={`relative w-full h-full p-3 md:p-4 flex flex-col justify-between border shadow-inner transition-colors duration-500 overflow-y-auto md:overflow-hidden select-none
        ${isOriental 
          ? "bg-[#faf6ee] text-[#1c1813] border-[#decba4]" 
          : isModern 
          ? "bg-white text-stone-900 border-stone-200" 
          : "bg-[#EBE7E0] text-[#1A1A1A] border-[#1A1A1A]"}`}
        id={`page-render-${page.id}`}
      >
        {/* Subtle background calligraphy watermark for cover in Oriental Style */}
        {isOriental && orientalDetails?.brushCalligraphyChar && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06] select-none z-0">
            <span className="font-brush text-[24rem] md:text-[32rem] text-stone-900 leading-none">
              {orientalDetails.brushCalligraphyChar}
            </span>
          </div>
        )}

        {/* Vintage Paper Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/[0.03] via-transparent to-white/[0.05] pointer-events-none z-10" />

        {/* Subtle Paper Texture Matrix Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply bg-[radial-gradient(#1A1A1A_0.5px,transparent_0.5px)] [background-size:4px_4px] z-20" />

        {/* Top Header Rail */}
        <div className="border-b-4 border-double border-current pb-1 z-10">
          <div className="flex justify-between items-center text-xxs font-mono uppercase tracking-wider">
            <span>{category || "EDIZIONE STRAORDINARIA"}</span>
            <span className="hidden sm:inline">★ ★ ★ ★ ★</span>
            <span>{paperDate}</span>
          </div>
        </div>

        {/* Newspaper Masthead */}
        <div className="text-center py-1 md:py-2.5 border-b-2 border-current z-10 flex flex-col items-center">
          <h1 className={`uppercase leading-none tracking-tight select-all
            ${isOriental 
              ? "font-brush text-2xl sm:text-3xl md:text-5xl mb-1" 
              : isModern 
              ? "font-sans font-black text-2xl sm:text-4xl md:text-6xl tracking-tighter" 
              : "font-cinzel-dec text-2xl sm:text-3xl md:text-5xl mb-0.5"}`}
          >
            {paperTitle}
          </h1>
          
          <p className="text-[9px] uppercase tracking-[0.25em] font-serif text-current/80 max-w-md text-center px-4 mt-0.5">
            “Veritas, Libertas et Historia”
          </p>
        </div>

        {/* Meta Bar */}
        <div className="flex justify-between items-center text-xxs border-b border-current/30 py-0.5 font-mono uppercase z-10">
          <span>{date || "Anno I - N. 1"}</span>
          <span>Regno d'Italia</span>
          <span>Prezzo: Cent. 15</span>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 my-1 md:my-auto items-stretch z-10 py-1 overflow-visible flex-initial md:flex-1 md:min-h-0">
          
          {/* Left Column: Cover Image */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <div className={`p-1 border border-current/30 bg-white/40 shadow-xs
              ${isOriental ? "rounded-xs" : ""}`}>
              <img
                src={imageUrl || "https://picsum.photos/seed/vintagecover/600/800"}
                alt={title}
                className="w-full h-[120px] md:h-[135px] object-cover filter grayscale sepia-[20%] contrast-[110%] brightness-[95%]"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-[9px] italic mt-0.5 text-center text-current/70 font-serif">
              {page.imageSearchKeyword ? `Illustrazione: ${page.imageSearchKeyword}` : "Frontespizio editoriale fittizio"}
            </p>
          </div>

          {/* Right Column: Editorial Intro */}
          <div className="md:col-span-5 flex flex-col justify-between overflow-visible min-h-0">
            <div className="flex flex-col h-full min-h-0">
              <span className="text-[9px] font-mono uppercase text-red-700 font-bold block mb-0.5">
                L'Editoriale
              </span>
              <h2 className={`font-semibold leading-tight text-sm md:text-base mb-1 tracking-tight select-all
                ${isOriental ? "font-oriental-serif" : isModern ? "font-sans font-extrabold" : "font-cinzel"}`}
              >
                {title}
              </h2>
              <p className="text-[9px] font-serif italic text-current/80 mb-0.5 leading-relaxed">
                {subtitle}
              </p>
              <div className="text-[9.5px] font-serif text-current/90 leading-normal text-justify flex-1 min-h-0 md:max-h-[175px] overflow-visible md:overflow-y-auto pr-1 page-scroll space-y-1.5">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            {/* Red stamp on Cover if Oriental style */}
            {isOriental && orientalDetails?.redSealText && (
              <div className="self-end mt-2">
                <div className="border-[2px] border-red-600/80 p-1.5 text-red-600/80 font-bold font-oriental-serif text-xs rounded-xs rotate-[-6deg] inline-block leading-none select-none tracking-widest bg-[#faf6ee]/50 shadow-xs">
                  {orientalDetails.redSealText}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Area with Pullquote */}
        <div className="border-t-2 border-current pt-2 z-10 flex flex-col items-center">
          <p className="font-serif italic text-xxs md:text-xs text-center max-w-xl text-current/90 leading-relaxed px-4">
            {pullQuote}
          </p>
          <div className="w-12 h-0.5 bg-current/20 mt-1" />
        </div>
      </div>
    );
  }

  // Render Back Cover Page
  if (type === "back") {
    const isOriental = style === "oriental";
    const isModern = style === "modern";

    return (
      <div className={`relative w-full h-full p-3 md:p-4 flex flex-col justify-between paper-grain border shadow-inner transition-colors duration-500 overflow-y-auto md:overflow-hidden select-none
        ${isOriental 
          ? "bg-[#faf6ee] text-[#1c1813] border-[#decba4]" 
          : isModern 
          ? "bg-white text-stone-900 border-stone-200" 
          : "bg-[#f5ebd2] text-[#2c2214] border-[#d2bc8f]"}`}
        id={`page-render-${page.id}`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-black/[0.04] via-transparent to-white/[0.03] pointer-events-none" />

        {/* Top Header Rail */}
        <div className="border-b border-current/30 pb-1.5 flex justify-between items-center text-xxs font-mono uppercase tracking-wider">
          <span>{category || "COLOPHON"}</span>
          <span>{paperDate}</span>
        </div>

        {/* Main Back Cover Column */}
        <div className="my-3 md:my-auto flex flex-col items-center text-center max-w-lg mx-auto py-2 md:py-3 overflow-visible flex-initial md:flex-1 md:min-h-0">
          <Landmark className="w-6 h-6 opacity-40 mb-1.5" />
          
          <h2 className={`text-xl md:text-2xl font-bold mb-1 tracking-tight uppercase
            ${isOriental ? "font-brush" : isModern ? "font-sans font-extrabold" : "font-cinzel"}`}
          >
            {title}
          </h2>
          <p className="text-[10px] md:text-xs font-serif italic text-current/80 mb-3">
            {subtitle}
          </p>

          <div className="w-full p-1 border border-current/20 my-2 bg-white/20">
            <img
              src={imageUrl || "https://picsum.photos/seed/vintageback/600/800"}
              alt={title}
              className="w-full h-[120px] md:h-[150px] object-cover filter grayscale sepia-[15%]"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-2 text-xxs md:text-xs font-serif text-current/80 text-justify leading-relaxed my-2">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="border border-current/20 p-2.5 mt-2 w-full bg-current/[0.02]">
            <p className="text-xxs font-mono uppercase tracking-wider text-current/70 mb-0.5">
              PROPRIETÀ EDITORIALE
            </p>
            <p className="text-xxs md:text-xs font-serif">
              {author} — {location} — {date}
            </p>
          </div>
        </div>

        {/* Bottom Colophon Footer */}
        <div className="border-t-4 border-double border-current pt-2 text-center text-xxs font-mono uppercase tracking-widest text-current/60">
          <span>Tutti i diritti riservati • Stampato su carta riciclabile</span>
        </div>
      </div>
    );
  }

  // Render STANDARD ARTICLE PAGES (Classic, Oriental, Modern styles)
  const isClassic = style === "classic";
  const isOriental = style === "oriental";
  const isModern = style === "modern";

  // Helper for drop cap
  const firstParagraph = paragraphs[0] || "";
  const firstLetter = firstParagraph.charAt(0);
  const restOfFirstParagraph = firstParagraph.slice(1);

  return (
    <div className={`relative w-full h-full p-3 md:p-4 flex flex-col justify-between border shadow-inner transition-all duration-500 overflow-y-auto md:overflow-hidden select-none
      ${isOriental 
        ? "bg-[#fcf8f0] text-[#1e1913] border-[#dfcca5]" 
        : isModern 
        ? "bg-stone-50 text-stone-900 border-stone-200" 
        : "bg-[#EBE7E0] text-[#1A1A1A] border-[#1A1A1A]"}`}
      id={`page-render-${page.id}`}
    >
      {/* Subtle Paper Texture Matrix Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply bg-[radial-gradient(#1A1A1A_0.5px,transparent_0.5px)] [background-size:4px_4px] z-20" />

      {/* Background calligraphic Kanji watermark for Oriental template */}
      {isOriental && orientalDetails?.brushCalligraphyChar && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06] select-none z-0">
          <span className="font-brush text-[24rem] md:text-[34rem] text-stone-900 leading-none">
            {orientalDetails.brushCalligraphyChar}
          </span>
        </div>
      )}

      {/* Vintage Paper Shading Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] via-transparent to-black/[0.03] pointer-events-none z-10" />

      {/* Page Header (Newspaper headers have tiny text dividing sections) */}
      <div className="border-b border-current/30 pb-1.5 z-10 flex justify-between items-center text-xxs md:text-xs font-mono uppercase tracking-wider text-current/70">
        <span>Sezione: {category || "CULTURA"}</span>
        <span className="hidden sm:inline-block">— Pagina {page.id} —</span>
        <span>{paperDate}</span>
      </div>

      {/* ORIENTAL CALLIGRAPHY STYLE RENDERING */}
      {isOriental ? (
        <div className="flex-initial md:flex-1 md:min-h-0 my-2 flex flex-col justify-between overflow-visible z-10">
          {/* Top Title Area: Horizontal Title for supreme readability in Italian */}
          <div className="border-b-2 border-stone-800 pb-1.5 text-center">
            <h2 className="font-oriental-serif text-lg md:text-xl font-black text-stone-900 leading-tight tracking-tight select-all">
              {title}
            </h2>
            <p className="font-serif italic text-xxs text-stone-600 mt-0.5 select-all">
              {subtitle}
            </p>
          </div>

          {/* Sub-header with authorship */}
          <div className="flex justify-between items-center text-xxs font-mono uppercase tracking-wider py-1 border-b border-stone-200 text-stone-500 mb-1.5">
            <span>Da: {location || "KYOTO"}</span>
            <span>Scritto da: {author || "Anonimo"}</span>
            <span>{date || paperDate}</span>
          </div>

          {/* Middle Layout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1 min-h-0 overflow-visible items-stretch mb-1.5">
            
            {/* Left Col: Elegant horizontal text in standard paragraph columns */}
            <div className="md:col-span-8 flex flex-col justify-between min-h-0 overflow-visible">
              <div className="flex-1 min-h-0 overflow-visible md:overflow-y-auto pr-1.5 page-scroll">
                <div className="font-serif text-xs md:text-sm text-justify leading-relaxed text-stone-800 select-all space-y-3">
                  {paragraphs.map((p, i) => (
                    <p key={i} className="text-stone-800 indent-4">
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              {/* Red Stamp Seal and Calligraphy Watermark Description */}
              <div className="border-t border-stone-300/60 pt-1.5 flex justify-between items-center mt-1.5 bg-[#fcf8f0]/80 backdrop-blur-xs">
                {orientalDetails?.brushCalligraphyChar && (
                  <p className="text-[10px] italic font-serif text-stone-500 max-w-[70%]">
                    * Sfondo: <strong className="font-brush text-sm not-italic ml-0.5 text-stone-700">{orientalDetails.brushCalligraphyChar}</strong> ({orientalDetails.brushCalligraphyMeaning || "Significato spirituale"})
                  </p>
                )}
                {orientalDetails?.redSealText && (
                  <div className="border-2 border-red-600/80 px-2 py-0.5 text-red-600/80 font-bold font-oriental-serif text-[10px] rounded-xs rotate-[-3deg] inline-block leading-none select-none tracking-widest bg-amber-50/20 shadow-xs">
                    {orientalDetails.redSealText}
                  </div>
                )}
              </div>
            </div>

            {/* Right Col: Frame + Japanese Vertical strip */}
            <div className="md:col-span-4 flex flex-col justify-between items-stretch">
              
              {/* Illustration Frame */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="border border-stone-300 p-1 bg-[#faf6ee] shadow-xs">
                  <img
                    src={imageUrl || "https://picsum.photos/seed/oriental/600/800"}
                    alt={title}
                    className="w-full h-[95px] md:h-[115px] object-cover filter sepia-[20%] contrast-[105%]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-[9px] font-serif text-current/60 italic mt-0.5 text-center">
                  {page.imageSearchKeyword ? `Sogno: ${page.imageSearchKeyword}` : "Xilografia d'epoca"}
                </p>
              </div>

              {/* Decorative Japanese vertical strip (only visible if verticalTitle exists) */}
              {orientalDetails?.verticalTitle && (
                <div className="mt-2 flex items-center justify-between bg-stone-900 text-[#fcf8f0] py-1 px-2 shadow-xs border border-stone-950 rounded-xs">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-stone-400">Titolo:</span>
                  <span className="font-brush text-xxs tracking-wider select-none leading-none">
                    {orientalDetails.verticalTitle}
                  </span>
                </div>
              )}

            </div>

          </div>

        </div>
      ) : isClassic ? (
        
        /* CLASSIC RETRO STYLE RENDERING */
        <div className="flex-initial md:flex-1 md:min-h-0 my-2 flex flex-col justify-between overflow-visible z-10">
          <div className="text-center pb-2 border-b border-current/20">
            <h2 className="font-cinzel text-lg md:text-xl font-bold tracking-tight uppercase leading-none mb-1 select-all">
              {title}
            </h2>
            <p className="font-serif italic text-xxs text-current/80 max-w-2xl mx-auto select-all">
              {subtitle}
            </p>
          </div>

          {/* Location & Author Rail */}
          <div className="flex justify-between items-center text-xxs font-mono uppercase tracking-wider py-1 border-b border-current/10 text-current/60">
            <span>Da: {location || "ROMA"}</span>
            <span>Autore: {author || "Firma Speciale"}</span>
            <span>{date}</span>
          </div>

          {/* Content Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch flex-1 min-h-0 my-2 overflow-visible">
            
            {/* Left Column: Traditional newspaper text flow */}
            <div className="md:col-span-8 flex flex-col justify-between min-h-0 overflow-visible">
              <div className="flex-1 min-h-0 overflow-visible md:overflow-y-auto pr-1.5 page-scroll">
                <div className="font-serif text-xs md:text-sm text-justify leading-relaxed space-y-3 select-all">
                  {/* Dropcap for first paragraph */}
                  {paragraphs.length > 0 && (
                    <p className="mb-2 text-stone-800">
                      <span className="float-left text-4xl font-bold leading-[0.8] mr-1.5 mt-0.5 text-stone-900" style={{ fontFamily: 'Georgia, serif' }}>
                        {firstLetter}
                      </span>
                      {restOfFirstParagraph}
                    </p>
                  )}
                  {paragraphs.slice(1).map((p, i) => (
                    <p key={i} className="mb-2 text-stone-800">
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              {/* Sub-quote break */}
              <div className="border-t border-b border-current/20 py-1.5 my-1.5">
                <p className="font-serif italic text-xxs md:text-xs text-center text-current/90 select-all">
                  {pullQuote}
                </p>
              </div>
            </div>

            {/* Right Column: Framed Vintage Photo */}
            <div className="md:col-span-4 flex flex-col justify-between">
              <div className="border border-[#1A1A1A] p-1 bg-[#D9D5CD] shadow-xs">
                <img
                  src={imageUrl || "https://picsum.photos/seed/retro/600/800"}
                  alt={title}
                  className="w-full h-[95px] md:h-[135px] object-cover filter grayscale sepia-[35%] contrast-[115%]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-[9px] font-serif text-current/60 italic text-center mt-0.5 leading-tight">
                {page.imageSearchKeyword ? `Incisione: ${page.imageSearchKeyword}` : "Servizio fotografico"}
              </p>

              {/* Distressed editorial element */}
              <div className="border border-current/20 p-1.5 text-center text-[9px] font-mono uppercase bg-current/[0.02] mt-1.5 hidden md:block">
                <span>Rapporto d'Archivio</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        
        /* MODERN MINIMALIST STYLE RENDERING */
        <div className="flex-initial md:flex-1 md:min-h-0 my-2 flex flex-col justify-between overflow-visible z-10">
          <div className="pb-2 border-b-2 border-stone-900">
            <span className="text-[10px] font-mono font-bold text-red-600 tracking-widest uppercase block mb-0.5">
              {category || "FUTURISTA"}
            </span>
            <h2 className="font-sans font-black text-xl md:text-2xl tracking-tighter uppercase leading-none mb-1 select-all">
              {title}
            </h2>
            <p className="font-sans text-stone-600 text-xxs md:text-xs leading-relaxed max-w-xl select-all">
              {subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1 min-h-0 my-2 overflow-visible items-stretch">
            {/* Left Column: Large photo */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <div className="overflow-hidden bg-stone-100 border border-stone-200">
                <img
                  src={imageUrl || "https://picsum.photos/seed/modern/600/800"}
                  alt={title}
                  className="w-full h-[95px] md:h-[120px] object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-[8px] font-mono text-stone-500 uppercase mt-0.5">
                CAMERA // {page.imageSearchKeyword || "VIEW"}
              </p>

              {/* Bento styled box for modern pull quote */}
              <div className="bg-stone-900 text-white p-2.5 mt-1.5 border-l-4 border-red-500 flex flex-col justify-between">
                <Quote className="w-3.5 h-3.5 text-red-500 mb-0.5" />
                <p className="font-sans text-[10px] italic font-medium leading-relaxed select-all">
                  {pullQuote}
                </p>
              </div>
            </div>

            {/* Right Column: Sharp dense texts */}
            <div className="md:col-span-7 flex flex-col justify-between min-h-0 overflow-visible">
              <div className="flex-1 min-h-0 overflow-visible md:overflow-y-auto pr-1.5 page-scroll">
                <div className="text-[9px] font-mono text-stone-500 uppercase mb-1.5">
                  Inviato da: {location || "MILANO"} // Scritto da: {author || "FUTURISTA II"}
                </div>
                
                <div className="font-sans text-xs md:text-sm text-stone-800 text-justify leading-relaxed space-y-3 select-all">
                  {paragraphs.map((p, i) => (
                    <p key={i} className={i === 0 ? "font-semibold text-stone-900 border-b border-stone-100 pb-1.5" : ""}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Page Footer */}
      <div className="border-t border-current/30 pt-1.5 z-10 flex justify-between items-center text-xxs font-mono uppercase tracking-widest text-current/60">
        <span>© L\'Eco del Tempo</span>
        <span>★ Stampa Imperiale ★</span>
        <span>Fine Sezione</span>
      </div>
    </div>
  );
}
