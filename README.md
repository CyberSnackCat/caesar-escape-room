# 🔐 Caesar Cipher Escape Room# Caesar Cipher Escape Room — with a Cat, Music and Food! (and bonus Vigenère levels!)



**An interactive cryptography game featuring a curious cat, musical puzzles, and tasty food clues**https://cybersnackcat.github.io/caesar-escape-room/



[![Play Now](https://img.shields.io/badge/Play-Live%20Demo-blue?style=for-the-badge)](https://cybersnackcat.github.io/caesar-escape-room/)A fun **browser game** to teach the classic **Caesar cipher** through an escape-room  featuring a curious fluffy tabby cat, music based puzzles, and tasty food clues.  

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

The Caesar cipher is a classic way to code information in plaintext. Each letter is replaced by a letter that is a fixed number of positions to the right or the left in the alphabet. The method is named after Julius Caesar, who used it in his private correspondence. an example of a Caesar cipher is A becoming D with every letter moving over three to the right.

---

For bonus levels, try the Vigenere cipher! The game now has a total of 12 levels.

## 📖 Overview

No installs or external files required — **pure HTML/CSS/JS**. Runs offline.

An educational browser-based escape room game with classical cryptography and handson puzzle solving. Players learn the **Caesar cipher** and **Vigenère cipher** with a curious cat, musical challenges, and food-themed clues.

## 🎯 Features

The Caesar cipher is named after Julius Caesar who used it for private correspondence. It is a substitution cipher where each letter is replaced by another letter a fixed number of positions away in the alphabet. This game also includes Vigenère cipher bonus levels, offering **12 incresingly challenging puzzles**.- **6 themed puzzles** (cat 🐱, music 🎶, food 🍕):

  - Decode plaintext, identify Caesar **shift**, extract a **clue word**

**No installation required** — pure HTML, CSS, and JavaScript. Runs completely offline once loaded.- **Learning tools built-in**:

  - Brute-force explorer (show all 26 shifts)

---  - Letter frequency visualization

- **Scoring & hints**:

## ✨ Key Features  - Faster solves & fewer hints = higher score

- **🎵 Music Mode** (WebAudio):

### 🎮 Educational Gameplay  - Toggle a chiptune loop on music puzzles (no external audio)

- **12 themed puzzles** across three categories:- **Accessibility**:

  - 🐱 **Cat-themed** — Featuring Cipher, your curious tabby companion  - Keyboard-friendly (Enter to check, Esc to close tools)

  - 🎶 **Music-themed** — Rhythm and melody challenges  - High-contrast theme. If you have dyslexia (like my brother) or your eyesight isn't great (mom), I got you :)

  - 🍕 **Food-themed** — Culinary clues and kitchen mysteries

- **Progressive difficulty**: Decode plaintext → identify Caesar shifts → extract clue words → master Vigenère encryption## 🧩 Puzzles (Spoiler-free overview)

1. **Cipher the Cat** — Decode and feed the cat

### 🛠️ Built-in Learning Tools2. **The Music Room** — Mirror the scale (ROT13)

- **Brute Force Explorer** — Test all 26 Caesar shifts instantly3. **Cafeteria Lock** — Decode and extract the secret food word

- **Letter Frequency Analyzer** — Visualize character distribution to identify patterns4. **Cat Tower Clue** — Another clue word after THE

- **Vigenère Helper** — Preview decryption with different keywords in real-time5. **Metronome Console** — Identify the shift by scanning for real words

6. **Final Feast** — Classic Caesar (shift 3)

### 🎯 Game Mechanics

- **Dynamic scoring system** — Faster solves and fewer hints = higher scores> All the first puzzles are **Caesar-only** by design to teach fundamentals.

- **Hint system** — Get stuck? Use hints at the cost of points> **Bonus-level** puzzles include Vigenère cipher

- **Local leaderboard** — Track your best performances (stored in browser)

- **Timer-based challenge** — Complete all puzzles before time runs out## 📘 Tutorial: Caesar vs. Vigenère



### 🎵 Interactive Features### Caesar (single shift)

- **Music Mode** (WebAudio API) — Toggle chiptune background music on musical puzzles- **Concept:** Every letter in the alphabet shifts by the same number.

- **No external dependencies** — All audio generated procedurally in-browser- **Example:** Shift = 3 → A→D, B→E, C→F …  

  If plaintext is `ORDER BARBEQUE CHICKEN PIZZA`, then applying shift +3 produces the ciphertext seen in the game.  

### ♿ Accessibility  **How to solve:** Use the game’s **Brute Force** tool to list all 26 shifts and scan for real words (e.g., CHICKEN, PIZZA).

- **Keyboard navigation** — Full keyboard support (Enter to submit, Esc to close dialogs)

- **Dyslexia-friendly mode** — High-contrast theme with improved readability### Vigenère (keyword-based)

- **Screen reader support** — ARIA labels and semantic HTML throughout- **Concept:** A **keyword** repeats across the text. Each keyword letter picks a Caesar shift for its position.

- **Keyword → shifts:** LYRICS → L(11), Y(24), R(17), I(8), C(2), S(18)  

---- **Decrypting:** For each message letter, **subtract** the keyword’s shift (wrapping the keyword).

- **Example:** Keyword `TABBY` on the ciphertext for  

## 🧩 Puzzle Overview  `LIE ON THE BED WITH TABBY AND PLAY`  

  will reveal the plaintext when the correct keyword is used.

### Caesar Cipher Levels (1-6)

1. **Cipher the Tabby** — Decode a message to feed your cat### Using the Vigenère Helper

2. **Listening to Nerdcore** — Identify the ROT13 shift in scrambled lyrics1. Open **Tools → Vigenère Helper**.

3. **Snack Time** — Decode and extract the secret food word2. Enter a keyword (try: `LYRICS`, `TABBY`, `PASTRY`, `CHEESE`).

4. **Back in Your Room** — Find the clue word after "THE"3. Click **Preview Decrypt** to see how the current ciphertext changes.

5. **Keep the Tempo** — Use the metronome to identify the shift4. Refine the keyword until the preview reads like English.

6. **Dinner Time** — Master the classic Caesar shift-3 cipher

> **Why classical ciphers aren’t secure today:**  

### Vigenère Cipher Bonus Levels (7-12)> Caesar and Vigenère are great for learning, but easy to break with known techniques (e.g., brute force). Modern cryptography systems is far more complex. It uses publicly analyzed, strong algorithms (like the Advanced Encryption Standard) and careful key management.

Advanced keyword-based encryption challenges that require deeper cryptographic understanding.

## 🛠 Tech Stack

> **Design Philosophy**: Early levels focus exclusively on Caesar cipher fundamentals before introducing the more complex Vigenère polyalphabetic cipher.- **Frontend**: HTML5, CSS3, Vanilla JS

- **Audio**: Web Audio API (in-browser synth)

---

## 📄 License

## 📚 Cryptography TutorialMIT — feel free to fork, modify, and share.

- ### What does the MIT License mean?

### Caesar Cipher (Monoalphabetic Substitution)The MIT License is a permissive open-source license. It allows anyone to use, copy, modify, merge, publish, distribute, sublicense, and even sell copies of the software, as long as the original copyright and license notice are included. The software is provided “as is” without warranty, which protects the author from liability.


**Concept**: Every letter shifts by the same fixed amount.

**Example**:
```
Shift: 3
Plaintext:  ORDER BARBEQUE CHICKEN PIZZA
Ciphertext: RUGHU EDUSHTXH FKLFNHQ SLCCD
```

**Solving Strategy**: Use the Brute Force tool to generate all 26 possible shifts and scan for recognizable English words.

---

### Vigenère Cipher (Polyalphabetic Substitution)

**Concept**: A repeating keyword determines variable shifts for each letter position.

**Keyword Mapping**:
```
Keyword: LYRICS
Shifts:  L(11), Y(24), R(17), I(8), C(2), S(18)
```

**Example**:
```
Keyword:    TABBY (repeating)
Plaintext:  LIE ON THE BED WITH TABBY AND PLAY
Ciphertext: [encrypted form revealed in-game]
```

**Decryption Process**: For each ciphertext letter, subtract the corresponding keyword letter's shift value (with wraparound).

---

### Using In-Game Tools

#### Vigenère Helper
1. Open **Tools** → Navigate to **Vigenère Helper**
2. Enter a test keyword (suggestions: `LYRICS`, `TABBY`, `PASTRY`, `CHEESE`)
3. Click **Preview Decrypt** to see real-time decryption results
4. Refine your keyword until the output resembles coherent English

---

### Modern Cryptography Context

> **Educational Note**: While Caesar and Vigenère ciphers are excellent teaching tools, they are cryptographically insecure by modern standards. Classical ciphers can be broken through:
> - **Frequency analysis** (Caesar)
> - **Kasiski examination** (Vigenère)
> - **Brute force** (limited keyspace)
>
> Modern cryptographic systems use:
> - **Advanced Encryption Standard (AES)** — Industry-standard symmetric encryption
> - **RSA and elliptic curve cryptography** — Asymmetric public-key systems
> - **Cryptographic hash functions** — SHA-256, SHA-3 for data integrity
> - **Key derivation functions** — PBKDF2, Argon2 for secure password storage

---

## 🛠️ Technical Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| **Audio** | Web Audio API (procedural synthesis) |
| **Storage** | LocalStorage API (leaderboard persistence) |
| **Deployment** | GitHub Pages (static hosting) |

**Architecture Highlights**:
- **Zero dependencies** — No frameworks or libraries required
- **Offline-capable** — Fully functional without internet after initial load
- **Responsive design** — Works on desktop and mobile browsers
- **Progressive enhancement** — Graceful degradation for older browsers

---

## 📄 License

**MIT License** — Free to use, modify, and distribute.

### What does the MIT License mean?
The MIT License is one of the most permissive open-source licenses. It allows anyone to:
- ✅ Use the software commercially
- ✅ Modify and create derivative works
- ✅ Distribute copies and modifications
- ✅ Sublicense and sell copies

**Requirements**:
- Include the original copyright notice and license text
- The software is provided "as is" without warranty or liability

---

## 👤 About

Created as an educational project to make classical cryptography accessible and engaging through interactive gameplay. This project demonstrates practical applications of:
- Cryptographic algorithms and cipher implementation
- Game design and user experience principles
- Accessible web development practices
- Browser-based audio synthesis

**Personal touches**: The accessibility features were inspired by family members with dyslexia and visual needs, ensuring the game is enjoyable for all players.

---

**[▶️ Play the Game Now](https://cybersnackcat.github.io/caesar-escape-room/)**
