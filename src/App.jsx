import HowItWorks from './components/HowItWorks.jsx'
import StickyCta from './components/StickyCta.jsx'
import { Faq, Footer, Hero, Offer, Problem, Trust } from './components/Sections.jsx'

export default function App() {
  return (
    <>
      <Hero />
      <main>
        <Problem />
        <HowItWorks />
        <Trust />
        <Offer />
        <Faq />
      </main>
      <Footer />
      <StickyCta />
    </>
  )
}
