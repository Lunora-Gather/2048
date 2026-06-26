# 2048: Zen Synthesis 🌌

> **A premium, high-fidelity responsive 2048 synthesis experience designed with modern aesthetics, interactive physical feedback, and a dynamic ambient soundscape.**
>
> 🌌 **Live Demo:** [https://lunora-gather.github.io/2048/](https://lunora-gather.github.io/2048/)

---

## 🎮 Play Now / 在线游玩

打开 GitHub Pages：

```text
https://lunora-gather.github.io/2048/
```

这是一个纯静态网页游戏，不需要后端，也不需要构建步骤。

---

## 🎨 Masterpiece Aesthetics & Interactions / 核心亮点

This edition of 2048 goes far beyond the classic color grids, elevating the play session into a responsive Zen synthesis controller.

### 🌌 Liquid Aurora Vignette / 液态极光背景

The page background uses layered radial glows, subtle noise, and a canvas constellation field to create an ambient synthesis lab feeling.

### 🧠 Contextual Color Synchronization / 网页情绪发光同步

The theme glow, logo, board atmosphere, and milestone feedback react to the current play state and tile progression.

### 🕸️ Interactive Constellation Particle Network / 背景星座神经网络

A floating canvas network sits behind the game. It reacts to mouse movement and merge events with subtle spatial feedback.

### ⚡ 3D Physics Board Tilt & Glassmorphism Tiles / 棋盘物理反馈与毛玻璃棋子

Directional moves produce responsive board feedback, while tiles use modern glassmorphism, layered shadows, and motion cues.

### 🎹 Web Audio API Haptic Synthesizer / Web Audio 合成音效

The game generates sound directly through Web Audio API oscillators and filters, with selectable synth presets.

### 🏆 Achievements & Activity Ledger / 成就与操作日志

The side ledger tracks milestones and recent synthesis activity, with a mobile drawer layout for smaller screens.

---

## 🕹️ Controls / 操作方式

| Action | Keyboard / Touch |
| --- | --- |
| Move tiles | Arrow keys / Swipe |
| Restart | Restart Grid button |
| Undo | Undo Step button |
| Change grid size | 4 × 4 / 5 × 5 / 6 × 6 selector |
| Theme | Theme selector |
| Sound | Sound toggle and synth selector |
| Achievements | Award button / side drawer |

---

## 🖥️ Local Running Guide / 本地运行指南

This project runs on standard static web technologies with zero build configuration.

```bash
git clone https://github.com/Lunora-Gather/2048.git
cd 2048
npx -y http-server -p 8080 -c-1
```

Then open:

```text
http://localhost:8080
```

You can also open `index.html` directly in a browser, but a local server is recommended for consistent asset behavior.

---

## 🚀 GitHub Pages Deployment / 部署说明

The repository includes `.github/workflows/pages.yml`.

When `main` receives a push, GitHub Actions uploads the static site and deploys it to:

```text
https://lunora-gather.github.io/2048/
```

Manual deployment is also available from **Actions → pages-build-deployment → Run workflow**.

---

## 🛠️ Technology Stack / 技术栈

- **Core Logic:** Vanilla JavaScript
- **Rendering:** HTML5 Canvas background effects + DOM-based 2048 board
- **Styling:** CSS variables, responsive layout, glassmorphism, 3D transforms
- **Audio:** Web Audio API procedural synth effects
- **Deployment:** GitHub Actions + GitHub Pages static hosting

---

## 📁 Project Files / 项目文件

```text
.
├── .github/workflows/pages.yml   # GitHub Pages static deployment
├── index.html                    # Static page entry
├── style.css                     # Visual system and responsive layout
├── script.js                     # Game logic, sound, canvas effects
└── README.md                     # Project documentation
```

---

> Designed & Developed with 🤍 by **Antigravity**.
