---
description: Local Development and Deployment Workflow
---

Para trabajar en Calculux localmente y luego subir tus cambios a Vercel, sigue estos pasos:

### 1. Preparación Local
Ejecuta el siguiente comando en tu terminal para iniciar el servidor de desarrollo:
```powershell
npm run dev
```
Esto abrirá un servidor local (normalmente en `http://localhost:5173`). Cualquier cambio que hagas en el código se verá reflejado **instantáneamente** en tu navegador gracias a la tecnología HMR (Hot Module Replacement).

### 2. Probar Animaciones
Hemos instalado `framer-motion`. Puedes usar componentes como `<motion.div>` para crear efectos geniales. Por ejemplo:
- **Pop de puntaje:** Cada vez que el puntaje cambia, el texto "salta".
- **Entrada suave:** Los problemas matemáticos aparecen con un efecto de rebote (Spring).

### 3. Subir a Producción (Vercel)
Cuando estés satisfecho con cómo se ve la app en tu computador, guarda tus avances y súbelos a GitHub:

```powershell
git add .
git commit -m "Mejora: Animaciones geniales con Framer Motion"
git push origin main
```

**Vercel detectará el nuevo commit automáticamente** y actualizará tu sitio web en menos de un minuto.

### Tips para Animaciones "Geniales":
1. **Framer Motion:** Usa `AnimatePresence` para animar elementos que desaparecen (como el problema anterior).
2. **Springs:** En lugar de duraciones fijas, usa `type: "spring"` para que los movimientos se sientan naturales y orgánicos.
3. **Micro-interacciones:** Añade `whileHover={{ scale: 1.05 }}` y `whileTap={{ scale: 0.95 }}` a tus botones.
