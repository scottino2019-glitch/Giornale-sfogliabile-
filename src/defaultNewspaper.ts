import { Newspaper } from "./types";

export const defaultNewspaper: Newspaper = {
  id: "default-newspaper",
  name: "L'ECO DEL TEMPO",
  tagline: "DIARIO CRONACHE & STORIE STRAORDINARIE DAL MONDO",
  editionNo: 407,
  price: "Cent. 15",
  date: "Domenica, 28 Giugno 1926",
  pages: [
    {
      id: 1,
      type: "cover",
      style: "classic",
      category: "EDIZIONE STRAORDINARIA",
      title: "L'ECO DEL TEMPO",
      subtitle: "Un viaggio sensoriale tra le cronache di ieri, le arti orientali ed il domani",
      author: "Il Consiglio Editoriale",
      location: "ROMA",
      date: "Anno III - N. 407",
      paragraphs: [
        "In questa nuova e straordinaria edizione, il nostro giornale si propone di unire il fascino intramontabile della tipografia classica occidentale con la profondità spirituale della calligrafia orientale. Attraverso le nostre pagine fittamente impaginate, potrete scoprire storie che sfidano i secoli.",
        "Dalle misteriose pergamene ritrovate nei canali di Venezia alla quiete solenne delle sale da tè di Kyoto, ogni pagina è concepita come un quadro in cui parole, inchiostro e carta dialogano per restituire l'anima della stampa tipografica."
      ],
      pullQuote: "“La carta è la memoria visibile del tempo che scorre, l'inchiostro ne è il sangue perpetuo.”",
      imageUrl: "https://picsum.photos/seed/printingpress/600/800",
      imageSearchKeyword: "vintage printing press, woodcut engraving, old book, warm lighting"
    },
    {
      id: 2,
      type: "article",
      style: "classic",
      category: "CRONACA ARCHEOLOGICA",
      title: "RITROVATO IL MANOSCRITTO DELLE STELLE",
      subtitle: "Sotto i pavimenti di una soffitta fiorentina riemerge una mappa celeste sconosciuta di Galileo Galilei",
      author: "Dal nostro inviato speciale Dr. Lorenzo Alighieri",
      location: "FIRENZE",
      date: "24 Giugno 1926",
      paragraphs: [
        "Un brivido ha percorso ieri la comunità scientifica ed archeologica radunata a Firenze. Nelle intercapedini lignee di una nobile residenza adiacente a Piazza della Signoria, è stato rinvenuto un fascicolo cartaceo fittamente annotato che gli esperti attribuiscono direttamente alla mano di Galileo Galilei.",
        "Le carte, straordinariamente conservate grazie al clima asciutto dell'intercapedine, mostrano disegni astronomici inediti delle lune di Giove e una dettagliata mappa della superficie lunare tracciata con inchiostro ferrogallico. Accanto alle orbite, note in lingua latina esprimono stupore per la regolarità matematica dell'universo.",
        "Il soprintendente alle antichità ha dichiarato: 'Siamo davanti a una testimonianza superba dell'istante preciso in cui la mente umana ha allargato i propri orizzonti verso l'infinito cosmo. Il testo esprime una devozione quasi mistica verso la luce delle stelle.'"
      ],
      pullQuote: "“Misura ciò che è misurabile, e rendi misurabile ciò che non lo è.”",
      imageUrl: "https://picsum.photos/seed/astronomy/600/800",
      imageSearchKeyword: "vintage astronomy chart, celestial map, antique telescope, compass"
    },
    {
      id: 3,
      type: "article",
      style: "classic",
      category: "STORIA ED ENIGMI",
      title: "IL SEGRETO DELLO SCRIGNO DE' MEDICI",
      subtitle: "Forzato dopo quattro secoli il lucchetto cifrato dell'alchimista di corte",
      author: "Firma di Giorgio Vasari il Giovane",
      location: "FIRENZE",
      date: "15 Maggio 1926",
      paragraphs: [
        "Dopo innumerevoli tentativi falliti da parte dei migliori fabbri e crittografi del Regno, l'antico scrigno metallico appartenuto a Francesco I de' Medici, noto patrono degli alchimisti, ha rivelato il suo segreto.",
        "All'interno dello scomparto segreto, avvolto in un drappo di velluto ormai logorato, non vi erano gemme o formule per tramutare il piombo in oro, bensì una serie di fiale sigillate contenenti pigmenti purissimi e una formula chimica per la produzione di un inchiostro blu di inaudita brillantezza.",
        "Questo inchiostro, denominato negli appunti 'Aetherium', era destinato alla trascrizione delle pergamene più sacre della biblioteca medicea. Un blu cobalto così profondo da sembrare velluto liquido, la cui ricetta si riteneva persa nei fumi del tempo."
      ],
      pullQuote: "“La vera alchimia non è trasmutare i metalli, ma fissare l'eternità sulla fragile pergamena.”",
      imageUrl: "https://picsum.photos/seed/oldbox/600/800",
      imageSearchKeyword: "antique copper box, old alchemy vials, laboratory tools, warm candle light"
    },
    {
      id: 4,
      type: "article",
      style: "oriental",
      category: "ARTE DEL PENNELLO",
      title: "LA VIA DELL'INCHIOSTRO SOLITARIO",
      subtitle: "La sacralità del tratto nero sulla carta di riso risuona nelle antiche abbazie",
      author: "Kawabata Yasunari, corrispondente",
      location: "KYOTO",
      date: "Autunno dell'Anno Showa I (1926)",
      paragraphs: [
        "Nel silenzio del tempio zen di Ryogen-in, il maestro di calligrafia prepara l'inchiostro sfregando lentamente il bastoncino di carbone contro la pietra abrasiva bagnata. Ogni movimento è calmo, ritmico, sintonizzato con il respiro solenne della foresta circostante.",
        "La calligrafia (Shodo) non è semplicemente l'atto di tracciare parole leggibili. È una meditazione visiva, un ponte gettato tra l'invisibile e l'esistenza sensibile. Un unico, istantaneo tratto di pennello che non ammette alcuna correzione o incertezza.",
        "Se la mente esita, l'inchiostro si espande disordinatamente sulla carta di riso rivelando la debolezza dello spirito. Solo quando la mente è completamente vuota di pensieri ed egoismo, il pennello scorre fluido, lasciando un'impronta che risuona di armonia cosmica."
      ],
      pullQuote: "“Nel vuoto di un tratto nero risiede l'intero ventaglio della creazione.”",
      imageUrl: "https://picsum.photos/seed/brushshodo/600/800",
      imageSearchKeyword: "japanese calligraphy brush, black ink stone, white rice paper, minimal zen",
      orientalDetails: {
        verticalTitle: "一画一魂・墨の精神",
        verticalSub: "京都の禅寺で開かれる静寂と書道の真髄",
        brushCalligraphyChar: "墨",
        brushCalligraphyMeaning: "Sumi - L'Inchiostro e lo Spirito della Concentrazione",
        redSealText: "墨龍"
      }
    },
    {
      id: 5,
      type: "article",
      style: "oriental",
      category: "RACCONTI D'ORIENTE",
      title: "IL SAMURAI ED IL GIOCO DEL VENTO",
      subtitle: "Un'antica pergamena svela l'incontro poetico nei giardini di bambù",
      author: "Okakura Kakuzo, saggista",
      location: "KAMAKURA",
      date: "Mese dei Crisantemi",
      paragraphs: [
        "In una fredda serata del periodo Kamakura, un anziano samurai depose le sue spade sulla veranda di legno di una capanna solitaria nel bosco di bambù. All'interno, un maestro del tè lo attendeva per compiere il rito della tazza condivisa.",
        "Fuori, il vento sibilava impetuoso agitando le canne di bambù in una danza verde e argentea. All'interno, solo il rumore dell'acqua che sobbolleva dolcemente nel bollitore di ferro, un suono che i giapponesi chiamano 'matsukaze', il vento tra i pini.",
        "Nessuna parola di guerra fu pronunciata. Davanti alla tazza di denso tè verde, il guerriero comprese che la vera forza non risiede nel fendente d'acciaio, ma nella capacità di rimanere in perfetto equilibrio interiore, calmi di fronte alle tempeste passeggere della vita."
      ],
      pullQuote: "“La tazza di tè è una tazza di pace, dove il forte e il saggio si inchinano allo stesso soffio di vento.”",
      imageUrl: "https://picsum.photos/seed/zenforest/600/800",
      imageSearchKeyword: "japanese bamboo forest green, misty sun rays, wooden temple pavilion, zen",
      orientalDetails: {
        verticalTitle: "武士と竹林の茶会",
        verticalSub: "風の音と鉄釜の響きに魂の静寂を見出す",
        brushCalligraphyChar: "道",
        brushCalligraphyMeaning: "Do - La Via, il Cammino della Consapevolezza Interiore",
        redSealText: "和敬"
      }
    },
    {
      id: 6,
      type: "article",
      style: "modern",
      category: "CONFLUENZA FUTURISTA",
      title: "LE MACCHINE DEL PENSIERO SINTETICO",
      subtitle: "Un manifesto sull'avvento delle intelligenze artificiali e dell'arte automatica",
      author: "Filippo Tommaso Marinetti II",
      location: "MILANO",
      date: "Giugno 1926 (Proiezione 2026)",
      paragraphs: [
        "Noi cantiamo il grande sussulto delle macchine pensanti! I circuiti di silicio e gli algoritmi generativi non sono freddi calcolatori, ma i nuovi poeti di un'era in cui l'uomo moltiplica il proprio intelletto all'infinito.",
        "Un dipinto tracciato da una rete neurale o un articolo composto da un cervello sintetico non sminuiscono l'arte, la liberano! L'artista moderno non impugna più solo il pennello, ma danza con il flusso delle probabilità matematiche.",
        "È nata una nuova estetica: la bellezza della precisione programmata, la meraviglia dell'inaspettato computazionale. La carta stampata accoglie ora la scintilla della mente elettrica in un connubio sublime."
      ],
      pullQuote: "“La velocità del calcolo genera la nuova poesia dell'infinito elettronico.”",
      imageUrl: "https://picsum.photos/seed/futurism/600/800",
      imageSearchKeyword: "futurist abstract geometric art, red black and white lines, mechanical design"
    },
    {
      id: 7,
      type: "article",
      style: "modern",
      category: "ESTETICA CONTEMPORANEA",
      title: "VENEZIA FLUTTUANTE E I SUOI SPECCHI",
      subtitle: "Come l'acqua dei canali riflette l'architettura liquida del nostro presente",
      author: "Chiara Scarpa, critica d'arte",
      location: "VENEZIA",
      date: "12 Giugno 1926",
      paragraphs: [
        "Venezia non è una città di pietra fissa, ma un'opera liquida in continuo mutamento. Ogni onda increspata dal passaggio di una gondola scompone e ricompone i profili gotici di Palazzo Ducale in un caleidoscopio di riflessi d'oro.",
        "La nostra percezione moderna è esattamente come lo specchio d'acqua veneziano: frammentata, mutevole, densa di rifrazioni e stratificazioni temporali. Camminare per le calli significa abitare contemporaneamente il passato bizantino e la fluidità digitale del presente.",
        "Il marmo antico si dissolve nel riflesso verde smeraldo della laguna, ricordandoci che l'arte più bella è quella che accetta la propria natura transitoria, lasciandosi accarezzare e modificare dallo scorrere eterno dell'acqua."
      ],
      pullQuote: "“Venezia ci insegna che l'eternità si costruisce sull'acqua, oscillando a ogni marea.”",
      imageUrl: "https://picsum.photos/seed/venicecanal/600/800",
      imageSearchKeyword: "venice canal reflection, warm sunset light on gothic buildings, calm water ripples"
    },
    {
      id: 8,
      type: "back",
      style: "classic",
      category: "COLOPHON & INDICE",
      title: "FINE DELL'EDIZIONE",
      subtitle: "Grazie per aver sfogliato L'Eco del Tempo",
      author: "Stamperia Reale S.p.A.",
      location: "ROMA",
      date: "Edizione Chiusa alle ore 24",
      paragraphs: [
        "Questo giornale è stato interamente stampato con macchine piane a cilindro su carta di pura cellulosa vergine. Tutti i testi sono stati composti a mano con caratteri mobili in piombo della prestigiosa fonderia tipografica imperiale.",
        "Il nostro impegno è preservare l'arte della bella scrittura e del design classico. L'Eco del Tempo incoraggia i propri lettori a proporre argomenti e riflessioni inviando messaggi al nostro ufficio postale centrale."
      ],
      pullQuote: "“La stampa è un'arte che rende immortali le idee volatili.”",
      imageUrl: "https://picsum.photos/seed/oldlibrary/600/800",
      imageSearchKeyword: "vintage warm library bookshelf, stacked old leather books, dusty atmosphere"
    }
  ]
};
