import React, { useState, useEffect } from "react";
import { Newspaper, NewspaperPage } from "./types";
import { defaultNewspaper } from "./defaultNewspaper";
import NewspaperBook from "./components/NewspaperBook";
import NewspaperEditor from "./components/NewspaperEditor";
import NewspaperPageRenderer from "./components/NewspaperPageRenderer";
import { exportInteractiveNewspaper, getInteractiveNewspaperHTML } from "./utils/exporter";
import { 
  BookOpen, 
  Feather, 
  RotateCcw, 
  Printer, 
  BookMarked,
  Layers,
  FileText,
  Download,
  Code,
  Copy,
  Check,
  ExternalLink,
  Sparkles
} from "lucide-react";

const LOCAL_STORAGE_KEY = "realistic-newspaper-designer-data";

export default function App() {
  const [newspaper, setNewspaper] = useState<Newspaper>(() => JSON.parse(JSON.stringify(defaultNewspaper)));
  const [selectedPageId, setSelectedPageId] = useState<number>(1); // default to page 1 (cover)
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [copiedIframe, setCopiedIframe] = useState(false);
  const [copiedHTML, setCopiedHTML] = useState(false);
  const [viewMode, setViewMode] = useState<"book" | "focus">("focus");

  const handleCopyIframe = () => {
    const iframeCode = `<iframe \n  src="PERCORSO_DEL_TUO_GIORNALE/giornale-sfogliabile.html" \n  style="width: 100%; height: 720px; border: none; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);"\n  title="${newspaper.name} - Giornale Sfogliabile"\n  allowfullscreen\n></iframe>`;
    navigator.clipboard.writeText(iframeCode);
    setCopiedIframe(true);
    setTimeout(() => setCopiedIframe(false), 2000);
  };

  const handleCopyHTML = () => {
    const htmlContent = getInteractiveNewspaperHTML(newspaper);
    navigator.clipboard.writeText(htmlContent);
    setCopiedHTML(true);
    setTimeout(() => setCopiedHTML(false), 2000);
  };

  // Load custom newspaper from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.pages && parsed.pages.length > 0) {
          setNewspaper(parsed);
        }
      } catch (e) {
        console.error("Errore nel caricamento del salvataggio locale", e);
      }
    }
  }, []);

  // Save changes to localStorage
  const handleUpdateNewspaper = (updated: Newspaper) => {
    setNewspaper(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  // Reset to default newspaper template
  const handleResetToDefault = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    const freshNewspaper = JSON.parse(JSON.stringify(defaultNewspaper));
    setNewspaper(freshNewspaper);
    setSelectedPageId(1);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(freshNewspaper));
    setShowResetConfirm(false);
  };

  // Trigger high-fidelity print of all newspaper pages
  const handlePrint = () => {
    window.print();
  };

  // Quick navigation to pages
  const activePage = newspaper.pages.find((p) => p.id === selectedPageId) || newspaper.pages[0];

  return (
    <div className="min-h-screen bg-[#EBE7E0] text-[#1A1A1A] flex flex-col font-serif select-none relative overflow-hidden">
      
      {/* Decorative Calligraphic Background Element */}
      <div className="absolute top-[-20px] right-[-20px] md:top-[-50px] md:right-[-50px] opacity-[0.04] pointer-events-none select-none z-0">
        <svg width="400" height="400" viewBox="0 0 200 200" className="text-[#1A1A1A] fill-current">
          <text x="10" y="160" fontFamily="serif" fontSize="170">墨</text>
        </svg>
      </div>

      <div className="absolute -bottom-20 -left-20 opacity-[0.03] pointer-events-none select-none z-0">
        <svg width="400" height="400" viewBox="0 0 200 200" className="text-[#1A1A1A] fill-current">
          <text x="10" y="160" fontFamily="serif" fontSize="170">道</text>
        </svg>
      </div>

      {/* Subtle Paper Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.12] mix-blend-multiply bg-[radial-gradient(#1A1A1A_0.5px,transparent_0.5px)] [background-size:6px_6px] z-0"></div>

      {/* Top Application Bar */}
      <header className="border-b-2 border-[#1A1A1A] bg-transparent px-6 py-4 flex flex-col md:flex-row justify-between items-center md:items-end gap-4 z-20 mx-auto w-full max-w-7xl">
        <div className="flex flex-col text-center md:text-left">
          <span className="text-[9px] uppercase tracking-[0.3em] font-sans font-bold opacity-60">Volume IV • Edizione Speciale</span>
          <span className="text-[9px] uppercase tracking-[0.3em] font-sans font-bold opacity-60">L'Artigiano Tipografico</span>
        </div>

        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-[#1A1A1A] text-center" style={{ fontFamily: 'Georgia, serif', fontVariant: 'small-caps' }}>
            IL CRONISTA
          </h1>
          <p className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold opacity-70 mt-1">
            Studio di Impaginazione Vintage & Calligrafia
          </p>
        </div>

        {/* Global Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Reset button */}
          <button
            onClick={handleResetToDefault}
            className="px-3 py-1.5 border border-[#1A1A1A]/40 text-[10px] uppercase font-sans font-bold hover:bg-[#1A1A1A] hover:text-[#EBE7E0] hover:border-[#1A1A1A] transition-colors cursor-pointer"
            title="Ripristina Giornale Predefinito"
          >
            <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
            <span>Inizia da Capo</span>
          </button>

          {/* Export Interactive Newspaper HTML button */}
          <button
            onClick={() => exportInteractiveNewspaper(newspaper)}
            className="px-4 py-1.5 bg-amber-900 border border-amber-950 text-[10px] uppercase font-sans font-bold text-amber-50 hover:bg-[#1A1A1A] hover:border-[#1A1A1A] hover:text-[#EBE7E0] transition-colors cursor-pointer flex items-center shadow-xs"
            title="Esporta il Giornale Interattivo Sfogliabile come file HTML autonomo da conservare e leggere ovunque offline"
          >
            <Download className="w-3.5 h-3.5 inline mr-1.5" />
            <span>Esporta Sfogliabile (.html)</span>
          </button>

          {/* Incorpora Iframe button */}
          <button
            onClick={() => setShowEmbedModal(true)}
            className="px-4 py-1.5 border border-[#1A1A1A]/40 text-[10px] uppercase font-sans font-bold hover:bg-[#1A1A1A] hover:text-[#EBE7E0] hover:border-[#1A1A1A] transition-colors cursor-pointer flex items-center"
            title="Ottieni il codice per inserire questo giornale in un iframe sul tuo sito"
          >
            <Code className="w-3.5 h-3.5 inline mr-1.5" />
            <span>Inserisci nel tuo Sito (Iframe)</span>
          </button>

          {/* Stampa / PDF button */}
          <button
            onClick={handlePrint}
            className="px-4 py-1.5 border border-[#1A1A1A]/40 text-[10px] uppercase font-sans font-bold hover:bg-[#1A1A1A] hover:text-[#EBE7E0] hover:border-[#1A1A1A] transition-colors cursor-pointer flex items-center"
            title="Stampa tutto il Giornale o Salva in PDF"
          >
            <Printer className="w-3.5 h-3.5 inline mr-1.5" />
            <span>Stampa / PDF</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Workspace */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative z-10">
        
        {/* LEFT COLUMN: The Physical realistic turning Newspaper or Zoom Focus View */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
          <div className="bg-[#D9D5CD]/20 border border-[#1A1A1A]/20 p-4 rounded-xl shadow-lg backdrop-blur-xs flex flex-col">
            
            {/* Quick Header information & View Mode Toggle */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 px-1 pb-3 border-b border-[#1A1A1A]/10">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#1A1A1A] font-bold">
                  <BookOpen className="w-4 h-4 text-[#1A1A1A]" />
                  <span>STAI MODIFICANDO: <strong className="text-red-700 uppercase font-bold">PAGINA {selectedPageId}</strong></span>
                </div>
                <span className="text-[10px] font-serif text-stone-600 mt-0.5">
                  {newspaper.pages.find(p => p.id === selectedPageId)?.title || "Copertina Principale"}
                </span>
              </div>

              {/* Toggle controls */}
              <div className="flex bg-[#D9D5CD]/60 p-1 border border-[#1A1A1A]/20 rounded-md shadow-xs self-stretch sm:self-auto justify-center">
                <button
                  onClick={() => setViewMode("focus")}
                  className={`px-3 py-1 text-[10px] font-sans font-bold uppercase tracking-wider rounded transition-all cursor-pointer flex items-center gap-1.5 ${viewMode === "focus" ? "bg-[#1A1A1A] text-[#EBE7E0]" : "text-[#1A1A1A]/70 hover:text-[#1A1A1A]"}`}
                  title="Mostra l'anteprima ingrandita ad alta definizione della singola pagina che stai modificando"
                >
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>🔍 Zoom Leggibile</span>
                </button>
                <button
                  onClick={() => setViewMode("book")}
                  className={`px-3 py-1 text-[10px] font-sans font-bold uppercase tracking-wider rounded transition-all cursor-pointer flex items-center gap-1.5 ${viewMode === "book" ? "bg-[#1A1A1A] text-[#EBE7E0]" : "text-[#1A1A1A]/70 hover:text-[#1A1A1A]"}`}
                  title="Mostra il giornale nel leggio 3D a doppia pagina"
                >
                  📖 Libro 3D Sfogliabile
                </button>
              </div>
            </div>

            {/* Render Preview Content based on viewMode */}
            {viewMode === "focus" ? (
              <div className="w-full flex flex-col items-center">
                {/* Visual Canvas Paper Wrapper */}
                <div className="w-full relative rounded-lg border-2 border-[#1A1A1A]/20 shadow-xl overflow-hidden bg-[#EBE7E0]">
                  {/* Spine Header banner */}
                  <div className="bg-[#1A1A1A] text-[#EBE7E0] px-4 py-2.5 flex justify-between items-center text-xxs font-mono uppercase tracking-widest border-b border-[#1A1A1A]/30">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                      <span className="font-bold">Anteprima Live ad Alta Leggibilità</span>
                    </div>
                    <span className="opacity-70">Ogni lettera è nitida al 100%</span>
                  </div>

                  {/* Outer container with warm vintage desktop feel but full width rendering */}
                  <div className="p-4 sm:p-6 md:p-8 bg-stone-900/10 flex justify-center items-start overflow-y-auto max-h-[750px] page-scroll">
                    <div className="w-full max-w-xl bg-[#EBE7E0] rounded-sm shadow-2xl border-4 border-[#1A1A1A] overflow-hidden flex flex-col relative" style={{ minHeight: "680px" }}>
                      
                      {/* Stylized corner metal corners for realistic vintage focus framing */}
                      <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#1A1A1A]/20 pointer-events-none" />
                      <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#1A1A1A]/20 pointer-events-none" />
                      <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#1A1A1A]/20 pointer-events-none" />
                      <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#1A1A1A]/20 pointer-events-none" />
                      
                      <div className="flex-1 flex flex-col p-1">
                        <NewspaperPageRenderer 
                          page={newspaper.pages.find(p => p.id === selectedPageId) || newspaper.pages[0]} 
                          paperTitle={newspaper.name} 
                          paperDate={newspaper.date} 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-[10px] font-mono text-stone-600 text-center flex items-center gap-1.5 justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Consiglio: Modifica i testi a destra e guarda lo scorrere delle colonne a sinistra in tempo reale!</span>
                </div>
              </div>
            ) : (
              <NewspaperBook 
                newspaper={newspaper}
                onSelectPage={setSelectedPageId}
                selectedPageId={selectedPageId}
              />
            )}
          </div>

          {/* Layout Quick Index Indicator */}
          <div className="bg-[#D9D5CD]/40 border border-[#1A1A1A]/30 p-5 rounded-xl backdrop-blur-xs">
            <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-[#1A1A1A] mb-3 flex items-center gap-1.5 border-b border-[#1A1A1A]/20 pb-2">
              <Layers className="w-4 h-4 text-[#1A1A1A]" />
              <span>Sommario delle Pagine</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {newspaper.pages.map((p) => {
                const isActive = p.id === selectedPageId;
                const isCover = p.type === "cover";
                const isBack = p.type === "back";

                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPageId(p.id)}
                    className={`p-2.5 rounded text-left border transition-all duration-300 relative overflow-hidden group cursor-pointer
                      ${isActive 
                        ? "bg-[#1A1A1A] border-[#1A1A1A] text-[#EBE7E0]" 
                        : "bg-[#D9D5CD]/20 border-[#1A1A1A]/20 text-[#1A1A1A]/70 hover:border-[#1A1A1A]/60 hover:text-[#1A1A1A]"}`}
                  >
                    <div className="text-[10px] font-mono opacity-60 group-hover:text-red-700 transition-colors">
                      PAGINA {p.id}
                    </div>
                    <div className="text-xs font-bold truncate pr-3">
                      {isCover ? "👑 COPERTINA" : isBack ? "📜 RETRO" : p.title}
                    </div>
                    <div className="text-[9px] font-mono uppercase tracking-wider opacity-60 mt-1">
                      {p.style === "oriental" ? "🖌️ Orientale" : p.style === "classic" ? "📰 Classico" : "⚡ Moderno"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Studio Editor & AI Co-Writer */}
        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-6">
          <NewspaperEditor 
            newspaper={newspaper}
            selectedPageId={selectedPageId}
            onUpdateNewspaper={handleUpdateNewspaper}
          />
        </div>

      </main>

      {/* App Footer */}
      <footer className="border-t border-[#1A1A1A]/20 bg-transparent py-6 px-6 text-center text-xxs font-mono text-[#1A1A1A]/60 mt-auto flex flex-col sm:flex-row justify-between items-center gap-2 max-w-7xl mx-auto w-full relative z-10">
        <p>© 2026 L'Artigiano Tipografico. Tutti i diritti di stampa riservati.</p>
        <div className="flex items-center gap-4">
          <span>Stile: Georgia & Playfair Display</span>
          <span>Sfondi: Calligrafia Cinese e Giapponese d'Epoca</span>
        </div>
      </footer>

      {/* Contenitore ad alta fedeltà visibile ESCLUSIVAMENTE in fase di Stampa o Esportazione PDF */}
      <div className="print-only-container hidden print:block bg-white text-[#1A1A1A] m-0 p-0">
        {newspaper.pages.map((p) => (
          <div key={p.id} className="print-page-break bg-white overflow-hidden p-8 relative flex flex-col justify-between">
            <NewspaperPageRenderer 
              page={p} 
              paperTitle={newspaper.name} 
              paperDate={newspaper.date} 
            />
          </div>
        ))}
      </div>

      {/* Retro Calligraphic In-App Confirm Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-[#EBE7E0] border-4 border-[#1A1A1A] p-6 max-w-sm w-full shadow-2xl relative">
            {/* Corner decorations */}
            <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#1A1A1A]" />
            <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#1A1A1A]" />
            <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#1A1A1A]" />
            <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#1A1A1A]" />
            
            <h3 className="text-lg font-bold uppercase text-center tracking-wider border-b-2 border-[#1A1A1A] pb-2 mb-4" style={{ fontVariant: 'small-caps', fontFamily: 'Georgia, serif' }}>
              Ripristina Giornale
            </h3>
            <p className="text-xs text-center font-serif leading-relaxed text-stone-800 mb-6">
              Sei sicuro di voler ripristinare il giornale predefinito? Questa azione eliminerà permanentemente tutte le modifiche correnti.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 border border-[#1A1A1A] text-[10px] uppercase font-sans font-bold hover:bg-[#1A1A1A] hover:text-[#EBE7E0] transition-colors cursor-pointer"
              >
                Annulla
              </button>
              <button
                onClick={confirmReset}
                className="px-4 py-2 bg-red-800 border border-red-950 text-[10px] uppercase font-sans font-bold text-red-50 hover:bg-red-900 transition-colors cursor-pointer"
              >
                Ripristina
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Retro Calligraphic Embed & Iframe Modal */}
      {showEmbedModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[#EBE7E0] border-4 border-[#1A1A1A] p-6 max-w-2xl w-full shadow-2xl relative my-8 text-left">
            {/* Corner decorations */}
            <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#1A1A1A]" />
            <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#1A1A1A]" />
            <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#1A1A1A]" />
            <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#1A1A1A]" />
            
            <h3 className="text-xl font-bold uppercase text-center tracking-wider border-b-2 border-[#1A1A1A] pb-2 mb-4" style={{ fontVariant: 'small-caps', fontFamily: 'Georgia, serif' }}>
              Incorpora nel tuo Sito Web via Iframe
            </h3>

            <p className="text-xs font-serif leading-relaxed text-stone-800 mb-4">
              Questo strumento genera un file <strong>HTML interattivo e autonomo</strong>. Puoi caricarlo sul tuo server web (es. tramite FTP, cPanel, WordPress Media, GitHub Pages, ecc.) e visualizzarlo in qualsiasi punto del tuo sito web tramite un semplice tag <code>&lt;iframe&gt;</code>.
            </p>

            {/* Step 1: Download or Copy HTML */}
            <div className="mb-4 bg-[#D9D5CD]/40 p-3 rounded-lg border border-[#1A1A1A]/10">
              <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-[#1A1A1A] mb-1 flex items-center gap-1.5">
                <span className="bg-[#1A1A1A] text-[#EBE7E0] w-4 h-4 rounded-full inline-flex items-center justify-center text-[10px] font-sans">1</span>
                <span>Ottieni il file HTML del Giornale</span>
              </h4>
              <p className="text-[11px] font-serif text-stone-700 mb-3">
                Scarica il file completo sul tuo computer, oppure copia l'intero codice sorgente per incollarlo in un file creato da te (es. chiamato <code>giornale.html</code>).
              </p>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => exportInteractiveNewspaper(newspaper)}
                  className="px-3 py-1.5 bg-amber-900 border border-amber-950 text-[10px] uppercase font-sans font-bold text-amber-50 hover:bg-[#1A1A1A] transition-colors cursor-pointer flex items-center shadow-xs"
                >
                  <Download className="w-3.5 h-3.5 mr-1" />
                  Scarica file (.html)
                </button>

                <button
                  onClick={handleCopyHTML}
                  className="px-3 py-1.5 border border-[#1A1A1A] text-[10px] uppercase font-sans font-bold hover:bg-[#1A1A1A] hover:text-[#EBE7E0] transition-colors cursor-pointer flex items-center"
                >
                  {copiedHTML ? (
                    <>
                      <Check className="w-3.5 h-3.5 mr-1 text-green-700" />
                      Codice HTML Copiato!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 mr-1" />
                      Copia intero Codice HTML
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Step 2: The Iframe Code */}
            <div className="mb-4 bg-[#D9D5CD]/40 p-3 rounded-lg border border-[#1A1A1A]/10">
              <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-[#1A1A1A] mb-1 flex items-center gap-1.5">
                <span className="bg-[#1A1A1A] text-[#EBE7E0] w-4 h-4 rounded-full inline-flex items-center justify-center text-[10px] font-sans">2</span>
                <span>Usa questo codice Iframe nel tuo sito</span>
              </h4>
              <p className="text-[11px] font-serif text-stone-700 mb-2">
                Incolla questo codice nel tuo sito (es. nel tuo editor WordPress in modalità HTML/Gutenberg, o nel codice sorgente del tuo sito). Ricordati di cambiare l'indirizzo <code>src</code> con il percorso in cui carichi il file.
              </p>

              <div className="relative">
                <pre className="bg-[#1A1A1A] text-[#EBE7E0] p-2.5 rounded text-[10px] font-mono overflow-x-auto border border-stone-800 leading-relaxed max-h-36 page-scroll">
{`<iframe 
  src="PERCORSO_DEL_TUO_GIORNALE/giornale-sfogliabile.html" 
  style="width: 100%; height: 720px; border: none; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);" 
  title="${newspaper.name} - Giornale Sfogliabile"
  allowfullscreen
></iframe>`}
                </pre>
                <button
                  onClick={handleCopyIframe}
                  className="absolute top-2 right-2 p-1.5 bg-stone-800 hover:bg-stone-700 text-[#EBE7E0] rounded border border-stone-700 transition-colors cursor-pointer flex items-center justify-center"
                  title="Copia codice Iframe"
                >
                  {copiedIframe ? (
                    <Check className="w-3.5 h-3.5 text-green-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Step 3: How to update periodically */}
            <div className="mb-5 bg-[#D9D5CD]/20 p-3 rounded-lg border border-dashed border-[#1A1A1A]/20">
              <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                🔄 Come aggiornare il giornale periodicamente:
              </h4>
              <ul className="text-[11px] font-serif text-stone-700 list-disc list-inside space-y-1 pl-1">
                <li>Ogni volta che vuoi aggiornare i contenuti, fai le modifiche qui nel designer.</li>
                <li>Scarica il nuovo file HTML (o premi <em>"Copia intero Codice HTML"</em>).</li>
                <li>Sovrascrivi il vecchio file (es. <code>giornale-sfogliabile.html</code>) sul tuo server.</li>
                <li><strong>Fatto!</strong> Il tuo sito web mostrerà istantaneamente la nuova edizione aggiornata senza dover toccare il codice dell'iframe.</li>
              </ul>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowEmbedModal(false)}
                className="px-5 py-2 border-2 border-[#1A1A1A] bg-[#1A1A1A] text-[#EBE7E0] text-[10px] uppercase font-sans font-bold hover:bg-transparent hover:text-[#1A1A1A] transition-colors cursor-pointer"
              >
                Chiudi Guida
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
