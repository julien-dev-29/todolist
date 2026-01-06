import { router } from "./router"
import { initStore } from "./store"

export function initApp() {
  initStore()
  router()
}
