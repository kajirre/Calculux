const audioCtx = typeof window !== 'undefined' ? new (window.AudioContext || window.webkitAudioContext)() : null;

function playTone(freq, type, duration, volume = 0.1) {
    if (!audioCtx) return;

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
}

export const playCorrectSound = () => {
    // A pleasant "ding" arpeggio
    playTone(523.25, 'sine', 0.5, 0.1); // C5
    setTimeout(() => playTone(659.25, 'sine', 0.4, 0.08), 100); // E5
};

export const playWrongSound = () => {
    // A low "thud" or buzzer sound
    playTone(150, 'triangle', 0.4, 0.15);
    setTimeout(() => playTone(110, 'triangle', 0.4, 0.15), 100);
};

export const playLevelUpSound = () => {
    // Upward sweep
    playTone(400, 'sine', 0.1, 0.1);
    setTimeout(() => playTone(600, 'sine', 0.1, 0.1), 100);
    setTimeout(() => playTone(800, 'sine', 0.2, 0.1), 200);
};
