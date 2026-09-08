/**
 * COCKTAIL CONNECTIONS — ENGINE CONTROLLER
 * Architecture:
 * - Standalone Modern Main Menu + Active Game + Vault views.
 * - Deterministic, append-safe calendar release & historical Vault preservation.
 * - Epoch Anchor: 8 September 2026 = Day 0 (Today: puzzle 0, Vault: 0).
 * - Versioned persistent state management with localStorage corruption fallback.
 * - Procedural cocktail garnish vector background engine with dynamic density.
 * - Pure Web Audio API synthetic cocktail sound effects (zero audio assets).
 * - Full NYT-style Connections gameplay rules (4 lives, 'One away...', auto-reveal on loss).
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. CONSTANTS & SYSTEM CONFIGURATION
  // -------------------------------------------------------------------------
  const STORAGE_KEY = 'COCKTAIL_CONNECTIONS_SAVE_V2';
  const SOUND_KEY = 'COCKTAIL_PLATFORM_SOUND_V1';
  const MAX_MISTAKES = 4;

  // Platform Release Anchor: 8 September 2026 is DAY 0
  const EPOCH_YEAR = 2026;
  const EPOCH_MONTH = 8; // September (0-indexed: January = 0, September = 8)
  const EPOCH_DAY = 8;
  const EPOCH_UTC_TIME = Date.UTC(EPOCH_YEAR, EPOCH_MONTH, EPOCH_DAY);

  const CATEGORY_COLOR_MAP = {
    yellow: 'cat-yellow',
    green: 'cat-green',
    blue: 'cat-blue',
    purple: 'cat-purple'
  };

  const CATEGORY_EMOJI_MAP = {
    yellow: '🟨',
    green: '🟩',
    blue: '🟦',
    purple: '🟪'
  };

  // -------------------------------------------------------------------------
  // 2. PROCEDURAL COCKTAIL GARNISH BACKGROUND SYSTEM
  // -------------------------------------------------------------------------
  class GarnishEngine {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      this.activeIcons = [];
      this.targetCount = 4; // Default target for menu
      this.spawnTimer = null;
      this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Fine-line gold garnish vector definitions
      this.garnishes = [
        // 1. Lemon / Citrus Wheel
        `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="24" cy="24" r="20"></circle>
          <circle cx="24" cy="24" r="16.5" stroke-dasharray="2 2"></circle>
          <circle cx="24" cy="24" r="3.5"></circle>
          <line x1="24" y1="7.5" x2="24" y2="20.5"></line>
          <line x1="24" y1="27.5" x2="24" y2="40.5"></line>
          <line x1="7.5" y1="24" x2="20.5" y2="24"></line>
          <line x1="27.5" y1="24" x2="40.5" y2="24"></line>
          <line x1="12.3" y1="12.3" x2="21.5" y2="21.5"></line>
          <line x1="26.5" y1="26.5" x2="35.7" y2="35.7"></line>
          <line x1="35.7" y1="12.3" x2="26.5" y2="21.5"></line>
          <line x1="21.5" y1="26.5" x2="12.3" y2="35.7"></line>
        </svg>`,

        // 2. Expressed Orange Peel Spiral / Twist
        `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10 38C14 42 22 41 28 35C35 28 38 18 31 11C25 5 15 8 13 16C11 24 20 28 27 25C33 22 37 16 36 10"></path>
          <path d="M13 36C18 39 24 37 29 32" stroke-width="1.2" stroke-dasharray="2 3"></path>
        </svg>`,

        // 3. Cocktail Olive on Pick
        `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <line x1="6" y1="42" x2="42" y2="6"></line>
          <ellipse cx="24" cy="24" rx="10" ry="14" transform="rotate(-45 24 24)"></ellipse>
          <ellipse cx="24" cy="24" rx="3.5" ry="4.5" transform="rotate(-45 24 24)" stroke-dasharray="2 1.5"></ellipse>
        </svg>`,

        // 4. Fresh Mint Sprig
        `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M24 42V10"></path>
          <path d="M24 26C16 26 12 18 12 18C12 18 20 16 24 22"></path>
          <path d="M24 22C32 22 36 14 36 14C36 14 28 12 24 18"></path>
          <path d="M24 34C18 34 14 28 14 28C14 28 21 26 24 30"></path>
          <path d="M24 30C30 30 34 24 34 24C34 24 27 22 24 26"></path>
          <path d="M24 10C21 6 24 2 24 2C24 2 27 6 24 10"></path>
        </svg>`,

        // 5. Rosemary Needle Sprig
        `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M24 44V4"></path>
          <line x1="24" y1="36" x2="14" y2="30"></line>
          <line x1="24" y1="36" x2="34" y2="30"></line>
          <line x1="24" y1="28" x2="13" y2="21"></line>
          <line x1="24" y1="28" x2="35" y2="21"></line>
          <line x1="24" y1="20" x2="15" y2="13"></line>
          <line x1="24" y1="20" x2="33" y2="13"></line>
          <line x1="24" y1="12" x2="17" y2="6"></line>
          <line x1="24" y1="12" x2="31" y2="6"></line>
        </svg>`,

        // 6. Cocktail Cherries with Stems
        `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="16" cy="34" r="8"></circle>
          <circle cx="32" cy="31" r="8"></circle>
          <path d="M16 26C18 16 26 8 30 6"></path>
          <path d="M32 23C30 15 28 10 30 6"></path>
          <path d="M28 8C33 8 37 11 38 14" stroke-width="1.2"></path>
        </svg>`
      ];

      if (!this.isReducedMotion) {
        this.startSpawning();
      }
    }

    setMode(mode) {
      // Menu: 3-5 visible icons. Game: 1-2 visible icons.
      this.targetCount = (mode === 'game') ? 1 : 4;
    }

    startSpawning() {
      // Initial burst
      for (let i = 0; i < this.targetCount; i++) {
        setTimeout(() => this.spawnOne(true), i * 1800);
      }

      this.spawnTimer = setInterval(() => {
        if (this.activeIcons.length < this.targetCount) {
          this.spawnOne(false);
        }
      }, 2600);
    }

    spawnOne(isInitialBurst) {
      if (!this.container) return;

      const el = document.createElement('div');
      el.className = 'garnish-item';

      const randomSVG = this.garnishes[Math.floor(Math.random() * this.garnishes.length)];
      el.innerHTML = randomSVG;

      // Varied visual sizing: 38px to 54px
      const size = Math.floor(Math.random() * 16) + 38;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;

      // Varied horizontal positioning (5% to 88%)
      const leftPercent = Math.floor(Math.random() * 83) + 5;
      el.style.left = `${leftPercent}%`;

      // Varied animation duration: 16s to 26s
      const duration = (Math.random() * 10 + 16).toFixed(1);
      el.style.animationDuration = `${duration}s`;

      // If initial burst, offset animation delay to distribute across screen height
      if (isInitialBurst) {
        const negativeDelay = -(Math.random() * (duration * 0.75)).toFixed(1);
        el.style.animationDelay = `${negativeDelay}s`;
      }

      this.container.appendChild(el);
      this.activeIcons.push(el);

      el.addEventListener('animationend', () => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
        this.activeIcons = this.activeIcons.filter(item => item !== el);
      });
    }
  }

  // -------------------------------------------------------------------------
  // 3. SYNTHETIC WEB AUDIO ENGINE (Zero external sound files)
  // -------------------------------------------------------------------------
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.enabled = localStorage.getItem(SOUND_KEY) !== 'false';
    }

    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      localStorage.setItem(SOUND_KEY, this.enabled ? 'true' : 'false');
      return this.enabled;
    }

    playTap() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    }

    playDeselect() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(280, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    }

    playShuffle() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      // Synthesize quick cocktail shaker ice rattle
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.09);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2400, this.ctx.currentTime);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
    }

    playSuccess() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.07);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.07 + 0.28);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.07);
        osc.stop(this.ctx.currentTime + idx * 0.07 + 0.3);
      });
    }

    playOneAway() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const notes = [493.88, 466.16]; // B4 down to Bb4
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.11);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime + idx * 0.11);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.11 + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.11);
        osc.stop(this.ctx.currentTime + idx * 0.11 + 0.2);
      });
    }

    playError() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, this.ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    }
  }

  // -------------------------------------------------------------------------
  // 4. DETERMINISTIC DAILY SCHEDULER & ARCHIVE VAULT
  // -------------------------------------------------------------------------
  class ScheduleManager {
    constructor(database) {
      this.db = database;
    }

    /**
     * Determines current deterministic Day Number (0-based) relative to 8 September 2026.
     * On 8 September 2026: Day 0. Today = puzzle 0, Vault = 0 items.
     * On 9 September 2026: Day 1. Today = puzzle 1, Vault = 1 item (puzzle 0).
     * For pre-launch development/testing, returns 0 so Day 0 is immediately active.
     */
    getCurrentDayNumber() {
      const now = new Date();
      const todayUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
      const diffDays = Math.floor((todayUTC - EPOCH_UTC_TIME) / (1000 * 60 * 60 * 24));
      return Math.max(0, diffDays);
    }

    /**
     * Deterministic, append-safe puzzle resolution.
     * Ensures newly appended puzzles in puzzles.js expand the queue without
     * shifting historical dates or breaking Vault completion history.
     */
    getPuzzleForDay(dayNumber) {
      const puzzles = this.db.puzzles;
      if (!puzzles || puzzles.length === 0) return null;

      if (dayNumber < puzzles.length) {
        return puzzles[dayNumber];
      }

      // Safe wraparound when sequence exceeds array length
      const rolloverIndex = dayNumber % puzzles.length;
      return puzzles[rolloverIndex];
    }

    /**
     * The Vault strictly contains only puzzles released prior to today.
     * Day 0: 0 in Vault.
     * Day 1: 1 in Vault (Day 0).
     * Day N: N in Vault (Days 0 to N-1).
     * Future puzzles are never accessible.
     */
    getReleasedVaultPuzzles() {
      const currentDay = this.getCurrentDayNumber();
      const list = [];
      for (let day = 0; day < currentDay; day++) {
        const puzzle = this.getPuzzleForDay(day);
        if (puzzle) {
          list.push({ dayNumber: day, puzzle });
        }
      }
      return list.reverse(); // Newest past day first
    }
  }

  // -------------------------------------------------------------------------
  // 5. VERSIONED PERSISTENT STORAGE CONTROLLER
  // -------------------------------------------------------------------------
  class StorageManager {
    constructor() {
      this.state = this.load();
    }

    load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return this.getDefault();
        const parsed = JSON.parse(raw);
        if (!parsed.version || parsed.version !== 2) return this.getDefault();
        return parsed;
      } catch (err) {
        return this.getDefault();
      }
    }

    save() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (err) {
        // Storage write protected or quota exceeded
      }
    }

    getDefault() {
      return {
        version: 2,
        stats: {
          played: 0,
          won: 0,
          currentStreak: 0,
          maxStreak: 0,
          zeroMistakes: 0,
          lastPlayedDay: null
        },
        games: {} // [puzzleId]: { isComplete, isWin, mistakesRemaining, solvedCategories, guessHistory, hasRecordedStats }
      };
    }

    getGameState(puzzleId) {
      return this.state.games[puzzleId] || null;
    }

    setGameState(puzzleId, data) {
      this.state.games[puzzleId] = data;
      this.save();
    }

    recordResult(dayNumber, isWin, mistakesLeft) {
      const s = this.state.stats;
      s.played++;
      if (isWin) {
        s.won++;
        // Maintain daily streak only if sequential
        if (s.lastPlayedDay === null || s.lastPlayedDay === dayNumber - 1) {
          s.currentStreak++;
        } else if (s.lastPlayedDay !== dayNumber) {
          s.currentStreak = 1;
        }

        if (s.currentStreak > s.maxStreak) {
          s.maxStreak = s.currentStreak;
        }

        if (mistakesLeft === MAX_MISTAKES) {
          s.zeroMistakes++;
        }
      } else {
        s.currentStreak = 0;
      }
      s.lastPlayedDay = dayNumber;
      this.save();
    }
  }

  // -------------------------------------------------------------------------
  // 6. CONNECTIONS MASTER APPLICATION ENGINE
  // -------------------------------------------------------------------------
  class ConnectionsApp {
    constructor() {
      this.sound = new SoundEngine();
      this.scheduler = new ScheduleManager(window.COCKTAIL_PUZZLES_DATA);
      this.storage = new StorageManager();
      this.garnish = new GarnishEngine('garnish-container');

      this.currentDay = this.scheduler.getCurrentDayNumber();
      this.activeDay = this.currentDay;
      this.activePuzzle = this.scheduler.getPuzzleForDay(this.activeDay);

      // Active gameplay session state
      this.selectedWords = [];
      this.unsolvedTiles = [];
      this.solvedCategories = [];
      this.mistakesRemaining = MAX_MISTAKES;
      this.guessHistory = [];
      this.isComplete = false;

      this.cacheDOM();
      this.bindEvents();
      this.updateSoundDisplay();
      this.updateMenuTodayCard();
      this.startMidnightWatcher();

      // Start on the dedicated Main Menu screen
      this.switchScreen('menu');
    }

    cacheDOM() {
      this.dom = {
        // Screens
        screenMenu: document.getElementById('screen-menu'),
        screenGame: document.getElementById('screen-game'),
        screenVault: document.getElementById('screen-vault'),

        // Main Menu Hero Elements
        menuDayPill: document.getElementById('menu-day-pill'),
        menuDiffPill: document.getElementById('menu-diff-pill'),
        menuPuzzleTitle: document.getElementById('menu-puzzle-title'),
        menuPuzzleCurriculum: document.getElementById('menu-puzzle-curriculum'),
        menuStatusText: document.getElementById('menu-status-text'),
        btnPlayToday: document.getElementById('btn-play-today'),
        btnPlayTodayText: document.getElementById('btn-play-today-text'),
        menuVaultSub: document.getElementById('menu-vault-sub'),

        // Menu Navigation Buttons
        btnMenuVault: document.getElementById('btn-menu-vault'),
        btnMenuStats: document.getElementById('btn-menu-stats'),
        btnMenuHelp: document.getElementById('btn-menu-help'),
        btnMenuSound: document.getElementById('btn-menu-sound'),
        menuSoundText: document.getElementById('menu-sound-text'),
        menuSoundIconOn: document.getElementById('menu-sound-icon-on'),
        menuSoundIconOff: document.getElementById('menu-sound-icon-off'),

        // Game Header Controls
        btnBackToMenu: document.getElementById('btn-back-to-menu'),
        gameDayBadge: document.getElementById('game-day-badge'),
        btnGameSound: document.getElementById('btn-game-sound'),
        gameSoundIconOn: document.getElementById('game-sound-icon-on'),
        gameSoundIconOff: document.getElementById('game-sound-icon-off'),
        btnGameStats: document.getElementById('btn-game-stats'),
        btnGameHelp: document.getElementById('btn-game-help'),

        // Game Board Elements
        puzzleDayNumber: document.getElementById('puzzle-day-number'),
        puzzleCurriculum: document.getElementById('puzzle-curriculum'),
        puzzleDifficulty: document.getElementById('puzzle-difficulty'),
        gridContainer: document.getElementById('grid-container'),
        solvedStack: document.getElementById('solved-categories-stack'),
        mistakeIndicators: document.getElementById('mistake-indicators'),
        instruction: document.getElementById('game-instruction'),

        // Game Action Buttons
        btnShuffle: document.getElementById('btn-shuffle'),
        btnDeselect: document.getElementById('btn-deselect'),
        btnSubmit: document.getElementById('btn-submit'),

        // Vault Screen Elements
        btnVaultBackMenu: document.getElementById('btn-vault-back-menu'),
        vaultList: document.getElementById('vault-list'),
        btnVaultGoToday: document.getElementById('btn-vault-go-today'),

        // Modals & Feedback
        toast: document.getElementById('toast'),
        modalHelp: document.getElementById('modal-help'),
        modalStats: document.getElementById('modal-stats'),
        modalResult: document.getElementById('modal-result'),
        statPlayed: document.getElementById('stat-played'),
        statWinPct: document.getElementById('stat-win-pct'),
        statStreak: document.getElementById('stat-streak'),
        statMaxStreak: document.getElementById('stat-max-streak'),
        statZeroMistakes: document.getElementById('stat-zero-mistakes'),
        resultTitle: document.getElementById('result-title'),
        resultBadge: document.getElementById('result-badge'),
        resultMsg: document.getElementById('result-msg'),
        resultEmojiGrid: document.getElementById('result-emoji-grid'),
        btnShare: document.getElementById('btn-share'),
        btnResultMenu: document.getElementById('btn-result-menu')
      };
    }

    bindEvents() {
      // Menu screen triggers
      this.dom.btnPlayToday.addEventListener('click', () => {
        this.loadGame(this.currentDay);
        this.switchScreen('game');
      });

      this.dom.btnMenuVault.addEventListener('click', () => {
        this.renderVaultScreen();
        this.switchScreen('vault');
      });

      this.dom.btnMenuStats.addEventListener('click', () => this.openStats());
      this.dom.btnMenuHelp.addEventListener('click', () => this.openModal(this.dom.modalHelp));

      this.dom.btnMenuSound.addEventListener('click', () => this.toggleSoundPref());
      this.dom.btnGameSound.addEventListener('click', () => this.toggleSoundPref());

      // Game screen triggers
      this.dom.btnBackToMenu.addEventListener('click', () => {
        this.updateMenuTodayCard();
        this.switchScreen('menu');
      });

      this.dom.btnGameStats.addEventListener('click', () => this.openStats());
      this.dom.btnGameHelp.addEventListener('click', () => this.openModal(this.dom.modalHelp));

      this.dom.btnShuffle.addEventListener('click', () => this.shuffleTiles());
      this.dom.btnDeselect.addEventListener('click', () => this.deselectAll());
      this.dom.btnSubmit.addEventListener('click', () => this.submitSelection());

      // Vault screen triggers
      this.dom.btnVaultBackMenu.addEventListener('click', () => this.switchScreen('menu'));
      this.dom.btnVaultGoToday.addEventListener('click', () => {
        this.loadGame(this.currentDay);
        this.switchScreen('game');
      });

      // Result modal triggers
      this.dom.btnShare.addEventListener('click', () => this.shareResults());
      this.dom.btnResultMenu.addEventListener('click', () => {
        this.closeModal(this.dom.modalResult);
        this.updateMenuTodayCard();
        this.switchScreen('menu');
      });

      // Generic modal close buttons
      document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-close');
          const modal = document.getElementById(id);
          if (modal) this.closeModal(modal);
        });
      });

      // Close modal on backdrop click
      [this.dom.modalHelp, this.dom.modalStats, this.dom.modalResult].forEach(modal => {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) this.closeModal(modal);
        });
      });
    }

    switchScreen(screenName) {
      this.dom.screenMenu.classList.add('is-hidden');
      this.dom.screenGame.classList.add('is-hidden');
      this.dom.screenVault.classList.add('is-hidden');

      if (screenName === 'menu') {
        this.dom.screenMenu.classList.remove('is-hidden');
        this.garnish.setMode('menu');
      } else if (screenName === 'game') {
        this.dom.screenGame.classList.remove('is-hidden');
        this.garnish.setMode('game');
      } else if (screenName === 'vault') {
        this.dom.screenVault.classList.remove('is-hidden');
        this.garnish.setMode('menu');
      }
    }

    startMidnightWatcher() {
      // Check every 30 seconds for daily rollover without disrupting mid-game play
      setInterval(() => {
        const actualDay = this.scheduler.getCurrentDayNumber();
        if (actualDay !== this.currentDay) {
          this.currentDay = actualDay;
          this.updateMenuTodayCard();
          if (this.activeDay === actualDay - 1 && this.isComplete) {
            this.loadGame(this.currentDay);
          }
        }
      }, 30000);
    }

    toggleSoundPref() {
      const isNowOn = this.sound.toggle();
      this.updateSoundDisplay();
      this.showToast(isNowOn ? 'Sound On' : 'Sound Muted');
    }

    updateSoundDisplay() {
      const on = this.sound.enabled;
      this.dom.menuSoundText.textContent = on ? 'SOUND: ON' : 'SOUND: OFF';

      this.dom.menuSoundIconOn.classList.toggle('is-hidden', !on);
      this.dom.menuSoundIconOff.classList.toggle('is-hidden', on);

      this.dom.gameSoundIconOn.classList.toggle('is-hidden', !on);
      this.dom.gameSoundIconOff.classList.toggle('is-hidden', on);
    }

    // -----------------------------------------------------------------------
    // Main Menu State Display
    // -----------------------------------------------------------------------
    updateMenuTodayCard() {
      const todayPuzzle = this.scheduler.getPuzzleForDay(this.currentDay);
      if (!todayPuzzle) return;

      this.dom.menuDayPill.textContent = `TODAY’S PUZZLE • DAY ${this.currentDay}`;
      this.dom.menuDiffPill.textContent = todayPuzzle.difficulty.toUpperCase();
      this.dom.menuPuzzleTitle.textContent = todayPuzzle.title;
      this.dom.menuPuzzleCurriculum.textContent = todayPuzzle.curriculumCategory;

      const saved = this.storage.getGameState(todayPuzzle.id);
      if (!saved || (!saved.isComplete && (!saved.solvedCategories || saved.solvedCategories.length === 0))) {
        this.dom.menuStatusText.textContent = 'Ready to pour • 4 groups of 4';
        this.dom.menuStatusText.className = 'hero-status-indicator';
        this.dom.btnPlayTodayText.textContent = 'PLAY TODAY’S PUZZLE';
      } else if (!saved.isComplete && saved.solvedCategories.length > 0) {
        this.dom.menuStatusText.textContent = `In Progress • ${saved.solvedCategories.length}/4 groups solved`;
        this.dom.menuStatusText.className = 'hero-status-indicator';
        this.dom.btnPlayTodayText.textContent = 'CONTINUE PUZZLE';
      } else if (saved.isComplete) {
        const win = saved.mistakesRemaining > 0;
        this.dom.menuStatusText.textContent = win ? 'Completed • Solved with bar precision' : 'Completed • Specs Revealed';
        this.dom.menuStatusText.className = 'hero-status-indicator is-solved';
        this.dom.btnPlayTodayText.textContent = 'VIEW COMPLETED BOARD';
      }

      // Update Vault menu count subtext
      const vaultItems = this.scheduler.getReleasedVaultPuzzles();
      this.dom.menuVaultSub.textContent = vaultItems.length > 0 
        ? `${vaultItems.length} Released ${vaultItems.length === 1 ? 'Challenge' : 'Challenges'}`
        : 'Opens tomorrow';
    }

    // -----------------------------------------------------------------------
    // Game Initialization & Loading
    // -----------------------------------------------------------------------
    loadGame(dayNumber) {
      this.activeDay = dayNumber;
      this.activePuzzle = this.scheduler.getPuzzleForDay(dayNumber);

      if (!this.activePuzzle) {
        this.showToast('Puzzle could not be loaded.');
        return;
      }

      // Update game top bar & metadata strip
      this.dom.gameDayBadge.textContent = `DAY ${this.activeDay}`;
      this.dom.puzzleDayNumber.textContent = this.activeDay;
      this.dom.puzzleCurriculum.textContent = this.activePuzzle.curriculumCategory;
      this.dom.puzzleDifficulty.textContent = this.activePuzzle.difficulty.toUpperCase();

      // Retrieve saved progress
      const saved = this.storage.getGameState(this.activePuzzle.id);

      this.selectedWords = [];
      this.solvedCategories = [];
      this.guessHistory = [];
      this.mistakesRemaining = MAX_MISTAKES;
      this.isComplete = false;

      if (saved) {
        this.solvedCategories = saved.solvedCategories || [];
        this.mistakesRemaining = saved.mistakesRemaining ?? MAX_MISTAKES;
        this.guessHistory = saved.guessHistory || [];
        this.isComplete = saved.isComplete || false;
      }

      // Filter out solved tiles
      const solvedItemSet = new Set();
      this.solvedCategories.forEach(cat => cat.items.forEach(item => solvedItemSet.add(item)));

      const allRemaining = [];
      this.activePuzzle.categories.forEach(cat => {
        cat.items.forEach(item => {
          if (!solvedItemSet.has(item)) {
            allRemaining.push(item);
          }
        });
      });

      this.unsolvedTiles = allRemaining;
      this.shuffleArray(this.unsolvedTiles);

      this.renderBoard();
      this.renderMistakes();
      this.updateControlStates();

      this.dom.instruction.textContent = this.isComplete ? 'Challenge Completed!' : 'Create four groups of four!';
    }

    // -----------------------------------------------------------------------
    // Rendering
    // -----------------------------------------------------------------------
    renderBoard() {
      // 1. Render Solved Banners Stack
      this.dom.solvedStack.innerHTML = '';
      this.solvedCategories.forEach(cat => {
        const banner = document.createElement('div');
        banner.className = `solved-banner ${CATEGORY_COLOR_MAP[cat.difficulty] || 'cat-yellow'}`;
        banner.innerHTML = `
          <div class="solved-banner-title">${cat.name}</div>
          <div class="solved-banner-items">${cat.items.join(', ')}</div>
        `;
        this.dom.solvedStack.appendChild(banner);
      });

      // 2. Render Remaining Grid Tiles
      this.dom.gridContainer.innerHTML = '';
      this.unsolvedTiles.forEach(word => {
        const tile = document.createElement('button');
        tile.type = 'button';
        tile.className = 'tile';
        tile.setAttribute('data-word', word);
        tile.setAttribute('aria-pressed', this.selectedWords.includes(word) ? 'true' : 'false');
        if (this.selectedWords.includes(word)) {
          tile.classList.add('is-selected');
        }
        if (this.isComplete) {
          tile.disabled = true;
        }

        tile.innerHTML = `<span class="tile-text">${word}</span>`;
        tile.addEventListener('click', () => this.toggleSelect(word));
        this.dom.gridContainer.appendChild(tile);
      });
    }

    renderMistakes() {
      const dots = this.dom.mistakeIndicators.querySelectorAll('.dot');
      dots.forEach((dot, index) => {
        if (index < this.mistakesRemaining) {
          dot.classList.add('filled');
        } else {
          dot.classList.remove('filled');
        }
      });
    }

    updateControlStates() {
      const count = this.selectedWords.length;
      this.dom.btnSubmit.disabled = (count !== 4) || this.isComplete;
      this.dom.btnDeselect.disabled = (count === 0) || this.isComplete;
      this.dom.btnShuffle.disabled = (this.unsolvedTiles.length <= 1) || this.isComplete;
    }

    // -----------------------------------------------------------------------
    // Interactive Gameplay
    // -----------------------------------------------------------------------
    toggleSelect(word) {
      if (this.isComplete) return;

      const idx = this.selectedWords.indexOf(word);
      if (idx > -1) {
        this.selectedWords.splice(idx, 1);
        this.sound.playDeselect();
      } else {
        if (this.selectedWords.length >= 4) {
          this.showToast('You can only select 4 items');
          return;
        }
        this.selectedWords.push(word);
        this.sound.playTap();
      }

      this.updateTileSelectionDOM();
      this.updateControlStates();
    }

    updateTileSelectionDOM() {
      const tiles = this.dom.gridContainer.querySelectorAll('.tile');
      tiles.forEach(tile => {
        const word = tile.getAttribute('data-word');
        const isSel = this.selectedWords.includes(word);
        tile.classList.toggle('is-selected', isSel);
        tile.setAttribute('aria-pressed', isSel ? 'true' : 'false');
      });
    }

    deselectAll() {
      if (this.selectedWords.length === 0) return;
      this.selectedWords = [];
      this.sound.playDeselect();
      this.updateTileSelectionDOM();
      this.updateControlStates();
    }

    shuffleTiles() {
      if (this.unsolvedTiles.length <= 1 || this.isComplete) return;
      this.shuffleArray(this.unsolvedTiles);
      this.sound.playShuffle();
      this.renderBoard();
    }

    submitSelection() {
      if (this.selectedWords.length !== 4 || this.isComplete) return;

      // Check for duplicate guess
      const sortedGuess = [...this.selectedWords].sort().join('|');
      const alreadyGuessed = this.guessHistory.some(g => [...g].sort().join('|') === sortedGuess);

      if (alreadyGuessed) {
        this.showToast('Already guessed!');
        this.sound.playOneAway();
        return;
      }

      // Record guess in session history
      this.guessHistory.push([...this.selectedWords]);

      // Category validation
      let matchedCategory = null;
      for (const cat of this.activePuzzle.categories) {
        const catSet = new Set(cat.items);
        const matchCount = this.selectedWords.filter(w => catSet.has(w)).length;
        if (matchCount === 4) {
          matchedCategory = cat;
          break;
        }
      }

      if (matchedCategory) {
        this.handleCorrectGuess(matchedCategory);
      } else {
        this.handleIncorrectGuess();
      }
    }

    handleCorrectGuess(category) {
      this.sound.playSuccess();
      this.solvedCategories.push(category);

      this.unsolvedTiles = this.unsolvedTiles.filter(w => !category.items.includes(w));
      this.selectedWords = [];

      // If 3 are solved, the remaining 4th is naturally solved
      if (this.solvedCategories.length === 3) {
        const lastCat = this.activePuzzle.categories.find(c => !this.solvedCategories.includes(c));
        if (lastCat) {
          this.solvedCategories.push(lastCat);
          this.unsolvedTiles = [];
        }
      }

      if (this.solvedCategories.length === 4) {
        this.finishGame(true);
      } else {
        this.saveCurrentState();
        this.renderBoard();
        this.updateControlStates();
      }
    }

    handleIncorrectGuess() {
      this.sound.playError();
      this.mistakesRemaining--;
      this.renderMistakes();

      // Shake selected tiles
      const selectedDOM = this.dom.gridContainer.querySelectorAll('.tile.is-selected');
      selectedDOM.forEach(tile => tile.classList.add('shake-group'));
      setTimeout(() => {
        selectedDOM.forEach(tile => tile.classList.remove('shake-group'));
      }, 450);

      // Check 'One away...' rule
      let isOneAway = false;
      for (const cat of this.activePuzzle.categories) {
        const catSet = new Set(cat.items);
        const matchCount = this.selectedWords.filter(w => catSet.has(w)).length;
        if (matchCount === 3) {
          isOneAway = true;
          break;
        }
      }

      if (isOneAway && this.mistakesRemaining > 0) {
        setTimeout(() => {
          this.showToast('One away...');
          this.sound.playOneAway();
        }, 400);
      }

      if (this.mistakesRemaining <= 0) {
        this.handleGameOverLoss();
      } else {
        this.saveCurrentState();
      }
    }

    handleGameOverLoss() {
      this.showToast('Out of guesses!');
      this.isComplete = true;

      // Reveal remaining specs cleanly
      setTimeout(() => {
        this.solvedCategories = [...this.activePuzzle.categories];
        this.unsolvedTiles = [];
        this.selectedWords = [];
        this.finishGame(false);
      }, 1100);
    }

    finishGame(isWin) {
      this.isComplete = true;
      this.saveCurrentState();
      this.renderBoard();
      this.renderMistakes();
      this.updateControlStates();
      this.updateMenuTodayCard();

      // Record stats only once per challenge
      const existing = this.storage.getGameState(this.activePuzzle.id);
      if (!existing || !existing.hasRecordedStats) {
        this.storage.recordResult(this.activeDay, isWin, this.mistakesRemaining);
        this.saveCurrentState(true);
      }

      setTimeout(() => {
        this.showResultModal(isWin);
      }, 750);
    }

    saveCurrentState(hasRecordedStats = false) {
      this.storage.setGameState(this.activePuzzle.id, {
        isComplete: this.isComplete,
        mistakesRemaining: this.mistakesRemaining,
        solvedCategories: this.solvedCategories,
        guessHistory: this.guessHistory,
        hasRecordedStats: hasRecordedStats || false
      });
    }

    // -----------------------------------------------------------------------
    // The Vault Screen Rendering
    // -----------------------------------------------------------------------
    renderVaultScreen() {
      this.dom.vaultList.innerHTML = '';
      const pastPuzzles = this.scheduler.getReleasedVaultPuzzles();

      if (pastPuzzles.length === 0) {
        this.dom.vaultList.innerHTML = `
          <div class="vault-empty">
            No past puzzles yet! Tomorrow, Day ${this.currentDay} will move to the Vault.
          </div>
        `;
        return;
      }

      pastPuzzles.forEach(item => {
        const card = document.createElement('div');
        card.className = 'vault-card';

        const state = this.storage.getGameState(item.puzzle.id);
        let badgeHTML = '<span class="vault-badge badge-ready">UNPLAYED</span>';
        if (state && state.isComplete) {
          badgeHTML = (state.mistakesRemaining > 0)
            ? '<span class="vault-badge badge-won">SOLVED</span>'
            : '<span class="vault-badge badge-lost">REVEALED</span>';
        }

        card.innerHTML = `
          <div class="vault-info-left">
            <span class="vault-card-title">Day ${item.dayNumber}: ${item.puzzle.title}</span>
            <span class="vault-card-curriculum">${item.puzzle.curriculumCategory}</span>
          </div>
          ${badgeHTML}
        `;

        card.addEventListener('click', () => {
          this.loadGame(item.dayNumber);
          this.switchScreen('game');
        });

        this.dom.vaultList.appendChild(card);
      });
    }

    // -----------------------------------------------------------------------
    // Results & Share
    // -----------------------------------------------------------------------
    showResultModal(isWin) {
      this.dom.resultTitle.textContent = isWin ? 'ROUND WON' : 'LAST CALL';
      this.dom.resultBadge.textContent = isWin
        ? (this.mistakesRemaining === MAX_MISTAKES ? 'PERFECT SPEC' : 'SUCCESSFUL SERVICE')
        : 'RECIPE 86’D';

      this.dom.resultMsg.textContent = isWin
        ? 'All four cocktail groups identified with bar precision!'
        : 'Out of attempts! The house has revealed the remaining cocktail specs.';

      this.dom.resultEmojiGrid.innerHTML = '';
      const rows = this.generateEmojiRows();
      rows.forEach(rowStr => {
        const lineDiv = document.createElement('div');
        lineDiv.textContent = rowStr;
        this.dom.resultEmojiGrid.appendChild(lineDiv);
      });

      this.openModal(this.dom.modalResult);
    }

    generateEmojiRows() {
      const rows = [];
      const wordDiffMap = {};
      this.activePuzzle.categories.forEach(cat => {
        cat.items.forEach(w => {
          wordDiffMap[w] = cat.difficulty;
        });
      });

      this.guessHistory.forEach(guess => {
        const line = guess.map(w => CATEGORY_EMOJI_MAP[wordDiffMap[w]] || '⬜').join('');
        rows.push(line);
      });
      return rows;
    }

    shareResults() {
      const emojiLines = this.generateEmojiRows().join('\n');
      const shareText = `Cocktail Connections — Day ${this.activeDay}\n${emojiLines}\nhttps://tileworksgamesstudio.github.io/86/`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareText).then(() => {
          this.showToast('Copied to clipboard!');
        }).catch(() => {
          this.fallbackShare(shareText);
        });
      } else {
        this.fallbackShare(shareText);
      }
    }

    fallbackShare(text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        this.showToast('Copied to clipboard!');
      } catch (err) {
        this.showToast('Failed to copy share text.');
      }
      document.body.removeChild(textarea);
    }

    // -----------------------------------------------------------------------
    // Modals & Statistics UI
    // -----------------------------------------------------------------------
    openStats() {
      const s = this.storage.state.stats;
      this.dom.statPlayed.textContent = s.played;
      const winPct = s.played > 0 ? Math.round((s.won / s.played) * 100) : 0;
      this.dom.statWinPct.textContent = `${winPct}%`;
      this.dom.statStreak.textContent = s.currentStreak;
      this.dom.statMaxStreak.textContent = s.maxStreak;
      this.dom.statZeroMistakes.textContent = s.zeroMistakes;
      this.openModal(this.dom.modalStats);
    }

    openModal(modal) {
      modal.classList.remove('is-hidden');
    }

    closeModal(modal) {
      modal.classList.add('is-hidden');
    }

    showToast(message) {
      this.dom.toast.textContent = message;
      this.dom.toast.classList.add('is-visible');
      if (this.toastTimeout) clearTimeout(this.toastTimeout);
      this.toastTimeout = setTimeout(() => {
        this.dom.toast.classList.remove('is-visible');
      }, 2200);
    }

    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  }

  // -------------------------------------------------------------------------
  // INITIALIZATION
  // -------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.COCKTAIL_PUZZLES_DATA || !window.COCKTAIL_PUZZLES_DATA.puzzles) {
      return;
    }
    window.gameApp = new ConnectionsApp();
  });
})();