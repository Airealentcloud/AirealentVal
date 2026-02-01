/* ===== MAIN APPLICATION ===== */
const App = {
    // State
    gender: null,          // 'm2f' or 'f2m'
    senderName: '',
    valName: '',
    senderPhoto: null,     // base64
    valPhoto: null,        // base64
    lang: 'en',            // 'en' or 'pid'
    soundOn: false,
    quizAnswers: [],
    quizStep: 0,
    quizDemand: null,
    chaseCount: 0,
    maxChase: 7,
    isValView: false,
    exitShown: false,

    // ===== INIT =====
    init() {
        this.checkURLParams();
        this.createFloatingHearts();
        this.setupExitIntent();
        this.setupNoButton();
        this.animateStats();
        this.setupLangToggle();
        this.setupSoundToggle();
    },

    // ===== URL PARAMS (Val View) =====
    checkURLParams() {
        const params = new URLSearchParams(window.location.search);
        const data = params.get('d');
        if (data) {
            try {
                const decoded = JSON.parse(atob(data));
                this.senderName = decoded.s || 'Someone';
                this.valName = decoded.v || 'You';
                this.gender = decoded.g || 'm2f';
                this.isValView = true;
                this.showGameScreen();
            } catch (e) {
                console.log('Invalid link data');
            }
        }
    },

    // ===== NAVIGATION =====
    goTo(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(screenId);
        if (target) {
            target.classList.add('active');
            target.scrollTo && target.scrollTo(0, 0);
            window.scrollTo(0, 0);
        }
    },

    // ===== GENDER SELECTION =====
    selectGender(gender) {
        this.gender = gender;
        this.goTo('screen-quiz-intro');
    },

    // ===== QUIZ =====
    startQuiz() {
        this.quizStep = 0;
        this.quizAnswers = [];
        this.goTo('screen-quiz');
        this.showQuizQuestion();
    },

    skipQuiz() {
        this.quizDemand = null;
        this.goTo('screen-names');
    },

    showQuizQuestion() {
        const questions = Content.quiz[this.lang];
        if (this.quizStep >= questions.length) {
            this.finishQuiz();
            return;
        }
        const q = questions[this.quizStep];
        document.getElementById('quiz-step').textContent = `${this.quizStep + 1}/${questions.length}`;
        document.getElementById('quiz-progress-fill').style.width = `${((this.quizStep + 1) / questions.length) * 100}%`;
        document.getElementById('quiz-question').textContent = q.question;

        const optionsEl = document.getElementById('quiz-options');
        optionsEl.innerHTML = '';
        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.textContent = opt;
            btn.onclick = () => this.selectQuizOption(i);
            optionsEl.appendChild(btn);
        });
    },

    selectQuizOption(index) {
        this.quizAnswers.push(index);
        this.quizStep++;
        // Brief delay for visual feedback
        setTimeout(() => this.showQuizQuestion(), 300);
    },

    finishQuiz() {
        this.quizDemand = Content.getQuizDemand(this.quizAnswers);
        this.goTo('screen-names');
    },

    // ===== PHOTO HANDLING =====
    handlePhoto(input, previewId) {
        const file = input.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64 = e.target.result;
            if (input.id === 'sender-photo') this.senderPhoto = base64;
            else this.valPhoto = base64;

            const preview = document.getElementById(previewId);
            preview.innerHTML = `<img src="${base64}" alt="Photo">`;
        };
        reader.readAsDataURL(file);
    },

    // ===== CREATE VAL REQUEST =====
    createValRequest() {
        this.senderName = document.getElementById('sender-name').value.trim();
        this.valName = document.getElementById('val-name').value.trim();

        if (!this.senderName || !this.valName) {
            alert('Please enter both names!');
            return;
        }

        // Generate shareable link
        const data = { s: this.senderName, v: this.valName, g: this.gender };
        const encoded = btoa(JSON.stringify(data));
        const baseUrl = window.location.origin + window.location.pathname;
        const shareUrl = `${baseUrl}?d=${encoded}`;

        // Show link screen
        this.goTo('screen-link');

        // Preview card
        this.renderPreviewPhotos('preview-photos');
        document.getElementById('preview-text').innerHTML =
            `<strong>${this.valName}</strong>, <strong>${this.senderName}</strong> wants to know...<br>Will You Be My Val? \u{1F495}`;

        document.getElementById('share-url').value = shareUrl;

        const hint = this.lang === 'pid'
            ? `Send this link give ${this.valName} and wait for their response \u{1F440}`
            : `Send this link to ${this.valName} and wait for their response \u{1F440}`;
        document.getElementById('share-hint').textContent = hint;

        // Confetti
        this.spawnConfetti('confetti-burst', 30);
    },

    // ===== SHARING =====
    copyLink() {
        const url = document.getElementById('share-url').value;
        navigator.clipboard.writeText(url).then(() => {
            document.getElementById('copy-feedback').textContent = 'Link copied! \u2705';
            setTimeout(() => document.getElementById('copy-feedback').textContent = '', 2000);
        }).catch(() => {
            // Fallback
            const input = document.getElementById('share-url');
            input.select();
            document.execCommand('copy');
            document.getElementById('copy-feedback').textContent = 'Link copied! \u2705';
            setTimeout(() => document.getElementById('copy-feedback').textContent = '', 2000);
        });
    },

    shareWhatsApp() {
        const url = document.getElementById('share-url').value;
        const text = `I have a question for you \u{1F440}\u{1F495} ${url}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    },

    shareTwitter() {
        const url = document.getElementById('share-url').value;
        const text = `Will You Be My Val? \u{1F495} Take the challenge! ${url}`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    },

    shareGeneric() {
        const url = document.getElementById('share-url').value;
        if (navigator.share) {
            navigator.share({
                title: 'Will You Be My Val?',
                text: `${this.senderName} has a special question for ${this.valName}! \u{1F495}`,
                url: url
            });
        } else {
            this.copyLink();
        }
    },

    shareResult() {
        const text = `${this.valName} said YES! \u{1F495} Now they owe me a house \u{1F602} Try yours: ${window.location.href}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    },

    shareResultGeneric() {
        const baseUrl = window.location.origin + window.location.pathname;
        if (navigator.share) {
            navigator.share({
                title: `${this.senderName} \u{1F495} ${this.valName} - Val 2025`,
                text: `${this.valName} said YES! Now they owe me property \u{1F602}\u{1F3E0}`,
                url: baseUrl
            });
        }
    },

    downloadResult() {
        // Use html2canvas-like approach with canvas
        const card = document.getElementById('result-card');
        // Simple screenshot hint since we don't have html2canvas
        alert('Take a screenshot of the result card above to share! \u{1F4F8}');
    },

    // ===== GAME SCREEN =====
    showGameScreen() {
        this.goTo('screen-game');

        // Set intro text
        const intro = document.getElementById('game-intro');
        intro.innerHTML = `${this.valName}... <strong>${this.senderName}</strong> wants to know...`;

        // Photos
        this.renderGamePhotos('game-photos');

        // Reset chase
        this.chaseCount = 0;
        document.getElementById('chase-message').textContent = '';
        document.getElementById('chase-counter').textContent = '';
        const noBtn = document.getElementById('btn-no');
        noBtn.style.display = '';
        noBtn.classList.remove('running');
        noBtn.style.position = '';
        noBtn.style.left = '';
        noBtn.style.top = '';
        noBtn.style.transform = '';

        // Show hint on mobile
        const hintEl = document.getElementById('mobile-hint');
        if (hintEl) {
            hintEl.textContent = this.isMobile ? 'Tap a button to respond' : '';
        }

        // On mobile, prevent page scroll during the No button chase
        if (this.isMobile) {
            const gameScreen = document.getElementById('screen-game');
            gameScreen.style.overflow = 'hidden';
            gameScreen.style.touchAction = 'none';
            // Prevent pull-to-refresh and bounce scroll during game
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.height = '100%';
        }
    },

    // ===== NO BUTTON CHASE =====
    setupNoButton() {
        this.isMobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
        const noBtn = document.getElementById('btn-no');
        if (!noBtn) return;

        // === MOBILE: No button jumps away on tap/touchstart ===
        // On mobile there is no cursor hover, so we intercept every touch
        // and tap on the No button itself and make it flee.
        noBtn.addEventListener('touchstart', (e) => {
            if (!document.getElementById('screen-game').classList.contains('active')) return;
            if (noBtn.style.display === 'none') return;
            e.preventDefault(); // prevent the tap from registering as click
            e.stopPropagation();
            this.moveNoButton(noBtn);
        }, { passive: false });

        noBtn.addEventListener('touchend', (e) => {
            e.preventDefault(); // also block touchend -> click
            e.stopPropagation();
        }, { passive: false });

        // Also block actual click on mobile (safety net)
        noBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.moveNoButton(noBtn);
        });

        // === DESKTOP: proximity-based chase with mouse ===
        if (!this.isMobile) {
            document.addEventListener('mousemove', (e) => {
                if (!document.getElementById('screen-game').classList.contains('active')) return;
                if (noBtn.style.display === 'none') return;

                const rect = noBtn.getBoundingClientRect();
                const bx = rect.left + rect.width / 2;
                const by = rect.top + rect.height / 2;
                const dist = Math.sqrt((e.clientX - bx) ** 2 + (e.clientY - by) ** 2);

                if (dist < 100) {
                    this.moveNoButton(noBtn, e.clientX, e.clientY);
                }
            });
        }
    },

    // Shared logic: move the No button to a random safe spot
    moveNoButton(noBtn, pointerX, pointerY) {
        if (noBtn.style.display === 'none') return;
        this.chaseCount++;

        const rect = noBtn.getBoundingClientRect();
        const bx = rect.left + rect.width / 2;
        const by = rect.top + rect.height / 2;
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        noBtn.classList.add('running');

        // On mobile (no pointer coords), pick a random direction away from center
        const px = pointerX ?? bx;
        const py = pointerY ?? by;

        // Calculate escape: run away from pointer/tap, add randomness
        const angle = Math.atan2(by - py, bx - px) + (Math.random() - 0.5) * 1.5;
        const speed = 140 + (this.chaseCount * 25);
        let nx = bx + Math.cos(angle) * speed;
        let ny = by + Math.sin(angle) * speed;

        // If it would go off-screen, pick a fully random position instead
        const margin = 50;
        if (nx < margin || nx > vw - margin || ny < margin || ny > vh - margin) {
            nx = margin + Math.random() * (vw - margin * 2);
            ny = margin + Math.random() * (vh - margin * 2);
            // Ensure it's not too close to the YES button
            const yesBtn = document.getElementById('btn-yes');
            if (yesBtn) {
                const yr = yesBtn.getBoundingClientRect();
                const yx = yr.left + yr.width / 2;
                const yy = yr.top + yr.height / 2;
                if (Math.abs(nx - yx) < 100 && Math.abs(ny - yy) < 100) {
                    nx = nx < vw / 2 ? vw * 0.8 : vw * 0.2;
                    ny = ny < vh / 2 ? vh * 0.8 : vh * 0.2;
                }
            }
        }

        // Clamp within viewport
        nx = Math.max(margin, Math.min(vw - margin, nx));
        ny = Math.max(margin, Math.min(vh - margin, ny));

        noBtn.style.position = 'fixed';
        noBtn.style.left = (nx - rect.width / 2) + 'px';
        noBtn.style.top = (ny - rect.height / 2) + 'px';

        // Shrink slightly each attempt
        const scale = Math.max(0.5, 1 - (this.chaseCount * 0.05));
        noBtn.style.transform = `scale(${scale})`;

        // Haptic feedback on mobile if available
        if (navigator.vibrate) {
            navigator.vibrate(30);
        }

        // Clear mobile hint after first chase
        const hintEl = document.getElementById('mobile-hint');
        if (hintEl) hintEl.textContent = '';

        this.showChaseMessage();

        if (this.chaseCount >= this.maxChase) {
            this.noButtonDisappear();
        }
    },

    showChaseMessage() {
        const messages = Content.chaseMessages[this.lang];
        let msg = messages[Math.floor(Math.random() * messages.length)];
        msg = msg.replace('{sender}', this.senderName);
        document.getElementById('chase-message').textContent = msg;
        document.getElementById('chase-counter').textContent =
            `Attempt ${this.chaseCount}/${this.maxChase}`;
    },

    noButtonDisappear() {
        const noBtn = document.getElementById('btn-no');
        noBtn.style.display = 'none';

        const messages = Content.noDisappearMessages[this.lang];
        let msg = messages[Math.floor(Math.random() * messages.length)];
        msg = msg.replace('{sender}', this.senderName);

        document.getElementById('chase-message').textContent = msg;
        document.getElementById('chase-counter').textContent = '';

        // Auto proceed to YES after delay
        setTimeout(() => this.clickYes(), 2500);
    },

    // ===== YES RESPONSE =====
    clickYes() {
        // Restore scrolling (was locked during game on mobile)
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.height = '';

        this.playSound('yes');
        this.goTo('screen-result');
        this.renderResult();
        this.spawnConfetti('result-card', 40);
    },

    renderResult() {
        // Photos
        this.renderResultPhotos('result-photos');

        // Pick variation
        const variations = Content[this.gender][this.lang];
        const variation = variations[Math.floor(Math.random() * variations.length)];

        // Render main text
        const textEl = document.getElementById('result-text');
        let html = '';
        variation.lines.forEach(line => {
            let text = line.text.replace(/\{sender\}/g, this.senderName).replace(/\{val\}/g, this.valName);
            switch (line.style) {
                case 'heading':
                    html += `<h2>${text}</h2>`;
                    break;
                case 'demand':
                    html += `<p class="demand-line">${text}</p>`;
                    break;
                case 'crossed':
                    html += `<p class="crossed">${text}</p>`;
                    break;
                case 'check':
                    html += `<p class="check">${text}</p>`;
                    break;
                default:
                    html += `<p>${text}</p>`;
            }
        });
        textEl.innerHTML = html;

        // Random demand section
        const demandEl = document.getElementById('result-demand');
        if (this.quizDemand) {
            // Use quiz-generated demand
            demandEl.innerHTML = `
                <p>${this.quizDemand.demand}</p>
                <p class="demand-main">${this.quizDemand.property}</p>
            `;
        } else {
            // Random demand
            const prefixes = Content.demandPrefixes[this.lang];
            const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
                .replace(/\{sender\}/g, this.senderName);
            const property = Content.propertyDemands[Math.floor(Math.random() * Content.propertyDemands.length)];
            const conditions = Content.funnyConditions[this.lang];
            const condition = conditions[Math.floor(Math.random() * conditions.length)];

            demandEl.innerHTML = `
                <p>${prefix}</p>
                <p class="demand-main">${this.valName} should ${property}</p>
                <p>${condition}</p>
            `;
        }
    },

    // ===== PHOTO RENDERING HELPERS =====
    renderPreviewPhotos(containerId) {
        const el = document.getElementById(containerId);
        const senderHtml = this.senderPhoto
            ? `<div class="photo-circle"><img src="${this.senderPhoto}" alt="${this.senderName}"></div>`
            : `<div class="photo-circle">${this.gender === 'm2f' ? '\u{1F468}' : '\u{1F469}'}</div>`;
        const valHtml = this.valPhoto
            ? `<div class="photo-circle"><img src="${this.valPhoto}" alt="${this.valName}"></div>`
            : `<div class="photo-circle">${this.gender === 'm2f' ? '\u{1F469}' : '\u{1F468}'}</div>`;
        el.innerHTML = `${senderHtml}<span class="heart-between">\u{1F495}</span>${valHtml}`;
    },

    renderGamePhotos(containerId) {
        const el = document.getElementById(containerId);
        const senderHtml = `<div class="photo-circle">${this.gender === 'm2f' ? '\u{1F468}' : '\u{1F469}'}</div>`;
        const valHtml = `<div class="photo-circle">${this.gender === 'm2f' ? '\u{1F469}' : '\u{1F468}'}</div>`;
        el.innerHTML = `${senderHtml}<span class="heart-between">\u{1F495}</span>${valHtml}`;
    },

    renderResultPhotos(containerId) {
        const el = document.getElementById(containerId);
        const senderHtml = `<div class="photo-circle">${this.gender === 'm2f' ? '\u{1F468}' : '\u{1F469}'}</div>`;
        const valHtml = `<div class="photo-circle">${this.gender === 'm2f' ? '\u{1F469}' : '\u{1F468}'}</div>`;
        el.innerHTML = `${senderHtml}<span class="heart-between">\u{1F495}</span>${valHtml}`;
    },

    // ===== FLOATING HEARTS =====
    createFloatingHearts() {
        const container = document.getElementById('hearts-bg');
        const hearts = ['\u2764\uFE0F', '\u{1F495}', '\u{1F496}', '\u{1F497}', '\u{1F49D}', '\u{1F49E}', '\u2665\uFE0F'];
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('span');
            heart.className = 'heart-float';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (14 + Math.random() * 20) + 'px';
            heart.style.animationDuration = (8 + Math.random() * 12) + 's';
            heart.style.animationDelay = (Math.random() * 10) + 's';
            container.appendChild(heart);
        }
    },

    // ===== CONFETTI =====
    spawnConfetti(containerId, count) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const colors = ['#ff6b9d', '#ffd700', '#ff4081', '#25d366', '#1da1f2', '#e91e63', '#ffaa00', '#ff8c00'];
        for (let i = 0; i < count; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = Math.random() * 100 + '%';
            piece.style.top = '-10px';
            piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDuration = (1.5 + Math.random() * 2) + 's';
            piece.style.animationDelay = (Math.random() * 0.8) + 's';
            piece.style.width = (5 + Math.random() * 8) + 'px';
            piece.style.height = (5 + Math.random() * 8) + 'px';
            piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            container.appendChild(piece);
            setTimeout(() => piece.remove(), 4000);
        }
    },

    // ===== STATS ANIMATION =====
    animateStats() {
        const targets = {
            'stat-men': 2847,
            'stat-women': 3124,
            'stat-yes': 5692,
            'stat-no-fail': 4201
        };
        // Slowly increment from stored values for fake "live" feel
        const stored = JSON.parse(localStorage.getItem('valStats') || 'null');
        if (stored && Date.now() - stored.time < 86400000) {
            Object.keys(targets).forEach(id => {
                targets[id] = stored[id] || targets[id];
            });
        }
        // Add small random increment
        Object.keys(targets).forEach(id => {
            targets[id] += Math.floor(Math.random() * 5);
            const el = document.getElementById(id);
            if (el) el.textContent = targets[id].toLocaleString();
        });
        // Save
        const save = { time: Date.now(), ...targets };
        localStorage.setItem('valStats', JSON.stringify(save));
    },

    // ===== LANGUAGE TOGGLE =====
    setupLangToggle() {
        const btn = document.getElementById('lang-toggle');
        btn.addEventListener('click', () => {
            this.lang = this.lang === 'en' ? 'pid' : 'en';
            btn.querySelector('span').textContent = this.lang === 'en' ? 'Pidgin' : 'English';
            this.updateLanguage();
        });
    },

    updateLanguage() {
        document.querySelectorAll('[data-en]').forEach(el => {
            const text = el.getAttribute(`data-${this.lang}`);
            if (text) el.textContent = text;
        });
    },

    // ===== SOUND =====
    setupSoundToggle() {
        const btn = document.getElementById('sound-toggle');
        btn.addEventListener('click', () => {
            this.soundOn = !this.soundOn;
            btn.querySelector('.sound-on').style.display = this.soundOn ? '' : 'none';
            btn.querySelector('.sound-off').style.display = this.soundOn ? 'none' : '';
        });
    },

    playSound(type) {
        if (!this.soundOn) return;
        // Web Audio API for simple sounds
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            if (type === 'yes') {
                // Happy ascending tone
                osc.frequency.setValueAtTime(523, ctx.currentTime); // C5
                osc.frequency.setValueAtTime(659, ctx.currentTime + 0.15); // E5
                osc.frequency.setValueAtTime(784, ctx.currentTime + 0.3); // G5
                gain.gain.setValueAtTime(0.3, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.5);
            }
        } catch (e) {
            // Audio not supported
        }
    },

    // ===== EXIT INTENT =====
    setupExitIntent() {
        document.addEventListener('mouseout', (e) => {
            if (e.clientY <= 0 && !this.exitShown && !this.isValView) {
                // Only show if not on result screen
                const resultActive = document.getElementById('screen-result').classList.contains('active');
                if (!resultActive) {
                    this.showExitPopup();
                }
            }
        });

        // Mobile: back button / visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && !this.exitShown && !this.isValView) {
                // Will show when they come back
                this._showExitOnReturn = true;
            }
            if (!document.hidden && this._showExitOnReturn) {
                this._showExitOnReturn = false;
                const resultActive = document.getElementById('screen-result').classList.contains('active');
                if (!resultActive) {
                    this.showExitPopup();
                }
            }
        });
    },

    showExitPopup() {
        this.exitShown = true;
        document.getElementById('exit-popup').style.display = 'flex';
    },

    closeExitPopup() {
        document.getElementById('exit-popup').style.display = 'none';
    },

    // ===== PLAY AGAIN =====
    playAgain() {
        window.location.href = window.location.origin + window.location.pathname;
    }
};

// ===== BOOT =====
document.addEventListener('DOMContentLoaded', () => App.init());
