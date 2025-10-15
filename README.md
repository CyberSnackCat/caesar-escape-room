# Caesar Cipher Escape Room — with a Cat, Music and Food! (and bonus Vigenère levels!)

https://cybersnackcat.github.io/caesar-escape-room/

A fun **browser game** to teach the classic **Caesar cipher** through an escape-room narrative featuring a curious cat, musical puzzles, and tasty food clues.  

The Caesar cipher is a classic way to code information in plaintext. Each letter is replaced by a letter that is a fixed number of positions elsewhere in the alphabet. The method is named after Julius Caesar, who used it in his private correspondence.

For bonus levels, try the Vigenere cipher! The game now has a total of 12 levels.

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
  - High-contrast theme. If you have dyslexia (like my brother) or your eyesight isn't great (mom), I got you :)

## 🧩 Puzzles (Spoiler-free overview)
1. **Cipher the Cat** — Decode and feed the cat
2. **The Music Room** — Mirror the scale (ROT13)
3. **Cafeteria Lock** — Decode and extract the secret food word
4. **Cat Tower Clue** — Another clue word after THE
5. **Metronome Console** — Identify the shift by scanning for real words
6. **Final Feast** — Classic Caesar (shift 3)

> All the first puzzles are **Caesar-only** by design to teach fundamentals.
> **Bonus-level** puzzles include Vigenère cipher

## 📘 Tutorial: Caesar vs. Vigenère

### Caesar (single shift)
- **Concept:** Every letter in the alphabet shifts by the same number.
- **Example:** Shift = 3 → A→D, B→E, C→F …  
  If plaintext is `ORDER BARBEQUE CHICKEN PIZZA`, then applying shift +3 produces the ciphertext seen in the game.  
  **How to solve:** Use the game’s **Brute Force** tool to list all 26 shifts and scan for real words (e.g., CHICKEN, PIZZA).

### Vigenère (keyword-based)
- **Concept:** A **keyword** repeats across the text. Each keyword letter picks a Caesar shift for its position.
- **Keyword → shifts:** LYRICS → L(11), Y(24), R(17), I(8), C(2), S(18)  
- **Decrypting:** For each message letter, **subtract** the keyword’s shift (wrapping the keyword).
- **Example:** Keyword `TABBY` on the ciphertext for  
  `LIE ON THE BED WITH TABBY AND PLAY`  
  will reveal the plaintext when the correct keyword is used.

### Using the Vigenère Helper
1. Open **Tools → Vigenère Helper**.
2. Enter a keyword (try: `LYRICS`, `TABBY`, `PASTRY`, `CHEESE`).
3. Click **Preview Decrypt** to see how the current ciphertext changes.
4. Refine the keyword until the preview reads like English.

> **Why classical ciphers aren’t secure today:**  
> Caesar and Vigenère are great for learning, but easy to break with known techniques (e.g., brute force). Modern cryptography systems is far more complex. It uses publicly analyzed, strong algorithms (like the Advanced Encryption Standard) and careful key management.

## 🛠 Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JS
- **Audio**: Web Audio API (in-browser synth)

## 📄 License
MIT — feel free to fork, modify, and share.
- ### What does the MIT License mean?
The MIT License is a permissive open-source license. It allows anyone to use, copy, modify, merge, publish, distribute, sublicense, and even sell copies of the software, as long as the original copyright and license notice are included. The software is provided “as is” without warranty, which protects the author from liability.
