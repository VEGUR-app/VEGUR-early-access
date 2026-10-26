import Logo from './Logo.jsx'
import AmbientPaths from './AmbientPaths.jsx'
import EarlyAccessForm from './EarlyAccessForm.jsx'
import Reveal from './Reveal.jsx'
import { DATENSCHUTZ_URL, IMPRESSUM_URL } from '../lib/signup.js'

// ---------------------------------------------------------------------------
// 1. Hero
// ---------------------------------------------------------------------------
export function Hero() {
  return (
    <header className="hero">
      <AmbientPaths />
      <div className="hero__content">
        <Logo size="lg" />
        <h1 className="hero__headline">Wir ebnen deinen Karriereweg</h1>
        <p className="hero__subline">Du bringst die Erfahrung. VEGUR macht die Arbeit.</p>
        <p className="hero__small">Dein KI-Bewerbungs-Workspace für Ausbildung, Studium und Berufseinstieg.</p>
        <span className="badge">Für die ersten 100: 5 Bewerbungen gratis</span>
        <div className="hero__form" id="hero-form">
          <EarlyAccessForm id="email-hero" note="Kein Spam. Nur eine Mail, wenn es losgeht." />
        </div>
      </div>
      <div className="scroll-hint" aria-hidden="true">
        <span className="scroll-hint__line">
          <span className="scroll-hint__dot" />
        </span>
      </div>
    </header>
  )
}

// ---------------------------------------------------------------------------
// 2. Problem
// ---------------------------------------------------------------------------
export function Problem() {
  return (
    <section className="section problem">
      <Reveal className="container container--narrow">
        <h2 className="problem__title">Bewerben kostet dich Stunden.</h2>
        <p className="problem__text">
          Stelle prüfen, Lebenslauf anpassen, Anschreiben schreiben. Für jede einzelne Bewerbung.
        </p>
      </Reveal>
    </section>
  )
}

// ---------------------------------------------------------------------------
// 4. Vertrauen
// ---------------------------------------------------------------------------
function IconNoInvent() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h11M4 12h8M4 17h6" />
      <path d="M15.5 14.5l2 2 3.5-4" />
    </svg>
  )
}
function IconEu() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="4.5" width="16" height="6" rx="1.5" />
      <rect x="4" y="13.5" width="16" height="6" rx="1.5" />
      <path d="M7.5 7.5h.01M7.5 16.5h.01" />
    </svg>
  )
}
function IconNoSale() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
    </svg>
  )
}

const TRUST = [
  { text: 'Nichts wird erfunden', Icon: IconNoInvent },
  { text: 'Gespeichert auf Servern in der EU', Icon: IconEu },
  { text: 'Wir verkaufen keine Daten', Icon: IconNoSale },
]

export function Trust() {
  return (
    <section className="trust" aria-label="Vertrauen">
      <Reveal as="ul" className="trust__list container">
        {TRUST.map(({ text, Icon }) => (
          <li key={text} className="trust__item">
            <span className="trust__icon">
              <Icon />
            </span>
            {text}
          </li>
        ))}
      </Reveal>
    </section>
  )
}

// ---------------------------------------------------------------------------
// 5. Angebot
// ---------------------------------------------------------------------------
// Weg-Motiv als Aufzählungszeichen: kurze Linie mit grünem Punkt.
function PathBullet() {
  return (
    <svg className="path-bullet" viewBox="0 0 22 8" aria-hidden="true">
      <line x1="0" y1="4" x2="15" y2="4" />
      <circle cx="18" cy="4" r="3" />
    </svg>
  )
}

export function Offer() {
  return (
    <section className="section offer-section">
      <Reveal className="container container--offer">
        <div className="offer" id="platz-sichern">
          <span className="eyebrow">FÜR DIE ERSTEN 100</span>
          <h2 className="offer__title">Sicher dir deinen Platz.</h2>
          <ul className="offer__list">
            <li>
              <PathBullet />
              <span>5 Bewerbungen komplett gratis statt 2</span>
            </li>
            <li>
              <PathBullet />
              <span className="offer__price">
                <s className="offer__price-old" aria-label="statt 4,99 €">
                  4,99 €
                </s>
                <strong className="offer__price-new">2,99 €</strong>
                <span className="offer__price-note">im Monat, dauerhaft</span>
              </span>
            </li>
          </ul>
          <div className="offer__form" id="offer-form">
            <EarlyAccessForm
              id="email-angebot"
              note="Gilt für dein Konto, wenn du dich beim Start mit derselben E-Mail registrierst."
            />
          </div>
        </div>
      </Reveal>
    </section>
  )
}

// ---------------------------------------------------------------------------
// 6. FAQ
// ---------------------------------------------------------------------------
const FAQ = [
  {
    q: 'Was kostet VEGUR?',
    a: 'Du startest kostenlos mit 2 Bewerbungen. Danach 4,99 € im Monat für 15 Bewerbungen oder 12,99 € einmalig für 3 Monate unbegrenzt. Die ersten 100 auf der Warteliste bekommen 5 Bewerbungen gratis und zahlen dauerhaft 2,99 € statt 4,99 € im Monat.',
  },
  {
    q: 'Wann geht es los?',
    a: 'In den nächsten Wochen. Du bekommst eine Mail, sobald dein Zugang bereit ist.',
  },
  {
    q: 'Was passiert mit meiner E-Mail?',
    a: 'Wir nutzen sie nur, um dich über den Start von VEGUR zu informieren. Kein Newsletter, kein Weiterverkauf.',
  },
]

export function Faq() {
  return (
    <section className="section faq-section" aria-labelledby="faq-title">
      <Reveal className="container container--narrow">
        <h2 id="faq-title" className="sr-only">
          Häufige Fragen
        </h2>
        <div className="faq">
          {FAQ.map(({ q, a }) => (
            <details key={q} className="faq__item">
              <summary className="faq__q">
                {q}
                <svg className="faq__chevron" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <p className="faq__a">{a}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

// ---------------------------------------------------------------------------
// 7. Footer
// ---------------------------------------------------------------------------
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <Logo size="sm" />
        <p className="footer__social">
          @vegur.app ·{' '}
          <a href="https://instagram.com/vegur.app" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>{' '}
          ·{' '}
          <a href="https://tiktok.com/@vegur.app" target="_blank" rel="noopener noreferrer">
            TikTok
          </a>
        </p>
        <nav className="footer__links" aria-label="Rechtliches">
          <a href={IMPRESSUM_URL} target="_blank" rel="noopener noreferrer">
            Impressum
          </a>
          <a href={DATENSCHUTZ_URL} target="_blank" rel="noopener noreferrer">
            Datenschutz
          </a>
        </nav>
      </div>
    </footer>
  )
}
