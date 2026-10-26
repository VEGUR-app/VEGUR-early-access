import { useSyncExternalStore } from 'react'

// Gemeinsamer Eintragungs-Status für alle Formulare und die schwebende
// Leiste: Nach einer Eintragung zeigen beide Formular-Stellen den
// Erfolgszustand und die Leiste verschwindet - auch nach dem Neuladen.

export const FORM_ENDPOINT = 'https://formspree.io/f/mwvggwvz'
export const DATENSCHUTZ_URL = 'https://vegur.vercel.app/datenschutz'
export const IMPRESSUM_URL = 'https://vegur.vercel.app/impressum'

const STORAGE_KEY = 'vegur_early_access_eingetragen'

function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

let signedUp = readStored()
const listeners = new Set()

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useSignedUp() {
  return useSyncExternalStore(subscribe, () => signedUp, () => false)
}

export function markSignedUp() {
  signedUp = true
  try {
    localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // Ohne Speicher gilt der Erfolg nur bis zum Neuladen.
  }
  listeners.forEach((l) => l())
}

// Herkunft der Eintragung (z. B. ?quelle=instagram), einmal beim Laden
// gelesen. Ohne Parameter: "direkt".
export const QUELLE = (() => {
  try {
    const value = new URLSearchParams(window.location.search).get('quelle')?.trim()
    return value ? value.slice(0, 60) : 'direkt'
  } catch {
    return 'direkt'
  }
})()

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}
