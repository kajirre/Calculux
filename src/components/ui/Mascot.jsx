import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EMOTIONS = {
    happy: { eyes: { y: 0, scale: 1, pupilSize: 0.8 }, mouth: { d: "M 38 65 Q 50 75 62 65", strokeWidth: 3 }, lids: { d1: "M 30 40 Q 35 35 40 40", d2: "M 60 40 Q 65 35 70 40", opacity: 0 }, color: "#0ea5e9", scleroticaClip: "M -10 2 Q 0 -10 10 2 Z" },
    sad: { eyes: { y: 2, scale: 0.9, pupilSize: 0.7 }, mouth: { d: "M 40 75 Q 50 65 60 75", strokeWidth: 3 }, lids: { d1: "M 30 45 Q 35 48 40 45", d2: "M 60 45 Q 65 48 70 45", opacity: 0 }, color: "#0284c7", scleroticaClip: "M -10 -2 Q 0 8 10 -2 Z" },
    angry: { eyes: { y: 1, scale: 1.1, pupilSize: 0.6 }, mouth: { d: "M 38 72 Q 50 65 62 72", strokeWidth: 3 }, lids: { d1: "M 30 42 Q 35 50 40 50", d2: "M 60 50 Q 65 50 70 42", opacity: 0 }, color: "#1d4ed8", scleroticaClip: "M -10 -5 L 10 2 L 10 10 L -10 10 Z" },
    confused: { eyes: { y: -2, scale: 1, pupilSize: 0.8 }, mouth: { d: "M 45 70 Q 50 75 55 65", strokeWidth: 3 }, lids: { d1: "M 28 35 Q 35 38 42 35", d2: "M 58 45 Q 65 42 72 45", opacity: 0 }, color: "#0ea5e9", scleroticaClip: "M -10 0 A 10 10 0 1 1 10 0 A 10 10 0 1 1 -10 0" },
    pleased: { eyes: { y: 0, scale: 1.1, pupilSize: 1.4 }, mouth: { d: "M 35 65 Q 50 82 65 65", strokeWidth: 4 }, lids: { d1: "M 30 50 Q 35 45 40 50", d2: "M 60 50 Q 65 45 70 50", opacity: 0 }, color: "#38bdf8", scleroticaClip: "M -11 1 Q 0 -12 11 1 Z" },
    pain: { eyes: { y: 2, scale: 0.8, pupilSize: 0.5 }, mouth: { d: "M 40 75 Q 50 70 60 75", strokeWidth: 2 }, lids: { d1: "M 30 52 L 40 48", d2: "M 60 48 L 70 52", opacity: 0 }, color: "#1e40af", scleroticaClip: "M -10 2 L 10 -2 L 10 2 L -10 -2 Z" },
    scared: { eyes: { y: 0, scale: 1.2, pupilSize: 0.5 }, mouth: { d: "M 42 75 Q 50 60 58 75", strokeWidth: 3 }, lids: { d1: "M 25 35 Q 35 45 45 35", d2: "M 55 35 Q 65 45 75 35", opacity: 0 }, color: "#1d4ed8", scleroticaClip: "M -11 0 A 11 11 0 1 1 11 0 A 11 11 0 1 1 -11 0" },
    serious: { eyes: { y: 0, scale: 1, pupilSize: 0.8 }, mouth: { d: "M 42 68 Q 50 68 58 68", strokeWidth: 3 }, lids: { d1: "M 30 42 Q 35 42 40 42", d2: "M 60 42 Q 65 42 70 42", opacity: 0 }, color: "#0284c7", scleroticaClip: "M -10 0 Q 0 -6 10 0 Q 0 6 -10 0 Z" },
    silly: { eyes: { y: -2, scale: 1.1, pupilSize: 1.0 }, mouth: { d: "M 38 65 Q 55 85 65 65", strokeWidth: 3 }, lids: { d1: "M 28 35 Q 35 30 42 40", d2: "M 58 40 Q 65 30 72 35", opacity: 0 }, color: "#38bdf8", scleroticaClip: "M -10 0 A 10 10 0 1 1 10 0 A 10 10 0 1 1 -10 0" },
    nervous: { eyes: { y: 1, scale: 1, pupilSize: 0.7 }, mouth: { d: "M 42 72 Q 50 65 58 72", strokeWidth: 3 }, lids: { d1: "M 32 42 Q 35 48 38 42", d2: "M 62 42 Q 65 48 68 42", opacity: 0 }, color: "#0369a1", scleroticaClip: "M -10 0 A 10 10 0 1 1 10 0 A 10 10 0 1 1 -10 0" },
    tired: { eyes: { y: 3, scale: 0.9, pupilSize: 0.7 }, mouth: { d: "M 45 70 Q 50 70 55 70", strokeWidth: 2 }, lids: { d1: "M 25 55 Q 35 55 45 55", d2: "M 55 55 Q 65 55 75 55", opacity: 0 }, color: "#1e3a8a", scleroticaClip: "M -10 8 L 10 8 L 10 2 Q 0 0 -10 2 Z" },
    shocked: { eyes: { y: -5, scale: 1.3, pupilSize: 0.4 }, mouth: { d: "M 45 65 Q 50 85 55 65", strokeWidth: 4 }, lids: { d1: "M 25 25 Q 35 20 45 25", d2: "M 55 25 Q 65 20 75 25", opacity: 0 }, color: "#0ea5e9", scleroticaClip: "M -12 0 A 12 12 0 1 1 12 0 A 12 12 0 1 1 -12 0" },
    irritated: { eyes: { y: 1, scale: 1, pupilSize: 0.7 }, mouth: { d: "M 40 70 Q 50 65 60 70", strokeWidth: 3 }, lids: { d1: "M 30 45 Q 35 48 40 48", d2: "M 60 48 Q 65 48 70 45", opacity: 0 }, color: "#1d4ed8", scleroticaClip: "M -10 -2 L 10 -6 L 10 10 L -10 10 Z" },
    wtf: { eyes: { y: -2, scale: 1.5, pupilSize: 0.35 }, mouth: { d: "M 35 75 Q 50 60 65 75", strokeWidth: 5 }, lids: { d1: "M 25 20 Q 35 40 45 20", d2: "M 55 20 Q 65 40 75 20", opacity: 0 }, color: "#1e40af", scleroticaClip: "M -12 0 A 12 12 0 1 1 12 0 A 12 12 0 1 1 -12 0" },
    cool: { eyes: { y: 0, scale: 1, pupilSize: 0.8 }, mouth: { d: "M 38 65 Q 55 70 65 62", strokeWidth: 4 }, lids: { d1: "M 25 35 Q 35 30 45 35", d2: "M 55 35 Q 65 30 75 35", opacity: 0 }, color: "#0ea5e9", showGlasses: true, scleroticaClip: "M -10 0 A 10 10 0 1 1 10 0 A 10 10 0 1 1 -10 0" }
}

function Particle({ delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0, y: 0, x: 0 }}
            animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0.5],
                y: -40 - Math.random() * 40,
                x: (Math.random() - 0.5) * 60
            }}
            transition={{ duration: 1.2, repeat: Infinity, delay }}
            className="absolute top-10 left-1/2 w-1.5 h-1.5 bg-sky-300 rounded-full blur-[1px]"
        />
    )
}

export default function Mascot({ emotion = 'happy', isWaving = false, lookOffset = { x: 0, y: 0 } }) {
    const config = EMOTIONS[emotion] || EMOTIONS.happy

    const variants = {
        happy: { y: [0, -8, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } },
        joy: { y: [0, -20, 0], scale: [1, 1.1, 1], transition: { duration: 0.4, repeat: 1 } },
        shocked: { scale: [1, 1.2, 1], transition: { duration: 0.2 } },
        pain: { x: [-2, 2, -2, 2, 0], transition: { duration: 0.1, repeat: 5 } },
        wtf: { rotate: [-5, 5, -5, 5, 0], scale: [1, 1.3, 1], transition: { duration: 0.3 } },
        stressed: { x: [-1.5, 1.5, -1.5, 1.5, 0], transition: { duration: 0.08, repeat: Infinity } }
    }

    const currentAnimate = variants[emotion] || variants.happy

    return (
        <motion.div
            animate={currentAnimate}
            className={`relative w-16 h-16 sm:w-20 sm:h-20 transition-all duration-500`}
        >
            {(emotion === 'shocked' || emotion === 'wtf' || emotion === 'joy') && (
                <>
                    <Particle delay={0} />
                    <Particle delay={0.4} />
                    <Particle delay={0.8} />
                </>
            )}

            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
                <defs>
                    <clipPath id="eyeClip">
                        <motion.path
                            animate={{ d: config.scleroticaClip || "M 0 -10 A 10 10 0 1 1 0 10 A 10 10 0 1 1 0 -10 Z" }}
                        />
                    </clipPath>
                </defs>

                <motion.path
                    initial={{ rotate: 0 }}
                    animate={isWaving ? { rotate: [0, -40, 0, -40, 0] } : { rotate: 0 }}
                    transition={{ duration: 0.8, repeat: isWaving ? 2 : 0 }}
                    d="M 85 70 L 95 45" stroke={config.color} strokeWidth="10" strokeLinecap="round"
                    style={{ originX: "85%", originY: "70%", opacity: isWaving ? 1 : 0 }}
                />
                <motion.path
                    animate={{ fill: config.color }}
                    transition={{ duration: 0.3 }}
                    d="M 20 80 Q 10 80 10 70 L 10 40 Q 10 20 30 30 L 50 10 L 70 30 Q 90 20 90 40 L 90 70 Q 90 80 80 80 Z"
                />

                {/* Advanced Multi-part Eyes */}
                <motion.g
                    animate={{
                        y: config.eyes.y,
                        scale: config.eyes.scale
                    }}
                    transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                >
                    {/* Left Eye */}
                    <g transform="translate(35, 52)">
                        <circle r="10" fill="white" />
                        <g clipPath="url(#eyeClip)">
                            <motion.circle
                                animate={{
                                    x: lookOffset.x * 0.5,
                                    y: lookOffset.y * 0.5,
                                    r: 6 * (config.eyes.pupilSize || 1)
                                }}
                                fill="black"
                            />
                        </g>
                        <circle cx="2" cy="-2" r="1.5" fill="white" opacity="0.4" />
                    </g>

                    {/* Right Eye */}
                    <g transform="translate(65, 52)">
                        <circle r="10" fill="white" />
                        <g clipPath="url(#eyeClip)">
                            <motion.circle
                                animate={{
                                    x: lookOffset.x * 0.5,
                                    y: lookOffset.y * 0.5,
                                    r: 6 * (config.eyes.pupilSize || 1)
                                }}
                                fill="black"
                            />
                        </g>
                        <circle cx="2" cy="-2" r="1.5" fill="white" opacity="0.4" />
                    </g>
                </motion.g>

                <motion.g animate={{ opacity: config.lids.opacity }} transition={{ duration: 0.2 }}>
                    <motion.path animate={{ d: config.lids.d1 }} stroke="black" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <motion.path animate={{ d: config.lids.d2 }} stroke="black" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </motion.g>

                <AnimatePresence>
                    {config.showGlasses && (
                        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}>
                            <rect x="25" y="45" width="22" height="15" rx="4" fill="#1f2937" />
                            <rect x="53" y="45" width="22" height="15" rx="4" fill="#1f2937" />
                            <path d="M 47 50 L 53 50" stroke="#1f2937" strokeWidth="4" />
                        </motion.g>
                    )}
                </AnimatePresence>
                <motion.path
                    animate={{ d: config.mouth.d, strokeWidth: config.mouth.strokeWidth, stroke: "black" }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    fill="none" strokeLinecap="round"
                />
            </svg>

            <motion.div
                animate={{
                    opacity: emotion === 'shocked' ? [0.4, 0.7, 0.4] : [0.1, 0.3, 0.1],
                    scale: emotion === 'shocked' ? [1, 1.2, 1] : [1, 1.1, 1]
                }}
                transition={{ duration: 0.3, repeat: Infinity }}
                className="absolute inset-0 rounded-full blur-2xl -z-10"
                style={{ backgroundColor: config.color }}
            />
        </motion.div>
    )
}
