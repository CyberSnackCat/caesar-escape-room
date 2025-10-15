// =========================
// Caesar Cipher Escape Room
// Cat • Music • Food Edition
// =========================

// --- Utilities: Caesar cipher ---
function normalizeCharCode(c) {
  const code = c.charCodeAt(0);
  if (code >= 65 && code <= 90) return { base: 65, code, isLetter: true, isUpper: true };
  if (code >= 97 && code <= 122) return { base: 97, code, isLetter: true, isUpper: false };
  return { base: null, code, isLetter: false, isUpper: false };
}

function caesarShift(str, shift) {
  const s = ((shift % 26) + 26) % 26; // normalize
  return [...str].map(ch => {
    const { base, code, isLetter } = normalizeCharCode(ch);
    if (!isLetter) return ch;
    const offset = (code - base + s) % 26;
    return String.fromCharCode(base + offset);
  }).join('');
}

function caesarDecrypt(str, shift) {
  return caesarShift(str, -shift);
}

// Frequency map for letters A-Z
function frequencyMap(str) {
  const freq = Array(26).fill(0);
  let total = 0;
  for (const ch of str.toUpperCase()) {
    const code = ch.charCodeAt(0);
    if (code >= 65 && code <= 90) {
      freq[code - 65] += 1; total += 1;
    }
  }
  return { freq, total };
}

function normalize(str) {
  return String(str).trim().replace(/\s+/g, ' ').toUpperCase();
}

// --- Game Data Model ---
// Puzzle types:
//   - "decode": player enters plaintext for a known fixed shift
//   - "identify": player selects the correct shift (then we show plaintext)
//   - "clue": player decodes then extracts a code/word based on a clue
const PUZZLES = [
  // 1 🐱 Cat-themed
  {
    title: 'Door 1 — Cipher the Cat',
    story: 'Your cat, Cipher 🐱, darts past a keypad and drops a collar tag. On the back, a scrambled note...',
    type: 'decode',
    shift: 5,
    plaintext: 'FEED THE CAT TUNA AT NOON',
    ciphertext: null,
    hints: [
      'Look for short common words like THE, AT, or NOON (double letters stand out).',
      'Use the Brute Force tool to view all 26 shifts—scan for real words.',
      'Try shifts like 3, 5, or 7 if you’re guessing.'
    ],
    validation: (input) => normalize(input) === normalize('FEED THE CAT TUNA AT NOON'),
    timeLimit: 90,
    music: false
  },
  // 2 🎶 Music-themed
  {
    title: 'Door 2 — The Music Room',
    story: 'The band room console flickers. A sticky note says, “mirror the scale.” 🎶 Identify the correct shift.',
    type: 'identify',
    shift: 13, // ROT13
    plaintext: 'PLAY THE MELODY THEN OPEN',
    ciphertext: null,
    hints: [
      'ROT13 (shift 13) mirrors the alphabet: A↔N, B↔O, C↔P...',
      'Use Brute Force and pick the line that reads like English.',
      'Anchor on common words: THE, THEN, OPEN.'
    ],
    validation: (inputShift) => Number(inputShift) === 13,
    timeLimit: 120,
    music: true
  },
  // 3 🍰 Food-themed
  {
    title: 'Door 3 — Cafeteria Lock',
    story: 'The cafeteria warmer smells amazing 🍰. Decode the note, then type the word after \"THE\".',
    type: 'clue',
    shift: 19,
    plaintext: 'GRAB THE CAKE AND EXIT',
    ciphertext: null,
    hints: [
      'Decode first; the secret is the word immediately after THE.',
      'THE is frequent—once you spot it, the next word is your answer.',
      'Try the Frequency tool if stuck (E and T are common).'
    ],
    extractAnswer: (decoded) => {
      const m = decoded.match(/\bTHE\s+([A-Z]+)\b/i);
      return m ? m[1].toUpperCase() : '';
    },
    validation: (input /*, decoded*/) => normalize(input) === normalize('CAKE'),
    timeLimit: 120,
    music: false
  },
  // 4 🐾 Cat bonus (clue)
  {
    title: 'Door 4 — Cat Tower Clue',
    story: 'Cipher knocks over a plant and reveals a taped message. Enter the word after \"THE\". 🐾',
    type: 'clue',
    shift: 11,
    plaintext: 'CHECK THE WINDOW LATCH',
    ciphertext: null,
    hints: [
      'Decode the line; the answer is the word right after THE.',
      'WINDOW and LATCH are both likely words you might see.',
      'If stuck, brute force all shifts and skim for real words.'
    ],
    extractAnswer: (decoded) => {
      const m = decoded.match(/\bTHE\s+([A-Z]+)\b/i);
      return m ? m[1].toUpperCase() : '';
    },
    validation: (input /*, decoded*/) => normalize(input) === normalize('WINDOW'),
    timeLimit: 120,
    music: false
  },
  // 5 🎼 Music bonus (identify)
  {
    title: 'Door 5 — Metronome Console',
    story: 'A metronome ticks steadily. Identify the shift to reveal the instruction. 🎼',
    type: 'identify',
    shift: 8,
    plaintext: 'KEEP THE TEMPO COUNT FOUR',
    ciphertext: null,
    hints: [
      'Brute force and look for KEEP, TEMPO, FOUR.',
      'Shifts near 8–10 often land readable results in small phrases.',
      'Once you see real words, that\'s your shift.'
    ],
    validation: (inputShift) => Number(inputShift) === 8,
    timeLimit: 120,
    music: true
  },
  // 6 🍲 Final feast (decode)
  {
    title: 'Door 6 — Final Feast',
    story: 'A final tray waits by the exit 🍲. Decode to leave with hot soup!',
    type: 'decode',
    shift: 3,
    plaintext: 'BRING HOT SOUP FOR LUNCH',
    ciphertext: null,
    hints: [
      'The classic Caesar uses shift 3 (Julius Caesar’s favorite).',
      'Try common words like SOUP or LUNCH to spot the right shift.',
      'Use Brute Force if you\'re unsure.'
    ],
    validation: (input) => normalize(input) === normalize('BRING HOT SOUP FOR LUNCH'),
    timeLimit: 90,
    music: false
  }
];

// Precompute ciphertexts
for (const p of PUZZLES) {
  p.ciphertext = caesarShift(p.plaintext, p.shift);
}

// --- State ---
const TOTAL_TIME = 300; // global timer (s)
const state = {
  idx: 0,
  score: 0,
  hintsLeft: 3,
  timeLeft: TOTAL_TIME,
  timerId: null,
  musicOn: false
};

// --- DOM Elements ---
const screenIntro = document.getElementById('screen-intro');
const screenGame  = document.getElementById('screen-game');
const screenWin   = document.getElementById('screen-win');

const btnStart   = document.getElementById('btn-start');
const btnCheck   = document.getElementById('btn-check');
const btnHint    = document.getElementById('btn-hint');
const btnTools   = document.getElementById('btn-tools');
const btnSound   = document.getElementById('btn-sound');
const feedback   = document.getElementById('feedback');

const hudTime   = document.getElementById('hud-time');
const hudScore  = document.getElementById('hud-score');
const hudHints  = document.getElementById('hud-hints');
const hudPIndex = document.getElementById('hud-puzzle-index');
const hudPTotal = document.getElementById('hud-puzzle-total');

const puzzleTitle = document.getElementById('puzzle-title');
const puzzleStory = document.getElementById('puzzle-story');
const ciphertextEl = document.getElementById('ciphertext');
const promptArea = document.getElementById('prompt-area');

const toolsDialog = document.getElementById('tools-dialog');
const toolsClose  = document.getElementById('tools-close');
const bfShift   = document.getElementById('bf-shift');
const bfApply   = document.getElementById('bf-apply');
const bfOutput  = document.getElementById('bf-output');
const bfAll     = document.getElementById('bf-all');
const bfAllOut  = document.getElementById('bf-all-output');
const freqCalc  = document.getElementById('freq-calc');
const freqOut   = document.getElementById('freq-output');

const finalScore = document.getElementById('final-score');
const finalTime  = document.getElementById('final-time');
const btnReplay  = document.getElementById('btn-replay');

// --- WebAudio: Music Mode ---
let audioCtx = null;
let masterGain = null;
let beatTimer = null;
let isAudioReady = false;

function setupAudio() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  masterGain = audioCtx.createGain();
  masterGain.gain.value = 0.06; // gentle volume
  masterGain.connect(audioCtx.destination);
  isAudioReady = true;
}

// Simple chiptune loop: pentatonic pattern over a bass tick
const melodyNotes = [0, 2, 4, 7, 9, 7, 4, 2]; // scale degrees
const baseFreq = 440; // A4
function degreeToFreq(deg, transpose = 0) {
  // pentatonic-ish mapping
  const semis = [0, 2, 4, 7, 9][deg % 5] + 12 * Math.floor(deg / 5) + transpose;
  return baseFreq * Math.pow(2, semis / 12);
}

function playBeep(freq, dur = 0.15, type = 'square', vol = 0.15) {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(vol, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
  osc.connect(gain).connect(masterGain);
  osc.start(now);
  osc.stop(now + dur + 0.02);
}

function startMusic() {
  if (!audioCtx) setupAudio();
  if (!isAudioReady) return;
  stopMusic(); // ensure clean state
  let step = 0;
  const bpm = 100;
  const intervalMs = (60_000 / bpm) / 2; // 8th notes
  beatTimer = setInterval(() => {
    // bass tick each quarter
    if (step % 2 === 0) playBeep(110, 0.05, 'sine', 0.06);
    // melody every 8th
    const degree = melodyNotes[step % melodyNotes.length];
    const freq = degreeToFreq(degree, -12); // lower register
    playBeep(freq, 0.12, 'square', 0.12);
    step++;
  }, intervalMs);
  state.musicOn = true;
  btnSound.disabled = false;
  btnSound.setAttribute('aria-pressed', 'true');
  btnSound.textContent = '🎵 Music: On';
}

function stopMusic() {
  if (beatTimer) clearInterval(beatTimer);
  beatTimer = null;
  state.musicOn = false;
  if (btnSound) {
    btnSound.setAttribute('aria-pressed', 'false');
    btnSound.textContent = '🎵 Music: Off';
  }
}

// --- Init / State helpers ---
function showScreen(el) {
  for (const s of document.querySelectorAll('.screen')) s.classList.remove('active');
  el.classList.add('active');
}

function resetGame() {
  state.idx = 0;
  state.score = 0;
  state.hintsLeft = 3;
  state.timeLeft = TOTAL_TIME;
  updateHud();
  stopMusic();
}

function startGame() {
  resetGame();
  showScreen(screenGame);
  hudPTotal.textContent = PUZZLES.length;
  loadPuzzle(state.idx);
  startGlobalTimer();
}

function startGlobalTimer() {
  clearInterval(state.timerId);
  state.timerId = setInterval(() => {
    state.timeLeft -= 1;
    hudTime.textContent = Math.max(0, state.timeLeft);
    if (state.timeLeft <= 0) {
      clearInterval(state.timerId);
      gameOver();
    }
  }, 1000);
}

function gameOver() {
  feedback.className = 'feedback err';
  feedback.textContent = 'Time’s up! Refresh or click Play Again.';
  endGame();
}

function endGame() {
  clearInterval(state.timerId);
  stopMusic();
  showScreen(screenWin);
  finalScore.textContent = state.score;
  finalTime.textContent = TOTAL_TIME - state.timeLeft;
}

function updateHud() {
  hudScore.textContent = state.score;
  hudHints.textContent = state.hintsLeft;
  hudTime.textContent = state.timeLeft;
  hudPIndex.textContent = state.idx + 1;
}

function loadPuzzle(i) {
  const p = PUZZLES[i];
  puzzleTitle.textContent = p.title;
  puzzleStory.textContent = p.story;
  ciphertextEl.value = p.ciphertext;
  feedback.textContent = '';
  feedback.className = 'feedback';
  promptArea.innerHTML = '';

  // Build prompt area based on type
  if (p.type === 'decode') {
    const label = document.createElement('label');
    label.className = 'label';
    label.textContent = 'Enter the decoded plaintext';
    label.setAttribute('for', 'answer');
    const input = document.createElement('input');
    input.id = 'answer';
    input.type = 'text';
    input.placeholder = 'Type plaintext here';
    input.autocomplete = 'off';
    promptArea.appendChild(label);
    promptArea.appendChild(input);
  } else if (p.type === 'identify') {
    const label = document.createElement('label');
    label.className = 'label';
    label.textContent = 'What is the shift?';
    label.setAttribute('for', 'shift');
    const input = document.createElement('input');
    input.id = 'shift';
    input.type = 'number';
    input.min = '0';
    input.max = '25';
    input.placeholder = '0–25';
    promptArea.appendChild(label);
    promptArea.appendChild(input);
  } else if (p.type === 'clue') {
    const label = document.createElement('label');
    label.className = 'label';
    label.textContent = 'Decode, then enter the secret word (see clue)';
    label.setAttribute('for', 'answer');
    const input = document.createElement('input');
    input.id = 'answer';
    input.type = 'text';
    input.placeholder = 'Enter the secret word';
    promptArea.appendChild(label);
    promptArea.appendChild(input);
  }

  // Music Mode availability
  if (p.music) {
    btnSound.disabled = false;
    btnSound.textContent = state.musicOn ? '🎵 Music: On' : '🎵 Music: Off';
  } else {
    btnSound.disabled = true;
    stopMusic();
  }
}

function award(base) {
  // Simple scoring: base minus time factor
  const timeFactor = Math.floor((TOTAL_TIME - state.timeLeft) / 10);
  const points = Math.max(1, base - timeFactor);
  state.score += points;
  updateHud();
  return points;
}

// --- Event handlers ---
btnStart.addEventListener('click', startGame);

btnCheck.addEventListener('click', () => {
  const p = PUZZLES[state.idx];
  let ok = false;

  if (p.type === 'decode') {
    const input = document.getElementById('answer').value;
    ok = p.validation(input);
  } else if (p.type === 'identify') {
    const inputShift = document.getElementById('shift').value;
    ok = p.validation(inputShift);
    if (ok) {
      feedback.className = 'feedback ok';
      feedback.textContent = `Correct! Plaintext: "${caesarDecrypt(p.ciphertext, Number(inputShift))}"`;
    }
  } else if (p.type === 'clue') {
    const input = document.getElementById('answer').value;
    const decoded = caesarDecrypt(p.ciphertext, p.shift);
    const expected = p.extractAnswer ? p.extractAnswer(decoded) : '';
    ok = p.validation(input, decoded, expected);
    if (!ok && expected) {
      if (normalize(input) === normalize(decoded)) {
        feedback.className = 'feedback warn';
        feedback.textContent = "You decoded the whole sentence! Enter just the secret word after 'THE'.";
        return;
      }
    }
  }

  if (ok) {
    const gained = award(50);
    feedback.className = 'feedback ok';
    feedback.textContent = `✅ Correct! +${gained} points.`;
    setTimeout(() => {
      state.idx += 1;
      if (state.idx >= PUZZLES.length) {
        endGame();
      } else {
        updateHud();
        loadPuzzle(state.idx);
      }
    }, 800);
  } else {
    feedback.className = 'feedback err';
    feedback.textContent = 'Not quite—check your shift or try a hint.';
  }
});

btnHint.addEventListener('click', () => {
  const p = PUZZLES[state.idx];
  if (state.hintsLeft <= 0) {
    feedback.className = 'feedback warn';
    feedback.textContent = 'No hints left!';
    return;
  }
  const used = 3 - state.hintsLeft;
  const hint = p.hints[Math.min(used, p.hints.length - 1)];
  state.hintsLeft -= 1;
  state.score = Math.max(0, state.score - 10);
  feedback.className = 'feedback warn';
  feedback.textContent = `Hint: ${hint} (−10 points)`;
  updateHud();
});

btnTools.addEventListener('click', () => {
  toolsDialog.showModal();
  const ct = ciphertextEl.value;
  const s = Number(bfShift.value) || 0;
  bfOutput.textContent = caesarDecrypt(ct, s);
  bfAllOut.textContent = '';
});

toolsClose.addEventListener('click', () => toolsDialog.close());

document.getElementById('bf-apply').addEventListener('click', () => {
  const ct = ciphertextEl.value;
  const s = Number(bfShift.value) || 0;
  bfOutput.textContent = caesarDecrypt(ct, s);
});

document.getElementById('bf-all').addEventListener('click', () => {
  const ct = ciphertextEl.value;
  const lines = [];
  for (let s = 0; s < 26; s++) {
    lines.push(`${s.toString().padStart(2,'0')}: ${caesarDecrypt(ct, s)}`);
  }
  bfAllOut.textContent = lines.join('\n');
});

document.getElementById('freq-calc').addEventListener('click', () => {
  const ct = ciphertextEl.value;
  const { freq, total } = frequencyMap(ct);
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const rows = alphabet.split('').map((ch, i) => {
    const n = freq[i];
    const pct = total ? ((n / total) * 100).toFixed(1) : '0.0';
    return `${ch}: ${String(n).padStart(3,' ')} (${pct}%) ${'#'.repeat(Math.min(20, Math.round((n/Math.max(1,total))*40)))}`;
  });
  freqOut.textContent = `Total letters: ${total}\n` + rows.join('\n');
});

// Music toggle
btnSound.addEventListener('click', async () => {
  const p = PUZZLES[state.idx];
  if (!p.music) return;
  if (!audioCtx) setupAudio();
  try {
    if (audioCtx.state === 'suspended') await audioCtx.resume();
  } catch {}
  if (state.musicOn) {
    stopMusic();
  } else {
    startMusic();
  }
});

// Keyboard helpers
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && toolsDialog.open) toolsDialog.close();
  if (e.key === 'Enter' && screenGame.classList.contains('active')) btnCheck.click();
});

// Replay
btnReplay.addEventListener('click', () => {
  showScreen(screenIntro);
});

// Start on load with intro visible
showScreen(screenIntro);
