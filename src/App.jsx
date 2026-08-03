import Logo from './components/Logo.jsx'
import AmbientPaths from './components/AmbientPaths.jsx'
import EarlyAccessForm from './components/EarlyAccessForm.jsx'

export default function App() {
  return (
    <div className="landing">
      <AmbientPaths />
      <div className="landing__content">
        <h1 className="landing__headline">
          Wir ebnen
          <br />
          deinen Karriereweg
        </h1>
        <div className="landing__logo">
          <Logo size="lg" />
        </div>
        <p className="landing__subline landing__subline--1">Dein persönlicher Bewerbungs-Workspace</p>
        <p className="landing__subline landing__subline--2">Bewirb dich smarter – nicht öfter</p>
        <p className="landing__subline landing__subline--3">Early Access bald verfügbar</p>
        <div className="landing__form">
          <EarlyAccessForm />
        </div>
      </div>
    </div>
  )
}
