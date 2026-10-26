import { useEffect, useState } from 'react'
import { prefersReducedMotion, useSignedUp } from '../lib/signup.js'

// Schwebende Anmelde-Leiste. Sichtbar, sobald das Hero-Formular nach oben
// aus dem Bild gescrollt ist, und wieder weg, sobald das Formular im
// Angebotsblock sichtbar ist. Ausgeblendet, solange ein Eingabefeld
// fokussiert ist (Tastatur offen), und dauerhaft nach einer Eintragung.
export default function StickyCta() {
  const signedUp = useSignedUp()
  const [heroPassed, setHeroPassed] = useState(false)
  const [offerVisible, setOfferVisible] = useState(false)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero-form')
    const offer = document.getElementById('offer-form')
    if (!hero || !offer || typeof IntersectionObserver === 'undefined') return undefined

    const heroObserver = new IntersectionObserver(([entry]) => {
      // Nur "vorbei", wenn das Formular oberhalb des Viewports liegt.
      setHeroPassed(!entry.isIntersecting && entry.boundingClientRect.top < 0)
    })
    const offerObserver = new IntersectionObserver(([entry]) => setOfferVisible(entry.isIntersecting))
    heroObserver.observe(hero)
    offerObserver.observe(offer)
    return () => {
      heroObserver.disconnect()
      offerObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    const isField = (el) => el?.matches?.('input, textarea, select, [contenteditable="true"]')
    const onFocusIn = (e) => setTyping(isField(e.target))
    const onFocusOut = () => {
      // Nach dem Fokuswechsel prüfen, ob noch ein Feld aktiv ist.
      setTimeout(() => setTyping(isField(document.activeElement)), 0)
    }
    document.addEventListener('focusin', onFocusIn)
    document.addEventListener('focusout', onFocusOut)
    return () => {
      document.removeEventListener('focusin', onFocusIn)
      document.removeEventListener('focusout', onFocusOut)
    }
  }, [])

  const visible = !signedUp && heroPassed && !offerVisible && !typing

  function goToOffer() {
    const input = document.getElementById('email-angebot')
    const target = document.getElementById('platz-sichern')
    // Fokus direkt im Klick setzen, damit mobile Browser die Tastatur öffnen.
    input?.focus({ preventScroll: true })
    target?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' })
  }

  if (signedUp) return null

  return (
    <div className={`sticky-cta${visible ? ' is-visible' : ''}`} aria-hidden={!visible}>
      <button type="button" className="btn btn--primary sticky-cta__btn" onClick={goToOffer} tabIndex={visible ? 0 : -1}>
        PLATZ SICHERN · 5 BEWERBUNGEN GRATIS
      </button>
    </div>
  )
}
