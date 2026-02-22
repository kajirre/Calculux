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
        canvas.height = 1080; // Make it square for better sharing

        // Background Gradient
        const grad = ctx.createLinearGradient(0, 0, 0, 1080);
        grad.addColorStop(0, '#0ea5e9'); // sky-500
        grad.addColorStop(1, '#6366f1'); // indigo-500
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(0, 0, 1080, 1080, 80);
        ctx.fill();

        // Decorative Shapes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        ctx.arc(950, 150, 250, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(100, 950, 300, 0, Math.PI * 2);
        ctx.fill();

        // Draw Simplified Mascot on Canvas
        const mX = 540 - 150;
        const mY = 150;
        const mScale = 3;

        ctx.save();
        ctx.translate(mX, mY);
        ctx.scale(mScale, mScale);

        // Body (Simplified Flame)
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        const flame = new Path2D("M 20 80 Q 10 80 10 70 L 10 40 Q 10 20 30 30 L 50 10 L 70 30 Q 90 20 90 40 L 90 70 Q 90 80 80 80 Z");
        ctx.fill(flame);

        // Eyes
        ctx.fillStyle = '#1e2937';
        ctx.beginPath();
        ctx.arc(35, 52, 6, 0, Math.PI * 2);
        ctx.arc(65, 52, 6, 0, Math.PI * 2);
        ctx.fill();

        // Mouth (Smile)
        ctx.strokeStyle = '#1e2937';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(50, 65, 12, 0.1 * Math.PI, 0.9 * Math.PI);
        ctx.stroke();

        ctx.restore();

        // Speech Bubble on Canvas
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.roundRect(580, 120, 420, 120, 30);
        ctx.fill();

        // Bubble Triangle
        ctx.beginPath();
        ctx.moveTo(580, 180);
        ctx.lineTo(550, 200);
        ctx.lineTo(580, 220);
        ctx.fill();

        // Phrase text
        ctx.textAlign = 'center';
        ctx.fillStyle = '#0ea5e9';
        ctx.font = 'bold 45px Inter, system-ui, sans-serif';
        ctx.fillText(mascotPhrase, 790, 195);

        // Text Content
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0,0,0,0.2)';

        // Title
        ctx.font = 'black 100px Inter, system-ui, sans-serif';
        ctx.fillText('CALCULUX', 540, 560);

        // stats area
        ctx.font = 'bold 50px Inter, system-ui, sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fillText('PUNTAJE FINAL', 540, 680);

        ctx.font = 'black 280px Inter, system-ui, sans-serif';
        ctx.fillStyle = 'white';
        ctx.fillText(score, 540, 920);

        ctx.font = 'bold 55px Inter, system-ui, sans-serif';
        ctx.fillText(rank, 540, 980);

    }, [score, consecutiveHits, mascotPhrase, rank]);

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
