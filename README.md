# Mental Calc — MVP

Estructura propuesta:

```
src/
├── assets/          # Iconos y sonidos
├── components/      # Componentes visuales
│   ├── ui/          # Botones, Barra de progreso, Input, etc
│   ├── Game/        # Pantalla de juego, Temporizador, Feedback, SessionEnd
│   └── Layout/      # Contenedores principales
├── hooks/           # Lógica reutilizable
│   ├── useSpeech.js    # Web Speech API (reconocimiento de voz)
│   ├── useTimer.js     # Barra de 10 segundos
│   └── useStreak.js    # localStorage y racha
├── logic/           # JAVASCRIPT PURO (Sin React)
│   ├── mathEngine.js   # Generador de ejercicios (Nivel 1-6)
│   └── validators.js   # Validación de respuestas
├── context/         # Estado global
│   └── GameContext.jsx # Puntaje, racha, índice de ejercicio
├── App.jsx          # Orquestador principal
├── main.jsx
└── index.css
```

Cómo mantenerlo ordenado:
- **logic/** → funciones puras, sin dependencias de React. Fácil de testear y mover.
- **hooks/** → encapsulan efectos (timers, voz, localStorage).
- **components/** → UI reutilizable y pequeños (responsabilidad única).
- **context/** → estado global, evita prop drilling.

Quick start:

1. Install deps

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

Notas:
- La racha y la fecha del último éxito se guardan en `localStorage`.
- El reconocimiento de voz usa la Web Speech API (`es-ES`).
- Temporizador: 10 segundos por ejercicio; al agotarse falla automáticamente.
