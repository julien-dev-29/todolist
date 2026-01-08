import { initStore, setState } from "./store";
import { renderApp } from "../pages/App";

export function initApp() {
  initStore();
  renderApp();
  setState({});
}
