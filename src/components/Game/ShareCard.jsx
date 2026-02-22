import React, { useRef, useEffect } from 'react';
import Mascot from '../ui/Mascot';

export default function ShareCard({ score, rank, consecutiveHits, mascotPhrase, mascotEmotion }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Canvas dimensions
        canvas.width = 1080;
        canvas.height = 1080;

        // EMOTIONS COLOR/CONFIG SYNC (Matching Mascot.jsx)
        const COLORS = {
            happy: "#0ea5e9", sad: "#0284c7", angry: "#1d4ed8", confused: "#0ea5e9",
            pleased: "#38bdf8", pain: "#1e40af", scared: "#1d4ed8", serious: "#0284c7",
            silly: "#38bdf8", nervous: "#0369a1", tired: "#1e3a8a", shocked: "#0ea5e9",
            irritated: "#1d4ed8", wtf: "#1e40af", cool: "#0ea5e9", suspicious: "#0ea5e9",
            unimpressed: "#0284c7", stare: "#1e3a8a", panic_expert: "#e11d48"
        };
        const mascotColor = COLORS[mascotEmotion] || COLORS.happy;

        // Background Gradient
        const grad = ctx.createLinearGradient(0, 0, 0, 1080);
        grad.addColorStop(0, '#0ea5e9'); // sky-500
        grad.addColorStop(1, '#6366f1'); // indigo-500
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(0, 0, 1080, 1080, 80);
        ctx.fill();

        // Decorative Circles
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        ctx.arc(950, 150, 250, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(100, 950, 300, 0, Math.PI * 2);
        ctx.fill();

        // --- DRAW MASCOT ---
        ctx.save();
        ctx.translate(540 - 250, 100);
        ctx.scale(5, 5); // Scale for big centered mascot

        // Body
        ctx.fillStyle = mascotColor;
        const flame = new Path2D("M 20 80 Q 10 80 10 70 L 10 40 Q 10 20 30 30 L 50 10 L 70 30 Q 90 20 90 40 L 90 70 Q 90 80 80 80 Z");
        ctx.fill(flame);
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 1;
        ctx.stroke(flame);

        // Eyes Logic
        const drawEye = (x, y) => {
            ctx.save();
            ctx.translate(x, y);

            // Sclerotica shape (simplified logic)
            ctx.fillStyle = 'white';
            ctx.beginPath();
            if (mascotEmotion === 'stare') {
                ctx.rect(-11, -2, 22, 4);
            } else if (mascotEmotion === 'suspicious') {
                ctx.ellipse(0, 0, 12, 8, 0, 0, Math.PI * 2);
            } else if (mascotEmotion === 'unimpressed') {
                ctx.arc(0, 0, 12, Math.PI, 0); // half circle top
            } else {
                ctx.arc(0, 0, 10, 0, Math.PI * 2);
            }
            ctx.fill();

            // Pupil
            const pSize = mascotEmotion === 'panic_expert' ? 1.5 : (mascotEmotion === 'shocked' || mascotEmotion === 'wtf' ? 3 : 6);
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(0, 0, pSize, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        };

        drawEye(35, 52);
        drawEye(65, 52);

        // Mouth Logic
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        const mYCent = 56; // Centered between eyes
        if (mascotEmotion === 'happy' || mascotEmotion === 'pleased' || mascotEmotion === 'silly') {
            ctx.arc(50, mYCent, 8, 0.1 * Math.PI, 0.9 * Math.PI);
        } else if (mascotEmotion === 'shocked' || mascotEmotion === 'wtf') {
            ctx.ellipse(50, mYCent, 3, 6, 0, 0, Math.PI * 2);
        } else if (mascotEmotion === 'panic_expert') {
            ctx.fillStyle = 'white';
            ctx.rect(42, mYCent - 4, 16, 8);
            ctx.fill();
            ctx.strokeRect(42, mYCent - 4, 16, 8);
            for (let i = 46; i < 58; i += 4) {
                ctx.moveTo(i, mYCent - 4); ctx.lineTo(i, mYCent + 4);
            }
        } else {
            ctx.moveTo(45, mYCent); ctx.lineTo(55, mYCent);
        }
        ctx.stroke();
        ctx.restore();

        // --- SPEECH BUBBLE ---
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.roundRect(650, 150, 380, 120, 30);
        ctx.fill();
        ctx.beginPath(); // Arrow
        ctx.moveTo(650, 200); ctx.lineTo(620, 215); ctx.lineTo(650, 230);
        ctx.fill();

        ctx.fillStyle = mascotColor;
        ctx.font = 'bold 36px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(mascotPhrase, 840, 225);

        // --- CONTENT ---
        ctx.textAlign = 'center';
        ctx.font = 'bold 60px Inter, sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.fillText('RESULTADO', 540, 680);

        ctx.font = 'black 320px Inter, sans-serif';
        ctx.fillStyle = 'white';
        ctx.fillText(score, 540, 950);

        ctx.font = 'bold 50px Inter, sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.fillText(rank.toUpperCase(), 540, 780);

        // --- STATS BAR (Translucent box like UI) ---
        const barY = 820;
        const barH = 140;
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        ctx.beginPath();
        ctx.roundRect(100, barY, 880, barH, 30);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.stroke();

        // Record Label
        ctx.textAlign = 'left';
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.font = 'bold 30px Inter, sans-serif';
        ctx.fillText('RÉCORD', 140, barY + 50);
        ctx.fillStyle = 'white';
        ctx.font = 'black 50px Inter, sans-serif';
        ctx.fillText(`#${consecutiveHits}`, 140, barY + 105);

        // App Label
        ctx.textAlign = 'right';
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.font = 'bold 30px Inter, sans-serif';
        ctx.fillText('APP', 940, barY + 50);
        ctx.fillStyle = 'white';
        ctx.font = 'black 50px Inter, sans-serif';
        ctx.fillText('Calculux', 940, barY + 105);

        // --- FOOTER BRANDING ---
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = 'bold 28px Inter, sans-serif';
        ctx.fillText('calculux-zeta.vercel.app', 540, 1040);

    }, [score, mascotPhrase, mascotEmotion, rank, consecutiveHits]);

    const handleShare = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.toBlob(async (blob) => {
            const file = new File([blob], 'calculux-record.png', { type: 'image/png' });

            const shareData = {
                title: 'Mi récord en Calculux',
                text: `¡Mira mi nuevo rango en Calculux! Soy ${rank} con ${score} puntos.`,
                files: [file],
            };

            if (navigator.canShare && navigator.canShare(shareData)) {
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    console.error('Error sharing:', err);
                }
            } else {
                try {
                    await navigator.clipboard.writeText(shareData.text);
                    alert('¡Récord copiado! Tu navegador no soporta compartir imágenes.');
                } catch (err) {
                    console.error('Error copying text:', err);
                }
            }
        });
    };

    return (
        <div className="flex flex-col items-center gap-4 w-full">
            <div className="relative w-full max-w-[320px] aspect-square rounded-[2rem] overflow-hidden shadow-2xl bg-gradient-to-b from-sky-500 to-indigo-600 p-6 flex flex-col items-center justify-between border-4 border-white/20">
                {/* Visual Mascot and Bubble in UI */}
                <div className="flex items-start justify-center w-full gap-2 pt-2">
                    <div className="scale-110 drop-shadow-lg">
                        <Mascot emotion={mascotEmotion} />
                    </div>
                    <div className="bg-white/95 backdrop-blur-sm p-3 rounded-2xl rounded-tl-none shadow-xl mt-2 max-w-[140px]">
                        <p className="text-[10px] font-black text-sky-600 leading-tight uppercase tracking-tighter">
                            {mascotPhrase}
                        </p>
                    </div>
                </div>

                <div className="text-center flex-1 flex flex-col justify-center">
                    <div className="text-[10px] font-black text-white/60 tracking-[0.3em] uppercase mb-1">Resultado</div>
                    <div className="text-7xl font-black text-white drop-shadow-md">{score}</div>
                    <div className="text-[11px] font-black text-sky-100 uppercase mt-1 tracking-widest">{rank}</div>
                </div>

                <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-3 flex justify-between items-center border border-white/10">
                    <div className="text-left">
                        <div className="text-[8px] font-bold text-white/60 uppercase">Récord</div>
                        <div className="text-sm font-black text-white">#{consecutiveHits}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[8px] font-bold text-white/60 uppercase">App</div>
                        <div className="text-sm font-black text-white">Calculux</div>
                    </div>
                </div>

                {/* Hidden canvas for generation */}
                <canvas ref={canvasRef} className="hidden" />
            </div>

            <button
                onClick={handleShare}
                className="w-full py-4 rounded-2xl bg-white text-sky-600 font-black text-base shadow-xl shadow-sky-100 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 border-2 border-sky-50"
            >
                <span>🚀</span> COMPARTIR LOGRO
            </button>
        </div>
    );
}
