import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EMOTIONS = {
    friendly: {
        eyes: { y: 0, scale: 1 },
        mouth: { scaleX: 1, y: 0, d: "M 40 65 Q 50 75 60 65" },
        color: "#f43f5e" // rose-500
    },
    joy: {
        eyes: { y: -5, scale: 1.2 },
        mouth: { scaleX: 1.5, y: 2, d: "M 35 65 Q 50 85 65 65" },
        color: "#fb7185" // rose-400
    },
    watching: {
        eyes: { y: 0, scale: 1.1 },
        mouth: { scaleX: 0.5, y: 2, d: "M 45 68 L 55 68" },
        color: "#f43f5e"
    },
    stress: {
        eyes: { y: 2, scale: 0.9 },
        mouth: { scaleX: 0.8, y: 0, d: "M 42 70 Q 50 60 58 70" },
        color: "#e11d48" // rose-600
    },
    angry: {
        eyes: { y: 3, rotate: 15 },
        mouth: { scaleX: 1.2, y: 0, d: "M 40 75 Q 50 65 60 75" },
        color: "#be123c" // rose-700
    },
    upset: {
        eyes: { y: 5, scale: 0.8 },
        mouth: { scaleX: 1, y: 2, d: "M 40 75 Q 50 65 60 75" },
        color: "#9f1239" // rose-800
    },
    gusto: {
        eyes: { y: -2, scale: 1.1 },
        mouth: { scaleX: 1.2, y: 2, d: "M 38 65 L 62 65" },
        color: "#f43f5e"
    }
}

export default function Mascot({ emotion = 'friendly' }) {
    const config = EMOTIONS[emotion] || EMOTIONS.friendly

    const variants = {
        friendly: {
            y: [0, -8, 0],
            scale: [1, 1.02, 1],
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        },
        joy: {
            y: [0, -25, 0],
            scale: [1, 1.15, 0.95, 1],
            transition: { duration: 0.4, repeat: 2, ease: "easeOut" }
        },
        stress: {
            x: [-2, 2, -2, 2, 0],
            y: [0, -2, 0],
            transition: { duration: 0.1, repeat: Infinity }
        },
        angry: {
            rotate: [-5, 5, -5, 5, 0],
            scale: [1, 1.1, 1],
            transition: { duration: 0.2, repeat: 3 }
        },
        watching: {
            y: [0, -4, 0],
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
    }

    const currentAnimate = variants[emotion] || variants.friendly

    return (
        <motion.div
            animate={currentAnimate}
            className="relative w-24 h-24 sm:w-32 sm:h-32 drop-shadow-2xl"
        >
            <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Body Shape (Flame-like) */}
                <motion.path
                    animate={{ fill: config.color }}
                    transition={{ duration: 0.5 }}
                    d="M 20 80 
             Q 10 80 10 70 
             L 10 40 
             Q 10 20 30 30 
             L 50 10 
             L 70 30 
             Q 90 20 90 40 
             L 90 70 
             Q 90 80 80 80 
             Z"
                    fill={config.color}
                />

                {/* Eyes */}
                <motion.g
                    animate={config.eyes}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    <circle cx="35" cy="50" r="6" fill="black" />
                    <circle cx="65" cy="50" r="6" fill="black" />
                    {/* Eye shines */}
                    <circle cx="37" cy="48" r="2" fill="white" opacity="0.4" />
                    <circle cx="67" cy="48" r="2" fill="white" opacity="0.4" />
                </motion.g>

                {/* Mouth */}
                <motion.path
                    initial={false}
                    animate={{
                        d: config.mouth.d,
                        scaleX: config.mouth.scaleX,
                        y: config.mouth.y,
                        stroke: "black"
                    }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                />
            </svg>

            {/* Glow Effect */}
            <motion.div
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full blur-2xl -z-10"
                style={{ backgroundColor: config.color }}
            />
        </motion.div>
    )
}
