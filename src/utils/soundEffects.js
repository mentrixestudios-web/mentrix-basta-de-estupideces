// Advanced Web Audio API Engine & Voice Clip Synthesizer
// Engineered for 100% reliability across iOS Safari, Android Chrome, and Desktop

const ALL_VOICE_URLS = [
  '/audio/paulina_basta.mp3',
  '/audio/paulina_ilusa.mp3',
  '/audio/paulina_tribunal.mp3',
  '/audio/karla_amiga.mp3',
  '/audio/karla_casi_algo.mp3',
  '/audio/karla_intensa.mp3',
  '/audio/natalia_dato_duro.mp3',
  '/audio/natalia_cientifico.mp3',
  '/audio/natalia_glamour.mp3'
];

class SoundManager {
  constructor() {
    this.ctx = null;
    this.audioBuffers = new Map();
    this.activeSource = null;
    this.activeAudio = null;
    this.unlocked = false;
    this.preloading = false;

    // Auto-unlock on first user gesture anywhere on screen
    this.setupGestureUnlock();
  }

  setupGestureUnlock() {
    if (typeof window === 'undefined') return;

    const unlockHandler = () => {
      this.unlockAudio();
      ['touchstart', 'touchend', 'click', 'keydown', 'pointerdown'].forEach((evt) => {
        window.removeEventListener(evt, unlockHandler, true);
        document.removeEventListener(evt, unlockHandler, true);
      });
    };

    ['touchstart', 'touchend', 'click', 'keydown', 'pointerdown'].forEach((evt) => {
      window.addEventListener(evt, unlockHandler, { once: true, capture: true, passive: true });
      document.addEventListener(evt, unlockHandler, { once: true, capture: true, passive: true });
    });
  }

  unlockAudio() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    // Play a 1-sample silent buffer to unlock iOS Safari Web Audio session
    try {
      const buffer = this.ctx.createBuffer(1, 1, 22050);
      const source = this.ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(this.ctx.destination);
      source.start(0);
      this.unlocked = true;
    } catch (e) {
      console.warn('AudioContext silent unlock warning:', e);
    }

    // Preload voice buffers in background after unlock
    this.preloadAllVoices();
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Preloads an audio file into decoded AudioBuffer
  async preloadAudio(url) {
    if (this.audioBuffers.has(url)) return this.audioBuffers.get(url);
    this.init();
    if (!this.ctx) return null;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);
      this.audioBuffers.set(url, audioBuffer);
      return audioBuffer;
    } catch (err) {
      console.warn(`[SoundManager] Could not preload audio ${url}:`, err);
      return null;
    }
  }

  async preloadAllVoices() {
    if (this.preloading) return;
    this.preloading = true;
    for (const url of ALL_VOICE_URLS) {
      if (!this.audioBuffers.has(url)) {
        await this.preloadAudio(url).catch(() => {});
      }
    }
  }

  // Plays synthesized buzzer sound
  playBuzzer() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(140, now);
    osc1.frequency.exponentialRampToValueAtTime(110, now + 0.4);

    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(145, now);
    osc2.frequency.exponentialRampToValueAtTime(115, now + 0.4);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.45);
    osc2.stop(now + 0.45);
  }

  playFlip() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  playCheer() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.15, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.35);
    });
  }

  playClink() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(2400, now);
    osc.frequency.exponentialRampToValueAtTime(1800, now + 0.3);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  playSuspense() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const freqs = [146.83, 174.61, 220.00];
    freqs.forEach(freq => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.6);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.7);
    });
  }

  playCamera() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(800, now);
    osc1.frequency.exponentialRampToValueAtTime(200, now + 0.04);
    gain1.gain.setValueAtTime(0.2, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.05);

    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1200, now + 0.07);
    osc2.frequency.exponentialRampToValueAtTime(300, now + 0.12);
    gain2.gain.setValueAtTime(0.25, now + 0.07);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(now + 0.07);
    osc2.stop(now + 0.13);
  }

  // Stop any active playing voice
  stopVoice() {
    if (this.activeSource) {
      try {
        this.activeSource.stop();
        this.activeSource.disconnect();
      } catch (e) {}
      this.activeSource = null;
    }
    if (this.activeAudio) {
      try {
        this.activeAudio.pause();
        this.activeAudio.currentTime = 0;
      } catch (e) {}
      this.activeAudio = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
  }

  // Primary Voice Player: Web Audio Buffer Source with Fallbacks
  playVoice(url, fallbackText = '') {
    this.stopVoice();
    this.init();

    const controller = {
      onended: null,
      onerror: null,
      stop: () => this.stopVoice()
    };

    const triggerEnd = () => {
      if (typeof controller.onended === 'function') {
        controller.onended();
      }
    };

    const triggerError = (err) => {
      if (typeof controller.onerror === 'function') {
        controller.onerror(err);
      }
    };

    // Strategy 1: Cached Decoded AudioBuffer (Instant, Zero Latency, Bypasses Mobile Autoplay Restriction)
    if (this.ctx && this.audioBuffers.has(url)) {
      try {
        const buffer = this.audioBuffers.get(url);
        const source = this.ctx.createBufferSource();
        const gainNode = this.ctx.createGain();
        source.buffer = buffer;
        gainNode.gain.setValueAtTime(1.15, this.ctx.currentTime); // Crisp volume
        source.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        source.onended = () => {
          if (this.activeSource === source) {
            this.activeSource = null;
          }
          triggerEnd();
        };

        this.activeSource = source;
        source.start(0);
        return controller;
      } catch (err) {
        console.warn('[SoundManager] Web Audio Buffer play failed, falling back:', err);
      }
    }

    // Strategy 2: Preload & Play decoded AudioBuffer on-the-fly
    if (this.ctx) {
      this.preloadAudio(url).then((buffer) => {
        if (buffer && this.ctx) {
          try {
            const source = this.ctx.createBufferSource();
            const gainNode = this.ctx.createGain();
            source.buffer = buffer;
            gainNode.gain.setValueAtTime(1.15, this.ctx.currentTime);
            source.connect(gainNode);
            gainNode.connect(this.ctx.destination);

            source.onended = () => {
              if (this.activeSource === source) {
                this.activeSource = null;
              }
              triggerEnd();
            };

            this.activeSource = source;
            source.start(0);
            return;
          } catch (e) {
            console.warn('[SoundManager] Dynamic buffer source start failed:', e);
          }
        }
        // Fallback to HTML5 Audio if decode failed
        this.playHtmlAudioFallback(url, controller, fallbackText);
      }).catch(() => {
        this.playHtmlAudioFallback(url, controller, fallbackText);
      });

      return controller;
    }

    // Strategy 3: Standard HTML5 Audio Element Fallback
    this.playHtmlAudioFallback(url, controller, fallbackText);
    return controller;
  }

  playHtmlAudioFallback(url, controller, fallbackText) {
    try {
      const audio = new Audio(url);
      audio.volume = 1.0;
      this.activeAudio = audio;

      audio.onended = () => {
        if (this.activeAudio === audio) this.activeAudio = null;
        if (controller.onended) controller.onended();
      };

      audio.onerror = (e) => {
        console.warn('[SoundManager] HTML5 Audio error:', e);
        if (this.activeAudio === audio) this.activeAudio = null;
        if (fallbackText) {
          this.playSpeechSynthesisFallback(fallbackText, controller);
        } else if (controller.onerror) {
          controller.onerror(e);
        }
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('[SoundManager] HTML5 audio.play() was prevented:', err);
          if (fallbackText) {
            this.playSpeechSynthesisFallback(fallbackText, controller);
          } else if (controller.onerror) {
            controller.onerror(err);
          }
        });
      }
    } catch (err) {
      console.warn('[SoundManager] Failed to create Audio element:', err);
      if (fallbackText) {
        this.playSpeechSynthesisFallback(fallbackText, controller);
      }
    }
  }

  // Strategy 4: Web Speech API Synthetic Voice Fallback (Last resort safety net)
  playSpeechSynthesisFallback(text, controller) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (controller && controller.onerror) controller.onerror(new Error('No speech synthesis'));
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-CL';
      utterance.rate = 1.05;
      utterance.pitch = 1.1;

      utterance.onend = () => {
        if (controller && controller.onended) controller.onended();
      };
      utterance.onerror = (e) => {
        if (controller && controller.onerror) controller.onerror(e);
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('SpeechSynthesis error:', e);
      if (controller && controller.onerror) controller.onerror(e);
    }
  }
}

export const sounds = new SoundManager();
