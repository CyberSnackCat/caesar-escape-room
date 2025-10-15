# Caesar Cipher Escape Room — with a Cat, Music and Food!

A playful, educational **browser game** that teaches the **Caesar cipher** through an escape-room narrative featuring a curious cat, musical puzzles, and tasty food clues.  
No installs or external files required — **pure HTML/CSS/JS**. Runs offline.

## 🎯 Features
- **6 themed puzzles** (cat 🐱, music 🎶, food 🍕) that escalate in difficulty:
  - Decode plaintext, identify Caesar **shift**, extract a **clue word**
- **Learning tools built-in**:
  - Brute-force explorer (show all 26 shifts)
  - Letter frequency visualization
- **Scoring & hints**:
  - Faster solves & fewer hints = higher score
- **🎵 Music Mode** (WebAudio):
  - Toggle a chiptune loop on music puzzles (no external audio)
- **Accessibility**:
  - Keyboard-friendly (Enter to check, Esc to close tools)
  - High-contrast theme

## 🧩 Puzzles (Spoiler-free overview)
1. **Cipher the Cat** — Decode and feed the cat
2. **The Music Room** — Mirror the scale (ROT13)
3. **Cafeteria Lock** — Decode and extract the secret food word
4. **Cat Tower Clue** — Another clue word after THE
5. **Metronome Console** — Identify the shift by scanning for real words
6. **Final Feast** — Classic Caesar (shift 3)

> All puzzles are **Caesar-only** by design to teach fundamentals.

## 🛠 Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JS
- **Audio**: Web Audio API (in-browser synth)

## 🧪 Run Locally
1. Download or clone this repo.
2. Open `index.html` in any modern browser.
3. Play!

## 🌐 Publish on GitHub Pages
1. Create a new public repo, e.g., `caesar-escape-room`
2. Add these files and push to `main`
3. In your repo: **Settings → Pages →** Source = `Deploy from a branch` → Branch = `main` → Folder = `/ (root)` → **Save**
4. Wait ~1 minute, your site appears at:
   ```
   https://<your-username>.github.io/caesar-escape-room/
   ```

## 🖼 Screenshots
Add PNGs to a `screenshots/` folder and reference them here:
- `screenshots/01-intro.png`
- `screenshots/02-puzzle.png`
- `screenshots/03-tools.png`
- `screenshots/04-win.png`

```
![Intro](screenshots/01-intro.png)
![Puzzle](screenshots/02-puzzle.png)
![Tools](screenshots/03-tools.png)
![Win](screenshots/04-win.png)
```

## ✍️ How to Extend
- Add more puzzles (change or add entries in `PUZZLES` inside `script.js`)
- Create new **clue rules** (e.g., “enter the third word”)
- Theme swaps: change the story copy and emojis
- Replace the chiptune with your own WebAudio pattern

## 🧑‍🎓 College Application Angle
- **Impact**: “Built an interactive cryptography game (X players), teaching Caesar ciphers with tools and hints.”
- **Leadership**: Tie it to your **CyberSafe** site (education for older adults), collect feedback, and iterate.
- **Ops**: Host on GitHub Pages, track visits with privacy-friendly analytics (optional).

## 📄 License
MIT — feel free to fork, modify, and share.
