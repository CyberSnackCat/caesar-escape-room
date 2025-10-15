// ==========================
// Caesar Cipher Escape Room (with Vigenere bonus levels)
// With a Cat, Music and Food!
// ==========================

// Build marker: update this value when pushing changes to help detect cached scripts in users' browsers
console.log('script.js loaded — build: 2025-10-15T00:00:00Z');

// --- Utilities: Caesar ---
function normalizeCharCode(c) {
  const code = c.charCodeAt(0);
document.addEventListener('DOMContentLoaded', () => {
  if (code >= 97 && code <= 122) return { base: 97, code, isLetter: true, isUpper: false };
  return { base: null, code, isLetter: false, isUpper: false };
}
function caesarShift(str, shift) {
  const s = ((shift % 26) + 26) % 26;
  return [...str].map(ch => {
    const { base, code, isLetter } = normalizeCharCode(ch);
    if (!isLetter) return ch;
    const offset = (code - base + s) % 26;
    return String.fromCharCode(base + offset);
  }).join('');
}
function caesarDecrypt(str, shift) { return caesarShift(str, -shift); }

// --- Utilities: Vigenère ---
function onlyLetters(s) { return (s || '').toUpperCase().replace(/[^A-Z]/g, ''); }
function vigenereShiftChar(ch, k) {
  const code = ch.charCodeAt(0) - 65;
  return String.fromCharCode(65 + ((code + k + 26) % 26));
}
function vigenereUnshiftChar(ch, k) {
  const code = ch.charCodeAt(0) - 65;
  return String.fromCharCode(65 + ((code - k + 26) % 26));
}
function vigenereEncrypt(plaintext, key) {
  const K = onlyLetters(key);
  if (!K) return plaintext;
  let ki = 0;
  return [...plaintext].map(ch => {
    const up = ch.toUpperCase();
    if (/[A-Z]/.test(up)) {
      const k = K.charCodeAt(ki % K.length) - 65;
      ki++;
      const out = vigenereShiftChar(up, k);
      return ch === up ? out : out.toLowerCase();
    }
    return ch;
  }).join('');
}
function vigenereDecrypt(ciphertext, key) {
  const K = onlyLetters(key);
  // --- Game logic functions (must be defined after DOM is ready) ---
  function updateHud(){
    hudScore.textContent = state.score;
    hudHints.textContent = state.hintsLeft;
    hudTime.textContent = state.timeLeft;
    hudPIndex.textContent = state.idx + 1;
  }
  function resetGame(){
    state.idx=0; state.score=0; state.hintsLeft=3; state.timeLeft=TOTAL_TIME; updateHud(); stopMusic();
  }
  function startGame(){
    resetGame(); showScreen(screenGame); hudPTotal.textContent = PUZZLES.length; loadPuzzle(state.idx); startGlobalTimer();
  }
  if (!K) return ciphertext;
  let ki = 0;
  return [...ciphertext].map(ch => {
    const up = ch.toUpperCase();
    if (/[A-Z]/.test(up)) {
      const k = K.charCodeAt(ki % K.length) - 65;
      ki++;
      const out = vigenereUnshiftChar(up, k);
      return ch === up ? out : out.toLowerCase();
    }
    return ch;
  }).join('');
}

// Frequency (A-Z)
function frequencyMap(str) {
  const freq = Array(26).fill(0);
  let total = 0;
  for (const ch of str.toUpperCase()) {
    const code = ch.charCodeAt(0);
    if (code >= 65 && code <= 90) { freq[code - 65] += 1; total += 1; }
  }
  return { freq, total };
}
function normalize(str) { return String(str).trim().replace(/\s+/g, ' ').toUpperCase(); }

// --- Personalized Puzzles ---
// Types: 'decode' (Caesar plaintext), 'identify' (Caesar shift), 'clue' (enter word after THE),
//        'vigenere-key' (enter keyword), 'vigenere-decode' (enter plaintext)
const PUZZLES = [
  // 1 🐱 Tabby cat
  {
    title: 'Door 1 — Cipher the Tabby',
    story: 'Your tabby cat, Cipher 🐱, drops a collar tag on your bed. A Caesar message is scratched on the back.',
    type: 'decode', shift: 5,
    plaintext: 'FEED THE TABBY CAT TUNA AT NOON',
    hints: [
      'Short words like THE, AT, NOON help anchor the shift.',
      'Try Brute Force and scan for real words.',
      'Common Caesar shifts: 3, 5, 7.'
    ],
    validation: (input) => normalize(input) === normalize('FEED THE TABBY CAT TUNA AT NOON'),
    music: false
  },

  // 2 🎶 Lyrical nerdcore (identify shift)
  {
    title: 'Door 2 — Lyrical Nerdcore Console',
    story: 'Your lyric sheet is scrambled on the screen. Caesar again—identify the shift.',
    type: 'identify', shift: 13, // ROT13
    plaintext: 'PLAY THE LYRICAL NERDCORE THEN OPEN',
    hints: [
      'ROT13 mirrors A↔N, B↔O, C↔P...',
      'Brute Force and pick the readable line.',
      'Anchor on THE, THEN, OPEN.'
    ],
    validation: (s) => Number(s) === 13,
    music: true
  },

  // 3 🍰 Food clue — cheese(cake)
  {
    title: 'Door 3 — Cheesecake Clue',
    story: 'Kitchen note smells sweet. Decode, then enter the food word right after THE.',
    type: 'clue', shift: 19,
    plaintext: 'GRAB THE CHEESECAKE AND EXIT',
    hints: [
      'Decode first. The answer is the word after THE.',
      'Food favorites may appear (cheese, cake, pastries).',
      'Frequency tool can help: E and T are common.'
    ],
    extractAnswer: (decoded) => (decoded.match(/\bTHE\s+([A-Z]+)\b/i)?.[1] || '').toUpperCase(),
    validation: (input/*, decoded*/) => normalize(input) === normalize('CHEESECAKE'),
    music: false
  },

  // 4 🪟 Tabby mischief (clue)
  {
    title: 'Door 4 — Tabby Window Clue',
    story: 'Cipher knocks a plant; a taped note appears. Decode, then enter the word after THE.',
    type: 'clue', shift: 11,
    plaintext: 'CHECK THE WINDOW LATCH',
    hints: [
      'Decode; answer is right after THE.',
      'WINDOW or LATCH might pop out.',
      'Brute force all shifts if stuck.'
    ],
    extractAnswer: (decoded) => (decoded.match(/\bTHE\s+([A-Z]+)\b/i)?.[1] || '').toUpperCase(),
    validation: (input/*, decoded*/) => normalize(input) === normalize('WINDOW'),
    music: false
  },

  // 5 🎼 Tempo (identify)
  {
    title: 'Door 5 — Keep the Tempo',
    story: 'The metronome ticks. Identify the Caesar shift.',
    type: 'identify', shift: 8,
    plaintext: 'KEEP THE TEMPO COUNT FOUR',
    hints: [
      'Look for KEEP, TEMPO, FOUR.',
      'Brute force around shifts 6–10.',
      'Readable English is your sign.'
    ],
    validation: (s) => Number(s) === 8,
    music: true
  },

  // 6 🍕 Final feast (Caesar decode) — BBQ chicken pizza
  {
    title: 'Door 6 — BBQ Chicken Pizza',
    story: 'A delivery reminder pops up. Decode the Caesar note to confirm the order.',
    type: 'decode', shift: 3,
    plaintext: 'ORDER BARBEQUE CHICKEN PIZZA',
    hints: [
      'Classic Caesar is shift 3.',
      'Look for CHICKEN or PIZZA in brute force results.',
      'Spaces and punctuation are unshifted.'
    ],
    validation: (input) => normalize(input) === normalize('ORDER BARBEQUE CHICKEN PIZZA'),
    music: false
  },

  // --- Vigenère bonuses & more personalization ---
  // 7 🎶 Vigenère: enter keyword
  {
    title: 'Door 7 — Bonus: Lyrical Hook (Vigenère)',
    story: 'A Vigenère lock guards the lyric sheet. Enter the keyword to reveal the hook.',
    type: 'vigenere-key', key: 'LYRICS',
    plaintext: 'WRITE THE LYRICAL NERDCORE HOOK',
    hints: [
      'This is Vigenère (keyword-based).',
      'Keyword is music-themed and fits the vibe.',
      'Try LYRICS in the Vigenère Helper.'
    ],
    music: true
  },

  // 8 🐱 Vigenère: enter plaintext with cat & bed
  {
    title: 'Door 8 — Bonus: Bed & Tabby (Vigenère)',
    story: 'Cipher curls on your bed. Decode the note (Vigenère) and enter the plaintext.',
    type: 'vigenere-decode', key: 'TABBY',
    plaintext: 'LIE ON THE BED WITH TABBY AND PLAY',
    hints: [
      'Use the Vigenère Helper and the keyword TABBY.',
      'Spaces/punctuation stay; only letters shift.',
      'Think home, bed, cat, games.'
    ],
    music: false
  },

  // 9 🍰 Vigenère: enter keyword — pastries
  {
    title: 'Door 9 — Bonus: French Pastry (Vigenère)',
    story: 'A pastry bag has a code tag. Enter the keyword to read it.',
    type: 'vigenere-key', key: 'PASTRY',
    plaintext: 'SAVE THE FRENCH PASTRIES FOR HOME',
    hints: [
      'Keyword is pastry-themed (6 letters).',
      'Try PASTRY in the helper.',
      'Vigenère repeats the keyword over the message.'
    ],
    music: false
  },

  // 10 🍕 Identify shift — pizza again, just to tempt fate
  {
    title: 'Door 10 — Bonus: Pizza Countdown',
    story: 'Clock is ticking. Identify the Caesar shift to finalize the pizza run.',
    type: 'identify', shift: 6,
    plaintext: 'GET THE BARBEQUE CHICKEN PIZZA',
    hints: [
      'KEEP scanning brute force lines for the phrase.',
      'Try shifts 5–8 first.',
      'Look for BARBEQUE and PIZZA.'
    ],
    validation: (s) => Number(s) === 6,
    music: false
  },

  // 11 🧀 Vigenère decode — cheese & cake
  {
    title: 'Door 11 — Bonus: Cheese & Cake (Vigenère)',
    story: 'A fridge magnet hides a code. Decode and enter the plaintext.',
    type: 'vigenere-decode', key: 'CHEESE',
    plaintext: 'BRING CHEESE AND CAKE HOME',
    hints: [
      'Keyword is CHEESE (very on brand).',
      'Try the helper with CHEESE.',
      'Then type the full plaintext.'
    ],
    music: false
  },

  // 12 🛏️ Caesar clue — bed after THE
  {
    title: 'Door 12 — Bonus: Chill Time',
    story: 'One last message: decode, then enter the word after THE.',
    type: 'clue', shift: 9,
    plaintext: 'RELAX ON THE BED WITH TABBY AND GAME',
    hints: [
      'Decode; enter the single word after THE.',
      'Home + bed + tabby + gaming.',
      'Brute force all shifts if needed.'
    ],
    extractAnswer: (decoded) => (decoded.match(/\bTHE\s+([A-Z]+)\b/i)?.[1] || '').toUpperCase(),
    validation: (input/*, decoded*/) => normalize(input) === normalize('BED'),
    music: false
  }
];

// Compute ciphertexts
for (const p of PUZZLES) {
  if (p.type.startsWith('vigenere')) p.ciphertext = vigenereEncrypt(p.plaintext, p.key);
  else p.ciphertext = caesarShift(p.plaintext, p.shift);
}

// --- State ---
const TOTAL_TIME = 300;
const state = { idx: 0, score: 0, hintsLeft: 3, timeLeft: TOTAL_TIME, timerId: null, musicOn: false };


// --- DOM ---
let screenIntro, screenGame, screenWin;
let btnStart, btnLeaderboardIntro, btnLeaderboardGame, btnTutorialIntro, btnTutorialGame, btnTutorialWin, btnDyslexiaIntro, btnDyslexiaGame;
let btnCheck, btnHint, btnTools, btnSound, feedback;
let hudTime, hudScore, hudHints, hudPIndex, hudPTotal;

document.addEventListener('DOMContentLoaded', () => {
  // Query all DOM elements after DOM is ready
  screenIntro = document.getElementById('screen-intro');
  screenGame  = document.getElementById('screen-game');
  screenWin   = document.getElementById('screen-win');

  btnStart = document.getElementById('btn-start');
  btnLeaderboardIntro = document.getElementById('btn-leaderboard');
  btnLeaderboardGame = document.getElementById('btn-leaderboard-game');
  btnTutorialIntro = document.getElementById('btn-tutorial-intro');
  btnTutorialGame = document.getElementById('btn-tutorial');
  btnTutorialWin = document.getElementById('btn-tutorial-win');
  btnDyslexiaIntro = document.getElementById('btn-dyslexia');
  btnDyslexiaGame = document.getElementById('btn-dyslexia-game');

  btnCheck = document.getElementById('btn-check');
  btnHint  = document.getElementById('btn-hint');
  btnTools = document.getElementById('btn-tools');
  btnSound = document.getElementById('btn-sound');
  feedback = document.getElementById('feedback');

  hudTime   = document.getElementById('hud-time');
  hudScore  = document.getElementById('hud-score');
  hudHints  = document.getElementById('hud-hints');
  hudPIndex = document.getElementById('hud-puzzle-index');
  hudPTotal = document.getElementById('hud-puzzle-total');

  // Attach modal-triggering listeners after DOM is ready (guarded attachments)
  if (btnStart) btnStart.addEventListener('click', startGame);
  if (btnLeaderboardIntro) {
    btnLeaderboardIntro.addEventListener('click', () => {
      console.log('Leaderboard button clicked');
      if (btnLeaderboardIntro) btnLeaderboardIntro.textContent = 'Opening…';
      renderLB();
      setTimeout(()=>{ if (btnLeaderboardIntro) btnLeaderboardIntro.textContent = '🏆 Leaderboard'; }, 1200);
    });
  }
  if (btnLeaderboardGame) btnLeaderboardGame.addEventListener('click', renderLB);
  if (btnTutorialIntro) btnTutorialIntro.addEventListener('click', renderTutorial);
  if (btnTutorialGame) btnTutorialGame.addEventListener('click', renderTutorial);
  if (btnTutorialWin) btnTutorialWin.addEventListener('click', renderTutorial);
});

const puzzleTitle = document.getElementById('puzzle-title');
const puzzleStory = document.getElementById('puzzle-story');
const ciphertextEl = document.getElementById('ciphertext');
const promptArea = document.getElementById('prompt-area');

const toolsDialog = document.getElementById('tools-dialog');
const toolsClose  = document.getElementById('tools-close');
// Caesar tool elems
const bfShift = document.getElementById('bf-shift');
const bfOutput = document.getElementById('bf-output');
const bfAllOut = document.getElementById('bf-all-output');
// Frequency elem
const freqOut = document.getElementById('freq-output');
// Vigenère helper elems
const vigKey  = document.getElementById('vig-key');
const vigOut  = document.getElementById('vig-output');
const vigPreviewBtn = document.getElementById('vig-preview');
const vigClearBtn   = document.getElementById('vig-clear');


// Universal modal elements (should exist at document root)
const modal = document.getElementById('universal-modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');

// Single shared modal helpers (global functions used throughout)
function showModal(html) {
  if (!modal || !modalContent) return console.warn('Modal elements not found');
  console.log('showModal called');
  modalContent.innerHTML = html;
  modal.style.display = 'flex';
  // ensure modal occupies space; small timeout to allow CSS/layout
  setTimeout(() => { try { modal.focus && modal.focus(); } catch (e) {} }, 10);
}
function closeModal() {
  if (!modal || !modalContent) return;
  modal.style.display = 'none';
  modalContent.innerHTML = '';
}

// Attach basic modal listeners now
modalClose?.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.style && modal.style.display === 'flex') closeModal();
});

// Ensure renderTutorial is available globally
function renderTutorial() {
  const html = `
    <h3>📘 Tutorial: Caesar & Vigenère</h3>
    <section>
      <h4>Caesar (single shift)</h4>
      <p><strong>Idea:</strong> Every letter shifts by the same amount (e.g., shift 3).</p>
      <p><strong>Example:</strong> Shift 3 → A→D, B→E, C→F …; <code>BRING HOT SOUP FOR LUNCH</code> → shift 3 → ciphertext.</p>
      <p>Try the <em>Brute Force</em> tool to see all 26 shifts and look for real words.</p>
    </section>
    <section>
      <h4>Vigenère (keyword-based)</h4>
      <p><strong>Idea:</strong> Use a <em>keyword</em>. Each keyword letter selects a Caesar shift, repeating across the message.</p>
      <p><strong>Keyword → shifts:</strong> LYRICS → L(11), Y(24), R(17), I(8), C(2), S(18)</p>
      <p><strong>Decrypting:</strong> For each message letter, subtract the keyword’s shift (wrapping the keyword).</p>
      <p><strong>Example:</strong> Keyword <code>TABBY</code> on ciphertext of
        <code>HIDE THE TREATS UNDER BED</code> will reveal the plaintext once the correct keyword is entered.</p>
      <p>Use the <em>Vigenère Helper</em>: enter a keyword → <em>Preview Decrypt</em> of the current puzzle.</p>
    </section>
  `;
  showModal(html);
}

// Attach modal-triggering listeners after DOM is ready (guarded attachments)
document.addEventListener('DOMContentLoaded', () => {
  if (btnStart) btnStart.addEventListener('click', startGame);
  if (btnLeaderboardIntro) {
    btnLeaderboardIntro.addEventListener('click', () => {
      console.log('Leaderboard button clicked');
      if (btnLeaderboardIntro) btnLeaderboardIntro.textContent = 'Opening…';
      renderLB();
      setTimeout(()=>{ if (btnLeaderboardIntro) btnLeaderboardIntro.textContent = '🏆 Leaderboard'; }, 1200);
    });
  }
  if (btnLeaderboardGame) btnLeaderboardGame.addEventListener('click', renderLB);
  if (btnTutorialIntro) btnTutorialIntro.addEventListener('click', renderTutorial);
  if (btnTutorialGame) btnTutorialGame.addEventListener('click', renderTutorial);
  if (btnTutorialWin) btnTutorialWin.addEventListener('click', renderTutorial);
});

// (delegated click handler removed - handlers attached directly to buttons)


let finalScore, finalTime, playerName, btnSaveScore, btnReplay, btnViewLB;

document.addEventListener('DOMContentLoaded', () => {
  // ...existing code...
  finalScore = document.getElementById('final-score');
  finalTime  = document.getElementById('final-time');
  playerName = document.getElementById('player-name');
  btnSaveScore = document.getElementById('btn-save-score');
  btnReplay  = document.getElementById('btn-replay');
  btnViewLB  = document.getElementById('btn-view-lb');
  // ...existing code...
});

// --- WebAudio (music mode) ---
let audioCtx = null, masterGain = null, beatTimer = null, isAudioReady = false;
function setupAudio() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  masterGain = audioCtx.createGain(); masterGain.gain.value = 0.06; masterGain.connect(audioCtx.destination);
  isAudioReady = true;
}
const melodyNotes = [0,2,4,7,9,7,4,2];
const baseFreq = 440;
function degreeToFreq(deg, transpose = 0) { const semis = [0,2,4,7,9][deg % 5] + 12 * Math.floor(deg / 5) + transpose; return baseFreq * Math.pow(2, semis / 12); }
function playBeep(freq, dur=0.15, type='square', vol=0.15) {
  if (!audioCtx) return; const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain();
  osc.type = type; osc.frequency.setValueAtTime(freq, now);
  gain.gain.setValueAtTime(0, now); gain.gain.linearRampToValueAtTime(vol, now+0.01); gain.gain.exponentialRampToValueAtTime(0.0001, now+dur);
  osc.connect(gain).connect(masterGain); osc.start(now); osc.stop(now+dur+0.02);
}
function startMusic() {
  if (!audioCtx) setupAudio(); if (!isAudioReady) return; stopMusic(); let step=0; const bpm=100; const intervalMs=(60000/bpm)/2;
  beatTimer = setInterval(()=>{ if (step%2===0) playBeep(110,0.05,'sine',0.06); const degree=melodyNotes[step%melodyNotes.length]; const freq=degreeToFreq(degree,-12); playBeep(freq,0.12,'square',0.12); step++; }, intervalMs);
  state.musicOn = true; if (btnSound){btnSound.disabled=false; btnSound.setAttribute('aria-pressed','true'); btnSound.textContent='🎵 Music: On';}
}
function stopMusic(){ if (beatTimer) clearInterval(beatTimer); beatTimer=null; state.musicOn=false; if(btnSound){btnSound.setAttribute('aria-pressed','false'); btnSound.textContent='🎵 Music: Off';} }

// --- Leaderboard (localStorage) ---
const LB_KEY = 'ccer_leaderboard_v1';
function loadLB(){ try { return JSON.parse(localStorage.getItem(LB_KEY)) || []; } catch { return []; } }
function saveLB(list){ localStorage.setItem(LB_KEY, JSON.stringify(list)); }
function addLBEntry(name, score, time){ const list = loadLB(); list.push({name, score, time, date: new Date().toISOString()}); list.sort((a,b)=> b.score - a.score || a.time - b.time); const top = list.slice(0,10); saveLB(top); return top; }
// (removed legacy renderLB that used an in-DOM list element)

// --- Accessibility (Dyslexia) ---
const DYS_KEY = 'ccer_dyslexia';
function applyDyslexiaFromStorage(){ const enabled = localStorage.getItem(DYS_KEY) === '1'; document.body.classList.toggle('dyslexia', enabled); [btnDyslexiaIntro, btnDyslexiaGame].forEach(b=>{ if(!b)return; b.setAttribute('aria-pressed', enabled ? 'true':'false'); }); }
function toggleDyslexia(){ const enabled = !(localStorage.getItem(DYS_KEY) === '1'); localStorage.setItem(DYS_KEY, enabled ? '1':'0'); applyDyslexiaFromStorage(); }

// --- Init helpers ---
function showScreen(el){ document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active')); el.classList.add('active'); }
function resetGame(){ state.idx=0; state.score=0; state.hintsLeft=3; state.timeLeft=TOTAL_TIME; updateHud(); stopMusic(); }
function startGame(){ resetGame(); showScreen(screenGame); hudPTotal.textContent = PUZZLES.length; loadPuzzle(state.idx); startGlobalTimer(); }
function startGlobalTimer(){ clearInterval(state.timerId); state.timerId = setInterval(()=>{ state.timeLeft -= 1; hudTime.textContent = Math.max(0,state.timeLeft); if(state.timeLeft<=0){ clearInterval(state.timerId); gameOver(); } }, 1000); }
function gameOver(){ feedback.className='feedback err'; feedback.textContent='Time’s up! Refresh or click Play Again.'; endGame(); }
function endGame(){ clearInterval(state.timerId); stopMusic(); showScreen(screenWin); finalScore.textContent = state.score; finalTime.textContent = TOTAL_TIME - state.timeLeft; }
function updateHud(){ hudScore.textContent = state.score; hudHints.textContent = state.hintsLeft; hudTime.textContent = state.timeLeft; hudPIndex.textContent = state.idx + 1; }

function loadPuzzle(i){
  const p = PUZZLES[i];
  puzzleTitle.textContent = p.title;
  puzzleStory.textContent = p.story;
  ciphertextEl.value = p.ciphertext;
  feedback.textContent = '';
  feedback.className = 'feedback';
  promptArea.innerHTML = '';

  if (p.type === 'decode') {
    // Caesar plaintext
    promptArea.appendChild(makeLabel('Enter the decoded plaintext', 'answer'));
    promptArea.appendChild(makeInput('answer', 'Type plaintext here'));
  } else if (p.type === 'identify') {
    // Caesar shift
    promptArea.appendChild(makeLabel('What is the Caesar shift?', 'shift'));
    const input = document.createElement('input');
    input.id = 'shift'; input.type = 'number'; input.min='0'; input.max='25'; input.placeholder='0–25';
    promptArea.appendChild(input);
  } else if (p.type === 'clue') {
    // Caesar clue word
    promptArea.appendChild(makeLabel('Decode, then enter the word after "THE"', 'answer'));
    promptArea.appendChild(makeInput('answer', 'Enter the secret word'));
  } else if (p.type === 'vigenere-key') {
    // Vigenère keyword
    promptArea.appendChild(makeLabel('Enter the Vigenère keyword', 'answer'));
    promptArea.appendChild(makeInput('answer', 'e.g., LYRICS'));
  } else if (p.type === 'vigenere-decode') {
    // Vigenère plaintext
    promptArea.appendChild(makeLabel('Enter the decoded plaintext (Vigenère)', 'answer'));
    promptArea.appendChild(makeInput('answer', 'Type plaintext here'));
  }

  // Music availability
  if (p.music) { btnSound.disabled = false; btnSound.textContent = state.musicOn ? '🎵 Music: On' : '🎵 Music: Off'; }
  else { btnSound.disabled = true; stopMusic(); }
}

function makeLabel(text, forId){
  const label = document.createElement('label');
  label.className = 'label'; label.textContent = text; label.setAttribute('for', forId);
  return label;
}
function makeInput(id, placeholder){
  const input = document.createElement('input');
  input.id = id; input.type = 'text'; input.placeholder = placeholder; input.autocomplete = 'off';
  return input;
}

function award(base){ const timeFactor = Math.floor((TOTAL_TIME - state.timeLeft)/10); const points = Math.max(1, base - timeFactor); state.score += points; updateHud(); return points; }

function renderLB() {
  const scores = JSON.parse(localStorage.getItem(LB_KEY) || '[]');
  let html = '<h3>🏆 Leaderboard</h3>';
  if (scores.length === 0) {
    html += '<p>No scores yet. Be the first!</p>';
  } else {
    html += '<ol class="leaderboard">' + scores
      .sort((a, b) => b.score - a.score)
      .map(entry => `<li>${entry.name}: ${entry.score} points (${entry.time}s)</li>`)
      .join('') + '</ol>';
  }
  html += '<div class="leaderboard-actions">'
    + '<button id="btn-clear-lb" class="btn small">Clear (this device)</button>'
    + '</div>';
  showModal(html);
  // Attach clear handler
  document.getElementById('btn-clear-lb')?.addEventListener('click', () => {
    localStorage.removeItem(LB_KEY);
    renderLB();
  });
}

function toggleDyslexia() {
  const body = document.body;
  const isDyslexic = body.classList.toggle('dyslexic');
  localStorage.setItem(DYS_KEY, isDyslexic ? '1' : '0');
  [btnDyslexiaIntro, btnDyslexiaGame].forEach(btn => {
    if (btn) btn.setAttribute('aria-pressed', isDyslexic ? 'true' : 'false');
  });
}

// Safe dialog helpers: some environments may not support <dialog>. Use these helpers
// everywhere instead of calling dialog.showModal()/dialog.close() directly.
function safeShowModal(dialogEl) {
  if (!dialogEl) return;
  let usedFallback = false;
  // Always apply fallback styles and open attribute, regardless of native support
  dialogEl.setAttribute('open', '');
  dialogEl.style.display = 'block';
  dialogEl.style.position = 'fixed';
  dialogEl.style.left = '50%';
  dialogEl.style.top = '50%';
  dialogEl.style.transform = 'translate(-50%, -50%)';
  dialogEl.style.zIndex = '99999';
  dialogEl.style.boxShadow = '0 20px 40px rgba(0,0,0,0.7)';
  dialogEl.style.outline = '4px solid rgba(255,255,0,0.9)';
  usedFallback = true;
  // Try native showModal, but fallback always applies
  try {
    if (typeof dialogEl.showModal === 'function') {
      try {
        dialogEl.showModal();
        console.log('native showModal called for', dialogEl.id);
      } catch (err) {
        console.warn('native showModal threw for', dialogEl.id, err);
      }
    }
  } catch (e) {
    // ignore
  }
  // After all, check if dialog is still hidden, and if so, inject a plain modal div as a last resort
  setTimeout(() => {
    const style = window.getComputedStyle(dialogEl);
    if (style.display === 'none' || style.visibility === 'hidden' || dialogEl.getBoundingClientRect().width === 0) {
      if (!document.getElementById('fallback-modal')) {
        const fallback = document.createElement('div');
        fallback.id = 'fallback-modal';
        fallback.style.position = 'fixed';
        fallback.style.left = '50%';
        fallback.style.top = '50%';
        fallback.style.transform = 'translate(-50%, -50%)';
        fallback.style.zIndex = '100000';
        fallback.style.background = '#222';
        fallback.style.color = '#fff';
        fallback.style.padding = '2rem';
        fallback.style.border = '4px solid yellow';
        fallback.style.borderRadius = '12px';
        fallback.style.boxShadow = '0 20px 40px rgba(0,0,0,0.7)';
        fallback.innerHTML = '<h2>Leaderboard (Fallback)</h2><p>If you see this, your browser does not support &lt;dialog&gt; modals. Please use Chrome or Firefox for best experience.</p><button onclick="this.parentNode.remove()" style="margin-top:1rem;padding:.5rem 1.5rem;font-size:1.2rem;">Close</button>';
        document.body.appendChild(fallback);
        console.warn('Fallback modal injected');
      }
    }
  }, 100);
  console.log('safeShowModal applied fallback styles to', dialogEl.id);
}

function safeClose(dialogEl) {
  if (!dialogEl) return;
  try {
    if (typeof dialogEl.close === 'function') {
      dialogEl.close();
      return;
    }
  } catch (e) {
    // fall through to fallback
  }
  dialogEl.removeAttribute('open');
  dialogEl.style.display = 'none';
}

// Legacy dialog logic removed — using universal modal and delegated handlers instead

btnCheck?.addEventListener('click', ()=>{
  const p = PUZZLES[state.idx]; let ok = false;

  if (p.type === 'decode') {
    const input = document.getElementById('answer').value;
    ok = p.validation(input);
  } else if (p.type === 'identify') {
    const s = document.getElementById('shift').value;
    ok = p.validation(s);
    if (ok) {
      feedback.className = 'feedback ok';
      feedback.textContent = `Correct! Plaintext: "${caesarDecrypt(p.ciphertext, Number(s))}"`;
    }
  } else if (p.type === 'clue') {
    const input = document.getElementById('answer').value;
    const decoded = caesarDecrypt(p.ciphertext, p.shift);
    const expected = p.extractAnswer ? p.extractAnswer(decoded) : '';
    ok = p.validation(input, decoded, expected);
    if (!ok && expected && normalize(input) === normalize(decoded)) {
      feedback.className = 'feedback warn';
      feedback.textContent = `You decoded the whole sentence! Enter just the single word after "THE".`;
      return;
    }
  } else if (p.type === 'vigenere-key') {
    const inputKey = onlyLetters(document.getElementById('answer').value);
    ok = inputKey === onlyLetters(p.key);
    if (ok) {
      feedback.className = 'feedback ok';
      feedback.textContent = `Correct keyword! Plaintext: "${vigenereDecrypt(p.ciphertext, p.key)}"`;
    }
  } else if (p.type === 'vigenere-decode') {
    const input = document.getElementById('answer').value;
    ok = normalize(input) === normalize(p.plaintext);
  }

  if (ok) {
    const gained = award(50);
    feedback.className = 'feedback ok';
    feedback.textContent = `✅ Correct! +${gained} points.`;
    setTimeout(()=>{ state.idx += 1; if (state.idx >= PUZZLES.length) { endGame(); } else { updateHud(); loadPuzzle(state.idx); } }, 800);
  } else {
    feedback.className = 'feedback err';
    feedback.textContent = 'Not quite—try Tools or use a hint.';
  }
});

btnHint?.addEventListener('click', ()=>{
  const p = PUZZLES[state.idx];
  if (state.hintsLeft <= 0) { feedback.className='feedback warn'; feedback.textContent='No hints left!'; return; }
  const used = 3 - state.hintsLeft;
  const hint = p.hints[Math.min(used, p.hints.length - 1)];
  state.hintsLeft -= 1;
  state.score = Math.max(0, state.score - 10);
  feedback.className = 'feedback warn';
  feedback.textContent = `Hint: ${hint} (−10 points)`;
  updateHud();
});

btnTools?.addEventListener('click', ()=>{
  safeShowModal(toolsDialog);
  // preload Caesar helper
  const ct = ciphertextEl.value;
  const s = Number(bfShift?.value) || 0;
  if (bfOutput) bfOutput.textContent = caesarDecrypt(ct, s);
  if (bfAllOut) bfAllOut.textContent = '';
  // preload Vigenère helper preview if key present
  if (vigKey && vigKey.value) vigOut.textContent = vigenereDecrypt(ct, vigKey.value);
  else if (vigOut) vigOut.textContent = '';
});
toolsClose?.addEventListener('click', ()=> safeClose(toolsDialog));

// Caesar helpers
document.getElementById('bf-apply')?.addEventListener('click', ()=>{
  const ct = ciphertextEl.value;
  const s = Number(document.getElementById('bf-shift').value) || 0;
  if (document.getElementById('bf-output')) document.getElementById('bf-output').textContent = caesarDecrypt(ct, s);
});
document.getElementById('bf-all')?.addEventListener('click', ()=>{
  const ct = ciphertextEl.value;
  const lines = []; for (let s=0; s<26; s++) lines.push(`${s.toString().padStart(2,'0')}: ${caesarDecrypt(ct, s)}`);
  if (bfAllOut) bfAllOut.textContent = lines.join('\n');
});

// Frequency
document.getElementById('freq-calc')?.addEventListener('click', ()=>{
  const ct=ciphertextEl.value; const {freq,total}=frequencyMap(ct);
  const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const rows = alphabet.split('').map((ch,i)=>{
    const n=freq[i]; const pct=total?((n/total)*100).toFixed(1):'0.0';
    return `${ch}: ${String(n).padStart(3,' ')} (${pct}%) ${'#'.repeat(Math.min(20, Math.round((n/Math.max(1,total))*40)))}`;
  });
  if (freqOut) freqOut.textContent = `Total letters: ${total}\n` + rows.join('\n');
});

// Vigenère helper
vigPreviewBtn?.addEventListener('click', ()=>{
  const key = vigKey?.value || '';
  const ct  = ciphertextEl.value || '';
  if (!key.trim()) { vigOut.textContent = 'Enter a keyword to preview decryption.'; return; }
  vigOut.textContent = vigenereDecrypt(ct, key);
});
vigClearBtn?.addEventListener('click', ()=>{
  if (vigKey) vigKey.value = '';
  if (vigOut) vigOut.textContent = '';
});

// Music toggle
btnSound?.addEventListener('click', async ()=>{
  const p=PUZZLES[state.idx]; if(!p.music) return;
  if(!audioCtx) setupAudio(); try{ if(audioCtx.state==='suspended') await audioCtx.resume(); }catch{}
  state.musicOn ? stopMusic() : startMusic();
});

// Leaderboard & Win screen
btnSaveScore?.addEventListener('click', ()=>{
  const name=(playerName?.value||'PLAYER').toUpperCase().slice(0,24);
  const score=Number(finalScore?.textContent)||0;
  const time=Number(finalTime?.textContent)||0;
  addLBEntry(name, score, time);
  if (playerName) playerName.value='';
  renderLB(name);
});
btnViewLB?.addEventListener('click', ()=>{ renderLB(); });
btnReplay?.addEventListener('click', ()=>{ showScreen(screenIntro); });

// Keyboard helpers
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    try { if (toolsDialog && (toolsDialog.open || toolsDialog.hasAttribute('open'))) safeClose(toolsDialog); } catch(e){}
    try { if (modal && modal.style && modal.style.display === 'flex') closeModal(); } catch(e){}
  }
  if (e.key === 'Enter' && screenGame.classList.contains('active')) btnCheck?.click();
});

// Start
applyDyslexiaFromStorage();
