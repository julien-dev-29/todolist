import { Header } from "./components/header/Header";
import { BottomNav } from "./components/bottom-nav/BottomNav";
export function App(/**  @type HTMLDivElement */ rootElement) {
  rootElement.append(Header());
  rootElement.append(BottomNav());
}
