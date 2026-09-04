/**
 * BAR CONNECTIONS — Production Game Engine
 * The Mixologist's Relational Puzzle Game
 * Standalone, Static-Host Architecture (GitHub Pages Ready)
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. CANONICAL PUZZLE CONTENT DATASET
     Exactly 5 playable challenges curated with historical and technical accuracy.
     Each puzzle contains 4 distinct tiers of 4 items (16 total per shift).
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
          explanation: 'The Sour is mixology\'s cornerstone template: strong spirit balanced with fresh citrus (lime or lemon) and a sweetening agent.',
          clue: 'Drinks sharing the holy trinity of spirit, citrus, and sugar.'
        },
        {
          tier: 2,
          category: 'STEMMED SERVICE GLASSWARE',
          tierLabel: 'Technique',
          items: ['COUPE', 'NICK & NORA', 'MARTINI', 'FLUTE'],
          explanation: 'Vessels with elevated stems that prevent the guest\'s hand from warming the chilled, un-iced drink bowl during service.',
          clue: 'Vessels engineered to protect drink temperature via an elevated stem.'
        },
        {
          tier: 3,
          category: 'EQUAL-PARTS ARCHITECTURE (1:1:1)',
          tierLabel: 'Structure',
          items: ['NEGRONI', 'BOULEVARDIER', 'LAST WORD', 'PAPER PLANE'],
          explanation: 'Masterpieces where every component carries identical volume, proving balance through equal botanical weights.',
          clue: 'Cocktails proportioned with exact equal ounces for every ingredient.'
        },
        {
          tier: 4,
          category: 'REFRIGERATE AFTER OPENING',
          tierLabel: 'Master Lore',
          items: ['SWEET VERMOUTH', 'LILLET BLANC', 'DRY VERMOUTH', 'PUNT E MES'],
          explanation: 'Fortified and aromatized wines contain wine bases that oxidize rapidly at room temp. Professional bars keep them chilled.',
          clue: 'Wine-based modifiers that spoil if left on a warm backbar shelf.'
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
          explanation: 'Two-piece shaker systems favored by professional craft bartenders for rapid sealing, thermal conductivity, and instant separation.',
          clue: 'Two-piece shaker vessels without built-in strainer lids.'
        },
        {
          tier: 2,
          category: 'FAST-MELTING / HIGH DILUTION ICE',
          tierLabel: 'Technique',
          items: ['CRUSHED', 'PEBBLE', 'NUGGET', 'SHAVED'],
          explanation: 'High surface-area ice designed to rapidly chill and deliberately dilute strong, high-sugar Tiki drinks, Juleps, and Cobblers.',
          clue: 'Ice cuts crafted specifically to melt rapidly and provide high dilution.'
        },
        {
          tier: 3,
          category: 'BAR STRAINERS',
          tierLabel: 'Structure',
          items: ['HAWTHORNE', 'JULEP', 'FINE MESH', 'CONICAL'],
          explanation: 'Specialized filtering tools: Hawthorne springs catch ice crystals; Julep strainers fit mixing glasses; mesh traps pulp.',
          clue: 'Station implements used to separate liquid from spent ice and fruit solids.'
        },
        {
          tier: 4,
          category: 'CITRUS PREPARATION TOOLS',
          tierLabel: 'Master Lore',
          items: ['CHANNEL KNIFE', 'Y-PEELER', 'ELBOW PRESS', 'CITRUS REAMER'],
          explanation: 'Mise-en-place tools used to harvest fresh citrus juices and express essential oils without extracting bitter white pith.',
          clue: 'Station implements dedicated exclusively to processing lemons, limes, and oranges.'
        }
      ]
    },
    {
      id: 'specimen-3',
      title: 'Aperitivo & Botanicals',
      subtitle: 'Amaro, Anise & Essential Oils',
      groups: [
        {
          tier: 1,
          category: 'RED APERITIVO LIQUEURS',
          tierLabel: 'Foundations',
          items: ['CAMPARI', 'APEROL', 'SELECT', 'CAPPELETTI'],
          explanation: 'Bittersweet Italian aperitivi infused with gentian, rhubarb, and citrus peel that define the modern Spritz and Negroni.',
          clue: 'Bright crimson bittersweet Italian aperitifs.'
        },
        {
          tier: 2,
          category: 'SPIRITS THAT "LOUCHE" WITH WATER',
          tierLabel: 'Technique',
          items: ['ABSINTHE', 'PASTIS', 'OUZO', 'RAKI'],
          explanation: 'Anise-heavy botanical spirits whose insoluble essential oils precipitate when diluted with chilled water, turning milky white.',
          clue: 'Botanical spirits that turn cloudy when chilled water is introduced.'
        },
        {
          tier: 3,
          category: 'CITRUS PEEL GARNISH CUTS',
          tierLabel: 'Structure',
          items: ['EXPRESSED TWIST', 'CITRUS SWATH', 'HORSE\'S NECK', 'FLAMED PEEL'],
          explanation: 'Technical cuts of citrus zest manipulated over cocktail surface tension to release aromatic limonene oils across the drink.',
          clue: 'Methods of cutting and manipulating citrus peel for aromatic top notes.'
        },
        {
          tier: 4,
          category: 'HISTORIC PRE-PROHIBITION SYRUPS',
          tierLabel: 'Master Lore',
          items: ['GOMME SYRUP', 'ORGEAT', 'FALERNUM', 'GRENADINE'],
          explanation: 'Traditional sweeteners: gum arabic for texture, almond/rose for Mai Tais, ginger/clove for punch, and real pomegranate.',
          clue: 'Complex historic sweeteners offering body, oil, and spice beyond refined sugar.'
        }
      ]
    },
    {
      id: 'specimen-4',
      title: 'Thermodynamics & Agitation',
      subtitle: 'Stirring, Texture & Aromatics',
      groups: [
        {
          tier: 1,
          category: 'ALWAYS STIRRED, NEVER SHAKEN',
          tierLabel: 'Foundations',
          items: ['MANHATTAN', 'MARTINI', 'VIEUX CARRÉ', 'HANKY PANKY'],
          explanation: 'Drinks built entirely from spirits and aromatized wines must be stirred to preserve crystal clarity, dense mouthfeel, and zero aeration.',
          clue: 'Spirit-forward classics whose silky mouthfeel demands a barspoon rather than a shaker.'
        },
        {
          tier: 2,
          category: 'SPECIALIZED SHAKING TECHNIQUES',
          tierLabel: 'Technique',
          items: ['DRY SHAKE', 'REVERSE DRY SHAKE', 'WHIP SHAKE', 'ROLLING'],
          explanation: 'Agitation methods tailored for texture: dry shaking emulsifies albumin; whip shaking with crushed ice chills without over-diluting.',
          clue: 'Special mechanical maneuvers behind the stick designed to produce texture.'
        },
        {
          tier: 3,
          category: 'BITTERS ESSENTIAL TO CANON CLASSICS',
          tierLabel: 'Structure',
          items: ['ANGOSTURA', 'PEYCHAUD\'S', 'ORANGE BITTERS', 'BOKER\'S'],
          explanation: 'Potent aromatic tinctures: Angostura anchors Old Fashioneds, Peychaud\'s defines Sazeracs, and orange bitters complete the 19th-century Martini.',
          clue: 'Concentrated botanical alcohol dashes that anchor legendary recipes.'
        },
        {
          tier: 4,
          category: 'CAUSES OF A "FLAT" COCKTAIL',
          tierLabel: 'Master Lore',
          items: ['WARM GLASS', 'OVER-DILUTION', 'STALE JUICE', 'EXHAUSTED SODA'],
          explanation: 'Service diagnosis: warm glasses melt ice prematurely, stale juice loses vibrant acidity, and flat soda extinguishes effervescence.',
          clue: 'Station errors that ruin the crispness and vitality of a served drink.'
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
          explanation: 'Protected Denominations of Origin distilled from cooked agave hearts throughout Jalisco, Oaxaca, Sonora, and neighboring states.',
          clue: 'Spirits born from the harvested piñas of Mexican agave.'
        },
        {
          tier: 2,
          category: 'RUM REGIONAL STYLES',
          tierLabel: 'Technique',
          items: ['AGRICOLE', 'JAMAICAN HIGH-ESTER', 'DEMERARA', 'CACHAÇA'],
          explanation: 'Sugarcane spirits classified by origin: fresh cane juice from Martinique & Brazil versus heavy pot-still molasses from Jamaica & Guyana.',
          clue: 'Cane spirits differentiated by terroir, fermentation style, and still design.'
        },
        {
          tier: 3,
          category: 'DRINKS TOPPED WITH GINGER BEER (BUCKS)',
          tierLabel: 'Structure',
          items: ['MOSCOW MULE', 'DARK \'N STORMY', 'LONDON BUCK', 'EL DIABLO'],
          explanation: 'The Buck family: spirit plus fresh citrus (usually lime) lengthened with effervescent, spicy ginger beer in a highball or copper mug.',
          clue: 'Refreshing highballs lengthened specifically with effervescent ginger beer.'
        },
        {
          tier: 4,
          category: 'WHISKEY STATUTORY PRODUCTION TERMS',
          tierLabel: 'Master Lore',
          items: ['BOTTLED-IN-BOND', 'SINGLE MALT', 'BARREL PROOF', 'SOUR MASH'],
          explanation: 'Strict legal definitions governed by distilling laws regarding bonded warehouses, single-facility batches, and undiluted bottling.',
          clue: 'Federal and international legal classifications printed on whiskey labels.'
        }
      ]
    }
  ];

  /* ==========================================================================
     2. DATA VALIDATION SUITE
     Guarantees database integrity at startup.
     ========================================================================== */
  function validatePuzzleDatabase(dataset) {
    if (!Array.isArray(dataset) || dataset.length !== 5) {
      throw new Error(`Bar Connections requires exactly 5 playable shifts. Found: ${dataset ? dataset.length : 0}`);
    }

    const seenIds = new Set();

    dataset.forEach((puzzle, pIdx) => {
      if (!puzzle.id || seenIds.has(puzzle.id)) {
        throw new Error(`Puzzle at index ${pIdx} has invalid or duplicate id: ${puzzle.id}`);
      }
      seenIds.add(puzzle.id);

      if (!puzzle.title || !puzzle.subtitle || !Array.isArray(puzzle.groups) || puzzle.groups.length !== 4) {
        throw new Error(`Puzzle "${puzzle.id}" must possess title, subtitle, and exactly 4 groups.`);
      }

      const allItemsInPuzzle = new Set();

      puzzle.groups.forEach((group, gIdx) => {
        if (!group.category || !group.tier || !group.tierLabel || !group.explanation || !group.clue) {
          throw new Error(`Group ${gIdx} in puzzle "${puzzle.id}" has missing metadata properties.`);
        }
        if (!Array.isArray(group.items) || group.items.length !== 4) {
          throw new Error(`Group "${group.category}" in puzzle "${puzzle.id}" must contain exactly 4 items.`);
        }

        group.items.forEach(item => {
          if (!item || typeof item !== 'string') {
            throw new Error(`Invalid item in group "${group.category}" in puzzle "${puzzle.id}".`);
          }
          if (allItemsInPuzzle.has(item)) {
            throw new Error(`Duplicate item "${item}" found within puzzle "${puzzle.id}".`);
          }
          allItemsInPuzzle.add(item);
        });
      });

      if (allItemsInPuzzle.size !== 16) {
        throw new Error(`Puzzle "${puzzle.id}" contains ${allItemsInPuzzle.size} unique items instead of 16.`);
      }
    });

    return true;
  }

  // Execute database verification
  validatePuzzleDatabase(PUZZLE_DATABASE);

  /* ==========================================================================
     3. HIGH-PRECISION SOUND ENGINE (Web Audio API Synthesizer)
     Pure synthesized acoustics. Zero external assets, zero latency.
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
        console.warn('AudioContext initialization bypassed:', e);
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

    // High glass tap
    playSelect() {
      if (this.isMuted || !this.ctx) return;
      this.resumeContext();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(560, now);
      osc.frequency.exponentialRampToValueAtTime(820, now + 0.04);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    }

    // Subtler wood deselect tap
    playDeselect() {
      if (this.isMuted || !this.ctx) return;
      this.resumeContext();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.04);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    }

    // Double chime notice
    playNearMiss() {
      if (this.isMuted || !this.ctx) return;
      this.resumeContext();
      const notes = [440, 523.25];
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = now + idx * 0.07;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.09, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.15);
      });
    }

    // Muted low thud for mistake
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

    // Crystal harmonic toast
    playSolvedGroup() {
      if (this.isMuted || !this.ctx) return;
      this.resumeContext();
      const chord = [523.25, 659.25, 783.99, 1046.5];
      const now = this.ctx.currentTime;

      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.05;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.11, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    }

    // Shift complete fanfare
    playVictory() {
      if (this.isMuted || !this.ctx) return;
      this.resumeContext();
      const fanfare = [392, 523.25, 659.25, 783.99, 1046.5, 1318.5];
      const now = this.ctx.currentTime;

      fanfare.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = now + idx * 0.07;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.13, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.45);
      });
    }
  }

  /* ==========================================================================
     4. PERSISTENCE & LOCAL STORAGE ADAPTER
     ========================================================================== */
  class GameStorage {
    constructor() {
      this.STORAGE_KEY = 'bar_connections_v2';
      this.data = this.load();
    }

    load() {
      const defaultState = {
        played: 0,
        wins: 0,
        currentStreak: 0,
        maxStreak: 0,
        lastDailyDate: null,
        solvedPuzzles: {}, // puzzleId -> { mistakes: number, timestamp: number }
        codexUnlocked: {}, // categoryName -> groupData
        guessDist: { '0': 0, '1': 0, '2': 0, '3': 0 },
        soundMuted: false
      };

      try {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          return { ...defaultState, ...parsed };
        }
      } catch (e) {
        console.warn('Storage read fallback:', e);
      }
      return defaultState;
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
        this.data.lastDailyDate = new Date().toISOString().slice(0, 10);
      }

      this.data.solvedPuzzles[puzzleId] = {
        mistakes: mistakesUsed,
        timestamp: Date.now()
      };

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
        this.data.lastDailyDate = new Date().toISOString().slice(0, 10);
      }

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
     5. MAIN APPLICATION CONTROLLER
     ========================================================================== */
  class BarConnectionsGame {
    constructor() {
      this.sound = new SoundEngine();
      this.storage = new GameStorage();

      this.currentPuzzle = null;
      this.isDailyMode = true;
      this.remainingCards = [];
      this.selectedCards = [];
      this.solvedGroups = [];
      this.mistakesRemaining = 4;
      this.maxMistakes = 4;
      this.isGameOver = false;
      this.historyGuesses = [];
      this.hintIndex = 0;

      this.cacheDOMElements();
      this.bindEvents();
      this.initDailyPuzzle();
      this.renderCodex();
    }

    cacheDOMElements() {
      this.dom = {
        // App header controls
        btnSound: document.getElementById('btn-sound'),
        soundOnIcon: document.querySelector('.sound-on-icon'),
        soundOffIcon: document.querySelector('.sound-off-icon'),
        btnHowToPlay: document.getElementById('btn-how-to-play'),
        btnStats: document.getElementById('btn-stats'),
        btnCodex: document.getElementById('btn-codex'),
        tabDaily: document.getElementById('tab-daily'),
        tabArchive: document.getElementById('tab-archive'),

        // Puzzle header
        puzzleBadge: document.getElementById('puzzle-badge'),
        puzzleTitle: document.getElementById('puzzle-title'),
        puzzleSubtitle: document.getElementById('puzzle-subtitle'),
        mistakesIndicator: document.getElementById('mistakes-indicator'),
        toastContainer: document.getElementById('toast-container'),

        // Game board
        solvedGroupsContainer: document.getElementById('solved-groups-container'),
        cardsGrid: document.getElementById('cards-grid'),

        // Station dock buttons
        btnShuffle: document.getElementById('btn-shuffle'),
        btnDeselect: document.getElementById('btn-deselect'),
        btnHint: document.getElementById('btn-hint'),
        btnSubmit: document.getElementById('btn-submit'),

        // Panels & views
        gameView: document.getElementById('game-view'),
        archiveView: document.getElementById('archive-view'),
        codexView: document.getElementById('codex-view'),
        archiveList: document.getElementById('archive-list'),
        codexGrid: document.getElementById('codex-grid'),
        codexFilters: document.getElementById('codex-filters'),
        codexProgressBadge: document.getElementById('codex-progress-badge'),
        modalOverlay: document.getElementById('modal-overlay'),

        // Modals
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

        // Game Over modal elements
        verdictRank: document.getElementById('verdict-rank'),
        verdictHeadline: document.getElementById('verdict-headline'),
        verdictSub: document.getElementById('verdict-sub'),
        gameOverCategories: document.getElementById('game-over-categories'),
        btnShare: document.getElementById('btn-share'),
        btnReviewCodex: document.getElementById('btn-review-codex')
      };

      // Sound initial state sync
      if (this.storage.data.soundMuted) {
        this.sound.isMuted = true;
        this.dom.soundOnIcon.classList.add('hidden');
        this.dom.soundOffIcon.classList.remove('hidden');
      }
    }

    bindEvents() {
      // Audio unlock on user touch/click
      const unlockAudio = () => {
        this.sound.init();
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
      };
      window.addEventListener('click', unlockAudio, { once: true });
      window.addEventListener('touchstart', unlockAudio, { once: true });

      // Sound toggle
      this.dom.btnSound.addEventListener('click', () => {
        const muted = this.sound.toggleMute();
        this.storage.data.soundMuted = muted;
        this.storage.save();
        this.dom.soundOnIcon.classList.toggle('hidden', muted);
        this.dom.soundOffIcon.classList.toggle('hidden', !muted);
      });

      // Navigation & Modals
      this.dom.btnHowToPlay.addEventListener('click', () => this.openModal(this.dom.modalHowToPlay));
      this.dom.btnStats.addEventListener('click', () => {
        this.renderStats();
        this.openModal(this.dom.modalStats);
      });
      this.dom.btnCodex.addEventListener('click', () => {
        this.renderCodex();
        this.dom.codexView.classList.remove('hidden');
        this.dom.codexView.setAttribute('aria-hidden', 'false');
      });

      // Close handlers
      document.querySelectorAll('[data-close-modal]').forEach(btn => {
        btn.addEventListener('click', () => this.closeAllModals());
      });

      document.querySelectorAll('.close-panel-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const panelId = btn.getAttribute('data-close');
          const panel = document.getElementById(panelId);
          if (panel) {
            panel.classList.add('hidden');
            panel.setAttribute('aria-hidden', 'true');
          }
        });
      });

      this.dom.modalOverlay.addEventListener('click', () => this.closeAllModals());

      // Tabs
      this.dom.tabDaily.addEventListener('click', () => {
        this.dom.tabDaily.classList.add('active');
        this.dom.tabDaily.setAttribute('aria-selected', 'true');
        this.dom.tabArchive.classList.remove('active');
        this.dom.tabArchive.setAttribute('aria-selected', 'false');
        this.dom.archiveView.classList.add('hidden');
        this.dom.archiveView.setAttribute('aria-hidden', 'true');
        this.dom.codexView.classList.add('hidden');
        this.dom.codexView.setAttribute('aria-hidden', 'true');
        this.isDailyMode = true;
        this.initDailyPuzzle();
      });

      this.dom.tabArchive.addEventListener('click', () => {
        this.dom.tabArchive.classList.add('active');
        this.dom.tabArchive.setAttribute('aria-selected', 'true');
        this.dom.tabDaily.classList.remove('active');
        this.dom.tabDaily.setAttribute('aria-selected', 'false');
        this.renderArchive();
        this.dom.archiveView.classList.remove('hidden');
        this.dom.archiveView.setAttribute('aria-hidden', 'false');
      });

      // In-game board buttons
      this.dom.btnShuffle.addEventListener('click', () => this.shuffleCards());
      this.dom.btnDeselect.addEventListener('click', () => this.deselectAllCards());
      this.dom.btnHint.addEventListener('click', () => this.requestBartenderHint());
      this.dom.btnSubmit.addEventListener('click', () => this.submitGuess());

      // Post-game actions
      this.dom.btnShare.addEventListener('click', () => this.shareResults());
      this.dom.btnReviewCodex.addEventListener('click', () => {
        this.closeAllModals();
        this.renderCodex();
        this.dom.codexView.classList.remove('hidden');
        this.dom.codexView.setAttribute('aria-hidden', 'false');
      });

      // Codex category filters
      this.dom.codexFilters.addEventListener('click', (e) => {
        const pill = e.target.closest('.filter-pill');
        if (!pill) return;
        this.dom.codexFilters.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.renderCodex(pill.getAttribute('data-filter'));
      });

      // Keyboard Esc support
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeAllModals();
          this.dom.archiveView.classList.add('hidden');
          this.dom.archiveView.setAttribute('aria-hidden', 'true');
          this.dom.codexView.classList.add('hidden');
          this.dom.codexView.setAttribute('aria-hidden', 'true');
        }
      });
    }

    /* ==========================================================================
       6. PUZZLE LIFECYCLE & BOARD INITIALIZATION
       ========================================================================== */
    initDailyPuzzle() {
      // Deterministic calendar daily calculation
      const now = new Date();
      const startOfYear = new Date(now.getFullYear(), 0, 0);
      const diff = now - startOfYear;
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

      // Update Header Text
      this.dom.puzzleBadge.textContent = isDaily ? 'DAILY SHIFT SPECIMEN' : 'ARCHIVE CELLAR SHIFT';
      this.dom.puzzleTitle.textContent = puzzle.title;
      this.dom.puzzleSubtitle.textContent = puzzle.subtitle;

      // Collect all 16 items and randomize positions
      let allItems = [];
      puzzle.groups.forEach(group => {
        allItems.push(...group.items);
      });
      this.remainingCards = this.shuffleArray([...allItems]);

      this.renderMistakes();
      this.renderSolvedGroups();
      this.renderCardsGrid();
      this.updateActionButtons();
    }

    shuffleArray(array) {
      const copy = [...array];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }

    /* ==========================================================================
       7. UI RENDERING & ERGONOMICS
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
            <span class="solved-tier-badge">${this.escapeHTML(group.tierLabel)}</span>
          </div>
          <h3 class="solved-group-title">${this.escapeHTML(group.category)}</h3>
          <p class="solved-items-list">${this.escapeHTML(group.items.join(' • '))}</p>
          <p class="solved-desc">${this.escapeHTML(group.explanation)}</p>
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
        const isSelected = this.selectedCards.includes(item);
        tile.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
        
        if (isSelected) {
          tile.classList.add('selected');
        }

        tile.innerHTML = `<span class="card-text">${this.escapeHTML(item)}</span>`;
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
        // Select
        if (this.selectedCards.length >= 4) {
          this.showToast('You can only choose 4 cards at a time.');
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
      if (this.selectedCards.length === 0) return;
      this.selectedCards = [];
      this.dom.cardsGrid.querySelectorAll('.card-tile').forEach(t => {
        t.classList.remove('selected');
        t.setAttribute('aria-pressed', 'false');
      });
      this.sound.playDeselect();
      this.updateActionButtons();
    }

    shuffleCards() {
      if (this.remainingCards.length <= 1) return;
      this.remainingCards = this.shuffleArray(this.remainingCards);
      this.sound.playSelect();
      this.renderCardsGrid();
    }

    requestBartenderHint() {
      if (this.isGameOver) return;

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
     8. DEDUCTION & EVALUATION ENGINE
     ========================================================================== */
    submitGuess() {
      if (this.selectedCards.length !== 4 || this.isGameOver) return;

      const signature = [...this.selectedCards].sort().join('|');
      if (this.historyGuesses.includes(signature)) {
        this.showToast('Already tried this combination!');
        this.sound.playDeselect();
        this.shakeSelectedTiles();
        return;
      }
      this.historyGuesses.push(signature);

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
        this.handleCorrectGuess(matchedGroup);
      } else {
        this.handleIncorrectGuess(nearMissGroup);
      }
    }

    handleCorrectGuess(group) {
      this.sound.playSolvedGroup();
      this.solvedGroups.push(group);

      const selectedTiles = this.dom.cardsGrid.querySelectorAll('.card-tile.selected');
      selectedTiles.forEach(tile => tile.classList.add('pop-out'));

      setTimeout(() => {
        this.remainingCards = this.remainingCards.filter(c => !group.items.includes(c));
        this.selectedCards = [];
        this.renderSolvedGroups();
        this.renderCardsGrid();
        this.updateActionButtons();

        if (this.solvedGroups.length === 4) {
          this.handleVictory();
        }
      }, 340);
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
        this.showToast('Not a matching set. Look out for distractors.');
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
     9. VICTORY & DEFEAT WORKFLOWS
     ========================================================================== */
    handleVictory() {
      this.isGameOver = true;
      this.sound.playVictory();

      const mistakesUsed = this.maxMistakes - this.mistakesRemaining;
      this.storage.recordWin(this.currentPuzzle.id, mistakesUsed, this.isDailyMode, this.currentPuzzle.groups);

      setTimeout(() => {
        const headlines = ['FLAWLESS POUR', 'EXCELLENT BALANCE', 'SOLID SHIFT', 'SAVED AT LAST CALL'];
        const ranks = ['Clean Sweep', 'Expert Mixologist', 'Senior Bartender', 'Shift Survivor'];

        this.dom.verdictRank.textContent = ranks[mistakesUsed] || 'Shift Completed';
        this.dom.verdictHeadline.textContent = headlines[mistakesUsed] || 'Service Concluded';
        this.dom.verdictSub.textContent = mistakesUsed === 0
          ? 'Zero mistakes. Unrivaled recipe recall and station precision.'
          : `Shift mastered with ${mistakesUsed} spilled chance${mistakesUsed > 1 ? 's' : ''}.`;

        this.renderGameOverCategories();
        this.openModal(this.dom.modalGameOver);
      }, 500);
    }

    handleDefeat() {
      this.isGameOver = true;
      this.sound.playMistake();
      this.storage.recordLoss(this.currentPuzzle.id, this.isDailyMode, this.currentPuzzle.groups);

      this.solvedGroups = [...this.currentPuzzle.groups];
      this.remainingCards = [];
      this.renderSolvedGroups();
      this.renderCardsGrid();

      this.dom.verdictRank.textContent = 'STATION OVERWHELMED';
      this.dom.verdictHeadline.textContent = 'Shift Ended';
      this.dom.verdictSub.textContent = 'Every mistake teaches mixology architecture. Review the completed specs:';

      this.renderGameOverCategories();
      this.openModal(this.dom.modalGameOver);
    }

    renderGameOverCategories() {
      this.dom.gameOverCategories.innerHTML = '';
      this.currentPuzzle.groups.forEach(g => {
        const card = document.createElement('div');
        card.className = `solved-banner tier-${g.tier}`;
        card.innerHTML = `
          <div class="solved-header-row">
            <span class="solved-tier-badge">${this.escapeHTML(g.tierLabel)}</span>
          </div>
          <h4 class="solved-group-title">${this.escapeHTML(g.category)}</h4>
          <p class="solved-items-list">${this.escapeHTML(g.items.join(' • '))}</p>
        `;
        this.dom.gameOverCategories.appendChild(card);
      });
    }

    shareResults() {
      const mistakesUsed = this.maxMistakes - this.mistakesRemaining;
      const tierEmojis = { 1: '🟨', 2: '🟩', 3: '🟧', 4: '🟪' };
      
      let grid = '';
      this.currentPuzzle.groups.forEach(g => {
        grid += (tierEmojis[g.tier] || '🍸').repeat(4) + '\n';
      });

      const text = `Bar Connections 🍸\n${this.currentPuzzle.title}\nScore: ${mistakesUsed}/4 Mistakes\n\n${grid}Test your bar instincts!`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          this.showToast('Shift ticket copied to clipboard!');
        }).catch(() => {
          this.showToast('Clipboard copy failed.');
        });
      } else {
        this.showToast('Clipboard sharing not supported on this device.');
      }
    }

    /* ==========================================================================
     10. ARCHIVE CELLAR & CODEX
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
            <h3 class="archive-name">${this.escapeHTML(puzzle.title)}</h3>
            <p class="archive-sub">${this.escapeHTML(puzzle.subtitle)}</p>
          </div>
          <span class="archive-status-badge ${isSolved ? 'completed' : ''}">
            ${isSolved ? `Mastered (${record.mistakes} err)` : 'Open Shift'}
          </span>
        `;

        card.addEventListener('click', () => {
          this.dom.archiveView.classList.add('hidden');
          this.dom.archiveView.setAttribute('aria-hidden', 'true');
          this.dom.tabArchive.classList.remove('active');
          this.dom.tabArchive.setAttribute('aria-selected', 'false');
          this.dom.tabDaily.classList.remove('active');
          this.dom.tabDaily.setAttribute('aria-selected', 'false');
          this.loadPuzzle(puzzle, false);
        });

        this.dom.archiveList.appendChild(card);
      });
    }

    renderCodex(filter = 'all') {
      const unlocked = this.storage.data.codexUnlocked;
      const totalDisciplines = PUZZLE_DATABASE.reduce((sum, p) => sum + p.groups.length, 0);
      const unlockedCount = Object.keys(unlocked).length;

      this.dom.codexProgressBadge.textContent = `${unlockedCount} / ${totalDisciplines} Unlocked`;
      this.dom.codexGrid.innerHTML = '';

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
              <span class="solved-tier-badge tier-${entry.tier}">${this.escapeHTML(entry.tierLabel)}</span>
            </div>
            <h3 class="codex-title">${this.escapeHTML(entry.category)}</h3>
            <div class="codex-items">${this.escapeHTML(entry.items.join(' • '))}</div >
            <p class="codex-body">${this.escapeHTML(entry.explanation)}</p>
          `;
        } else {
          card.innerHTML = `
            <div class="codex-card-header">
              <span class="solved-tier-badge">UNDISCOVERED</span>
            </div>
            <h3 class="codex-title" style="color: var(--text-muted);">Confidential House Spec</h3>
            <p class="codex-body">Solve this connection in the Daily Shift or Archive Cellar to unlock its mixology specs.</p>
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

      const ranks = [
        { min: 0, title: 'Barback Apprentice', desc: 'Learning fundamental recipes and station mechanics.' },
        { min: 2, title: 'Junior Bartender', desc: 'Developing speed, shaker posture, and glassware recall.' },
        { min: 4, title: 'Cocktail Specialist', desc: 'Understands equal-parts balance, dilution, and modifiers.' },
        { min: 7, title: 'Head Bartender', desc: 'Superior pattern recognition, troubleshooting, and speed.' },
        { min: 10, title: 'Master Beverage Director', desc: 'Unmatched cocktail lore, chemistry, and sensory mastery.' }
      ];

      let currentRank = ranks[0];
      for (const r of ranks) {
        if (d.wins >= r.min) currentRank = r;
      }
      this.dom.statRank.textContent = currentRank.title;
      this.dom.statRankDesc.textContent = currentRank.desc;

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
     11. MODAL & NOTIFICATION MANAGERS
     ========================================================================== */
    showToast(message) {
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = message;

      this.dom.toastContainer.appendChild(toast);

      setTimeout(() => {
        toast.classList.add('toast-fadeout');
        setTimeout(() => toast.remove(), 260);
      }, 2500);
    }

    openModal(modalElement) {
      this.dom.modalOverlay.classList.remove('hidden');
      this.dom.modalOverlay.setAttribute('aria-hidden', 'false');
      modalElement.classList.remove('hidden');
      modalElement.setAttribute('aria-hidden', 'false');
    }

    closeAllModals() {
      this.dom.modalOverlay.classList.add('hidden');
      this.dom.modalOverlay.setAttribute('aria-hidden', 'true');
      document.querySelectorAll('.modal-dialog').forEach(m => {
        m.classList.add('hidden');
        m.setAttribute('aria-hidden', 'true');
      });
    }

    escapeHTML(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  }

  // Application Start on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new BarConnectionsGame());
  } else {
    new BarConnectionsGame();
  }
})();