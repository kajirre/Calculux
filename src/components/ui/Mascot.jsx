import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EMOTIONS = {
    friendly: { // "Happy"
        eyes: { y: 0, scale: 1 },
        mouth: { d: "M 38 65 Q 50 75 62 65", strokeWidth: 3 },
        lids: { d1: "M 30 40 Q 35 35 40 40", d2: "M 60 40 Q 65 35 70 40", opacity: 1 },
        color: "#0ea5e9"
    },
    joy: { // "Excited"
        eyes: { y: -2, scale: 1.1 },
        mouth: { d: "M 35 60 Q 50 85 65 60", strokeWidth: 4 },
        lids: { d1: "M 28 35 Q 35 28 42 35", d2: "M 58 35 Q 65 28 72 35", opacity: 1 },
        color: "#38bdf8"
    },
    watching: { // "Serious"
        eyes: { y: 0, scale: 1 },
        mouth: { d: "M 42 68 Q 50 68 58 68", strokeWidth: 3 },
        lids: { d1: "M 30 42 Q 35 42 40 42", d2: "M 60 42 Q 65 42 70 42", opacity: 1 },
        color: "#0284c7"
    },
    stress: { // "Nervous"
        eyes: { y: 1, scale: 0.9 },
        mouth: { d: "M 42 72 Q 50 62 58 72", strokeWidth: 3 },
        lids: { d1: "M 32 42 Q 35 48 38 42", d2: "M 62 42 Q 65 48 68 42", opacity: 1 },
        color: "#0369a1"
    },
    angry: { // "Irritated"
        eyes: { y: 2, scale: 1.1 },
        mouth: { d: "M 38 72 Q 50 65 62 72", strokeWidth: 3 },
        lids: { d1: "M 30 42 Q 35 50 40 50", d2: "M 60 50 Q 65 50 70 42", opacity: 1 },
        color: "#1d4ed8"
    },
    gusto: { // "Confident"
        eyes: { y: 0, scale: 1 },
        mouth: { d: "M 38 65 Q 50 75 62 60", strokeWidth: 4 },
        lids: { d1: "M 30 38 Q 35 32 40 40", d2: "M 60 42 Q 65 42 70 42", opacity: 1 },
        color: "#0ea5e9"
    }
}

export default function Mascot({ emotion = 'friendly', isWaving = false }) {
    const config = EMOTIONS[emotion] || EMOTIONS.friendly

    const variants = {
        friendly: {
            y: [0, -8, 0],
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        },
        joy: {
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            transition: { duration: 0.4, repeat: 1, ease: "easeOut" }
        },
        stress: {
            x: [-1, 1, -1, 1, 0],
            transition: { duration: 0.1, repeat: Infinity }
        },
        angry: {
            rotate: [-2, 2, -2, 2, 0],
            transition: { duration: 0.2, repeat: 2 }
        }
    }

    const currentAnimate = variants[emotion] || variants.friendly

    return (
        <motion.div
            animate={currentAnimate}
            className="relative w-16 h-16 sm:w-20 sm:h-20 drop-shadow-xl"
        >
            <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Arm / Hand */}
                <motion.path
                    initial={{ rotate: 0 }}
                    animate={isWaving ? { rotate: [0, -40, 0, -40, 0] } : { rotate: 0 }}
                    transition={{ duration: 0.8, repeat: isWaving ? 2 : 0, ease: "easeInOut" }}
                    d="M 85 70 L 95 45"
                    stroke={config.color}
                    strokeWidth="10"
                    strokeLinecap="round"
                    style={{ originX: "85%", originY: "70%", opacity: isWaving ? 1 : 0 }}
                />

                {/* Body Shape */}
                <motion.path
                    animate={{ fill: config.color }}
                    transition={{ duration: 0.3 }}
                    d="M 20 80 Q 10 80 10 70 L 10 40 Q 10 20 30 30 L 50 10 L 70 30 Q 90 20 90 40 L 90 70 Q 90 80 80 80 Z"
                />

                {/* Lids / Brows */}
                <motion.g animate={{ opacity: config.lids.opacity }}>
                    <motion.path
                        animate={{ d: config.lids.d1 }}
                        stroke="black" strokeWidth="2.5" fill="none" strokeLinecap="round"
                    />
                    <motion.path
                        animate={{ d: config.lids.d2 }}
                        stroke="black" strokeWidth="2.5" fill="none" strokeLinecap="round"
                    />
                </motion.g>

                {/* Eyes */}
                <motion.g animate={config.eyes}>
                    <circle cx="35" cy="52" r="6" fill="black" />
                    <circle cx="65" cy="52" r="6" fill="black" />
                    <circle cx="37" cy="50" r="2" fill="white" opacity="0.5" />
                    <circle cx="67" cy="50" r="2" fill="white" opacity="0.5" />
                </motion.g>

                {/* Mouth */}
                <motion.path
                    animate={{
                        d: config.mouth.d,
                        strokeWidth: config.mouth.strokeWidth,
                        stroke: "black"
                    }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    fill="none"
                    strokeLinecap="round"
                />
            </svg>

            {/* Glow */}
            <motion.div
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-full blur-2xl -z-10"
                style={{ backgroundColor: config.color }}
            />
        </motion.div>
    )
}
