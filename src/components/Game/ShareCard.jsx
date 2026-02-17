import React, { useRef, useEffect } from 'react';

export default function ShareCard({ score, rank, consecutiveHits }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Canvas dimensions
        canvas.width = 1080;
        canvas.height = 1080;

        // Background Gradient
        const grad = ctx.createLinearGradient(0, 0, 1080, 1080);
        grad.addColorStop(0, '#0ea5e9'); // sky-500
        grad.addColorStop(1, '#6366f1'); // indigo-500
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1080, 1080);

        // Decorative Shapes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        ctx.arc(900, 150, 200, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(150, 900, 300, 0, Math.PI * 2);
        ctx.fill();

        // Text Content
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(0,0,0,0.3)';

        // Title
        ctx.font = 'black 120px Inter, system-ui, sans-serif';
        ctx.fillText('CALCULUX', 540, 220);

        // Rank Label
        ctx.font = 'bold 40px Inter, system-ui, sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.fillText('RANGO ALCANZADO', 540, 400);

        // Rank Value
        ctx.font = 'black 100px Inter, system-ui, sans-serif';
        ctx.fillStyle = 'white';
        ctx.fillText(rank.toUpperCase(), 540, 520);

        // Score Label
        ctx.font = 'bold 40px Inter, system-ui, sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.fillText('PUNTAJE FINAL', 540, 700);

        // Score Value
        ctx.font = 'black 180px Inter, system-ui, sans-serif';
        ctx.fillStyle = 'white';
        ctx.fillText(score, 540, 850);

        // Stats
        ctx.font = 'bold 50px Inter, system-ui, sans-serif';
        ctx.fillText(`Aciertos seguidos: ${consecutiveHits}`, 540, 980);

    }, [score, rank, consecutiveHits]);

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
                // Fallback: Copy text to clipboard
                try {
                    await navigator.clipboard.writeText(shareData.text);
                    alert('¡Récord copiado al portapapeles! (Tu navegador no soporta compartir imágenes directamente)');
                } catch (err) {
                    console.error('Error copying text:', err);
                }
            }
        });
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <canvas
                ref={canvasRef}
                className="w-full max-w-[350px] aspect-square rounded-3xl shadow-2xl"
            />
            <button
                onClick={handleShare}
                className="w-full py-4 rounded-2xl bg-white text-sky-600 font-black text-lg shadow-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
                <span>📤</span> COMPARTIR LOGRO
            </button>
        </div>
    );
}
