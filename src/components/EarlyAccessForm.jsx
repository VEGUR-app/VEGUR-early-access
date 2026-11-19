import { useRef, useState } from 'react'
import { DATENSCHUTZ_URL, FORM_ENDPOINT, markSignedUp, QUELLE, SRC, useSignedUp } from '../lib/signup.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// E-Mail-Eintragung über Formspree (Feld "email", dazu "quelle" und "src").
// Nach einer erfolgreichen Eintragung zeigen alle Formulare den Erfolg.
export default function EarlyAccessForm({ id, note }) {
  const signedUp = useSignedUp()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | error
  const [error, setError] = useState('')
  const sendingRef = useRef(false)
  const errorId = `${id}-fehler`

  async function handleSubmit(e) {
    e.preventDefault()
    if (sendingRef.current) return

    const value = email.trim()
    if (!EMAIL_RE.test(value)) {
      setStatus('error')
      setError('Bitte gib eine gültige E-Mail-Adresse ein.')
      return
    }

    sendingRef.current = true
    setStatus('loading')
    setError('')

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value, quelle: QUELLE, src: SRC }),
      })
      if (res.ok) {
        markSignedUp()
        return
      }
      setStatus('error')
      setError('Das hat gerade nicht geklappt. Bitte versuch es gleich noch einmal.')
    } catch {
      setStatus('error')
      setError('Keine Verbindung. Bitte prüf dein Internet und versuch es noch einmal.')
    } finally {
      sendingRef.current = false
    }
  }

  if (signedUp) {
    return (
      <div className="signup-success" role="status">
        <span className="signup-success__icon">
          <CheckIcon />
        </span>
        <p className="signup-success__text">Du bist dabei. Dein Platz ist gesichert.</p>
      </div>
    )
  }

  const loading = status === 'loading'
  const invalid = status === 'error' && Boolean(error)

  return (
    <div className="signup">
      <form className="signup__form" onSubmit={handleSubmit} noValidate>
        <input type="hidden" name="quelle" value={QUELLE} />
        <input type="hidden" name="src" value={SRC} />
        <label htmlFor={id} className="sr-only">
          E-Mail-Adresse
        </label>
        <input
          id={id}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck="false"
          enterKeyHint="send"
          placeholder="Deine E-Mail-Adresse"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'error') setStatus('idle')
          }}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? errorId : undefined}
          readOnly={loading}
        />
        <button type="submit" className="btn btn--primary" disabled={loading}>
          {loading ? (
            'Wird gesendet …'
          ) : (
            <>
              PLATZ SICHERN <ArrowIcon />
            </>
          )}
        </button>
      </form>
      {invalid && (
        <p id={errorId} className="signup__error" role="alert">
          {error}
        </p>
      )}
      {note && <p className="signup__note">{note}</p>}
      <p className="signup__consent">
        Mit der Eintragung stimmst du der Verarbeitung deiner E-Mail-Adresse gemäß{' '}
        <a href={DATENSCHUTZ_URL} target="_blank" rel="noopener noreferrer">
          Datenschutzerklärung
        </a>{' '}
        zu.
      </p>
    </div>
  )
}
