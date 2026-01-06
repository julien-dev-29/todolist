import { Header } from "./components/header/Header";
import { Main } from "./components/main/Main";
import { BottomNav } from "./components/bottom-nav/BottomNav";
export function App(/**  @type HTMLDivElement */ rootElement) {
  rootElement.append(Header());
  rootElement.append(Main());
  rootElement.append(BottomNav());
}
