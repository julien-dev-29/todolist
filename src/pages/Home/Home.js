import "./Home.css"

export function Home() {
  const el = document.createElement("div")
  el.innerHTML = `
    <h1>Accueil</h1>
    <p>Vanilla JS + Webpack</p>
  `
  return el
}
