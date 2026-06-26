/*
 * 2048 runtime optimizations
 * Non-invasive enhancements layered on top of the original static game.
 */
(function () {
    'use strict';

    const APP_NAME = '2048';
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    function setMeta(name, value, attr = 'name') {
        let meta = document.head.querySelector(`meta[${attr}="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute(attr, name);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', value);
    }

    function isVisible(element) {
        return Boolean(element && !element.classList.contains('hidden') && element.offsetParent !== null);
    }

    function isTypingTarget(target) {
        if (!target) return false;
        const tagName = target.tagName;
        return target.isContentEditable || tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT';
    }

    function clickFirstVisible(selectors) {
        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (isVisible(element) && !element.disabled) {
                element.click();
                return true;
            }
        }
        return false;
    }

    function setCustomSelectExpanded(customSelect, expanded) {
        const trigger = customSelect?.querySelector('.custom-select-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    }

    function syncReducedMotionClass() {
        document.body.classList.toggle('reduce-motion', reducedMotionQuery.matches);
    }

    function syncThemeColor() {
        const computed = getComputedStyle(document.body);
        const accent = computed.getPropertyValue('--accent').trim() || '#a855f7';
        setMeta('theme-color', accent);
    }

    function improveNativeControls() {
        document.querySelectorAll('button').forEach((button) => {
            if (!button.getAttribute('type')) {
                button.setAttribute('type', 'button');
            }
        });

        document.querySelectorAll('.header-controls i, .select-arrow, .status-icon').forEach((icon) => {
            icon.setAttribute('aria-hidden', 'true');
        });

        const score = document.getElementById('current-score');
        if (score) score.setAttribute('aria-live', 'polite');

        const additions = document.getElementById('score-addition-container');
        if (additions) additions.setAttribute('aria-hidden', 'true');

        const tiles = document.getElementById('tiles-container');
        if (tiles) tiles.setAttribute('aria-live', 'polite');

        const ledger = document.getElementById('synthesis-ledger');
        if (ledger) {
            ledger.setAttribute('aria-live', 'polite');
            ledger.setAttribute('aria-relevant', 'additions');
            ledger.tabIndex = 0;
        }

        const gameOver = document.getElementById('game-over-overlay');
        if (gameOver) {
            gameOver.setAttribute('role', 'dialog');
            gameOver.setAttribute('aria-modal', 'true');
            const title = gameOver.querySelector('h2');
            if (title && !title.id) title.id = 'game-over-title';
            if (title) gameOver.setAttribute('aria-labelledby', title.id);
        }

        const gameWin = document.getElementById('game-win-overlay');
        if (gameWin) {
            gameWin.setAttribute('role', 'dialog');
            gameWin.setAttribute('aria-modal', 'true');
            const title = gameWin.querySelector('h2');
            if (title && !title.id) title.id = 'game-win-title';
            if (title) gameWin.setAttribute('aria-labelledby', title.id);
        }

        const drawer = document.getElementById('drawer-panel');
        if (drawer) drawer.setAttribute('aria-hidden', drawer.classList.contains('open') ? 'false' : 'true');

        const drawerBackdrop = document.getElementById('drawer-backdrop');
        if (drawerBackdrop) drawerBackdrop.setAttribute('aria-hidden', 'true');

        const drawerTrigger = document.getElementById('btn-achievements-trigger');
        if (drawerTrigger) drawerTrigger.setAttribute('aria-expanded', 'false');

        const board = document.getElementById('board');
        if (board) {
            board.setAttribute('role', 'application');
            board.setAttribute('aria-label', '2048 game board. Use arrow keys or swipe to move tiles.');
            board.tabIndex = -1;
        }
    }

    function improveCustomDropdownKeyboard() {
        document.querySelectorAll('.custom-select').forEach((customSelect) => {
            const trigger = customSelect.querySelector('.custom-select-trigger');
            if (!trigger || trigger.dataset.optimized === 'true') return;

            trigger.dataset.optimized = 'true';
            trigger.tabIndex = 0;
            trigger.setAttribute('role', 'button');
            trigger.setAttribute('aria-haspopup', 'listbox');
            trigger.setAttribute('aria-expanded', customSelect.classList.contains('active') ? 'true' : 'false');

            trigger.addEventListener('click', () => {
                window.requestAnimationFrame(() => {
                    setCustomSelectExpanded(customSelect, customSelect.classList.contains('active'));
                });
            });

            trigger.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    trigger.click();
                    window.requestAnimationFrame(() => {
                        setCustomSelectExpanded(customSelect, customSelect.classList.contains('active'));
                    });
                }
                if (event.key === 'Escape') {
                    customSelect.classList.remove('active');
                    setCustomSelectExpanded(customSelect, false);
                }
            });
        });

        document.querySelectorAll('.custom-select-options').forEach((options) => {
            options.setAttribute('role', 'listbox');
        });

        document.querySelectorAll('.custom-select-option').forEach((option) => {
            option.setAttribute('role', 'option');
            option.tabIndex = -1;
            if (option.dataset.optimized === 'true') return;
            option.dataset.optimized = 'true';
            option.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    option.click();
                    option.closest('.custom-select')?.classList.remove('active');
                }
                if (event.key === 'Escape') {
                    const customSelect = option.closest('.custom-select');
                    customSelect?.classList.remove('active');
                    setCustomSelectExpanded(customSelect, false);
                    customSelect?.querySelector('.custom-select-trigger')?.focus();
                }
            });
        });
    }

    function improveKeyboardFlow(game) {
        if (window.__keyboardFlowOptimized) return;
        window.__keyboardFlowOptimized = true;

        document.addEventListener('keydown', (event) => {
            const target = event.target;
            const activeCustomSelect = document.querySelector('.custom-select.active');

            if (event.key === 'Enter') {
                if (isTypingTarget(target)) return;

                if (activeCustomSelect) {
                    const selectedOption = activeCustomSelect.querySelector('.custom-select-option.selected');
                    const firstOption = activeCustomSelect.querySelector('.custom-select-option');
                    event.preventDefault();
                    (selectedOption || firstOption)?.click();
                    activeCustomSelect.classList.remove('active');
                    setCustomSelectExpanded(activeCustomSelect, false);
                    activeCustomSelect.querySelector('.custom-select-trigger')?.focus();
                    return;
                }

                if (isVisible(document.getElementById('game-over-overlay'))) {
                    event.preventDefault();
                    clickFirstVisible(['#btn-retry']);
                    return;
                }

                if (isVisible(document.getElementById('game-win-overlay'))) {
                    event.preventDefault();
                    clickFirstVisible(['#btn-keep-going', '#btn-win-restart']);
                    return;
                }

                const activeElement = document.activeElement;
                if (activeElement?.matches?.('.milestone-card, .icon-btn, .btn, .theme-toggle-btn')) {
                    event.preventDefault();
                    activeElement.click();
                }
            }

            if (event.key === 'Escape') {
                if (activeCustomSelect) {
                    event.preventDefault();
                    activeCustomSelect.classList.remove('active');
                    setCustomSelectExpanded(activeCustomSelect, false);
                    activeCustomSelect.querySelector('.custom-select-trigger')?.focus();
                    return;
                }

                if (game?.drawerPanel && game.drawerPanel.classList.contains('open') && typeof game.toggleDrawer === 'function') {
                    event.preventDefault();
                    game.toggleDrawer(false);
                    game.drawerTriggerBtn?.focus();
                    return;
                }

                if (isVisible(document.getElementById('game-win-overlay'))) {
                    event.preventDefault();
                    clickFirstVisible(['#btn-keep-going']);
                }
            }
        }, true);
    }

    function hardenGameInstance(game) {
        if (!game || game.__runtimeOptimized) return;
        game.__runtimeOptimized = true;

        if (typeof game.addLog === 'function') {
            const originalAddLog = game.addLog.bind(game);
            game.addLog = function addOptimizedLog(text, type = 'info') {
                originalAddLog(text, type);
                if (this.ledgerContainer) {
                    this.ledgerContainer.setAttribute('aria-live', 'polite');
                    this.ledgerContainer.setAttribute('aria-relevant', 'additions');
                    this.ledgerContainer.scrollTop = this.ledgerContainer.scrollHeight;
                }
            };
        }

        if (typeof game.updateThemeModeUI === 'function') {
            const originalUpdateThemeModeUI = game.updateThemeModeUI.bind(game);
            game.updateThemeModeUI = function updateOptimizedThemeModeUI() {
                originalUpdateThemeModeUI();
                syncThemeColor();
            };
        }

        if (typeof game.setupThemes === 'function') {
            const originalSetupThemes = game.setupThemes.bind(game);
            game.setupThemes = function setupOptimizedThemes() {
                originalSetupThemes();
                syncThemeColor();
            };
        }

        if (typeof game.toggleDrawer === 'function') {
            const originalToggleDrawer = game.toggleDrawer.bind(game);
            game.toggleDrawer = function toggleOptimizedDrawer(open) {
                originalToggleDrawer(open);
                if (this.drawerTriggerBtn) this.drawerTriggerBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
                if (this.drawerPanel) this.drawerPanel.setAttribute('aria-hidden', open ? 'false' : 'true');
            };
        }

        window.addEventListener('pagehide', () => {
            if (typeof game.saveGameState === 'function' && game.moves > 0) {
                game.saveGameState();
            }
        });
    }

    function optimizeConstellation(network) {
        if (!network || network.__runtimeOptimized || typeof network.animate !== 'function') return;
        network.__runtimeOptimized = true;

        const originalAnimate = network.animate.bind(network);
        network.animate = function optimizedAnimate() {
            if (document.hidden || reducedMotionQuery.matches) {
                requestAnimationFrame(() => network.animate());
                return;
            }
            originalAnimate();
        };
    }

    function boot() {
        document.documentElement.dataset.app = '2048';
        syncReducedMotionClass();
        syncThemeColor();
        improveNativeControls();
        improveCustomDropdownKeyboard();
        hardenGameInstance(window.game2048);
        improveKeyboardFlow(window.game2048);
        optimizeConstellation(window.bgConstellation);

        setMeta('application-name', APP_NAME);
        setMeta('og:title', APP_NAME, 'property');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot, { once: true });
    } else {
        boot();
    }

    if (reducedMotionQuery.addEventListener) {
        reducedMotionQuery.addEventListener('change', syncReducedMotionClass);
    } else if (reducedMotionQuery.addListener) {
        reducedMotionQuery.addListener(syncReducedMotionClass);
    }
})();
