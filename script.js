(function () {
  'use strict';

  // Config & Constants
  const STORAGE_KEY = 'connections_save_v1';
  const MAX_MISTAKES = 4;
  const LEVEL_EMOJIS = { 1: '🟨', 2: '🟩', 3: '🟦', 4: '🟪' };
  const HOME_PLACEHOLDER_URL = 'https://tileworksgamesstudio.github.io/86/';

  // Exactly 12 distinct cocktail garnish SVG paths & shapes
  const GARNISH_SHAPES = [
    // 1. Orange twist
    { id: 'orange-twist', svg: '<path d="M6 34 C10 16, 26 8, 38 14 C48 20, 42 36, 28 34 C16 32, 18 18, 32 12 C44 7, 54 18, 54 26" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>' },
    // 2. Lemon twist
    { id: 'lemon-twist', svg: '<path d="M12 48 C6 32, 14 14, 30 10 C46 6, 52 24, 42 34 C32 44, 20 38, 22 26 C24 14, 40 8, 48 18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>' },
    // 3. Lime wheel
    { id: 'lime-wheel', svg: '<circle cx="30" cy="30" r="22" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="30" cy="30" r="17" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 3"/><circle cx="30" cy="30" r="3" fill="currentColor"/><path d="M30 13 L30 47 M13 30 L47 30 M18 18 L42 42 M18 42 L42 18" stroke="currentColor" stroke-width="1.2"/>' },
    // 4. Lemon wheel
    { id: 'lemon-wheel', svg: '<circle cx="30" cy="30" r="24" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="30" cy="30" r="19" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="30" cy="30" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M30 11 L30 49 M11 30 L49 30 M17 17 L43 43 M17 43 L43 17" stroke="currentColor" stroke-width="1.4"/>' },
    // 5. Dehydrated orange wheel
    { id: 'dehydrated-orange', svg: '<circle cx="30" cy="30" r="23" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="30" cy="30" r="15" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M30 8 L30 52 M8 30 L52 30 M14 14 L46 46 M14 46 L46 14" stroke="currentColor" stroke-width="2"/><circle cx="30" cy="30" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/>' },
    // 6. Dehydrated lemon wheel
    { id: 'dehydrated-lemon', svg: '<circle cx="30" cy="30" r="22" fill="none" stroke="currentColor" stroke-width="2.5"/><polygon points="30,12 36,24 48,30 36,36 30,48 24,36 12,30 24,24" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="30" cy="30" r="3" fill="currentColor"/>' },
    // 7. Cocktail cherry
    { id: 'cocktail-cherry', svg: '<circle cx="26" cy="36" r="14" fill="currentColor"/><path d="M26 22 C26 8, 44 4, 48 8" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><ellipse cx="22" cy="32" rx="3.5" ry="2" fill="rgba(255,245,210,0.4)"/>' },
    // 8. Maraschino cherry pair
    { id: 'cherry-pair', svg: '<circle cx="20" cy="38" r="11" fill="currentColor"/><circle cx="38" cy="35" r="10" fill="currentColor"/><path d="M20 27 C22 14, 30 6, 32 4 C34 6, 38 16, 38 25" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' },
    // 9. Mint sprig
    { id: 'mint-sprig', svg: '<path d="M30 48 L30 14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M30 36 C20 36, 14 30, 16 22 C24 22, 30 28, 30 36 Z" fill="currentColor"/><path d="M30 28 C40 28, 46 22, 44 14 C36 14, 30 20, 30 28 Z" fill="currentColor"/><path d="M30 16 C24 10, 26 4, 30 2 C34 4, 36 10, 30 16 Z" fill="currentColor"/>' },
    // 10. Rosemary sprig
    { id: 'rosemary-sprig', svg: '<path d="M30 52 L30 8" stroke="currentColor" stroke-width="2"/><path d="M30 42 L16 34 M30 38 L44 30 M30 30 L18 22 M30 26 L42 18 M30 18 L20 12 M30 14 L40 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' },
    // 11. Green olive on pick
    { id: 'green-olive', svg: '<line x1="12" y1="52" x2="48" y2="8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><ellipse cx="30" cy="30" rx="12" ry="16" transform="rotate(-45 30 30)" fill="currentColor"/><circle cx="28" cy="28" r="4" fill="rgba(14,6,4,0.6)"/>' },
    // 12. Cucumber ribbon
    { id: 'cucumber-ribbon', svg: '<path d="M12 44 C24 48, 32 38, 22 28 C12 18, 34 10, 48 18 C38 28, 48 38, 42 46" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><path d="M16 42 C26 46, 30 36, 24 30 C16 22, 32 14, 44 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 3"/>' }
  ];

  // Runtime State
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

  // DOM Elements
  const screens = {
    menu: document.getElementById('screen-menu'),
    game: document.getElementById('screen-game'),
    vault: document.getElementById('screen-vault')
  };

  const dom = {
    toast: document.getElementById('toast'),
    menuDate: document.getElementById('menu-date'),
    menuStatus: document.getElementById('menu-status'),
    btnPlayToday: document.getElementById('btn-play-today'),
    btnOpenVault: document.getElementById('btn-open-vault'),
    btnHome: document.getElementById('btn-home'),
    btnGameBack: document.getElementById('btn-game-back'),
    btnVaultBack: document.getElementById('btn-vault-back'),
    gamePuzzleTitle: document.getElementById('game-puzzle-title'),
    solvedStack: document.getElementById('solved-stack'),
    grid: document.getElementById('grid'),
    mistakeDots: document.getElementById('mistake-dots'),
    btnShuffle: document.getElementById('btn-shuffle'),
    btnDeselect: document.getElementById('btn-deselect'),
    btnSubmit: document.getElementById('btn-submit'),
    vaultList: document.getElementById('vault-list'),
    modalHelp: document.getElementById('modal-help'),
    modalStats: document.getElementById('modal-stats'),
    modalResult: document.getElementById('modal-result'),
    btnHelp: document.getElementById('btn-help'),
    btnStats: document.getElementById('btn-stats'),
    btnShare: document.getElementById('btn-share'),
    btnResultMenu: document.getElementById('btn-result-menu'),
    resultMsg: document.getElementById('result-msg'),
    resultGrid: document.getElementById('result-grid'),
    statPlayed: document.getElementById('stat-played'),
    statWinPct: document.getElementById('stat-win-pct'),
    statStreak: document.getElementById('stat-streak'),
    statMaxStreak: document.getElementById('stat-max-streak'),
    garnishStage: document.getElementById('garnish-stage')
  };

  // =========================================================================
  // LUXURY AMBIENT AUDIO SYSTEM (Synthetic Web Audio, Gesture-Safe, Optional)
  // =========================================================================
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      try {
        const AudioClass = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioClass();
      } catch (e) {
        audioCtx = null;
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  const sound = {
    tick: () => {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.018, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.045);
      } catch (e) {}
    },
    tap: () => {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(260, ctx.currentTime + 0.06);
        gain.gain.setValueAtTime(0.025, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.065);
      } catch (e) {}
    },
    chimeSuccess: () => {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const freqs = [880, 1320];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const startTime = ctx.currentTime + (idx * 0.09);
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0.035, startTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.38);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(startTime);
          osc.stop(startTime + 0.4);
        });
      } catch (e) {}
    },
    chimeError: () => {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(210, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(140, ctx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.028, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.19);
      } catch (e) {}
    },
    celebration: () => {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const chord = [523.25, 659.25, 783.99, 1046.50];
        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const startTime = ctx.currentTime + (idx * 0.12);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0.038, startTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.65);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(startTime);
          osc.stop(startTime + 0.68);
        });
      } catch (e) {}
    }
  };

  // =========================================================================
  // ANIMATED COCKTAIL GARNISH BACKGROUND SYSTEM
  // =========================================================================
  function initGarnishSystem() {
    if (!dom.garnishStage) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const isMobile = window.innerWidth < 600;
    const maxGarnishes = isMobile ? 7 : 14;
    let currentGarnishes = 0;

    function spawnGarnish() {
      if (currentGarnishes >= maxGarnishes) {
        scheduleNext();
        return;
      }

      currentGarnishes++;
      const garnish = document.createElement('div');
      const shapeObj = GARNISH_SHAPES[Math.floor(Math.random() * GARNISH_SHAPES.length)];

      // 3 Depth Levels: distant, mid, near
      const depthRoll = Math.random();
      let depthClass = 'garnish-depth-distant';
      let size = 26 + Math.random() * 8;
      let opacity = 0.15 + Math.random() * 0.15;
      let duration = 26 + Math.random() * 12; // 26s - 38s
      let color = 'rgba(196, 81, 29, ';

      if (depthRoll > 0.65) {
        depthClass = 'garnish-depth-near';
        size = 38 + Math.random() * 12;
        opacity = 0.32 + Math.random() * 0.18;
        duration = 18 + Math.random() * 8; // 18s - 26s
        color = 'rgba(245, 200, 110, ';
      } else if (depthRoll > 0.3) {
        depthClass = 'garnish-depth-mid';
        size = 32 + Math.random() * 8;
        opacity = 0.22 + Math.random() * 0.15;
        duration = 22 + Math.random() * 9;
        color = 'rgba(224, 130, 53, ';
      }

      garnish.className = `garnish-item ${depthClass}`;
      garnish.style.width = `${size}px`;
      garnish.style.height = `${size}px`;
      garnish.style.left = `${Math.random() * 94}%`;
      garnish.style.color = `${color}${opacity})`;

      garnish.innerHTML = `<svg viewBox="0 0 60 60" aria-hidden="true">${shapeObj.svg}</svg>`;
      dom.garnishStage.appendChild(garnish);

      const horizontalDrift = (Math.random() - 0.5) * 80;
      const startRotation = Math.random() * 360;
      const endRotation = startRotation + (Math.random() > 0.5 ? 1 : -1) * (90 + Math.random() * 180);

      const anim = garnish.animate([
        {
          transform: `translate(0, 0) rotate(${startRotation}deg)`,
          opacity: 0
        },
        {
          opacity: opacity,
          offset: 0.15
        },
        {
          opacity: opacity,
          offset: 0.85
        },
        {
          transform: `translate(${horizontalDrift}px, -${window.innerHeight + 140}px) rotate(${endRotation}deg)`,
          opacity: 0
        }
      ], {
        duration: duration * 1000,
        easing: 'cubic-bezier(0.25, 0.5, 0.75, 1)',
        fill: 'forwards'
      });

      anim.onfinish = () => {
        garnish.remove();
        currentGarnishes--;
      };

      scheduleNext();
    }

    function scheduleNext() {
      const nextDelay = 1200 + Math.random() * 2400;
      setTimeout(spawnGarnish, nextDelay);
    }

    // Seed initial batch gracefully
    for (let i = 0; i < (isMobile ? 4 : 7); i++) {
      setTimeout(spawnGarnish, i * 800);
    }
  }

  // =========================================================================
  // DATA PARSING & STORAGE
  // =========================================================================
  function parseCSV(text) {
    const rows = [];
    let row = [];
    let cell = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (inQuotes) {
        if (c === '"') {
          if (text[i + 1] === '"') {
            cell += '"';
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          cell += c;
        }
      } else {
        if (c === '"') {
          inQuotes = true;
        } else if (c === ',') {
          row.push(cell.trim());
          cell = '';
        } else if (c === '\n' || c === '\r') {
          row.push(cell.trim());
          if (row.some(val => val !== '')) rows.push(row);
          row = [];
          cell = '';
          if (c === '\r' && text[i + 1] === '\n') i++;
        } else {
          cell += c;
        }
      }
    }
    if (cell || row.length > 0) {
      row.push(cell.trim());
      if (row.some(val => val !== '')) rows.push(row);
    }
    return rows;
  }

  function loadPuzzleData(csvRows) {
    if (!Array.isArray(csvRows) || csvRows.length < 2) return [];
    const list = [];

    for (let i = 1; i < csvRows.length; i++) {
      const r = csvRows[i];
      if (r.length < 9) continue;

      const date = r[0];
      const categories = [];

      for (let c = 0; c < 4; c++) {
        const catName = r[1 + c * 2];
        const rawWords = r[2 + c * 2];
        if (!catName || !rawWords) continue;

        const items = rawWords.split(/[,;]/).map(w => w.trim()).filter(w => w.length > 0);
        if (items.length === 4) {
          categories.push({
            name: catName,
            level: c + 1,
            items: items
          });
        }
      }

      if (categories.length === 4) {
        list.push({ date, categories });
      }
    }

    return list.sort((a, b) => a.date.localeCompare(b.date));
  }

  function loadStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object' && parsed.stats && parsed.games) {
          return parsed;
        }
      }
    } catch (e) {}
    return {
      version: 1,
      stats: { played: 0, won: 0, streak: 0, maxStreak: 0 },
      games: {}
    };
  }

  function saveStorage(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function getSavedGame(date) {
    const store = loadStorage();
    return store.games[date] || null;
  }

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
        if (store.stats.streak > store.stats.maxStreak) {
          store.stats.maxStreak = store.stats.streak;
        }
      } else {
        store.stats.streak = 0;
      }
      store.games[activePuzzle.date].recorded = true;
    }

    saveStorage(store);
  }

  // =========================================================================
  // NAVIGATION & MODALS
  // =========================================================================
  function showScreen(name) {
    Object.keys(screens).forEach(key => {
      screens[key].classList.toggle('hidden', key !== name);
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
    sound.tap();
  }

  function showModal(modal) {
    modal.classList.remove('hidden');
    sound.tap();
  }

  function closeModal(modal) {
    modal.classList.add('hidden');
    sound.tap();
  }

  let toastTimer = null;
  function showToast(msg) {
    dom.toast.textContent = msg;
    dom.toast.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => dom.toast.classList.add('hidden'), 2200);
  }

  // =========================================================================
  // GAMEPLAY LIFECYCLE
  // =========================================================================
  function startPuzzle(puzzle, isArchive) {
    activePuzzle = puzzle;
    isArchiveMode = isArchive;
    dom.gamePuzzleTitle.textContent = isArchive ? `Vault: ${puzzle.date}` : `Daily: ${puzzle.date}`;

    selectedWords = [];
    const saved = getSavedGame(puzzle.date);

    if (saved) {
      solvedCategories = (saved.solvedLevels || []).map(lvl => puzzle.categories.find(c => c.level === lvl)).filter(Boolean);
      unsolvedWords = Array.isArray(saved.unsolvedWords) ? saved.unsolvedWords : [];
      mistakesRemaining = typeof saved.mistakesRemaining === 'number' ? saved.mistakesRemaining : MAX_MISTAKES;
      guessHistory = Array.isArray(saved.guessHistory) ? saved.guessHistory : [];
      isComplete = Boolean(saved.isComplete);
      isWon = Boolean(saved.isWon);
    } else {
      solvedCategories = [];
      mistakesRemaining = MAX_MISTAKES;
      guessHistory = [];
      isComplete = false;
      isWon = false;

      const all = [];
      puzzle.categories.forEach(cat => cat.items.forEach(item => all.push(item)));
      shuffleArray(all);
      unsolvedWords = all;
    }

    renderBoard();
    updateControls();
    showScreen('game');
  }

  function renderBoard() {
    // Solved category banners
    dom.solvedStack.innerHTML = '';
    solvedCategories.forEach(cat => {
      const banner = document.createElement('div');
      banner.className = `solved-banner cat-${cat.level}`;
      banner.innerHTML = `
        <span class="solved-level-tag">Level ${cat.level}</span>
        <span class="solved-name">${escapeHTML(cat.name)}</span>
        <span class="solved-items">${cat.items.map(escapeHTML).join(', ')}</span>
      `;
      dom.solvedStack.appendChild(banner);
    });

    // Unsolved words grid
    dom.grid.innerHTML = '';
    unsolvedWords.forEach(word => {
      const tile = document.createElement('button');
      tile.type = 'button';
      tile.className = 'tile';
      if (selectedWords.includes(word)) tile.classList.add('selected');
      if (isComplete) tile.disabled = true;
      tile.textContent = word;
      tile.setAttribute('aria-pressed', selectedWords.includes(word) ? 'true' : 'false');
      tile.addEventListener('click', () => toggleSelect(word));
      dom.grid.appendChild(tile);
    });

    // Mistake dots
    const dots = dom.mistakeDots.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('filled', idx < mistakesRemaining);
    });
    dom.mistakeDots.setAttribute('aria-label', `${mistakesRemaining} mistakes remaining`);
  }

  function updateControls() {
    const count = selectedWords.length;
    dom.btnSubmit.disabled = count !== 4 || isComplete;
    dom.btnDeselect.disabled = count === 0 || isComplete;
    dom.btnShuffle.disabled = unsolvedWords.length <= 1 || isComplete;
  }

  function toggleSelect(word) {
    if (isComplete) return;
    const idx = selectedWords.indexOf(word);
    if (idx > -1) {
      selectedWords.splice(idx, 1);
      sound.tick();
    } else {
      if (selectedWords.length >= 4) return;
      selectedWords.push(word);
      sound.tick();
    }
    renderBoard();
    updateControls();
  }

  function deselectAll() {
    selectedWords = [];
    sound.tap();
    renderBoard();
    updateControls();
  }

  function shuffleTiles() {
    shuffleArray(unsolvedWords);
    sound.tap();
    renderBoard();
  }

  function submitGuess() {
    if (selectedWords.length !== 4 || isComplete) return;

    const guessKey = [...selectedWords].sort().join('|');
    const alreadyGuessed = guessHistory.some(g => [...g].sort().join('|') === guessKey);
    if (alreadyGuessed) {
      showToast('Already guessed');
      sound.chimeError();
      return;
    }

    guessHistory.push([...selectedWords]);

    // Check if guess matches any unsolved category
    let matchedCat = null;
    for (const cat of activePuzzle.categories) {
      if (solvedCategories.includes(cat)) continue;
      const count = selectedWords.filter(w => cat.items.includes(w)).length;
      if (count === 4) {
        matchedCat = cat;
        break;
      }
    }

    if (matchedCat) {
      sound.chimeSuccess();
      solvedCategories.push(matchedCat);
      unsolvedWords = unsolvedWords.filter(w => !matchedCat.items.includes(w));
      selectedWords = [];

      // If 3 categories solved, auto-complete 4th
      if (solvedCategories.length === 3) {
        const lastCat = activePuzzle.categories.find(c => !solvedCategories.includes(c));
        if (lastCat) {
          solvedCategories.push(lastCat);
          unsolvedWords = [];
        }
      }

      if (solvedCategories.length === 4) {
        isComplete = true;
        isWon = true;
        finishGame();
      } else {
        saveActiveGame();
        renderBoard();
        updateControls();
      }
    } else {
      mistakesRemaining--;
      sound.chimeError();

      const isOneAway = activePuzzle.categories.some(cat => {
        if (solvedCategories.includes(cat)) return false;
        return selectedWords.filter(w => cat.items.includes(w)).length === 3;
      });
      if (isOneAway) showToast('One away...');

      const domTiles = dom.grid.querySelectorAll('.tile.selected');
      domTiles.forEach(t => t.classList.add('shake'));
      setTimeout(() => domTiles.forEach(t => t.classList.remove('shake')), 360);

      if (mistakesRemaining <= 0) {
        isComplete = true;
        isWon = false;
        setTimeout(() => {
          solvedCategories = [...activePuzzle.categories];
          unsolvedWords = [];
          selectedWords = [];
          finishGame();
        }, 500);
      } else {
        saveActiveGame();
        renderBoard();
        updateControls();
      }
    }
  }

  function finishGame() {
    saveActiveGame();
    renderBoard();
    updateControls();
    updateMenuStatus();
    if (isWon) {
      sound.celebration();
    }
    setTimeout(showResultModal, 600);
  }

  function showResultModal() {
    dom.resultMsg.textContent = isWon ? 'Magnificent! Puzzle Solved.' : 'Revealed. Better luck next time!';
    dom.resultGrid.innerHTML = '';

    const wordLevelMap = {};
    activePuzzle.categories.forEach(cat => {
      cat.items.forEach(item => { wordLevelMap[item] = cat.level; });
    });

    guessHistory.forEach(guess => {
      const line = guess.map(w => LEVEL_EMOJIS[wordLevelMap[w]] || '⬜').join('');
      const row = document.createElement('div');
      row.textContent = line;
      dom.resultGrid.appendChild(row);
    });

    showModal(dom.modalResult);
  }

  function shareResult() {
    const wordLevelMap = {};
    activePuzzle.categories.forEach(cat => {
      cat.items.forEach(item => { wordLevelMap[item] = cat.level; });
    });

    const lines = guessHistory.map(guess =>
      guess.map(w => LEVEL_EMOJIS[wordLevelMap[w]] || '⬜').join('')
    );

    const shareText = `Connections\nPuzzle: ${activePuzzle.date}\n${lines.join('\n')}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareText).then(() => showToast('Copied to clipboard'));
    } else {
      showToast('Copied to clipboard');
    }
    sound.tap();
  }

  // =========================================================================
  // VIEWS & UI UPDATES
  // =========================================================================
  function updateMenuStatus() {
    if (!todayPuzzle) return;
    dom.menuDate.textContent = todayPuzzle.date;
    const saved = getSavedGame(todayPuzzle.date);

    if (!saved) {
      dom.menuStatus.textContent = 'Ready to play';
      dom.btnPlayToday.textContent = 'Play Daily';
    } else if (saved.isComplete) {
      dom.menuStatus.textContent = saved.isWon ? 'Solved' : 'Revealed';
      dom.btnPlayToday.textContent = 'View Board';
    } else {
      const solvedCount = (saved.solvedLevels || []).length;
      dom.menuStatus.textContent = `In Progress (${solvedCount}/4 Solved)`;
      dom.btnPlayToday.textContent = 'Continue Daily';
    }
  }

  function renderVault() {
    dom.vaultList.innerHTML = '';
    const archivePuzzles = puzzles.filter(p => p.date <= todayPuzzle.date && p.date !== todayPuzzle.date);

    if (archivePuzzles.length === 0) {
      dom.vaultList.innerHTML = '<p class="vault-lead">No previous puzzles currently in the Vault.</p>';
      return;
    }

    archivePuzzles.slice().reverse().forEach(p => {
      const item = document.createElement('div');
      item.className = 'vault-item';
      item.setAttribute('role', 'listitem');
      item.tabIndex = 0;

      const saved = getSavedGame(p.date);
      let badge = '<span class="badge badge-unplayed">Unplayed</span>';
      if (saved && saved.isComplete) {
        badge = saved.isWon
          ? '<span class="badge badge-won">Solved</span>'
          : '<span class="badge badge-lost">Revealed</span>';
      }

      item.innerHTML = `<span>${escapeHTML(p.date)}</span>${badge}`;
      const playHandler = () => startPuzzle(p, true);
      item.addEventListener('click', playHandler);
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          playHandler();
        }
      });
      dom.vaultList.appendChild(item);
    });
  }

  function renderStats() {
    const store = loadStorage();
    const stats = store.stats;
    dom.statPlayed.textContent = stats.played;
    dom.statWinPct.textContent = stats.played > 0 ? `${Math.round((stats.won / stats.played) * 100)}%` : '0%';
    dom.statStreak.textContent = stats.streak;
    dom.statMaxStreak.textContent = stats.maxStreak;
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // =========================================================================
  // INITIALIZATION & EVENT BINDING
  // =========================================================================
  async function init() {
    dom.btnHome.setAttribute('href', HOME_PLACEHOLDER_URL);
    initGarnishSystem();

    try {
      const res = await fetch('puzzles.csv', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to load CSV');
      const csvText = await res.text();
      puzzles = loadPuzzleData(parseCSV(csvText));
    } catch (e) {
      dom.menuDate.textContent = 'Unavailable';
      dom.menuStatus.textContent = 'Failed to load puzzle data.';
      dom.btnPlayToday.disabled = true;
      return;
    }

    if (puzzles.length === 0) {
      dom.menuDate.textContent = 'Unavailable';
      dom.menuStatus.textContent = 'No valid puzzles found.';
      dom.btnPlayToday.disabled = true;
      return;
    }

    const todayStr = new Date().toISOString().slice(0, 10);
    const pastOrToday = puzzles.filter(p => p.date <= todayStr);

    todayPuzzle = puzzles.find(p => p.date === todayStr);
    if (!todayPuzzle) {
      todayPuzzle = pastOrToday.length > 0 ? pastOrToday[pastOrToday.length - 1] : puzzles[0];
    }

    updateMenuStatus();
    bindEvents();
    showScreen('menu');
  }

  function bindEvents() {
    dom.btnPlayToday.addEventListener('click', () => startPuzzle(todayPuzzle, false));

    dom.btnOpenVault.addEventListener('click', () => {
      renderVault();
      showScreen('vault');
    });

    dom.btnGameBack.addEventListener('click', () => {
      updateMenuStatus();
      showScreen('menu');
    });

    dom.btnVaultBack.addEventListener('click', () => {
      updateMenuStatus();
      showScreen('menu');
    });

    dom.btnResultMenu.addEventListener('click', () => {
      closeModal(dom.modalResult);
      updateMenuStatus();
      showScreen('menu');
    });

    // In-game controls
    dom.btnShuffle.addEventListener('click', shuffleTiles);
    dom.btnDeselect.addEventListener('click', deselectAll);
    dom.btnSubmit.addEventListener('click', submitGuess);

    // Utilities & Modals
    dom.btnHelp.addEventListener('click', () => showModal(dom.modalHelp));
    dom.btnStats.addEventListener('click', () => {
      renderStats();
      showModal(dom.modalStats);
    });

    dom.btnShare.addEventListener('click', shareResult);

    document.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-close');
        const m = document.getElementById(id);
        if (m) closeModal(m);
      });
    });

    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();