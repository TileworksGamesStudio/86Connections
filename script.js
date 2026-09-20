/**
 * CONNECTIONS — COCKTAIL LOUNGE EDITION
 * Features:
 * - Authoritative UK London Clock System (NTP/HTTP Date + Monotonic Drift)
 * - Layered Lighting & Custom SVG Garnish Flight System (Bottom-to-Top, Glow, Depth)
 * - Unified Centered Menu Hierarchy
 * - Content-First Right-to-Left Sliding Help Panel
 * - Single-Tap Zero-Lag Touch Architecture
 */

(function () {
  'use strict';

  // Application Configuration
  const STORAGE_KEY = 'cocktail_connections_app_state_v2';
  const MAX_MISTAKES = 4;
  const CANONICAL_TIMEZONE = 'Europe/London';
  
  // Custom cocktail category colors encoded for share grid
  // Using standard colored squares to ensure external sharing compatibility, mapped to game logic
  const LEVEL_EMOJIS = { 1: '🟨', 2: '🟩', 3: '🟦', 4: '🟪' };
  const HOME_PLACEHOLDER_URL = 'https://tileworksgamesstudio.github.io/86/';

  // 12 Premium Botanical / Cocktail SVG Paths
  const SVGS = [
    // 1. Orange Twist (Stylized spiral)
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 5C14 4 20 8 20 14C20 19 15 22 10 22C4 22 2 17 2 12C2 6 8 2 14 2" /></svg>`,
    // 2. Lemon Twist (Tighter spiral)
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6C13 5 18 8 18 13C18 17 14 20 10 20C6 20 4 16 4 12C4 7 9 4 14 4" /></svg>`,
    // 3. Lime Wheel
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="2"/><path d="M12 2L12 10 M12 14L12 22 M2 12L10 12 M14 12L22 12 M4.93 4.93L10.59 10.59 M13.41 13.41L19.07 19.07 M4.93 19.07L10.59 13.41 M13.41 10.59L19.07 4.93"/></svg>`,
    // 4. Grapefruit Wheel (Thick rind)
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="12" cy="12" r="11"/><circle cx="12" cy="12" r="8"/><path d="M12 4L12 10 M12 14L12 20 M4 12L10 12 M14 12L20 12 M6.34 6.34L10.59 10.59 M13.41 13.41L17.66 17.66 M6.34 17.66L10.59 13.41 M13.41 10.59L17.66 6.34"/></svg>`,
    // 5. Blood Orange Wheel (Segments + Dots)
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="2"/><path d="M12 2L12 10 M12 14L12 22 M2 12L10 12 M14 12L22 12"/><circle cx="8" cy="8" r="0.5" fill="currentColor"/><circle cx="16" cy="16" r="0.5" fill="currentColor"/><circle cx="8" cy="16" r="0.5" fill="currentColor"/><circle cx="16" cy="8" r="0.5" fill="currentColor"/></svg>`,
    // 6. Dehydrated Citrus (Wavy)
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 2C14.5 1 17.5 2 19.5 4C21.5 6 22.5 9 21.5 11.5C22.5 14 21.5 17 19.5 19C17.5 21 14.5 22 12 21C9.5 22 6.5 21 4.5 19C2.5 17 1.5 14 2.5 11.5C1.5 9 2.5 6 4.5 4C6.5 2 9.5 1 12 2Z"/><circle cx="12" cy="12" r="2"/><path d="M12 5L12 10 M12 14L12 19 M5 12L10 12 M14 12L19 12"/></svg>`,
    // 7. Cocktail Cherry
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="10" cy="16" r="5"/><path d="M11 11C13 5 18 3 20 4" stroke-linecap="round"/></svg>`,
    // 8. Double Cherry
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="7" cy="17" r="4"/><circle cx="17" cy="17" r="4"/><path d="M8 13C10 7 14 4 16 4 M16 13C14 7 10 4 8 4" stroke-linecap="round"/></svg>`,
    // 9. Mint Sprig
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 22V10" stroke-linecap="round"/><path d="M12 16C8 16 6 13 6 10C8 10 12 12 12 16Z"/><path d="M12 16C16 16 18 13 18 10C16 10 12 12 12 16Z"/><path d="M12 10C8 10 6 7 6 4C8 4 12 6 12 10Z"/><path d="M12 10C16 10 18 7 18 4C16 4 12 6 12 10Z"/></svg>`,
    // 10. Rosemary Sprig
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"><path d="M12 22C12 18 14 10 16 2"/><path d="M14 10L18 8 M14 14L18 12 M13 18L17 16 M14 10L10 8 M13.5 14L9 11 M13 18L9 15 M15 6L11 4 M15 6L19 5"/></svg>`,
    // 11. Green Olive
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><ellipse cx="12" cy="12" rx="7" ry="9" transform="rotate(-30 12 12)"/><ellipse cx="15" cy="8" rx="2" ry="3" transform="rotate(-30 15 8)"/></svg>`,
    // 12. Cucumber Ribbon
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4C9 4 11 8 11 12C11 16 9 20 13 20C17 20 19 16 19 12C19 8 17 4 13 4C11 4 9 8 9 12"/></svg>`
  ];

  // ==========================================================================
  // 1. RELIABLE AUTHORITATIVE RELEASE CLOCK
  // ==========================================================================
  const ReleaseClock = {
    monotonicOffsetMs: null,
    isAuthoritative: false,
    syncInProgress: false,
    lastSyncTime: 0,
    listeners: [],

    onSync(cb) {
      if (typeof cb === 'function') {
        this.listeners.push(cb);
        if (this.isAuthoritative) cb();
      }
    },

    notify() {
      this.listeners.forEach(fn => {
        try { fn(); } catch (e) { console.error('Sync listener error:', e); }
      });
    },

    async synchronize() {
      if (this.syncInProgress) return;
      this.syncInProgress = true;
      let utcEpochMs = null;
      let reqStart = performance.now();

      try {
        const bust = '?t=' + Date.now();
        const res = await fetch(window.location.pathname + bust, { method: 'HEAD', cache: 'no-store' });
        if (res.ok) {
          const dateHdr = res.headers.get('date');
          if (dateHdr) {
            const parsed = Date.parse(dateHdr);
            if (!isNaN(parsed)) {
              const latency = (performance.now() - reqStart) / 2;
              utcEpochMs = parsed + latency;
            }
          }
        }
      } catch (e) {}

      if (!utcEpochMs) {
        try {
          reqStart = performance.now();
          const res = await fetch('https://worldtimeapi.org/api/timezone/Etc/UTC', { cache: 'no-store', headers: { 'Accept': 'application/json' } });
          if (res.ok) {
            const data = await res.json();
            if (data && data.unixtime) {
              const latency = (performance.now() - reqStart) / 2;
              utcEpochMs = (data.unixtime * 1000) + latency;
            }
          }
        } catch (e) {}
      }

      if (utcEpochMs) {
        this.monotonicOffsetMs = utcEpochMs - performance.now();
        this.isAuthoritative = true;
        this.lastSyncTime = performance.now();
        try { sessionStorage.setItem('clk_drift_ref', String(utcEpochMs - Date.now())); } catch (e) {}
      } else {
        let savedDrift = 0;
        try {
          const raw = sessionStorage.getItem('clk_drift_ref');
          if (raw) savedDrift = parseFloat(raw) || 0;
        } catch (e) {}
        this.monotonicOffsetMs = (Date.now() + savedDrift) - performance.now();
        this.isAuthoritative = false;
      }

      this.syncInProgress = false;
      this.notify();
    },

    getAuthoritativeDate() {
      if (this.monotonicOffsetMs === null) return new Date();
      return new Date(performance.now() + this.monotonicOffsetMs);
    },

    getCurrentReleaseDateString() {
      const now = this.getAuthoritativeDate();
      try {
        const fmt = new Intl.DateTimeFormat('en-CA', { timeZone: CANONICAL_TIMEZONE, year: 'numeric', month: '2-digit', day: '2-digit' });
        return fmt.format(now);
      } catch (e) {
        return now.toISOString().slice(0, 10);
      }
    }
  };

  // ==========================================================================
  // 2. RUNTIME STATE & DEFENSIVE STORAGE
  // ==========================================================================
  let puzzles = [];
  let todayPuzzle = null;
  let activePuzzle = null;
  let isArchiveMode = false;

  let unsolvedWords = [];
  let selectedWords = [];
  let solvedCategories = [];
  let mistakesRemaining = MAX_MISTAKES;
  let guessHistory = [];
  let isComplete = false;
  let isWon = false;

  function loadStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data && typeof data === 'object') {
          return {
            stats: data.stats || { played: 0, won: 0, streak: 0, maxStreak: 0 },
            games: data.games || {},
            settings: Object.assign({ bgAnimation: true }, data.settings)
          };
        }
      }
    } catch (e) {}
    return { stats: { played: 0, won: 0, streak: 0, maxStreak: 0 }, games: {}, settings: { bgAnimation: true } };
  }

  function saveStorage(data) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
  }

  function getSavedGame(date) { return loadStorage().games[date] || null; }

  function saveActiveGame() {
    if (!activePuzzle) return;
    const store = loadStorage();
    const existing = store.games[activePuzzle.date] || {};

    store.games[activePuzzle.date] = {
      solvedLevels: solvedCategories.map(c => c.level),
      unsolvedWords: [...unsolvedWords],
      mistakesRemaining: mistakesRemaining,
      guessHistory: [...guessHistory],
      isComplete: isComplete,
      isWon: isWon,
      recorded: existing.recorded || false
    };

    if (isComplete && !existing.recorded && !isArchiveMode) {
      store.stats.played++;
      if (isWon) {
        store.stats.won++;
        store.stats.streak++;
        if (store.stats.streak > store.stats.maxStreak) store.stats.maxStreak = store.stats.streak;
      } else {
        store.stats.streak = 0;
      }
      store.games[activePuzzle.date].recorded = true;
    }
    saveStorage(store);
  }

  // ==========================================================================
  // 3. AMBIENT GARNISH FLIGHT SYSTEM (COCKTAIL LOUNGE UPDATE)
  // ==========================================================================
  const AmbientSystem = {
    layer: null,
    elements: [],
    // Target 6-9 visible objects distributed across depths
    depthLayers: [
      { depth: 'depth-bg', count: 3, minDur: 30, maxDur: 45 },
      { depth: 'depth-mid', count: 3, minDur: 20, maxDur: 30 },
      { depth: 'depth-fg', count: 2, minDur: 15, maxDur: 22 }
    ],

    init() {
      this.layer = document.getElementById('ambient-icons-layer');
      if (!this.layer) return;

      this.depthLayers.forEach(cfg => {
        for (let i = 0; i < cfg.count; i++) {
          this.spawnGarnish(cfg, true);
        }
      });
      this.updateState();
    },

    spawnGarnish(cfg, isInitial = false) {
      const el = document.createElement('div');
      el.className = `ambient-icon ${cfg.depth}`;
      el.style.left = `${Math.floor(Math.random() * 90) + 5}%`;

      const dur = (Math.random() * (cfg.maxDur - cfg.minDur) + cfg.minDur);
      
      // Initial spawns start at random vertical progress via negative delay
      const delay = isInitial ? (Math.random() * -dur) : 0;
      
      el.style.animationDuration = `${dur}s`;
      el.style.animationDelay = `${delay}s`;

      // Inner container for horizontal drift
      const drift = document.createElement('div');
      drift.style.animationDuration = `${dur * 0.6}s`;
      drift.style.animationDelay = `${delay * 0.6}s`;
      
      // Inner wrapper for slow rotation
      const rotate = document.createElement('div');
      rotate.style.animationDuration = `${dur * 1.5}s`;
      rotate.style.animationDirection = Math.random() > 0.5 ? 'normal' : 'reverse';
      
      rotate.innerHTML = SVGS[Math.floor(Math.random() * SVGS.length)];
      
      drift.appendChild(rotate);
      el.appendChild(drift);
      this.layer.appendChild(el);
      this.elements.push({ el, drift, rotate });

      // Respawn when flight finishes
      el.addEventListener('animationend', (e) => {
        if (e.animationName === 'floatUpward') {
          el.remove();
          const idx = this.elements.findIndex(x => x.el === el);
          if (idx > -1) this.elements.splice(idx, 1);
          if (loadStorage().settings.bgAnimation) {
            this.spawnGarnish(cfg, false);
          }
        }
      });
    },

    updateState() {
      const enabled = loadStorage().settings.bgAnimation;
      this.elements.forEach(item => {
        if (enabled) {
          item.el.classList.add('anim-float');
          item.drift.classList.add('anim-drift');
          item.rotate.classList.add('anim-rotate');
        } else {
          item.el.classList.remove('anim-float');
          item.drift.classList.remove('anim-drift');
          item.rotate.classList.remove('anim-rotate');
        }
      });
    }
  };

  // ==========================================================================
  // 4. SCREEN NAVIGATION & HOW TO PLAY (RIGHT-TO-LEFT ONLY)
  // ==========================================================================
  const screens = {
    menu: document.getElementById('screen-menu'),
    game: document.getElementById('screen-game'),
    vault: document.getElementById('screen-vault'),
    settings: document.getElementById('screen-settings')
  };

  const dom = {
    toast: document.getElementById('toast'),
    appTitle: document.getElementById('app-title'),
    btnPlayGame: document.getElementById('btn-play-game'),
    btnPlayTitle: document.getElementById('btn-play-title'),
    menuPuzzleDate: document.getElementById('menu-puzzle-date'),
    menuPlayStatus: document.getElementById('menu-play-status'),
    btnOpenVault: document.getElementById('btn-open-vault'),
    btnOpenSettings: document.getElementById('btn-open-settings'),
    btnOpenHowToPlay: document.getElementById('btn-open-howtoplay'),
    btnOpenStats: document.getElementById('btn-open-stats'),
    btnShareGame: document.getElementById('btn-share-game'),
    btnReservedPlus: document.getElementById('btn-reserved-plus'),
    btnGameBack: document.getElementById('btn-game-back'),
    btnVaultBack: document.getElementById('btn-vault-back'),
    btnSettingsBack: document.getElementById('btn-settings-back'),
    gamePuzzleTitle: document.getElementById('game-puzzle-title'),
    solvedStack: document.getElementById('solved-stack'),
    grid: document.getElementById('grid'),
    mistakeDots: document.getElementById('mistake-dots'),
    btnShuffle: document.getElementById('btn-shuffle'),
    btnDeselect: document.getElementById('btn-deselect'),
    btnSubmit: document.getElementById('btn-submit'),
    vaultList: document.getElementById('vault-list'),
    btnToggleAnim: document.getElementById('btn-toggle-animation'),
    liveIndicator: document.getElementById('live-time-indicator'),
    howToBackdrop: document.getElementById('howtoplay-backdrop'),
    howToWrapper: document.getElementById('howtoplay-wrapper'),
    howToPanel: document.getElementById('panel-howtoplay'),
    btnCloseHowTo: document.getElementById('btn-close-howtoplay'),
    btnCloseHowToIcon: document.getElementById('btn-close-howtoplay-icon'),
    modalStats: document.getElementById('modal-stats'),
    modalResult: document.getElementById('modal-result'),
    statPlayed: document.getElementById('stat-played'),
    statWinPct: document.getElementById('stat-win-pct'),
    statStreak: document.getElementById('stat-streak'),
    statMaxStreak: document.getElementById('stat-max-streak'),
    resultMsg: document.getElementById('result-msg'),
    resultGrid: document.getElementById('result-grid'),
    btnShareResult: document.getElementById('btn-share-result'),
    btnResultMenu: document.getElementById('btn-result-menu')
  };

  function showScreen(name) {
    Object.keys(screens).forEach(key => { screens[key].classList.toggle('hidden', key !== name); });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  let isPanelAnimating = false;
  function openHowToPlay() {
    if (isPanelAnimating) return;
    isPanelAnimating = true;
    dom.howToBackdrop.classList.remove('hidden');
    dom.howToWrapper.classList.remove('hidden');
    void dom.howToPanel.offsetWidth;
    dom.howToBackdrop.classList.add('visible');
    dom.howToPanel.classList.add('panel-open');
    setTimeout(() => { isPanelAnimating = false; dom.btnCloseHowTo.focus(); }, 450);
  }

  function closeHowToPlay() {
    if (isPanelAnimating) return;
    isPanelAnimating = true;
    dom.howToPanel.classList.remove('panel-open');
    dom.howToBackdrop.classList.remove('visible');
    setTimeout(() => {
      dom.howToWrapper.classList.add('hidden');
      dom.howToBackdrop.classList.add('hidden');
      isPanelAnimating = false;
      dom.btnOpenHowToPlay.focus();
    }, 450);
  }

  function showModal(modal) { modal.classList.remove('hidden'); }
  function closeModal(modal) { modal.classList.add('hidden'); }

  let toastTimer = null;
  function showToast(msg) {
    dom.toast.textContent = msg;
    dom.toast.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => dom.toast.classList.add('hidden'), 2200);
  }

  // ==========================================================================
  // 5. CSV PARSING & DATA EXTRACTION
  // ==========================================================================
  function parseCSV(text) {
    const rows = [];
    let row = []; let cell = ''; let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (inQuotes) {
        if (c === '"') {
          if (text[i + 1] === '"') { cell += '"'; i++; } else { inQuotes = false; }
        } else { cell += c; }
      } else {
        if (c === '"') { inQuotes = true; }
        else if (c === ',') { row.push(cell.trim()); cell = ''; }
        else if (c === '\n' || c === '\r') {
          row.push(cell.trim());
          if (row.some(v => v !== '')) rows.push(row);
          row = []; cell = '';
          if (c === '\r' && text[i + 1] === '\n') i++;
        } else { cell += c; }
      }
    }
    if (cell || row.length > 0) {
      row.push(cell.trim());
      if (row.some(v => v !== '')) rows.push(row);
    }
    return rows;
  }

  function loadPuzzleData(rows) {
    if (!Array.isArray(rows) || rows.length < 2) return [];
    const list = [];
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      if (r.length < 9) continue;
      const date = r[0].trim();
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) continue;
      const categories = [];
      for (let c = 0; c < 4; c++) {
        const catName = r[1 + c * 2];
        const rawWords = r[2 + c * 2];
        if (!catName || !rawWords) continue;
        const items = rawWords.split(/[,;]/).map(w => w.trim()).filter(Boolean);
        if (items.length === 4) categories.push({ name: catName.trim(), level: c + 1, items });
      }
      if (categories.length === 4) list.push({ date, categories });
    }
    return list.sort((a, b) => a.date.localeCompare(b.date));
  }

  // ==========================================================================
  // 6. GAMEPLAY ENGINE
  // ==========================================================================
  function startPuzzle(puzzle, isArchive) {
    if (!puzzle) return;
    activePuzzle = puzzle;
    isArchiveMode = isArchive;
    dom.gamePuzzleTitle.textContent = isArchive ? `Vault: ${puzzle.date}` : `Daily: ${puzzle.date}`;
    selectedWords = [];
    dom.solvedStack.innerHTML = '';

    const saved = getSavedGame(puzzle.date);
    if (saved) {
      solvedCategories = (saved.solvedLevels || []).map(l => puzzle.categories.find(c => c.level === l)).filter(Boolean);
      unsolvedWords = Array.isArray(saved.unsolvedWords) ? saved.unsolvedWords : [];
      mistakesRemaining = typeof saved.mistakesRemaining === 'number' ? saved.mistakesRemaining : MAX_MISTAKES;
      guessHistory = Array.isArray(saved.guessHistory) ? saved.guessHistory : [];
      isComplete = Boolean(saved.isComplete);
      isWon = Boolean(saved.isWon);
    } else {
      solvedCategories = []; mistakesRemaining = MAX_MISTAKES; guessHistory = []; isComplete = false; isWon = false;
      const all = [];
      puzzle.categories.forEach(c => c.items.forEach(it => all.push(it)));
      shuffleArray(all);
      unsolvedWords = all;
    }

    renderBoard();
    updateControls();
    showScreen('game');
  }

  function renderBoard() {
    // Solved category award plaques (preserve existing nodes to prevent re-triggering animations/flashing)
    const renderedLevels = Array.from(dom.solvedStack.children).map(el => parseInt(el.getAttribute('data-level'), 10));
    const targetLevels = solvedCategories.map(c => c.level);

    const isPrefix = renderedLevels.length <= targetLevels.length &&
      renderedLevels.every((lvl, i) => lvl === targetLevels[i]);

    if (!isPrefix) {
      dom.solvedStack.innerHTML = '';
      renderedLevels.length = 0;
    }

    const existingSet = new Set(renderedLevels);
    solvedCategories.forEach(cat => {
      if (!existingSet.has(cat.level)) {
        const banner = document.createElement('div');
        banner.className = `solved-banner cat-${cat.level}`;
        banner.setAttribute('data-level', cat.level);
        banner.innerHTML = `
          <span class="banner-level-tag">Level ${cat.level}</span>
          <span class="banner-name">${escapeHTML(cat.name)}</span>
          <span class="banner-items">${cat.items.map(escapeHTML).join(', ')}</span>
        `;
        dom.solvedStack.appendChild(banner);
      }
    });

    dom.grid.innerHTML = '';
    unsolvedWords.forEach(word => {
      const tile = document.createElement('button');
      tile.type = 'button';
      tile.className = 'tile';
      const isSelected = selectedWords.includes(word);
      if (isSelected) tile.classList.add('selected');
      if (isComplete) tile.disabled = true;
      tile.textContent = word;
      tile.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
      tile.addEventListener('click', () => toggleTile(word));
      dom.grid.appendChild(tile);
    });

    const dots = dom.mistakeDots.querySelectorAll('.dot');
    dots.forEach((dot, i) => { dot.classList.toggle('filled', i < mistakesRemaining); });
    dom.mistakeDots.setAttribute('aria-label', `${mistakesRemaining} attempts left`);
  }

  function toggleTile(word) {
    if (isComplete) return;
    const idx = selectedWords.indexOf(word);
    if (idx > -1) { selectedWords.splice(idx, 1); }
    else { if (selectedWords.length >= 4) return; selectedWords.push(word); }
    renderBoard();
    updateControls();
  }

  function updateControls() {
    const len = selectedWords.length;
    dom.btnSubmit.disabled = len !== 4 || isComplete;
    dom.btnDeselect.disabled = len === 0 || isComplete;
    dom.btnShuffle.disabled = unsolvedWords.length <= 1 || isComplete;
  }

  function deselectAll() { selectedWords = []; renderBoard(); updateControls(); }
  function shuffleTiles() { shuffleArray(unsolvedWords); renderBoard(); }

  function submitGuess() {
    if (selectedWords.length !== 4 || isComplete) return;
    const guessKey = [...selectedWords].sort().join('|');
    if (guessHistory.some(g => [...g].sort().join('|') === guessKey)) { showToast('Already guessed'); return; }

    guessHistory.push([...selectedWords]);
    let matchedCat = null;
    for (const cat of activePuzzle.categories) {
      if (solvedCategories.includes(cat)) continue;
      if (selectedWords.filter(w => cat.items.includes(w)).length === 4) { matchedCat = cat; break; }
    }

    if (matchedCat) {
      solvedCategories.push(matchedCat);
      unsolvedWords = unsolvedWords.filter(w => !matchedCat.items.includes(w));
      selectedWords = [];
      if (solvedCategories.length === 4) { isComplete = true; isWon = true; finishGame(); } 
      else { saveActiveGame(); renderBoard(); updateControls(); }
    } else {
      mistakesRemaining--;
      if (activePuzzle.categories.some(cat => !solvedCategories.includes(cat) && selectedWords.filter(w => cat.items.includes(w)).length === 3)) {
        showToast('One away...');
      }
      const domSelected = dom.grid.querySelectorAll('.tile.selected');
      domSelected.forEach(t => t.classList.add('shake'));
      setTimeout(() => domSelected.forEach(t => t.classList.remove('shake')), 320);

      if (mistakesRemaining <= 0) {
        isComplete = true; isWon = false;
        setTimeout(() => {
          solvedCategories = [...activePuzzle.categories];
          unsolvedWords = []; selectedWords = [];
          finishGame();
        }, 400);
      } else { saveActiveGame(); renderBoard(); updateControls(); }
    }
  }

  function finishGame() {
    saveActiveGame(); renderBoard(); updateControls(); updateMenuStatus();
    setTimeout(showResultModal, 450);
  }

  function showResultModal() {
    dom.resultMsg.textContent = isWon ? 'Splendid! Puzzle Solved.' : 'Revealed. Better luck next time!';
    dom.resultGrid.innerHTML = '';
    const wordLevelMap = {};
    activePuzzle.categories.forEach(c => { c.items.forEach(w => { wordLevelMap[w] = c.level; }); });
    guessHistory.forEach(guess => {
      const line = guess.map(w => LEVEL_EMOJIS[wordLevelMap[w]] || '⬜').join('');
      const div = document.createElement('div');
      div.textContent = line;
      dom.resultGrid.appendChild(div);
    });
    showModal(dom.modalResult);
  }

  // ==========================================================================
  // 7. SHARE & UTILITIES
  // ==========================================================================
  async function shareGeneralGame() {
    const shareData = { title: 'Connections', text: 'Play Connections — Find groups of four items that share a common connection.', url: window.location.href.split('#')[0] };
    if (navigator.share) { try { await navigator.share(shareData); return; } catch (e) {} }
    if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(shareData.url).then(() => showToast('Game link copied to clipboard')).catch(() => showToast('Link ready to share')); } 
    else { showToast('Game ready to share'); }
  }

  function shareResultGrid() {
    const wordLevelMap = {};
    activePuzzle.categories.forEach(c => { c.items.forEach(w => { wordLevelMap[w] = c.level; }); });
    const lines = guessHistory.map(g => g.map(w => LEVEL_EMOJIS[wordLevelMap[w]] || '⬜').join(''));
    const text = `Connections\nPuzzle: ${activePuzzle.date}\n${lines.join('\n')}`;
    if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(() => showToast('Result copied to clipboard')); } 
    else { showToast('Result copied'); }
  }

  // ==========================================================================
  // 8. VAULT ARCHIVE & SETTINGS
  // ==========================================================================
  function refreshDailyReleaseState() {
    if (!puzzles || puzzles.length === 0) return;
    const authorDate = ReleaseClock.getCurrentReleaseDateString();
    dom.liveIndicator.textContent = ReleaseClock.isAuthoritative ? 'UK Daily' : 'UK (Local)';

    const released = puzzles.filter(p => p.date <= authorDate);
    todayPuzzle = puzzles.find(p => p.date === authorDate);
    if (!todayPuzzle) todayPuzzle = released.length > 0 ? released[released.length - 1] : puzzles[0];

    dom.btnPlayTitle.textContent = 'Play Connections';
    dom.menuPuzzleDate.textContent = todayPuzzle.date;
    updateMenuStatus();
  }

  function updateMenuStatus() {
    if (!todayPuzzle) return;
    const saved = getSavedGame(todayPuzzle.date);
    if (!saved) { dom.menuPlayStatus.textContent = 'Ready'; } 
    else if (saved.isComplete) { dom.menuPlayStatus.textContent = saved.isWon ? 'Solved' : 'Revealed'; } 
    else { dom.menuPlayStatus.textContent = `${(saved.solvedLevels || []).length}/4 Solved`; }
  }

  function renderVault() {
    dom.vaultList.innerHTML = '';
    const authorDate = ReleaseClock.getCurrentReleaseDateString();
    const archive = puzzles.filter(p => p.date < authorDate || (todayPuzzle && p.date !== todayPuzzle.date && p.date <= authorDate));

    if (archive.length === 0) {
      dom.vaultList.innerHTML = '<p class="vault-instructions">No previous puzzles currently in archive.</p>'; return;
    }

    archive.slice().reverse().forEach(p => {
      const item = document.createElement('div');
      item.className = 'vault-card-item';
      item.setAttribute('role', 'button'); item.tabIndex = 0;
      const saved = getSavedGame(p.date);
      let badge = '<span class="badge-tag unplayed">Unplayed</span>';
      if (saved && saved.isComplete) badge = saved.isWon ? '<span class="badge-tag won">Solved</span>' : '<span class="badge-tag revealed">Revealed</span>';
      item.innerHTML = `<span>${escapeHTML(p.date)}</span>${badge}`;
      const playArchive = () => startPuzzle(p, true);
      item.addEventListener('click', playArchive);
      item.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); playArchive(); } });
      dom.vaultList.appendChild(item);
    });
  }

  function renderStats() {
    const stats = loadStorage().stats;
    dom.statPlayed.textContent = stats.played;
    dom.statWinPct.textContent = stats.played > 0 ? `${Math.round((stats.won / stats.played) * 100)}%` : '0%';
    dom.statStreak.textContent = stats.streak;
    dom.statMaxStreak.textContent = stats.maxStreak;
  }

  function toggleAnimationSetting() {
    const store = loadStorage();
    store.settings.bgAnimation = !store.settings.bgAnimation;
    saveStorage(store);
    updateAnimationUI();
    AmbientSystem.updateState();
  }

  function updateAnimationUI() {
    const enabled = loadStorage().settings.bgAnimation;
    dom.btnToggleAnim.setAttribute('aria-checked', enabled ? 'true' : 'false');
    dom.btnToggleAnim.querySelector('.toggle-label').textContent = enabled ? 'On' : 'Off';
    dom.btnToggleAnim.classList.toggle('off', !enabled);
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  function escapeHTML(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ==========================================================================
  // 9. INITIALIZATION & EVENT BINDINGS
  // ==========================================================================
  async function init() {
    dom.btnReservedPlus.setAttribute('href', HOME_PLACEHOLDER_URL);

    AmbientSystem.init();
    updateAnimationUI();

    await ReleaseClock.synchronize();

    try {
      const res = await fetch('puzzles.csv', { cache: 'no-cache' });
      if (!res.ok) throw new Error('Failed to load puzzles.csv');
      const csv = await res.text();
      puzzles = loadPuzzleData(parseCSV(csv));
    } catch (e) {
      dom.menuPuzzleDate.textContent = 'Offline'; dom.menuPlayStatus.textContent = 'Catalog Error'; dom.btnPlayGame.disabled = true; return;
    }

    if (puzzles.length === 0) {
      dom.menuPuzzleDate.textContent = 'Unavailable'; dom.menuPlayStatus.textContent = 'Empty Data'; dom.btnPlayGame.disabled = true; return;
    }

    refreshDailyReleaseState();
    ReleaseClock.onSync(refreshDailyReleaseState);
    bindEvents();
    showScreen('menu');
  }

  function bindEvents() {
    dom.btnPlayGame.addEventListener('click', () => startPuzzle(todayPuzzle, false));
    dom.btnOpenVault.addEventListener('click', () => { renderVault(); showScreen('vault'); });
    dom.btnOpenSettings.addEventListener('click', () => { updateAnimationUI(); showScreen('settings'); });
    dom.btnOpenHowToPlay.addEventListener('click', openHowToPlay);
    dom.btnOpenStats.addEventListener('click', () => { renderStats(); showModal(dom.modalStats); });
    dom.btnShareGame.addEventListener('click', shareGeneralGame);
    dom.btnReservedPlus.addEventListener('click', () => showToast('Reserved for future features'));
    
    dom.btnGameBack.addEventListener('click', () => { updateMenuStatus(); showScreen('menu'); });
    dom.btnVaultBack.addEventListener('click', () => { updateMenuStatus(); showScreen('menu'); });
    dom.btnSettingsBack.addEventListener('click', () => { updateMenuStatus(); showScreen('menu'); });

    dom.btnShuffle.addEventListener('click', shuffleTiles);
    dom.btnDeselect.addEventListener('click', deselectAll);
    dom.btnSubmit.addEventListener('click', submitGuess);

    dom.btnCloseHowTo.addEventListener('click', closeHowToPlay);
    dom.btnCloseHowToIcon.addEventListener('click', closeHowToPlay);
    dom.howToBackdrop.addEventListener('click', closeHowToPlay);
    dom.btnToggleAnim.addEventListener('click', toggleAnimationSetting);

    document.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = document.getElementById(e.currentTarget.getAttribute('data-close'));
        if (modal) closeModal(modal);
      });
    });

    dom.btnShareResult.addEventListener('click', shareResultGrid);
    dom.btnResultMenu.addEventListener('click', () => { closeModal(dom.modalResult); updateMenuStatus(); showScreen('menu'); });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeHowToPlay();
        const activeModal = document.querySelector('.modal-backdrop:not(.hidden)');
        if (activeModal) closeModal(activeModal);
      }
    });

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        if (performance.now() - ReleaseClock.lastSyncTime > 900000) ReleaseClock.synchronize();
        else refreshDailyReleaseState();
      }
    });
    window.addEventListener('online', () => ReleaseClock.synchronize());
  }

  document.addEventListener('DOMContentLoaded', init);
})();