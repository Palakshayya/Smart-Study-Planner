/**
 * ============================================================================
 * AUDIO SYNTHESIZER UTILITY
 * ============================================================================
 * Plays a pleasant double-tone alert chime using Web Audio API (D5 -> A5)
 * without requiring any external audio files.
 */

export function playNotificationChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 tone
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5 tone

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch (e) {
    // Autoplay restrictions or audio context errors handled safely
  }
}
