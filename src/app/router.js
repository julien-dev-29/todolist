import { Home } from "../pages/Home/Home"
import { About } from "../pages/About/About"

const routes = {
  "/": Home,
  "/about": About
}

export function router() {
  const app = document.getElementById("app")
  const Page = routes[location.pathname] || Home

  app.innerHTML = ""
  app.append(Page())
}

window.addEventListener("popstate", router)
