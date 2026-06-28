import React, { useState } from "react";
import { Newspaper, NewspaperPage, NewspaperStyle } from "../types";
import { 
  Feather, 
  Layout, 
  Type as FontIcon, 
  Settings, 
  Image as ImageIcon, 
  RefreshCw, 
  Plus, 
  Trash2, 
  Compass, 
  FileText,
  ChevronDown
} from "lucide-react";

interface NewspaperEditorProps {
  newspaper: Newspaper;
  selectedPageId: number;
  onUpdateNewspaper: (updated: Newspaper) => void;
}

const CALLIGRAPHY_PRESETS = [
  { char: "墨", meaning: "Sumi - L'Inchiostro, lo spirito e la concentrazione pura" },
  { char: "道", meaning: "Do - La Via, il cammino della consapevolezza interiore" },
  { char: "和", meaning: "Wa - L'Armonia, la cooperazione della natura e la pace" },
  { char: "風", meaning: "Kaze - Il Vento, il mutamento costante dell'esistenza" },
  { char: "嵐", meaning: "Arashi - La Tempesta, l'energia primordiale degli elementi" },
  { char: "空", meaning: "Sora - Il Cielo, il Vuoto Zen liberatorio dello spirito" },
  { char: "美", meaning: "Bi - La Bellezza esteriore ed interiore fusa in equilibrio" },
  { char: "龍", meaning: "Ryu - Il Drago, l'emblema ancestrale della forza vitale" },
  { char: "静", meaning: "Shizuka - Calma, tranquillità e silenzio contemplativo" },
];

const PHOTO_PRESETS = [
  { label: "Macchina da Stampa", seed: "printingpress", keywords: "vintage printing press, woodcut engraving, old book, warm lighting" },
  { label: "Mappa Celeste", seed: "astronomy", keywords: "vintage astronomy chart, celestial map, antique telescope, compass" },
  { label: "Foresta di Bambù", seed: "zenforest", keywords: "japanese bamboo forest green, misty sun rays, wooden temple pavilion, zen" },
  { label: "Pittura Shodo", seed: "brushshodo", keywords: "japanese calligraphy brush, black ink stone, white rice paper, minimal zen" },
  { label: "Canale di Venezia", seed: "venicecanal", keywords: "venice canal reflection, warm sunset light on gothic buildings, calm water ripples" },
  { label: "Alchimia", seed: "oldbox", keywords: "antique copper box, old alchemy vials, laboratory tools, warm candle light" },
  { label: "Futurismo Astratto", seed: "futurism", keywords: "futurist abstract geometric art, red black and white lines, mechanical design" },
  { label: "Antica Biblioteca", seed: "oldlibrary", keywords: "vintage warm library bookshelf, stacked old leather books, dusty atmosphere" },
];

export default function NewspaperEditor({ newspaper, selectedPageId, onUpdateNewspaper }: NewspaperEditorProps) {
  const [activeTab, setActiveTab] = useState<"page" | "global">("page");
  
  // Find currently active page
  const pageIndex = newspaper.pages.findIndex((p) => p.id === selectedPageId);
  const activePage = pageIndex !== -1 ? newspaper.pages[pageIndex] : null;

  // Handler to update properties of the active page
  const updateActivePage = (updates: Partial<NewspaperPage>) => {
    if (!activePage) return;
    const updatedPages = [...newspaper.pages];
    updatedPages[pageIndex] = { ...activePage, ...updates } as NewspaperPage;
    onUpdateNewspaper({ ...newspaper, pages: updatedPages });
  };

  // Handler to update global newspaper properties
  const updateGlobal = (field: keyof Omit<Newspaper, "pages">, value: any) => {
    onUpdateNewspaper({ ...newspaper, [field]: value });
  };

  // Presets image applicator
  const applyPhotoPreset = (preset: typeof PHOTO_PRESETS[0]) => {
    updateActivePage({
      imageSearchKeyword: preset.keywords,
      imageUrl: `https://picsum.photos/seed/${preset.seed}/600/800`
    });
  };

  // Calligraphy presets applicator
  const applyCalligraphyPreset = (char: string, meaning: string) => {
    if (!activePage) return;
    const currentOriental = activePage.orientalDetails || {
      verticalTitle: activePage.title,
      verticalSub: activePage.subtitle,
      brushCalligraphyChar: "墨",
      brushCalligraphyMeaning: "",
      redSealText: "大和"
    };

    updateActivePage({
      orientalDetails: {
        ...currentOriental,
        brushCalligraphyChar: char,
        brushCalligraphyMeaning: meaning
      }
    });
  };

  return (
    <div className="w-full bg-[#D9D5CD] border-2 border-[#1A1A1A] rounded-xl overflow-hidden shadow-xl text-[#1A1A1A]">
      
      {/* Title Header */}
      <div className="bg-[#1A1A1A] px-4 py-3.5 border-b border-[#1A1A1A] flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Feather className="w-4.5 h-4.5 text-[#EBE7E0]" />
          <h2 className="font-sans font-bold text-xs tracking-wider uppercase text-[#EBE7E0]">
            Studio di Impaginazione
          </h2>
        </div>
        {activePage && (
          <div className="bg-[#EBE7E0]/15 text-[#EBE7E0] px-2 py-0.5 rounded-full text-xxs font-mono font-bold uppercase border border-[#EBE7E0]/20">
            Pagina {activePage.id} Selezionata
          </div>
        )}
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-[#1A1A1A]/30 bg-[#1A1A1A]/5">
        <button
          onClick={() => setActiveTab("page")}
          className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer
            ${activeTab === "page" 
              ? "bg-transparent text-[#1A1A1A] border-b-2 border-[#1A1A1A] font-extrabold" 
              : "text-[#1A1A1A]/60 hover:bg-[#1A1A1A]/5 hover:text-[#1A1A1A]"}`}
        >
          <Layout className="w-4 h-4" />
          <span>Contenuto Pagina</span>
        </button>

        <button
          onClick={() => setActiveTab("global")}
          className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer
            ${activeTab === "global" 
              ? "bg-transparent text-[#1A1A1A] border-b-2 border-[#1A1A1A] font-extrabold" 
              : "text-[#1A1A1A]/60 hover:bg-[#1A1A1A]/5 hover:text-[#1A1A1A]"}`}
        >
          <Settings className="w-4 h-4" />
          <span>Testata Giornale</span>
        </button>
      </div>

      {/* TABS CONTAINER */}
      <div className="p-4 max-h-[460px] overflow-y-auto bg-[#EBE7E0]/40">
        
        {/* TAB 1: EDIT ACTIVE PAGE CONTENT */}
        {activeTab === "page" && activePage && (
          <div className="space-y-4">
            
            {/* Template Selector & Layout Category */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xxs font-mono uppercase tracking-wider text-[#1A1A1A]/70 mb-1">
                  Stile / Layout Pagina
                </label>
                <div className="relative">
                  <select
                    value={activePage.style}
                    onChange={(e) => updateActivePage({ style: e.target.value as NewspaperStyle })}
                    className="w-full bg-white border border-[#1A1A1A]/30 text-[#1A1A1A] rounded-md py-1.5 px-2.5 text-xs focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] appearance-none font-sans"
                  >
                    <option value="classic">📰 Classico Retro (Cinzel)</option>
                    <option value="oriental">🖌️ Orientale Calligrafico</option>
                    <option value="modern">⚡ Moderno Minimalista</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-2.5 pointer-events-none text-[#1A1A1A]/60" />
                </div>
              </div>

              <div>
                <label className="block text-xxs font-mono uppercase tracking-wider text-[#1A1A1A]/70 mb-1">
                  Sezione / Categoria
                </label>
                <input
                  type="text"
                  value={activePage.category}
                  onChange={(e) => updateActivePage({ category: e.target.value.toUpperCase() })}
                  className="w-full bg-white border border-[#1A1A1A]/30 text-[#1A1A1A] rounded-md py-1.5 px-2.5 text-xs focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] font-sans"
                  placeholder="es. CRONACA, CULTURA"
                />
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-3">
              <div>
                <label className="block text-xxs font-mono uppercase tracking-wider text-[#1A1A1A]/70 mb-1">
                  Titolo dell'Articolo
                </label>
                <input
                  type="text"
                  value={activePage.title}
                  onChange={(e) => updateActivePage({ title: e.target.value })}
                  className="w-full bg-white border border-[#1A1A1A]/30 text-[#1A1A1A] rounded-md py-1.5 px-2.5 text-xs focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] font-sans font-bold"
                  placeholder="Inserisci il titolo..."
                />
              </div>

              <div>
                <label className="block text-xxs font-mono uppercase tracking-wider text-[#1A1A1A]/70 mb-1">
                  Sottotitolo / Occhiello
                </label>
                <textarea
                  value={activePage.subtitle}
                  onChange={(e) => updateActivePage({ subtitle: e.target.value })}
                  rows={2}
                  className="w-full bg-white border border-[#1A1A1A]/30 text-[#1A1A1A] rounded-md py-1.5 px-2.5 text-xs focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] font-sans"
                  placeholder="Inserisci il sottotitolo esplicativo..."
                />
              </div>
            </div>

            {/* Author, Location and Date */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xxs font-mono uppercase tracking-wider text-[#1A1A1A]/70 mb-1">
                  Autore
                </label>
                <input
                  type="text"
                  value={activePage.author}
                  onChange={(e) => updateActivePage({ author: e.target.value })}
                  className="w-full bg-white border border-[#1A1A1A]/30 text-[#1A1A1A] rounded-md py-1 px-2 text-xs focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] font-sans"
                />
              </div>

              <div>
                <label className="block text-xxs font-mono uppercase tracking-wider text-[#1A1A1A]/70 mb-1">
                  Luogo
                </label>
                <input
                  type="text"
                  value={activePage.location}
                  onChange={(e) => updateActivePage({ location: e.target.value.toUpperCase() })}
                  className="w-full bg-white border border-[#1A1A1A]/30 text-[#1A1A1A] rounded-md py-1 px-2 text-xs focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] font-sans"
                />
              </div>

              <div>
                <label className="block text-xxs font-mono uppercase tracking-wider text-[#1A1A1A]/70 mb-1">
                  Data Articolo
                </label>
                <input
                  type="text"
                  value={activePage.date}
                  onChange={(e) => updateActivePage({ date: e.target.value })}
                  className="w-full bg-white border border-[#1A1A1A]/30 text-[#1A1A1A] rounded-md py-1 px-2 text-xs focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] font-sans"
                />
              </div>
            </div>

            {/* ORIENTAL CALLIGRAPHY SETTINGS SPECIFICS */}
            {activePage.style === "oriental" && (
              <div className="border border-red-900/30 bg-red-900/5 p-3 rounded-lg space-y-3">
                <div className="flex items-center gap-1">
                  <Compass className="w-4 h-4 text-red-800" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-red-800 font-sans">
                    Dettagli Calligrafici Orientali
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#1A1A1A]/70 mb-1">
                      Titolo Verticale (Caratteri)
                    </label>
                    <input
                      type="text"
                      value={activePage.orientalDetails?.verticalTitle || ""}
                      onChange={(e) => updateActivePage({
                        orientalDetails: {
                          ...(activePage.orientalDetails || { verticalTitle: "", verticalSub: "", brushCalligraphyChar: "墨", brushCalligraphyMeaning: "", redSealText: "大和" }),
                          verticalTitle: e.target.value
                        }
                      })}
                      className="w-full bg-white border border-[#1A1A1A]/30 text-[#1A1A1A] rounded-md py-1 px-2 text-xs font-sans"
                      placeholder="es: 墨の魂と静寂"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#1A1A1A]/70 mb-1">
                      Sigillo Rosso (Hanko)
                    </label>
                    <input
                      type="text"
                      maxLength={3}
                      value={activePage.orientalDetails?.redSealText || ""}
                      onChange={(e) => updateActivePage({
                        orientalDetails: {
                          ...(activePage.orientalDetails || { verticalTitle: "", verticalSub: "", brushCalligraphyChar: "墨", brushCalligraphyMeaning: "", redSealText: "大和" }),
                          redSealText: e.target.value
                        }
                      })}
                      className="w-full bg-white border border-[#1A1A1A]/30 text-[#1A1A1A] rounded-md py-1 px-2 text-xs font-sans font-bold"
                      placeholder="es: 墨龍"
                    />
                  </div>
                </div>

                {/* Calligraphy brush character selector */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#1A1A1A]/70 mb-1">
                    Ideogramma sullo Sfondo (Pennello)
                  </label>
                  <div className="grid grid-cols-5 gap-1.5 mt-1">
                    {CALLIGRAPHY_PRESETS.map((preset) => (
                      <button
                        key={preset.char}
                        type="button"
                        onClick={() => applyCalligraphyPreset(preset.char, preset.meaning)}
                        className={`h-9 rounded border text-sm font-brush font-bold flex items-center justify-center transition-all cursor-pointer
                          ${activePage.orientalDetails?.brushCalligraphyChar === preset.char
                            ? "bg-red-900 text-[#EBE7E0] border-red-900"
                            : "bg-white text-[#1A1A1A] border-[#1A1A1A]/30 hover:bg-[#EBE7E0]/40"}`}
                        title={preset.meaning}
                      >
                        {preset.char}
                      </button>
                    ))}
                  </div>
                  {activePage.orientalDetails?.brushCalligraphyMeaning && (
                    <p className="text-[10px] italic text-red-900/80 mt-1.5 leading-tight">
                      * {activePage.orientalDetails.brushCalligraphyMeaning}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Article Image / Illustration presets */}
            <div className="border border-[#1A1A1A]/20 bg-[#EBE7E0]/30 p-3 rounded-lg space-y-2">
              <div className="flex items-center gap-1.5 text-xxs font-mono uppercase tracking-wider text-[#1A1A1A]/70">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Foto o Illustrazione della Pagina</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-mono text-[#1A1A1A]/60 mb-1">
                    URL Immagine personalizzato
                  </label>
                  <input
                    type="text"
                    value={activePage.imageUrl}
                    onChange={(e) => updateActivePage({ imageUrl: e.target.value })}
                    className="w-full bg-white border border-[#1A1A1A]/30 text-[#1A1A1A] rounded py-1 px-2 text-xxs"
                    placeholder="Incolla link immagine..."
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-[#1A1A1A]/60 mb-1">
                    Parola Chiave Ricerca
                  </label>
                  <input
                    type="text"
                    value={activePage.imageSearchKeyword}
                    onChange={(e) => updateActivePage({ imageSearchKeyword: e.target.value })}
                    className="w-full bg-white border border-[#1A1A1A]/30 text-[#1A1A1A] rounded py-1 px-2 text-xxs"
                  />
                </div>
              </div>

              {/* Presets Grid */}
              <div>
                <label className="block text-[10px] font-mono text-[#1A1A1A]/70 mb-1">
                  Preset di Illustrazioni Vintage/Orientali:
                </label>
                <div className="flex flex-wrap gap-1">
                  {PHOTO_PRESETS.map((preset) => (
                    <button
                      key={preset.seed}
                      type="button"
                      onClick={() => applyPhotoPreset(preset)}
                      className="px-2 py-1 bg-white hover:bg-[#1A1A1A] hover:text-[#EBE7E0] rounded border border-[#1A1A1A]/20 text-xxs font-sans text-[#1A1A1A] transition-all cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Paragraphs Editor */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-xxs font-mono uppercase tracking-wider text-[#1A1A1A]/70">
                  Paragrafi del Testo ({activePage.paragraphs.length})
                </label>
                <button
                  type="button"
                  onClick={() => updateActivePage({ paragraphs: [...activePage.paragraphs, "Nuovo paragrafo dell'articolo."] })}
                  className="flex items-center gap-0.5 text-xxs font-bold text-[#1A1A1A] hover:opacity-85 border-b border-[#1A1A1A] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Aggiungi Paragrafo</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {activePage.paragraphs.map((p, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <span className="text-xxs font-mono text-[#1A1A1A]/60 mt-2.5">
                      {index + 1}
                    </span>
                    <textarea
                      value={p}
                      onChange={(e) => {
                        const nextParagraphs = [...activePage.paragraphs];
                        nextParagraphs[index] = e.target.value;
                        updateActivePage({ paragraphs: nextParagraphs });
                      }}
                      rows={3}
                      className="flex-1 bg-white border border-[#1A1A1A]/30 text-[#1A1A1A] rounded-md py-1.5 px-2.5 text-xs focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] font-sans"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const nextParagraphs = activePage.paragraphs.filter((_, i) => i !== index);
                        updateActivePage({ paragraphs: nextParagraphs });
                      }}
                      className="text-[#1A1A1A]/50 hover:text-red-700 p-1.5 mt-1 transition-colors cursor-pointer"
                      title="Elimina"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Pull Quote */}
            <div>
              <label className="block text-xxs font-mono uppercase tracking-wider text-[#1A1A1A]/70 mb-1">
                Citazione Principale (Pull-Quote)
              </label>
              <textarea
                value={activePage.pullQuote}
                onChange={(e) => updateActivePage({ pullQuote: e.target.value })}
                rows={2}
                className="w-full bg-white border border-[#1A1A1A]/30 text-[#1A1A1A] rounded-md py-1.5 px-2.5 text-xs focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] font-sans italic"
                placeholder="Citazione d'effetto estratta dall'articolo..."
              />
            </div>

          </div>
        )}



        {/* TAB 3: GLOBAL NEWSPAPER SETTINGS (MASTHEAD) */}
        {activeTab === "global" && (
          <div className="space-y-4">
            
            <div className="bg-[#EBE7E0]/30 p-3 rounded-lg border border-[#1A1A1A]/15">
              <h3 className="text-xs font-bold uppercase text-[#1A1A1A] mb-2 font-sans flex items-center gap-1">
                <FontIcon className="w-4 h-4" />
                <span>Impostazioni della Testata</span>
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xxs font-mono uppercase tracking-wider text-[#1A1A1A]/70 mb-1">
                    Nome del Giornale (Masthead)
                  </label>
                  <input
                    type="text"
                    value={newspaper.name}
                    onChange={(e) => updateGlobal("name", e.target.value)}
                    className="w-full bg-white border border-[#1A1A1A]/30 text-[#1A1A1A] rounded-md py-1.5 px-2.5 text-xs font-sans font-black tracking-wide"
                  />
                </div>

                <div>
                  <label className="block text-xxs font-mono uppercase tracking-wider text-[#1A1A1A]/70 mb-1">
                    Motto / Sottotitolo Testata
                  </label>
                  <input
                    type="text"
                    value={newspaper.tagline}
                    onChange={(e) => updateGlobal("tagline", e.target.value)}
                    className="w-full bg-white border border-[#1A1A1A]/30 text-[#1A1A1A] rounded-md py-1.5 px-2.5 text-xs font-sans"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#EBE7E0]/30 p-3 rounded-lg border border-[#1A1A1A]/15">
              <h3 className="text-xs font-bold uppercase text-[#1A1A1A] mb-2 font-sans">
                Dettagli di Edizione
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xxs font-mono uppercase tracking-wider text-[#1A1A1A]/70 mb-1">
                    Data di Stampa Pubblica
                  </label>
                  <input
                    type="text"
                    value={newspaper.date}
                    onChange={(e) => updateGlobal("date", e.target.value)}
                    className="w-full bg-white border border-[#1A1A1A]/30 text-[#1A1A1A] rounded-md py-1.5 px-2.5 text-xs font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xxs font-mono uppercase tracking-wider text-[#1A1A1A]/70 mb-1">
                    Prezzo d'Epoca
                  </label>
                  <input
                    type="text"
                    value={newspaper.price}
                    onChange={(e) => updateGlobal("price", e.target.value)}
                    className="w-full bg-white border border-[#1A1A1A]/30 text-[#1A1A1A] rounded-md py-1.5 px-2.5 text-xs font-sans"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-xxs font-mono uppercase tracking-wider text-[#1A1A1A]/70 mb-1">
                  Numero di Edizione (#)
                </label>
                <input
                  type="number"
                  value={newspaper.editionNo}
                  onChange={(e) => updateGlobal("editionNo", parseInt(e.target.value) || 1)}
                  className="w-full bg-white border border-[#1A1A1A]/30 text-[#1A1A1A] rounded-md py-1.5 px-2.5 text-xs font-sans"
                />
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Editor Footer / Info */}
      <div className="bg-[#1A1A1A] px-4 py-2 border-t border-[#1A1A1A] text-xxs font-mono text-[#EBE7E0]/80 text-center">
        Modifiche salvate localmente per la sessione corrente
      </div>

    </div>
  );
}
