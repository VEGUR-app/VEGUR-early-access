const PRIMARY = '79, 142, 247'
const ACCENT = '184, 255, 110'

// Jeder Eintrag ist ein kleiner "Weg": eine dünne, leicht schräge Linie mit
// einem Punkt am Ende. Sie driften langsam von links unten nach rechts oben
// über den Bildschirm – passend zur Logo-Metapher (Strich + Punkt = Fortschritt).
const PATHS = [
  { top: '10%', width: 180, rotate: -7, color: PRIMARY, opacity: 0.16, duration: 46, delay: -4 },
  { top: '24%', width: 130, rotate: -4, color: ACCENT, opacity: 0.12, duration: 38, delay: -20 },
  { top: '40%', width: 200, rotate: -9, color: PRIMARY, opacity: 0.14, duration: 52, delay: -30 },
  { top: '58%', width: 150, rotate: -5, color: PRIMARY, opacity: 0.1, duration: 44, delay: -10 },
  { top: '72%', width: 170, rotate: -8, color: ACCENT, opacity: 0.14, duration: 50, delay: -36 },
  { top: '86%', width: 140, rotate: -3, color: PRIMARY, opacity: 0.12, duration: 40, delay: -16 },
]

export default function AmbientPaths() {
  return (
    <div className="ambient-paths" aria-hidden="true">
      {PATHS.map((p, i) => (
        <span
          key={i}
          className="ambient-path"
          style={{
            top: p.top,
            width: `${p.width}px`,
            '--rotate': `${p.rotate}deg`,
            '--color': p.color,
            '--opacity': p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <span className="ambient-path__dot" />
        </span>
      ))}
    </div>
  )
}
