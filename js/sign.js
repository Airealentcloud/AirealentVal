/* ===== SIGN PAGE APPLICATION ===== */
const SignApp = {
    lang: 'en',
    soundOn: false,
    chaseCount: 0,
    maxChase: 5,
    isMobile: false,

    // Chase messages
    chaseMessages: {
        en: [
            "You can't say No to property! \ud83c\udfe0",
            "A.I Realent won't let you escape! \ud83d\ude0f",
            "No wahala... just say YES! \ud83d\ude02",
            "Buy land first, then we talk! \ud83d\udcb0",
            "The No button fears A.I Realent! \ud83d\udcaa",
            "You think you can refuse? \ud83e\udd23",
            "Property over everything! \ud83c\udfe1",
            "Your Val needs a house first! \ud83d\ude0d",
            "Even the button knows... say YES! \u2764\ufe0f",
            "A.I Realent properties are irresistible! \u2728"
        ],
        pid: [
            "You no fit say No to property! \ud83c\udfe0",
            "A.I Realent no go let you run! \ud83d\ude0f",
            "No wahala... just talk YES! \ud83d\ude02",
            "Buy land first, then we go talk! \ud83d\udcb0",
            "The No button dey fear A.I Realent! \ud83d\udcaa",
            "You think say you fit refuse? \ud83e\udd23",
            "Property pass everything! \ud83c\udfe1",
            "Your Val need house first! \ud83d\ude0d",
            "Even the button sabi... talk YES! \u2764\ufe0f",
            "A.I Realent property sweet die! \u2728"
        ]
    },

    disappearMessages: {
        en: [
            "The No button has left the chat! \ud83d\ude02",
            "No button? What No button? \ud83e\udd37",
            "Even the button agreed... A.I Realent wins! \ud83c\udfc6",
            "The button went to buy property at A.I Realent! \ud83c\udfe0",
            "No is not an option when property is involved! \ud83d\udcaf"
        ],
        pid: [
            "The No button don comot! \ud83d\ude02",
            "No button? Which No button? \ud83e\udd37",
            "Even the button gree... A.I Realent win! \ud83c\udfc6",
            "The button don go buy land for A.I Realent! \ud83c\udfe0",
            "No no dey when property dey! \ud83d\udcaf"
        ]
    },

    // ===== INIT =====
    init() {
        this.createFloatingHearts();
        this.setupNoButton();
        this.setupLangToggle();
        this.setupSoundToggle();
    },

    // ===== YES BUTTON =====
    clickYes() {
        this.playSound('yes');
        document.getElementById('redirect-msg').style.display = 'block';
        setTimeout(() => {
            window.location.href = 'https://airealent.ng';
        }, 1500);
    },

    // ===== NO BUTTON CHASE =====
    setupNoButton() {
        this.isMobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
        const noBtn = document.getElementById('btn-no');
        if (!noBtn) return;

        // Mobile: tap to flee
        noBtn.addEventListener('touchstart', (e) => {
            if (noBtn.style.display === 'none') return;
            e.preventDefault();
            e.stopPropagation();
            this.moveNoButton(noBtn);
        }, { passive: false });

        noBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
        }, { passive: false });

        // Click handler (desktop + mobile safety)
        noBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.moveNoButton(noBtn);
        });

        // Desktop: proximity chase
        if (!this.isMobile) {
            document.addEventListener('mousemove', (e) => {
                if (noBtn.style.display === 'none') return;

                const rect = noBtn.getBoundingClientRect();
                const bx = rect.left + rect.width / 2;
                const by = rect.top + rect.height / 2;
                const dist = Math.sqrt((e.clientX - bx) ** 2 + (e.clientY - by) ** 2);

                if (dist < 120) {
                    this.moveNoButton(noBtn, e.clientX, e.clientY);
                }
            });
        }
    },

    moveNoButton(noBtn, pointerX, pointerY) {
        if (noBtn.style.display === 'none') return;
        this.chaseCount++;

        const rect = noBtn.getBoundingClientRect();
        const bx = rect.left + rect.width / 2;
        const by = rect.top + rect.height / 2;
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        noBtn.classList.add('running');

        const px = pointerX ?? bx;
        const py = pointerY ?? by;

        // Escape away from pointer — FAST
        const angle = Math.atan2(by - py, bx - px) + (Math.random() - 0.5) * 1.5;
        const speed = 200 + (this.chaseCount * 40);
        let nx = bx + Math.cos(angle) * speed;
        let ny = by + Math.sin(angle) * speed;

        // If off-screen, random position
        const margin = 50;
        if (nx < margin || nx > vw - margin || ny < margin || ny > vh - margin) {
            nx = margin + Math.random() * (vw - margin * 2);
            ny = margin + Math.random() * (vh - margin * 2);

            // Avoid YES button
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

        // Clamp to viewport
        nx = Math.max(margin, Math.min(vw - margin, nx));
        ny = Math.max(margin, Math.min(vh - margin, ny));

        noBtn.style.position = 'fixed';
        noBtn.style.left = (nx - rect.width / 2) + 'px';
        noBtn.style.top = (ny - rect.height / 2) + 'px';

        // Shrink faster
        const scale = Math.max(0.4, 1 - (this.chaseCount * 0.1));
        noBtn.style.transform = `scale(${scale})`;

        // Haptic
        if (navigator.vibrate) {
            navigator.vibrate(30);
        }

        this.showChaseMessage();

        if (this.chaseCount >= this.maxChase) {
            this.noButtonDisappear();
        }
    },

    showChaseMessage() {
        const messages = this.chaseMessages[this.lang];
        const msg = messages[Math.floor(Math.random() * messages.length)];
        document.getElementById('chase-message').textContent = msg;
        document.getElementById('chase-counter').textContent =
            `Attempt ${this.chaseCount}/${this.maxChase}`;
    },

    noButtonDisappear() {
        const noBtn = document.getElementById('btn-no');
        noBtn.style.display = 'none';

        const messages = this.disappearMessages[this.lang];
        const msg = messages[Math.floor(Math.random() * messages.length)];
        document.getElementById('chase-message').textContent = msg;
        document.getElementById('chase-counter').textContent = '';

        // Auto-redirect after delay
        setTimeout(() => this.clickYes(), 2500);
    },

    // ===== FLOATING HEARTS =====
    createFloatingHearts() {
        const container = document.getElementById('hearts-bg');
        if (!container) return;
        const hearts = ['\u2764\ufe0f', '\ud83d\udc95', '\ud83d\udc96', '\ud83d\udc97', '\ud83d\udc9d', '\ud83d\udc9e', '\u2665\ufe0f'];
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

    // ===== LANGUAGE TOGGLE =====
    setupLangToggle() {
        const btn = document.getElementById('lang-toggle');
        if (!btn) return;
        btn.addEventListener('click', () => {
            this.lang = this.lang === 'en' ? 'pid' : 'en';
            btn.querySelector('span').textContent = this.lang === 'en' ? 'Pidgin' : 'English';
            this.updateLanguage();
        });
    },

    updateLanguage() {
        document.querySelectorAll('[data-en]').forEach(el => {
            const text = el.getAttribute(`data-${this.lang}`);
            if (text) el.innerHTML = text;
        });
    },

    // ===== SOUND =====
    setupSoundToggle() {
        const btn = document.getElementById('sound-toggle');
        if (!btn) return;
        btn.addEventListener('click', () => {
            this.soundOn = !this.soundOn;
            btn.querySelector('.sound-on').style.display = this.soundOn ? '' : 'none';
            btn.querySelector('.sound-off').style.display = this.soundOn ? 'none' : '';
        });
    },

    playSound(type) {
        if (!this.soundOn) return;
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            if (type === 'yes') {
                osc.frequency.setValueAtTime(523, ctx.currentTime);
                osc.frequency.setValueAtTime(659, ctx.currentTime + 0.15);
                osc.frequency.setValueAtTime(784, ctx.currentTime + 0.3);
                gain.gain.setValueAtTime(0.3, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.5);
            }
        } catch (e) {
            // Audio not supported
        }
    }
};

// ===== BOOT =====
document.addEventListener('DOMContentLoaded', () => SignApp.init());
