let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Synthesizes a high-end luxury camera shutter mechanical sound
 * combining a physical snap (woodblock/metallic click) and a subtle motor-whir.
 */
export function playCameraShutter() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // --- Shutter Snap (Clipped noise + High-frequency pulse) ---
    const bufferSize = ctx.sampleRate * 0.15; // 150ms
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // Noise component
      data[i] = Math.random() * 2 - 1;
    }

    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;

    // Filter to capture the metallic crisp snap of an SLR blade
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3200, now);
    filter.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
    filter.Q.setValueAtTime(4, now);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.3, now);
    // Double pulse to mimic mirror up, curtain snap down
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    gainNode.gain.setValueAtTime(0.25, now + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    noiseNode.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    // --- Elegant Sine pop (adds the metallic weight) ---
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.08);

    oscGain.gain.setValueAtTime(0.2, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    // Build the trigger list
    noiseNode.start(now);
    noiseNode.stop(now + 0.2);
    osc.start(now);
    osc.stop(now + 0.1);
  } catch (error) {
    // Fail silently if audio context block
    console.debug('Audio playback blocked or unsupported:', error);
  }
}

/**
 * Synthesizes a luxury minimal UI hover sound - a light, high-pitched mechanical tick
 */
export function playHoverClick() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    // Sleek high pitch
    osc.frequency.setValueAtTime(2400, now);
    osc.frequency.exponentialRampToValueAtTime(4500, now + 0.015);

    gainNode.gain.setValueAtTime(0.02, now); // Quiet and elegant
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.025);
  } catch (error) {
    // Fail silently
  }
}
