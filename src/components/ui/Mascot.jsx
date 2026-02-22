import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CIRCLE_EYE = "M -10 0 A 10 10 0 1 1 10 0 A 10 10 0 1 1 -10 0"

const EMOTIONS = {
    happy: { eyes: { y: 0, scale: 1, pupilSize: 0.8 }, mouth: { d: "M 44 55 Q 50 62 56 55", strokeWidth: 3 }, lids: { d1: "M 25 40 Q 30 35 35 40", d2: "M 65 40 Q 70 35 75 40", opacity: 0 }, color: "#0ea5e9", scleroticaClip: CIRCLE_EYE },
    sad: { eyes: { y: 2, scale: 0.9, pupilSize: 0.7 }, mouth: { d: "M 45 60 Q 50 55 55 60", strokeWidth: 3 }, lids: { d1: "M 25 45 Q 30 48 35 45", d2: "M 65 45 Q 70 48 75 45", opacity: 1 }, color: "#0284c7", scleroticaClip: CIRCLE_EYE },
    angry: { eyes: { y: 1, scale: 1.1, pupilSize: 0.6 }, mouth: { d: "M 44 58 Q 50 55 56 58", strokeWidth: 3 }, lids: { d1: "M 25 42 Q 30 50 35 50", d2: "M 65 50 Q 70 50 75 42", opacity: 1 }, color: "#1d4ed8", scleroticaClip: CIRCLE_EYE },
    confused: { eyes: { y: -2, scale: 1, pupilSize: 0.8 }, mouth: { d: "M 46 58 Q 50 62 54 54", strokeWidth: 3 }, lids: { d1: "M 23 35 Q 30 38 37 35", d2: "M 63 45 Q 70 42 77 45", opacity: 0 }, color: "#0ea5e9", scleroticaClip: CIRCLE_EYE },
    pleased: { eyes: { y: 0, scale: 1.1, pupilSize: 1.2 }, mouth: { d: "M 42 55 Q 50 65 58 55", strokeWidth: 4 }, lids: { d1: "M 25 50 Q 30 45 35 50", d2: "M 65 50 Q 70 45 75 50", opacity: 0 }, color: "#38bdf8", scleroticaClip: CIRCLE_EYE },
    pain: { eyes: { y: 2, scale: 0.8, pupilSize: 0.5 }, mouth: { d: "M 45 60 Q 50 54 55 60", strokeWidth: 2 }, lids: { d1: "M 25 52 L 35 48", d2: "M 65 48 L 75 52", opacity: 1 }, color: "#1e40af", scleroticaClip: CIRCLE_EYE },
    scared: { eyes: { y: 0, scale: 1.2, pupilSize: 0.4 }, mouth: { d: "M 45 60 Q 50 52 55 60", strokeWidth: 3 }, lids: { d1: "M 20 35 Q 30 45 40 35", d2: "M 60 35 Q 70 45 80 35", opacity: 0 }, color: "#1d4ed8", scleroticaClip: CIRCLE_EYE },
    serious: { eyes: { y: 0, scale: 1, pupilSize: 0.8 }, mouth: { d: "M 45 55 Q 50 55 55 55", strokeWidth: 3 }, lids: { d1: "M 25 42 Q 30 42 35 42", d2: "M 65 42 Q 70 42 75 42", opacity: 1 }, color: "#0284c7", scleroticaClip: CIRCLE_EYE },
    silly: { eyes: { y: -2, scale: 1.1, pupilSize: 1.0 }, mouth: { d: "M 44 55 Q 52 68 58 55", strokeWidth: 3 }, lids: { d1: "M 23 35 Q 30 30 37 40", d2: "M 63 40 Q 70 30 77 35", opacity: 0 }, color: "#38bdf8", scleroticaClip: CIRCLE_EYE },
    nervous: { eyes: { y: 1, scale: 1, pupilSize: 0.7 }, mouth: { d: "M 45 58 Q 50 54 55 58", strokeWidth: 3 }, lids: { d1: "M 27 42 Q 30 48 33 42", d2: "M 67 42 Q 70 48 73 42", opacity: 0 }, color: "#0369a1", scleroticaClip: CIRCLE_EYE },
    tired: { eyes: { y: 3, scale: 0.9, pupilSize: 0.7 }, mouth: { d: "M 47 55 Q 50 55 53 55", strokeWidth: 2 }, lids: { d1: "M 20 55 Q 30 55 40 55", d2: "M 60 55 Q 70 55 80 55", opacity: 1 }, color: "#1e3a8a", scleroticaClip: CIRCLE_EYE },
    shocked: { eyes: { y: -5, scale: 1.3, pupilSize: 0.4 }, mouth: { d: "M 46 54 Q 50 64 54 54", strokeWidth: 4 }, lids: { d1: "M 20 25 Q 30 20 40 25", d2: "M 60 25 Q 70 20 80 25", opacity: 0 }, color: "#0ea5e9", scleroticaClip: CIRCLE_EYE },
    irritated: { eyes: { y: 1, scale: 1, pupilSize: 0.7 }, mouth: { d: "M 44 58 Q 50 54 56 58", strokeWidth: 3 }, lids: { d1: "M 25 45 Q 30 48 35 48", d2: "M 65 48 Q 70 48 75 45", opacity: 1 }, color: "#1d4ed8", scleroticaClip: CIRCLE_EYE },
    wtf: { eyes: { y: -2, scale: 1.5, pupilSize: 0.35 }, mouth: { d: "M 44 58 Q 50 50 56 58", strokeWidth: 5 }, lids: { d1: "M 20 20 Q 30 40 40 20", d2: "M 60 20 Q 70 40 80 20", opacity: 0 }, color: "#1e40af", scleroticaClip: CIRCLE_EYE },
    cool: { eyes: { y: 0, scale: 1, pupilSize: 0.8 }, mouth: { d: "M 44 55 Q 52 58 58 53", strokeWidth: 4 }, lids: { d1: "M 20 35 Q 30 30 40 35", d2: "M 60 35 Q 70 30 80 35", opacity: 0 }, color: "#0ea5e9", showGlasses: true, scleroticaClip: CIRCLE_EYE },
    suspicious: { eyes: { y: 2, scale: 1.1, pupilSize: 0.7 }, mouth: { d: "M 45 58 L 55 58", strokeWidth: 3 }, lids: { d1: "M 25 40 L 35 42", d2: "M 65 42 L 75 40", opacity: 0 }, color: "#0ea5e9", scleroticaClip: "M -12 0 Q 0 -8 12 0 Q 0 8 -12 0 Z" },
    unimpressed: { eyes: { y: 1, scale: 1, pupilSize: 0.8 }, mouth: { d: "M 47 58 Q 50 54 53 58", strokeWidth: 3 }, lids: { d1: "M 23 38 Q 30 35 37 38", d2: "M 63 38 Q 70 35 77 38", opacity: 1 }, color: "#0284c7", scleroticaClip: "M -12 0 L 12 0 Q 12 12 0 12 Q -12 12 -12 0 Z" },
    stare: { eyes: { y: 0, scale: 0.9, pupilSize: 0.6 }, mouth: { d: "M 48 55 L 52 55", strokeWidth: 2 }, lids: { d1: "M 25 40 L 35 40", d2: "M 65 40 L 75 40", opacity: 1 }, color: "#1e3a8a", scleroticaClip: "M -11 2 L 11 2 L 11 -2 L -11 -2 Z" },
    panic_expert: { eyes: { y: -2, scale: 1.4, pupilSize: 0.15 }, mouth: { d: "M 42 54 L 58 54 L 58 62 L 42 62 Z", strokeWidth: 2 }, lids: { d1: "M 20 30 Q 30 45 40 30", d2: "M 60 30 Q 70 45 80 30", opacity: 0 }, color: "#e11d48", scleroticaClip: CIRCLE_EYE }
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
        stressed: { x: [-1.5, 1.5, -1.5, 1.5, 0], transition: { duration: 0.08, repeat: Infinity } },
        panic_expert: { x: [-2, 2, -2, 2, 0], y: [-1, 1, -1, 1, 0], transition: { duration: 0.05, repeat: Infinity } }
    }

    const currentAnimate = variants[emotion] || variants.happy

    return (
        <motion.div
            animate={currentAnimate}
            className={`relative w-16 h-16 sm:w-20 sm:h-20 transition-all duration-500`}
        >
            {(emotion === 'shocked' || emotion === 'wtf' || emotion === 'joy' || emotion === 'panic_expert') && (
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
                            animate={{ d: config.scleroticaClip || "M -10 0 A 10 10 0 1 1 10 0 A 10 10 0 1 1 -10 0" }}
                            transition={{ duration: 0.3 }}
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
                    <g transform="translate(30, 52)">
                        <g clipPath="url(#eyeClip)">
                            <circle r="12" fill="white" />
                            <motion.circle
                                animate={{
                                    x: lookOffset.x * 0.5,
                                    y: lookOffset.y * 0.5,
                                    r: 7 * (config.eyes.pupilSize || 1)
                                }}
                                fill="black"
                            />
                        </g>
                        <circle cx="2" cy="-2" r="1.5" fill="white" opacity="0.4" />
                    </g>

                    {/* Right Eye */}
                    <g transform="translate(70, 52)">
                        <g clipPath="url(#eyeClip)">
                            <circle r="12" fill="white" />
                            <motion.circle
                                animate={{
                                    x: lookOffset.x * 0.5,
                                    y: lookOffset.y * 0.5,
                                    r: 7 * (config.eyes.pupilSize || 1)
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

                {/* Mouth with special teeth logic for expert panic */}
                <g>
                    <motion.path
                        animate={{ d: config.mouth.d, strokeWidth: config.mouth.strokeWidth, stroke: "black" }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        fill={emotion === 'panic_expert' ? "white" : "none"} strokeLinecap="round"
                    />
                    {emotion === 'panic_expert' && (
                        <>
                            <line x1="46" y1="54" x2="46" y2="62" stroke="black" strokeWidth="1" />
                            <line x1="50" y1="54" x2="50" y2="62" stroke="black" strokeWidth="1" />
                            <line x1="54" y1="54" x2="54" y2="62" stroke="black" strokeWidth="1" />
                        </>
                    )}
                </g>
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
