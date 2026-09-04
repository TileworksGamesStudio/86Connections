/**
 * BAR CONNECTIONS — Production Game Engine
 * The Mixologist's Relational Puzzle Game
 * GitHub Pages Standalone Architecture
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. HIGH-PRECISION SOUND ENGINE (Web Audio API Synthesizer)
     Zero external audio assets. Standalone, mobile-safe acoustic feedback.
     ========================================================================== */
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.isMuted = false;
      this.initialized = false;
    }

    init() {
      if (this.initialized) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
          this.initialized = true;
        }
      } catch (e) {
        console.warn('AudioContext unavailable:', e);
      }
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      return this.isMuted;
    }

    resumeContext() {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    // Gentle glass/timber card selection tap
    playSelect() {
      if (this.isMuted || !this.ctx) return;
      this.resumeContext();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.05);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    }

    // Subtler wooden deselect tap
    playDeselect() {
      if (this.isMuted || !this.ctx) return;
      this.resumeContext();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.04);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    }

    // Near miss notice (3 of 4 match)
    playNearMiss() {
      if (this.isMuted || !this.ctx) return;
      this.resumeContext();
      const notes = [440, 493.88];
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = now + idx * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.09, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.16);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.16);
      });
    }

    // Mistake / Spilled drink dull thud
    playMistake() {
      if (this.isMuted || !this.ctx) return;
      this.resumeContext();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.22);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    }

    // Triumphant crystal toast harmony for a solved group
    playSolvedGroup() {
      if (this.isMuted || !this.ctx) return;
      this.resumeContext();
      const chord = [523.25, 659.25, 783.99, 1046.5]; // C Major arpeggio
      const now = this.ctx.currentTime;

      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.06;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.38);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.38);
      });
    }

    // Grand Finale Fanfare
    playVictory() {
      if (this.isMuted || !this.ctx) return;
      this.resumeContext();
      const fanfare = [392, 523.25, 659.25, 783.99, 1046.5, 1318.5];
      const now = this.ctx.currentTime;

      fanfare.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = now + idx * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.14, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.5);
      });
    }
  }

  /* ==========================================================================
     2. MASTER BARTENDER KNOWLEDGE PUZZLE DATABASE
     Authentic mixology, precise specs, and layered professional distractors.
     ========================================================================== */
  const PUZZLE_DATABASE = [
    {
      id: 'specimen-1',
      title: 'The House Spec',
      subtitle: 'Core Archetypes & Glassware',
      groups: [
        {
          tier: 1,
          category: 'CLASSIC SOUR FAMILY',
          tierLabel: 'Foundations',
          items: ['DAIQUIRI', 'MARGARITA', 'GIMLET', 'WHISKEY SOUR'],
          explanation: 'The Sour is mixology\'s cornerstone template: strong base spirit balanced with sharp citrus (lime or lemon) and a sweetening agent.',
          clue: 'Drinks sharing the holy spirit + citrus + sweetener ratio.'
        },
        {
          tier: 2,
          category: 'EQUAL-PARTS ARCHITECTURE (1:1:1)',
          tierLabel: 'Structure',
          items: ['NEGRONI', 'BOULEVARDIER', 'LAST WORD', 'PAPER PLANE'],
          explanation: 'Architectural masterpieces where every component carries identical volume, proving balance through equal botanical weights.',
          clue: 'Cocktails proportioned with exact equal ounces.'
        },
        {
          tier: 3,
          category: 'STEMMED SERVICE GLASSWARE',
          tierLabel: 'Technique',
          items: ['COUPE', 'NICK & NORA', 'MARTINI', 'FLUTE'],
          explanation: 'Vessels with elevated stems that prevent the guest\'s hand from warming the chilled, un-iced drink bowl during service.',
          clue: 'Vessels engineered to maintain drink temperature via a stem.'
        },
        {
          tier: 4,
          category: 'REFRIGERATE AFTER OPENING',
          tierLabel: 'Master Lore',
          items: ['SWEET VERMOUTH', 'LILLET BLANC', 'DRY VERMOUTH', 'PUNT E MES'],
          explanation: 'Fortified and aromatized wines contain wine bases that oxidize rapidly at room temp. Professional bars keep them chilled to preserve aromatics.',
          clue: 'Low-ABV modifiers that spoil if left on the backbar shelf.'
        }
      ]
    },
    {
      id: 'specimen-2',
      title: 'Behind the Stick',
      subtitle: 'Tools, Ice & Thermodynamics',
      groups: [
        {
          tier: 1,
          category: 'TWO-PIECE COCKTAIL SHAKERS',
          tierLabel: 'Foundations',
          items: ['BOSTON', 'TIN-ON-TIN', 'FRENCH', 'SPEED TIN'],
          explanation: 'Two-piece metal or glass systems favored by high-volume bartenders for rapid sealing, superior thermal conductivity, and quick release.',
          clue: 'Vessels used to shake and aerate drinks without built-in strainers.'
        },
        {
          tier: 2,
          category: 'FAST-MELTING / HIGH DILUTION ICE',
          tierLabel: 'Technique',
          items: ['CRUSHED', 'PEBBLE', 'NUGGET', 'SHAVED'],
          explanation: 'High surface-area ice designed to rapidly chill and deliberately dilute strong, high-sugar Tiki drinks, Juleps, and Cobblers.',
          clue: 'Ice styles crafted to melt quickly in refreshing, boozy serves.'
        },
        {
          tier: 3,
          category: 'CITRUS PREPARATION TOOLS',
          tierLabel: 'Structure',
          items: ['CHANNEL KNIFE', 'Y-PEELER', 'ELBOW PRESS', 'CITRUS REAMER'],
          explanation: 'Mise-en-place tools used to harvest fresh citrus juices and express essential oils without piercing the bitter white pith.',
          clue: 'Station tools dedicated exclusively to lemons, limes, and oranges.'
        },
        {
          tier: 4,
          category: 'BAR STRAINERS',
          tierLabel: 'Master Lore',
          items: ['HAWTHORNE', 'JULEP', 'FINE MESH', 'CONICAL'],
          explanation: 'Filtering tools each matching a method: Hawthorne springs trap shaken ice; Julep strainers fit mixing glasses; fine-mesh screens catch pulp.',
          clue: 'Implements used to separate liquid from spent ice and solids.'
        }
      ]
    },
    {
      id: 'specimen-3',
      title: 'Aperitivo & Botanicals',
      subtitle: 'Amaro, Anise & Aromatic Oils',
      groups: [
        {
          tier: 1,
          category: 'RED APERITIVO LIQUEURS',
          tierLabel: 'Foundations',
          items: ['CAMPARI', 'APEROL', 'SELECT', 'CAPPELETTI'],
          explanation: 'Classic bittersweet Italian aperitivi infused with gentian, rhubarb, and citrus peel that define the modern Spritz and Negroni.',
          clue: 'Bright crimson bitter aperitifs.'
        },
        {
          tier: 2,
          category: 'SPIRITS THAT "LOUCHE" WITH WATER',
          tierLabel: 'Technique',
          items: ['ABSINTHE', 'PASTIS', 'OUZO', 'RAKI'],
          explanation: 'Anise-heavy botanical spirits whose insoluble essential oils precipitate when diluted with cold water, turning milky and cloudy.',
          clue: 'Botanical spirits that turn cloudy when chilled water is added.'
        },
        {
          tier: 3,
          category: 'CITRUS PEEL GARNISH FORMS',
          tierLabel: 'Structure',
          items: ['EXPRESSED TWIST', 'CITRUS SWATH', 'HORSE\'S NECK', 'FLAMED PEEL'],
          explanation: 'Technical cuts of citrus zest manipulated over cocktail surface tension to release aromatic limonene oils over the drink.',
          clue: 'Methods of manipulating citrus peel for aromatic top notes.'
        },
        {
          tier: 4,
          category: 'HISTORIC PRE-PROHIBITION SYRUPS',
          tierLabel: 'Master Lore',
          items: ['GOMME SYRUP', 'ORGEAT', 'FALERNUM', 'GRENADINE'],
          explanation: 'Traditional sweeteners from the golden age: gum arabic for texture, almond/rose for Mai Tais, ginger/lime/clove for punch, and real pomegranate.',
          clue: 'Complex historic sweeteners offering texture and spice beyond sugar.'
        }
      ]
    },
    {
      id: 'specimen-4',
      title: 'Thermodynamics & Agitation',
      subtitle: 'Stirring, Aeration & Bitters',
      groups: [
        {
          tier: 1,
          category: 'ALWAYS STIRRED, NEVER SHAKEN',
          tierLabel: 'Foundations',
          items: ['MANHATTAN', 'MARTINI', 'VIEUX CARRÉ', 'HANKY PANKY'],
          explanation: 'Drinks built entirely from spirits and aromatized wines must be stirred to preserve crystal clarity, dense texture, and zero aeration.',
          clue: 'Spirit-forward classics whose silky mouthfeel requires a barspoon.'
        },
        {
          tier: 2,
          category: 'SPECIALIZED SHAKING TECHNIQUES',
          tierLabel: 'Technique',
          items: ['DRY SHAKE', 'REVERSE DRY SHAKE', 'WHIP SHAKE', 'ROLLING'],
          explanation: 'Agitation methods tailored for texture: dry shaking emulsifies albumin; whip shaking with crushed ice chills without over-diluting.',
          clue: 'Special mechanical maneuvers behind the bar to create texture.'
        },
        {
          tier: 3,
          category: 'BITTERS ESSENTIAL TO CLASSICS',
          tierLabel: 'Structure',
          items: ['ANGOSTURA', 'PEYCHAUD\'S', 'ORANGE BITTERS', 'BOKER\'S'],
          explanation: 'Potent aromatic tinctures: Angostura defines Old Fashioneds, Peychaud\'s defines Sazeracs, and orange bitters complete the 19th-century Martini.',
          clue: 'Concentrated alcoholic botanical dashes that anchor classic specs.'
        },
        {
          tier: 4,
          category: 'CAUSES OF A "FLAT" COCKTAIL',
          tierLabel: 'Master Lore',
          items: ['WARM GLASS', 'OVER-DILUTION', 'STALE JUICE', 'EXHAUSTED SODA'],
          explanation: 'Service diagnosis: lukewarm glasses melt ice instantly, stale pre-squeezed juice lacks vibrant acidity, and flat soda kills effervescence.',
          clue: 'Station errors that ruin the freshness and vitality of a serve.'
        }
      ]
    },
    {
      id: 'specimen-5',
      title: 'Terroir & Fermentation',
      subtitle: 'Agave, Cane & Grain Geographies',
      groups: [
        {
          tier: 1,
          category: 'MEXICAN AGAVE DISTILLATES',
          tierLabel: 'Foundations',
          items: ['TEQUILA', 'MEZCAL', 'RAICILLA', 'BACANORA'],
          explanation: 'Denominations of Origin distilled from roasted or steamed agave hearts throughout Jalisco, Oaxaca, Sonora, and neighboring Mexican states.',
          clue: 'Distillates born from the piñas of Mexican agave.'
        },
        {
          tier: 2,
          category: 'RUM REGIONAL CLASSIFICATIONS',
          tierLabel: 'Technique',
          items: ['AGRICOLE', 'JAMAICAN HIGH-ESTER', 'DEMERARA', 'CACHAÇA'],
          explanation: 'Sugarcane spirits classified by heritage: fresh cane juice from Martinique & Brazil, versus heavy pot-still molasses from Jamaica & Guyana.',
          clue: 'Cane spirits distinguished by geography, stills, and cane juice.'
        },
        {
          tier: 3,
          category: 'DRINKS TOPPED WITH GINGER BEER (BUCKS)',
          tierLabel: 'Structure',
          items: ['MOSCOW MULE', 'DARK \'N STORMY', 'LONDON BUCK', 'EL DIABLO'],
          explanation: 'The Buck family: spirit plus fresh citrus (usually lime) topped with spicy carbonated ginger beer in a copper mug or highball.',
          clue: 'Refreshing highballs lengthened with effervescent ginger beer.'
        },
        {
          tier: 4,
          category: 'WHISKEY LEGAL PRODUCTION TERMS',
          tierLabel: 'Master Lore',
          items: ['BOTTLED-IN-BOND', 'SINGLE MALT', 'BARREL PROOF', 'SOUR MASH'],
          explanation: 'Strict statutory production definitions governed by federal laws regarding distilling seasons, single-distillery batches, and undiluted bottling.',
          clue: 'Legal standards and distillery requirements on whiskey labels.'
        }
      ]
    },
    {
      id: 'specimen-6',
      title: 'The Tall Order',
      subtitle: 'Highballs, Carbonation & Foam',
      groups: [
        {
          tier: 1,
          category: 'HIGH-CAPACITY DRINKING VESSELS',
          tierLabel: 'Foundations',
          items: ['COLLINS', 'HIGHBALL', 'ZOMBIE GLASS', 'HURRICANE'],
          explanation: 'Tall, narrow vessels designed to hold abundant ice and carbonated lengtheners while keeping bubbles active through reduced surface area.',
          clue: 'Elongated glassware engineered for long, carbonated serves.'
        },
        {
          tier: 2,
          category: 'THE COLLINS DRINK FAMILY',
          tierLabel: 'Technique',
          items: ['TOM COLLINS', 'JOHN COLLINS', 'JUAN COLLINS', 'PEDRO COLLINS'],
          explanation: 'Variations of the base + lemon + simple + soda formula: Tom uses Old Tom Gin; John uses Bourbon; Juan uses Tequila; Pedro uses Rum.',
          clue: 'A famous citrus and soda template named after different first names.'
        },
        {
          tier: 3,
          category: 'COCKTAIL FOAM GENERATORS',
          tierLabel: 'Structure',
          items: ['EGG WHITE', 'AQUAFABA', 'PINEAPPLE JUICE', 'WHEY'],
          explanation: 'Proteins and natural surfactants that trap air bubbles during shaking to yield a dense, velvety micro-foam head on top of the glass.',
          clue: 'Ingredients added to create a creamy, luxurious meringue foam.'
        },
        {
          tier: 4,
          category: 'DENSE CLEAR ICE CUTS',
          tierLabel: 'Master Lore',
          items: ['COLLINS SPEAR', 'LARGE CUBE', 'ICE SPHERE', 'PRISM'],
          explanation: 'Hand-carved directional-freezing ice blocks featuring zero trapped air, offering the slowest possible thermal melt rate for neat spirits.',
          clue: 'Sculpted clear ice shapes that minimize dilution in high-end bars.'
        }
      ]
    },
    {
      id: 'specimen-7',
      title: 'The Speakeasy Ledger',
      subtitle: 'Boroughs, Manuals & Savory Rims',
      groups: [
        {
          tier: 1,
          category: 'COCKTAILS NAMED FOR NYC BOROUGHS',
          tierLabel: 'Foundations',
          items: ['MANHATTAN', 'BROOKLYN', 'BRONX', 'QUEENS'],
          explanation: 'Iconic turns-of-the-century drinks paying tribute to New York City boroughs, each modifying the whiskey or gin vermouth formula.',
          clue: 'Classic cocktails bearing the names of New York boroughs.'
        },
        {
          tier: 2,
          category: 'CANONICAL HISTORIC COCKTAIL MANUALS',
          tierLabel: 'Technique',
          items: ['SAVOY COCKTAIL BOOK', 'THE BON VIVANT\'S GUIDE', 'CAFÉ ROYAL BOOK', 'THE FINE ART OF MIXING'],
          explanation: 'Historic treatises that codified bartending: Harry Craddock (1930), Jerry Thomas (1862), William Tarling (1937), and David Embury (1948).',
          clue: 'Seminal printed books that codified classic drink specifications.'
        },
        {
          tier: 3,
          category: 'ORIGINAL DON THE BEACHCOMBER / TRADER VIC TIKI',
          tierLabel: 'Structure',
          items: ['MAI TAI', 'ZOMBIE', 'FOG CUTTER', 'NAVY GROG'],
          explanation: 'Mid-century Polynesian-pop treasures layering multiple aged rums, freshly squeezed lime, citrus juices, and mysterious spice rums.',
          clue: 'Exotic rum epics born in the golden age of tropical escapism.'
        },
        {
          tier: 4,
          category: 'SERVED WITH A SALTED RIM OR SALINE',
          tierLabel: 'Master Lore',
          items: ['MARGARITA', 'PALOMA', 'SALTY DOG', 'BLOODY MARY'],
          explanation: 'Sodium chloride suppresses perceived bitterness while enhancing sweetness and citrus volatiles on the palate.',
          clue: 'Drinks using salt crusts or drops to suppress bitterness.'
        }
      ]
    },
    {
      id: 'specimen-8',
      title: 'The Master Mixologist Exam',
      subtitle: 'High Ambiguity & Deceptive Pairings',
      groups: [
        {
          tier: 1,
          category: 'SPARKLING WINE / CHAMPAGNE COCKTAILS',
          tierLabel: 'Foundations',
          items: ['FRENCH 75', 'BELLINI', 'AIRMAIL', 'CHAMPAGNE COCKTAIL'],
          explanation: 'Drinks crowned with chilled Champagne or Prosecco, demanding delicate integration to avoid blowing out sparkling effervescence.',
          clue: 'Celebratory drinks built with or lengthened by bubbly sparkling wine.'
        },
        {
          tier: 2,
          category: 'ORANGE-FLAVORED LIQUEURS',
          tierLabel: 'Technique',
          items: ['TRIPLE SEC', 'CURAÇAO', 'GRAND MARNIER', 'COINTREAU'],
          explanation: 'Liqueurs highlighting laraha or sweet orange peel; Grand Marnier has a rich Cognac base, while Cointreau uses neutral alcohol.',
          clue: 'Citrus modifiers derived from dried bitter and sweet orange peels.'
        },
        {
          tier: 3,
          category: 'CLASSIC HERBAL CHARTREUSE COCKTAILS',
          tierLabel: 'Structure',
          items: ['LAST WORD', 'BIJOU', 'TIPPERARY', 'NAKED & FAMOUS'],
          explanation: 'Complex drinks featuring either Green or Yellow Chartreuse, or its bitter vegetal agave analogues, demanding strong spirit counterpoints.',
          clue: 'Intensely herbal drinks driven by Carthusian monastic liqueurs.'
        },
        {
          tier: 4,
          category: 'COCKTAILS ORIGINALLY CREATED IN EUROPEAN HOTEL BARS',
          tierLabel: 'Master Lore',
          items: ['SIDECAR', 'HANKY PANKY', 'DRY MARTINI', 'BELLINI'],
          explanation: 'Grand hospitality history: The Ritz Paris (Sidecar), The Savoy London (Hanky Panky), Harry\'s Bar Venice (Bellini).',
          clue: 'Pinnacles of classic elegance born inside historic grand luxury hotel bars.'
        }
      ]
    }
  ];

  /* ==========================================================================
     3. PERSISTENCE & LOCAL STORAGE ADAPTER
     Preserves daily streaks, archive solves, codex discoveries, sound state.
     ========================================================================== */
  class GameStorage {
    constructor() {
      this.STORAGE_KEY = 'bar_connections_save_v1';
      this.data = this.load();
    }

    load() {
      try {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        if (raw) return JSON.parse(raw);
      } catch (e) {
        console.warn('Storage read failed:', e);
      }
      return {
        played: 0,
        wins: 0,
        currentStreak: 0,
        maxStreak: 0,
        lastDailyPlayed: null,
        solvedPuzzles: {}, // id -> { mistakes: number, timestamp: number }
        codexUnlocked: {}, // categoryTitle -> true
        guessDist: { '0': 0, '1': 0, '2': 0, '3': 0 },
        soundMuted: false
      };
    }

    save() {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
      } catch (e) {
        console.warn('Storage write failed:', e);
      }
    }

    recordWin(puzzleId, mistakesUsed, isDaily, groups) {
      this.data.played += 1;
      this.data.wins += 1;
      this.data.currentStreak += 1;
      if (this.data.currentStreak > this.data.maxStreak) {
        this.data.maxStreak = this.data.currentStreak;
      }

      const key = String(mistakesUsed);
      if (this.data.guessDist[key] !== undefined) {
        this.data.guessDist[key] += 1;
      }

      if (isDaily) {
        this.data.lastDailyPlayed = new Date().toISOString().slice(0, 10);
      }

      this.data.solvedPuzzles[puzzleId] = {
        mistakes: mistakesUsed,
        timestamp: Date.now()
      };

      // Unlock all 4 categories in the Codex
      groups.forEach(g => {
        this.data.codexUnlocked[g.category] = {
          tier: g.tier,
          tierLabel: g.tierLabel,
          items: g.items,
          explanation: g.explanation
        };
      });

      this.save();
    }

    recordLoss(puzzleId, isDaily, groups) {
      this.data.played += 1;
      this.data.currentStreak = 0;

      if (isDaily) {
        this.data.lastDailyPlayed = new Date().toISOString().slice(0, 10);
      }

      // Even in loss, learning occurs: unlock groups in the codex
      groups.forEach(g => {
        this.data.codexUnlocked[g.category] = {
          tier: g.tier,
          tierLabel: g.tierLabel,
          items: g.items,
          explanation: g.explanation
        };
      });

      this.save();
    }
  }

  /* ==========================================================================
     4. CORE APPLICATION LOGIC & STATE CONTROLLER
     ========================================================================== */
  class BarConnectionsApp {
    constructor() {
      this.sound = new SoundEngine();
      this.storage = new GameStorage();
      
      // Active Puzzle State
      this.currentPuzzle = null;
      this.isDailyMode = true;
      this.remainingCards = []; // Array of strings
      this.selectedCards = []; // Max 4 strings
      this.solvedGroups = []; // Solved group objects
      this.mistakesRemaining = 4;
      this.maxMistakes = 4;
      this.isGameOver = false;
      this.historyGuesses = []; // Track previous combinations to prevent repeats
      this.hintIndex = 0;

      this.initDOMElements();
      this.bindEvents();
      this.initDailyPuzzle();
      this.renderCodex();
    }

    initDOMElements() {
      // Buttons & Navigation
      this.dom = {
        btnSound: document.getElementById('btn-sound'),
        soundOnIcon: document.querySelector('.sound-on-icon'),
        soundOffIcon: document.querySelector('.sound-off-icon'),
        btnHowToPlay: document.getElementById('btn-how-to-play'),
        btnStats: document.getElementById('btn-stats'),
        btnCodex: document.getElementById('btn-codex'),
        tabDaily: document.getElementById('tab-daily'),
        tabArchive: document.getElementById('tab-archive'),
        
        // Puzzle Display
        puzzleBadge: document.getElementById('puzzle-badge'),
        puzzleTitle: document.getElementById('puzzle-title'),
        mistakesIndicator: document.getElementById('mistakes-indicator'),
        toastContainer: document.getElementById('toast-container'),
        solvedGroupsContainer: document.getElementById('solved-groups-container'),
        cardsGrid: document.getElementById('cards-grid'),

        // Action Buttons
        btnShuffle: document.getElementById('btn-shuffle'),
        btnDeselect: document.getElementById('btn-deselect'),
        btnHint: document.getElementById('btn-hint'),
        btnSubmit: document.getElementById('btn-submit'),

        // Panels & Modals
        gameView: document.getElementById('game-view'),
        archiveView: document.getElementById('archive-view'),
        codexView: document.getElementById('codex-view'),
        archiveList: document.getElementById('archive-list'),
        codexGrid: document.getElementById('codex-grid'),
        codexFilters: document.getElementById('codex-filters'),
        codexBadge: document.getElementById('codex-progress-badge'),
        modalOverlay: document.getElementById('modal-overlay'),
        modalHowToPlay: document.getElementById('modal-how-to-play'),
        modalStats: document.getElementById('modal-stats'),
        modalGameOver: document.getElementById('modal-game-over'),

        // Stats elements
        statPlayed: document.getElementById('stat-played'),
        statWinRate: document.getElementById('stat-win-rate'),
        statCurrentStreak: document.getElementById('stat-current-streak'),
        statMaxStreak: document.getElementById('stat-max-streak'),
        statRank: document.getElementById('stat-rank'),
        statRankDesc: document.getElementById('stat-rank-desc'),
        guessDistGraph: document.getElementById('guess-distribution-graph'),

        // Game Over elements
        verdictRank: document.getElementById('verdict-rank'),
        verdictHeadline: document.getElementById('verdict-headline'),
        verdictSub: document.getElementById('verdict-sub'),
        gameOverCategories: document.getElementById('game-over-categories'),
        btnShare: document.getElementById('btn-share'),
        btnReviewCodex: document.getElementById('btn-review-codex')
      };

      // Sound initial state
      if (this.storage.data.soundMuted) {
        this.sound.isMuted = true;
        this.dom.soundOnIcon.classList.add('hidden');
        this.dom.soundOffIcon.classList.remove('hidden');
      }
    }

    bindEvents() {
      // First user interaction unlocks Web Audio
      const unlockAudio = () => {
        this.sound.init();
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
      };
      window.addEventListener('click', unlockAudio, { once: true });
      window.addEventListener('touchstart', unlockAudio, { once: true });

      // Audio Toggle
      this.dom.btnSound.addEventListener('click', () => {
        const muted = this.sound.toggleMute();
        this.storage.data.soundMuted = muted;
        this.storage.save();
        this.dom.soundOnIcon.classList.toggle('hidden', muted);
        this.dom.soundOffIcon.classList.toggle('hidden', !muted);
      });

      // Navigation & Modal triggers
      this.dom.btnHowToPlay.addEventListener('click', () => this.openModal(this.dom.modalHowToPlay));
      this.dom.btnStats.addEventListener('click', () => {
        this.renderStats();
        this.openModal(this.dom.modalStats);
      });
      this.dom.btnCodex.addEventListener('click', () => {
        this.renderCodex();
        this.dom.codexView.classList.remove('hidden');
      });

      // Close buttons
      document.querySelectorAll('[data-close-modal]').forEach(el => {
        el.addEventListener('click', () => this.closeAllModals());
      });
      document.querySelectorAll('.close-panel-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const panelId = btn.getAttribute('data-close');
          document.getElementById(panelId).classList.add('hidden');
        });
      });
      this.dom.modalOverlay.addEventListener('click', () => this.closeAllModals());

      // Mode Switchers
      this.dom.tabDaily.addEventListener('click', () => {
        this.dom.tabDaily.classList.add('active');
        this.dom.tabArchive.classList.remove('active');
        this.dom.archiveView.classList.add('hidden');
        this.dom.codexView.classList.add('hidden');
        this.isDailyMode = true;
        this.initDailyPuzzle();
      });

      this.dom.tabArchive.addEventListener('click', () => {
        this.dom.tabArchive.classList.add('active');
        this.dom.tabDaily.classList.remove('active');
        this.renderArchive();
        this.dom.archiveView.classList.remove('hidden');
      });

      // In-game Action Buttons
      this.dom.btnShuffle.addEventListener('click', () => this.shuffleCards());
      this.dom.btnDeselect.addEventListener('click', () => this.deselectAllCards());
      this.dom.btnHint.addEventListener('click', () => this.requestBartenderHint());
      this.dom.btnSubmit.addEventListener('click', () => this.submitGuess());

      // Share & Review
      this.dom.btnShare.addEventListener('click', () => this.shareResults());
      this.dom.btnReviewCodex.addEventListener('click', () => {
        this.closeAllModals();
        this.renderCodex();
        this.dom.codexView.classList.remove('hidden');
      });

      // Codex Discipline Filter
      this.dom.codexFilters.addEventListener('click', (e) => {
        const pill = e.target.closest('.filter-pill');
        if (!pill) return;
        this.dom.codexFilters.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.renderCodex(pill.getAttribute('data-filter'));
      });

      // Keyboard Accessibility
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeAllModals();
          this.dom.archiveView.classList.add('hidden');
          this.dom.codexView.classList.add('hidden');
        }
      });
    }

    /* ==========================================================================
       5. PUZZLE INITIALIZATION & LIFECYCLE
       ========================================================================== */
    initDailyPuzzle() {
      // Deterministic Daily Selection based on calendar day
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 0);
      const diff = now - start;
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);
      
      const puzzleIndex = dayOfYear % PUZZLE_DATABASE.length;
      const dailyPuzzle = PUZZLE_DATABASE[puzzleIndex];

      this.loadPuzzle(dailyPuzzle, true);
    }

    loadPuzzle(puzzle, isDaily = false) {
      this.currentPuzzle = puzzle;
      this.isDailyMode = isDaily;
      this.selectedCards = [];
      this.solvedGroups = [];
      this.mistakesRemaining = this.maxMistakes;
      this.isGameOver = false;
      this.historyGuesses = [];
      this.hintIndex = 0;

      // Meta display
      this.dom.puzzleBadge.textContent = isDaily ? 'DAILY SHIFT SPECIMEN' : 'ARCHIVE CELLAR SHIFT';
      this.dom.puzzleTitle.textContent = puzzle.title;

      // Gather all 16 items and randomize positions
      let items = [];
      puzzle.groups.forEach(g => {
        items.push(...g.items);
      });
      this.remainingCards = this.shuffleArray([...items]);

      this.renderMistakes();
      this.renderSolvedGroups();
      this.renderCardsGrid();
      this.updateActionButtons();
    }

    shuffleArray(arr) {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }

    /* ==========================================================================
       6. UI RENDERING & TACTILE GRID
       ========================================================================== */
    renderMistakes() {
      this.dom.mistakesIndicator.innerHTML = '';
      for (let i = 0; i < this.maxMistakes; i++) {
        const pip = document.createElement('span');
        pip.className = 'pip';
        if (i >= this.mistakesRemaining) {
          pip.classList.add('lost');
        }
        pip.setAttribute('title', `Chance ${i + 1}`);
        this.dom.mistakesIndicator.appendChild(pip);
      }
    }

    renderSolvedGroups() {
      this.dom.solvedGroupsContainer.innerHTML = '';
      this.solvedGroups.forEach(group => {
        const banner = document.createElement('div');
        banner.className = `solved-banner tier-${group.tier}`;
        banner.innerHTML = `
          <div class="solved-header-row">
            <span class="solved-tier-badge">${group.tierLabel}</span>
          </div>
          <h3 class="solved-group-title">${group.category}</h3>
          <p class="solved-items-list">${group.items.join(' • ')}</p>
          <p class="solved-desc">${group.explanation}</p>
        `;
        this.dom.solvedGroupsContainer.appendChild(banner);
      });
    }

    renderCardsGrid() {
      this.dom.cardsGrid.innerHTML = '';
      this.remainingCards.forEach(item => {
        const tile = document.createElement('button');
        tile.className = 'card-tile';
        tile.setAttribute('type', 'button');
        tile.setAttribute('data-card', item);
        tile.setAttribute('aria-pressed', this.selectedCards.includes(item) ? 'true' : 'false');
        
        if (this.selectedCards.includes(item)) {
          tile.classList.add('selected');
        }

        tile.innerHTML = `<span class="card-text">${item}</span>`;

        tile.addEventListener('click', () => this.handleCardTap(item, tile));
        this.dom.cardsGrid.appendChild(tile);
      });
    }

    handleCardTap(item, tileElement) {
      if (this.isGameOver) return;

      const idx = this.selectedCards.indexOf(item);
      if (idx > -1) {
        // Deselect
        this.selectedCards.splice(idx, 1);
        tileElement.classList.remove('selected');
        tileElement.setAttribute('aria-pressed', 'false');
        this.sound.playDeselect();
      } else {
        // Select if under 4
        if (this.selectedCards.length >= 4) {
          this.showToast('You can only choose four cards at a time.');
          this.sound.playDeselect();
          return;
        }
        this.selectedCards.push(item);
        tileElement.classList.add('selected');
        tileElement.setAttribute('aria-pressed', 'true');
        this.sound.playSelect();
      }

      this.updateActionButtons();
    }

    updateActionButtons() {
      const count = this.selectedCards.length;
      this.dom.btnSubmit.disabled = count !== 4 || this.isGameOver;
      this.dom.btnDeselect.disabled = count === 0 || this.isGameOver;
    }

    deselectAllCards() {
      this.selectedCards = [];
      this.dom.cardsGrid.querySelectorAll('.card-tile').forEach(t => {
        t.classList.remove('selected');
        t.setAttribute('aria-pressed', 'false');
      });
      this.sound.playDeselect();
      this.updateActionButtons();
    }

    shuffleCards() {
      this.remainingCards = this.shuffleArray(this.remainingCards);
      this.sound.playSelect();
      this.renderCardsGrid();
    }

    requestBartenderHint() {
      if (this.isGameOver) return;

      // Find an unsolved group to give a hint for
      const unsolved = this.currentPuzzle.groups.filter(g => 
        !this.solvedGroups.some(sg => sg.category === g.category)
      );

      if (unsolved.length === 0) return;

      const target = unsolved[this.hintIndex % unsolved.length];
      this.hintIndex++;

      this.showToast(`Bartender's Clue: ${target.clue}`);
      this.sound.playNearMiss();
    }

    /* ==========================================================================
       7. DEDUCTION ENGINE & SUBMISSION LOGIC
       ========================================================================== */
    submitGuess() {
      if (this.selectedCards.length !== 4 || this.isGameOver) return;

      // Check if already guessed
      const guessSignature = [...this.selectedCards].sort().join('|');
      if (this.historyGuesses.includes(guessSignature)) {
        this.showToast('Already guessed this combination!');
        this.sound.playDeselect();
        this.shakeSelectedTiles();
        return;
      }
      this.historyGuesses.push(guessSignature);

      // Evaluate match against unsolved groups
      let matchedGroup = null;
      let nearMissGroup = null;

      for (const group of this.currentPuzzle.groups) {
        if (this.solvedGroups.some(sg => sg.category === group.category)) continue;

        let matchCount = 0;
        for (const card of this.selectedCards) {
          if (group.items.includes(card)) {
            matchCount++;
          }
        }

        if (matchCount === 4) {
          matchedGroup = group;
          break;
        } else if (matchCount === 3) {
          nearMissGroup = group;
        }
      }

      if (matchedGroup) {
        // Success!
        this.handleCorrectGuess(matchedGroup);
      } else {
        // Mistake
        this.handleIncorrectGuess(nearMissGroup);
      }
    }

    handleCorrectGuess(group) {
      this.sound.playSolvedGroup();
      this.solvedGroups.push(group);

      // Animate removing matched cards
      const selectedTiles = this.dom.cardsGrid.querySelectorAll('.card-tile.selected');
      selectedTiles.forEach(t => t.classList.add('pop-out'));

      setTimeout(() => {
        // Remove from remaining cards
        this.remainingCards = this.remainingCards.filter(c => !group.items.includes(c));
        this.selectedCards = [];
        this.renderSolvedGroups();
        this.renderCardsGrid();
        this.updateActionButtons();

        // Check if all 4 groups are solved
        if (this.solvedGroups.length === 4) {
          this.handleVictory();
        }
      }, 350);
    }

    handleIncorrectGuess(nearMissGroup) {
      this.mistakesRemaining -= 1;
      this.renderMistakes();
      this.shakeSelectedTiles();

      if (nearMissGroup) {
        this.sound.playNearMiss();
        this.showToast('One away... 3 of 4 share a hidden connection!');
      } else {
        this.sound.playMistake();
        this.showToast('Not a matching set. Check for distractors.');
      }

      if (this.mistakesRemaining <= 0) {
        setTimeout(() => this.handleDefeat(), 600);
      }
    }

    shakeSelectedTiles() {
      const selected = this.dom.cardsGrid.querySelectorAll('.card-tile.selected');
      selected.forEach(t => {
        t.classList.add('shake');
        setTimeout(() => t.classList.remove('shake'), 450);
      });
    }

    /* ==========================================================================
       8. VICTORY & DEFEAT WORKFLOWS
       ========================================================================== */
    handleVictory() {
      this.isGameOver = true;
      this.sound.playVictory();

      const mistakesUsed = this.maxMistakes - this.mistakesRemaining;
      this.storage.recordWin(this.currentPuzzle.id, mistakesUsed, this.isDailyMode, this.currentPuzzle.groups);

      setTimeout(() => {
        // Populate Game Over Modal
        const headlines = [
          'FLAWLESS SERVICE',
          'MASTERFUL POUR',
          'SOLID CRAFT',
          'SAVED BY THE RUSH'
        ];
        const ranks = ['Clean Sweep', 'Expert Mixologist', 'Senior Bartender', 'Shift Survivor'];
        
        this.dom.verdictRank.textContent = ranks[mistakesUsed] || 'Shift Completed';
        this.dom.verdictHeadline.textContent = headlines[mistakesUsed] || 'Service Concluded';
        this.dom.verdictSub.textContent = mistakesUsed === 0 
          ? 'Zero mistakes. Unrivaled station awareness and precision.' 
          : `Solved with ${mistakesUsed} spilled chance${mistakesUsed > 1 ? 's' : ''}.`;

        this.renderGameOverCategories();
        this.openModal(this.dom.modalGameOver);
      }, 500);
    }

    handleDefeat() {
      this.isGameOver = true;
      this.sound.playMistake();
      this.storage.recordLoss(this.currentPuzzle.id, this.isDailyMode, this.currentPuzzle.groups);

      // Auto-reveal the remaining groups so education happens seamlessly
      this.solvedGroups = [...this.currentPuzzle.groups];
      this.remainingCards = [];
      this.renderSolvedGroups();
      this.renderCardsGrid();

      this.dom.verdictRank.textContent = 'STATION OVERWHELMED';
      this.dom.verdictHeadline.textContent = 'Shift Ended';
      this.dom.verdictSub.textContent = 'Every mistake teaches bar architecture. Review the completed specs below:';

      this.renderGameOverCategories();
      this.openModal(this.dom.modalGameOver);
    }

    renderGameOverCategories() {
      this.dom.gameOverCategories.innerHTML = '';
      this.currentPuzzle.groups.forEach(g => {
        const row = document.createElement('div');
        row.className = `solved-banner tier-${g.tier}`;
        row.innerHTML = `
          <div class="solved-header-row">
            <span class="solved-tier-badge">${g.tierLabel}</span>
          </div>
          <h4 class="solved-group-title">${g.category}</h4>
          <p class="solved-items-list">${g.items.join(' • ')}</p>
        `;
        this.dom.gameOverCategories.appendChild(row);
      });
    }

    shareResults() {
      const mistakesUsed = this.maxMistakes - this.mistakesRemaining;
      const tierEmojis = { 1: '🟨', 2: '🟩', 3: '🟧', 4: '🟪' };
      
      let grid = '';
      this.currentPuzzle.groups.forEach(g => {
        grid += (tierEmojis[g.tier] || '🍸').repeat(4) + '\n';
      });

      const text = `Bar Connections 🍸\n${this.currentPuzzle.title}\nMistakes: ${mistakesUsed}/4\n\n${grid}Test your bar instincts!`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          this.showToast('Shift ticket copied to clipboard!');
        }).catch(() => {
          this.showToast('Failed to copy ticket.');
        });
      } else {
        this.showToast('Sharing not supported on this browser.');
      }
    }

    /* ==========================================================================
       9. ARCHIVE & CODEX SYSTEMS
       ========================================================================== */
    renderArchive() {
      this.dom.archiveList.innerHTML = '';
      PUZZLE_DATABASE.forEach((puzzle, idx) => {
        const record = this.storage.data.solvedPuzzles[puzzle.id];
        const isSolved = Boolean(record);

        const card = document.createElement('div');
        card.className = 'archive-shift-card';
        card.innerHTML = `
          <div class="archive-card-meta">
            <span class="archive-num">SHIFT #${idx + 1}</span>
            <h3 class="archive-name">${puzzle.title}</h3>
            <p class="archive-sub">${puzzle.subtitle}</p>
          </div>
          <span class="archive-status-badge ${isSolved ? 'completed' : ''}">
            ${isSolved ? `Mastered (${record.mistakes} err)` : 'Open Shift'}
          </span>
        `;

        card.addEventListener('click', () => {
          this.dom.archiveView.classList.add('hidden');
          this.dom.tabArchive.classList.remove('active');
          this.dom.tabDaily.classList.remove('active');
          this.loadPuzzle(puzzle, false);
        });

        this.dom.archiveList.appendChild(card);
      });
    }

    renderCodex(filter = 'all') {
      const unlocked = this.storage.data.codexUnlocked;
      const totalDisciplines = PUZZLE_DATABASE.reduce((acc, p) => acc + p.groups.length, 0);
      const unlockedCount = Object.keys(unlocked).length;

      this.dom.codexBadge.textContent = `${unlockedCount} / ${totalDisciplines} Mastered`;
      this.dom.codexGrid.innerHTML = '';

      // Consolidate all entries across all puzzles
      let allEntries = [];
      PUZZLE_DATABASE.forEach(p => {
        p.groups.forEach(g => {
          if (!allEntries.some(e => e.category === g.category)) {
            allEntries.push(g);
          }
        });
      });

      if (filter !== 'all') {
        allEntries = allEntries.filter(e => e.tierLabel.toLowerCase().includes(filter.toLowerCase()));
      }

      allEntries.forEach(entry => {
        const isUnlocked = Boolean(unlocked[entry.category]);
        const card = document.createElement('div');
        card.className = `codex-card ${isUnlocked ? '' : 'locked'}`;

        if (isUnlocked) {
          card.innerHTML = `
            <div class="codex-card-header">
              <span class="solved-tier-badge tier-${entry.tier}">${entry.tierLabel}</span>
            </div>
            <h3 class="codex-title">${entry.category}</h3>
            <div class="codex-items">${entry.items.join(' • ')}</div>
            <p class="codex-body">${entry.explanation}</p>
          `;
        } else {
          card.innerHTML = `
            <div class="codex-card-header">
              <span class="solved-tier-badge">UNDISCOVERED</span>
            </div>
            <h3 class="codex-title" style="color: var(--text-muted);">Classified Station Spec</h3>
            <p class="codex-body">Solve this connection in the daily shifts or archive cellar to decode its bartending principles.</p>
          `;
        }

        this.dom.codexGrid.appendChild(card);
      });
    }

    renderStats() {
      const d = this.storage.data;
      this.dom.statPlayed.textContent = d.played;
      const winRate = d.played > 0 ? Math.round((d.wins / d.played) * 100) : 0;
      this.dom.statWinRate.textContent = `${winRate}%`;
      this.dom.statCurrentStreak.textContent = d.currentStreak;
      this.dom.statMaxStreak.textContent = d.maxStreak;

      // Compute Bartender Rank
      const ranks = [
        { min: 0, title: 'Barback Apprentice', desc: 'Learning classic specs and station mechanics.' },
        { min: 2, title: 'Junior Bartender', desc: 'Developing speed, shaker posture, and glassware recall.' },
        { min: 5, title: 'Cocktail Specialist', desc: 'Understands equal-parts balance, dilution, and modifiers.' },
        { min: 8, title: 'Head Bartender', desc: 'Flawless pattern recognition and troubleshooting instincts.' },
        { min: 14, title: 'Master Beverage Director', desc: 'Unmatched cocktail lore, chemistry, and sensory mastery.' }
      ];
      let currentRank = ranks[0];
      for (const r of ranks) {
        if (d.wins >= r.min) currentRank = r;
      }
      this.dom.statRank.textContent = currentRank.title;
      this.dom.statRankDesc.textContent = currentRank.desc;

      // Guess Distribution Graph
      this.dom.guessDistGraph.innerHTML = '';
      const maxVal = Math.max(1, ...Object.values(d.guessDist));

      ['0', '1', '2', '3'].forEach(errKey => {
        const count = d.guessDist[errKey] || 0;
        const pct = Math.max(12, Math.round((count / maxVal) * 100));

        const row = document.createElement('div');
        row.className = 'dist-row';
        row.innerHTML = `
          <span class="dist-label">${errKey} Err</span>
          <div class="dist-bar-track">
            <div class="dist-bar-fill" style="width: ${count > 0 ? pct : 10}%">${count}</div>
          </div>
        `;
        this.dom.guessDistGraph.appendChild(row);
      });
    }

    /* ==========================================================================
       10. MODAL & TOAST MANAGERS
       ========================================================================== */
    showToast(message) {
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = message;

      this.dom.toastContainer.appendChild(toast);

      setTimeout(() => {
        toast.classList.add('toast-fadeout');
        setTimeout(() => toast.remove(), 300);
      }, 2600);
    }

    openModal(modalElement) {
      this.dom.modalOverlay.classList.remove('hidden');
      modalElement.classList.remove('hidden');
    }

    closeAllModals() {
      this.dom.modalOverlay.classList.add('hidden');
      document.querySelectorAll('.modal-dialog').forEach(m => m.classList.add('hidden'));
    }
  }

  // Self-start on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new BarConnectionsApp());
  } else {
    new BarConnectionsApp();
  }
})();