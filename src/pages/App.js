import './App.css'
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { Button } from '../components/Button/Button';
import { Drawer } from '../features/Drawer/Drawer';
export function renderApp() {
  const app = document.querySelector("#app");
  const main = document.createElement('div')
  const projects = document.createElement('div')
  projects.classList.add('projects')
  main.classList.add('main')
  app.append(Header());
  app.append(main)
  main.append(Drawer());
  main.append(projects)
  app.append(Button())
  app.append(Footer())
}
