import { useEffect, useRef, useState } from 'react'
import { useInView } from '../hooks/useInView.js'
import { prefersReducedMotion } from '../lib/signup.js'

// ---------------------------------------------------------------------------
// Mini-Visuals (nur CSS/SVG). "active" startet die Animation einmalig.
// ---------------------------------------------------------------------------
const SCORE = 84
const RING_R = 26
const RING_C = 2 * Math.PI * RING_R

function ScoreVisual({ active }) {
  const [value, setValue] = useState(() => (prefersReducedMotion() ? SCORE : 0))

  useEffect(() => {
    if (!active || prefersReducedMotion()) return undefined
    const duration = 1200
    let start = null
    let raf
    const tick = (t) => {
      if (start === null) start = t
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(eased * SCORE))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active])

  return (
    <figure className="mini mini--score">
      <svg className="score-ring" viewBox="0 0 64 64" role="img" aria-label={`Beispiel-Score ${SCORE} von 100`}>
        <circle className="score-ring__track" cx="32" cy="32" r={RING_R} />
        <circle
          className="score-ring__value"
          cx="32"
          cy="32"
          r={RING_R}
          strokeDasharray={RING_C}
          strokeDashoffset={RING_C * (1 - value / 100)}
        />
        <text x="32" y="32" className="score-ring__text" dominantBaseline="central" textAnchor="middle">
          {value}
        </text>
      </svg>
      <figcaption className="mini__caption">Beispiel</figcaption>
    </figure>
  )
}

function BarsVisual() {
  return (
    <div className="mini mini--bars" aria-hidden="true">
      <span className="mini-bar" style={{ '--w': '82%', '--d': '0ms' }} />
      <span className="mini-bar" style={{ '--w': '58%', '--d': '180ms' }} />
      <span className="mini-bar" style={{ '--w': '71%', '--d': '360ms' }} />
    </div>
  )
}

function TypingVisual() {
  return (
    <div className="mini mini--typing" aria-hidden="true">
      <span className="mini-line" style={{ '--w': '92%', '--d': '0ms' }} />
      <span className="mini-line" style={{ '--w': '78%', '--d': '450ms' }} />
      <span className="mini-line" style={{ '--w': '54%', '--d': '900ms' }} />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Stationen
// ---------------------------------------------------------------------------
const STATIONS = [
  {
    label: 'DEIN PROFIL',
    title: 'Du erzählst uns einmal, wer du bist.',
    text: 'Lebenslauf hochladen, fertig. VEGUR nutzt nur, was wirklich passiert ist. Nichts wird erfunden.',
  },
  {
    label: 'SCHRITT 1 · STELLENCHECK',
    title: 'Passt die Stelle überhaupt zu dir?',
    text: 'Anzeige einfügen, Passungs-Score bekommen. Nachvollziehbar in fünf Kriterien, bevor du Zeit investierst.',
    Visual: ScoreVisual,
  },
  {
    label: 'SCHRITT 2 · LEBENSLAUF',
    title: 'Dein Lebenslauf, zugeschnitten auf die Stelle.',
    text: 'VEGUR zeigt dir, was fehlt, und formuliert es passend zur Anzeige.',
    Visual: BarsVisual,
  },
  {
    label: 'SCHRITT 3 · ANSCHREIBEN',
    title: 'Dein Anschreiben. In Minuten statt Stunden.',
    text: 'Aus deinen echten Erfahrungen, ohne Floskeln. Alle Bewerbungen mit Status an einem Ort.',
    Visual: TypingVisual,
  },
]

function Station({ station, dotRef }) {
  const [ref, visible] = useInView({ threshold: 0.25 })
  const { Visual } = station
  return (
    <li className="station">
      <span className="station__dot" ref={dotRef} aria-hidden="true" />
      <article ref={ref} className={`station__card reveal reveal--right${visible ? ' is-visible' : ''}`}>
        <span className="eyebrow">{station.label}</span>
        <h3 className="station__title">{station.title}</h3>
        <p className="station__text">{station.text}</p>
        {Visual && (
          <div className={`station__visual${visible ? ' is-active' : ''}`}>
            <Visual active={visible} />
          </div>
        )}
      </article>
    </li>
  )
}

// Die blaue Linie zeichnet sich mit dem Scrollen; jeder Punkt leuchtet
// grün auf, sobald die Linie ihn erreicht. Direkt am DOM statt über
// React-State, damit es auch auf schwächeren Handys flüssig bleibt.
export default function HowItWorks() {
  const listRef = useRef(null)
  const fillRef = useRef(null)
  const dotRefs = useRef([])

  useEffect(() => {
    const list = listRef.current
    const fill = fillRef.current
    if (!list || !fill) return undefined

    function render(progress) {
      fill.style.transform = `scaleY(${progress})`
      const listTop = list.getBoundingClientRect().top
      const drawn = progress * list.offsetHeight
      dotRefs.current.forEach((dot) => {
        if (!dot) return
        const r = dot.getBoundingClientRect()
        const center = r.top + r.height / 2 - listTop
        dot.classList.toggle('is-lit', drawn >= center - 1)
      })
    }

    if (prefersReducedMotion()) {
      render(1)
      return undefined
    }

    let raf = null
    function update() {
      raf = null
      const rect = list.getBoundingClientRect()
      // Die Linie folgt einem Punkt bei ~65 % der Bildschirmhöhe.
      const progress = (window.innerHeight * 0.65 - rect.top) / rect.height
      render(Math.min(1, Math.max(0, progress)))
    }
    function onScroll() {
      if (raf === null) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="section how" aria-labelledby="how-title">
      <div className="container container--how">
        <h2 id="how-title" className="section__kicker">
          So funktioniert's
        </h2>
        <div className="timeline" ref={listRef}>
          <span className="timeline__track" aria-hidden="true" />
          <span className="timeline__fill" ref={fillRef} aria-hidden="true" />
          <ol className="timeline__list">
            {STATIONS.map((station, i) => (
              <Station
                key={station.label}
                station={station}
                dotRef={(el) => {
                  dotRefs.current[i] = el
                }}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
