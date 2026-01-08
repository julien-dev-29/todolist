import "./App.css";
import { Header } from "../components/Header/Header";
import { Drawer } from "../features/Drawer/Drawer";
import { Footer } from "../components/Footer/Footer";
import { Button } from "../components/Button/Button";
import { ProjectContainer } from "../features/Projects/ProjectContainer";
import { TodoForm } from "../components/TodoForm/TodoForm";
import { subscribe } from "../app/store";
export function renderApp() {
  const app = document.getElementById("app");
  const main = document.createElement("main");
  main.classList.add("main");
  app.append(Header());
  app.append(main);
  main.append(Drawer());
  subscribe((state) => {
    if (state.activeDisplay == null || state.activeDisplay == "project") {
      if (main.childNodes.length > 1) main.removeChild(main.lastElementChild);
      main.append(ProjectContainer());
    }
    if (state.activeDisplay == "todoForm") {
      if (main.childNodes.length > 1) main.removeChild(main.lastElementChild);
      main.append(TodoForm());
    }
  });
  app.append(Button());
  app.append(Footer());
}
