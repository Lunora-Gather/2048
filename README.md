# 2048: Zen Synthesis 🌌

> **A premium, high-fidelity responsive 2048 synthesis experience designed with modern aesthetics, interactive physical feedback, and a dynamic ambient soundscape.**
>
> 🌌 **Live Demo:** [https://lunora-gather.github.io/2048-zen-synthesis/](https://lunora-gather.github.io/2048-zen-synthesis/)

---

## 🎨 Masterpiece Aesthetics & Interactions (核心亮点)

This edition of 2048 goes far beyond the classic color grids, elevating the play session into a highly responsive Zen synthesis controller.

### 1. 🌌 Liquid Aurora Vignette (液态极光背景)
The body background is no longer static. It is composed of three fluid radial light sources overlapping in depth. Utilizing a 25-second slow-flowing CSS keyframe rotation (`aurora-liquid`), the backdrop behaves like actual northern lights drifting and blending seamlessly in dark space.

### 🧠 Contextual Color Synchronization (网页情绪发光同步)
The entire webpage’s neon glow, top LOGO gradient color, badge border, and the mouse hover spotlight are contextual. As you reach higher tile numbers on the matrix, the theme color shifts dynamically:
- **2 – 64:** Science Indigo 🧪
- **128 – 256:** Forest Emerald 🌲
- **512:** Amber Gold ⚡
- **1024:** Cyber Violet 🔮
- **2048+:** Aurora Cyan 🌈

### 🕸️ Interactive Constellation Particle Network (背景星座神经网络)
A floating network of constellations is rendered directly on the background canvas. 
- **Gravitational Mouse Hover:** Nodes nearby the cursor are repelled and glide away as the mouse brushes past.
- **Merge Shockwaves:** Every successful tile merge triggers a slow-expanding shockwave ring on the background stars, temporarily dispersing local constellations.

### ⚡ 3D Physics Board Tilt & Glassmorphism Tiles (棋盘物理弹性倾斜与毛玻璃晶圆)
- **Board Dynamic Tilt:** Swiping or pressing directional keys tilts the board in 3d space, offering physical weight feedback before bouncing back smoothly via elastic timing curves.
- **Glassmorphic Texture:** All game tiles are crafted with blurred frosted glass (`backdrop-filter: blur(4px)`) and double-layered specular highlights to simulate genuine premium acrylic chips.

### 🎹 Web Audio API Haptic Synthesizer (禅风和弦点击声景)
Acoustic, click-free sounds generated strictly in real-time through Web Audio oscillators:
- **Slide click:** Low-pass filtered wooden tap.
- **Merge pluck:** Cascade sweeps of C-Major 9th and E-Minor 7th chord harmonics.
- **Milestone unlock:** Bright ascending Major 7th chimes.

### 🎗️ 1px Chameleon Border Runner (1像素彩虹发光线)
Unlocked milestones inside the ledger side drawer replace traditional static borders with an ultra-thin 1px neon line constantly running through a rainbow spectrum using CSS mask exclusions.

---

## 🖥️ Local Running Guide (本地运行指南)

This project runs 100% on standard web client technologies with zero build configurations required.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/lunora-Gather/2048-zen-synthesis.git
   cd 2048-zen-synthesis
   ```
2. **Fire up a local web server (Recommended with cache disabled):**
   ```bash
   npx -y http-server -p 8080 -c-1
   ```
3. Open `http://localhost:8080` inside your browser.

---

## 🛠️ Technological Stack (技术栈)
- **Core Logic:** Vanilla JavaScript (ES6+ modular object-oriented control flow)
- **Fluid Renderer:** HTML5 2D Canvas (Constellation particle engine, spatial shockwave computations)
- **Styling Sheet:** Modern CSS3 (CSS Variables, Flexbox, 3D preserves, mask compositing, hardware accelerated Keyframes)
- **Acoustic Synth:** Web Audio API (Realtime oscillator wave envelopes, lowpass filters, feedback delay line loops)

---

> Designed & Developed with 🤍 by **Antigravity**.
