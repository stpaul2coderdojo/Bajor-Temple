/**
 * Bajoran Temple Audio Synthesizer
 * Uses Web Audio API for authentic Star Trek ambient temple soundscapes:
 * - Sacred Orb Resonance
 * - Temple Singing Bowl / Chimes
 * - Denorios Wormhole Celestial Drone
 * - Temporal Portal Unsealing Sound
 */

class TempleAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private droneGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private isAmbientPlaying: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.droneGain && this.ctx) {
      this.droneGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
    } else if (!this.isMuted && this.droneGain && this.ctx && this.isAmbientPlaying) {
      this.droneGain.gain.setTargetAtTime(0.08, this.ctx.currentTime, 0.5);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Play the divine resonance when the Orb of Time opens or glows
   */
  public playOrbResonance(frequency = 528) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const oscHarmonic = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Golden Solfeggio / Temple resonance
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, now);
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, now + 3);

      oscHarmonic.type = 'triangle';
      oscHarmonic.frequency.setValueAtTime(frequency * 2, now);
      oscHarmonic.frequency.exponentialRampToValueAtTime(frequency * 2.01, now + 3);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.Q.setValueAtTime(4, now);

      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(0.2, now + 0.5);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

      osc.connect(filter);
      oscHarmonic.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start(now);
      oscHarmonic.start(now);
      osc.stop(now + 4.6);
      oscHarmonic.stop(now + 4.6);
    } catch {
      // Ignore audio init errors before user gesture
    }
  }

  /**
   * Play the sacred Bajoran Temple bell / singing bowl chime
   */
  public playTempleChime() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const frequencies = [440, 880, 1320, 1760];
      const gains = [0.15, 0.08, 0.04, 0.02];

      frequencies.forEach((f, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f + (Math.random() * 2 - 1), now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(gains[idx], now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.00001, now + 3.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 3.6);
      });
    } catch {
      // Audio context fallback
    }
  }

  /**
   * Sound when entering the temporal wormhole / transforming persona
   */
  public playTemporalPortalWarp() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 1.2);
      osc.frequency.exponentialRampToValueAtTime(220, now + 2.5);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(2400, now + 1.2);
      filter.frequency.exponentialRampToValueAtTime(300, now + 2.5);
      filter.Q.setValueAtTime(6, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 2.9);
    } catch {
      // Audio fallback
    }
  }

  /**
   * Start/stop ambient temple drone
   */
  public toggleAmbientDrone(): boolean {
    if (this.isAmbientPlaying) {
      this.stopAmbientDrone();
      return false;
    } else {
      this.startAmbientDrone();
      return true;
    }
  }

  public startAmbientDrone() {
    if (this.isAmbientPlaying) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.001, now);
      this.droneGain.gain.linearRampToValueAtTime(this.isMuted ? 0 : 0.06, now + 2);

      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc2 = this.ctx.createOscillator();

      this.droneOsc1.type = 'sine';
      this.droneOsc1.frequency.setValueAtTime(108, now); // Low A

      this.droneOsc2.type = 'triangle';
      this.droneOsc2.frequency.setValueAtTime(162, now); // Perfect 5th

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, now);

      this.droneOsc1.connect(filter);
      this.droneOsc2.connect(filter);
      filter.connect(this.droneGain);
      this.droneGain.connect(this.ctx.destination);

      this.droneOsc1.start(now);
      this.droneOsc2.start(now);
      this.isAmbientPlaying = true;
    } catch {
      // audio error handling
    }
  }

  public stopAmbientDrone() {
    if (!this.isAmbientPlaying) return;
    try {
      if (this.droneGain && this.ctx) {
        this.droneGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
        setTimeout(() => {
          this.droneOsc1?.stop();
          this.droneOsc2?.stop();
          this.droneOsc1 = null;
          this.droneOsc2 = null;
          this.isAmbientPlaying = false;
        }, 1100);
      } else {
        this.isAmbientPlaying = false;
      }
    } catch {
      this.isAmbientPlaying = false;
    }
  }
}

export const audioEngine = new TempleAudioEngine();
