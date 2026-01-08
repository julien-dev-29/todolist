import "./Drawer.css";
import { getState, subscribe } from "../../app/store";
import { renderProject } from "../Projects/Projects";
import { toggleDrawer } from "./action";

export function Drawer() {
  const drawer = document.createElement("nav");
  drawer.classList.add("drawer");
  subscribe((state) => {
    drawer.innerHTML = `
    <h3>Projets</h3>
          <ul>
            ${state.projects
              .map(
                (project) => `
              <li>
                <span data-project-id=${project.id}>${project.title}</span>
              </li>
            `,
              )
              .join("")}
          </ul>
        `;
    drawer.querySelectorAll("span[data-project-id]").forEach((link) => {
      link.onclick = () => {
        toggleDrawer()
        const main = document.querySelector(".projects");
        main.replaceChildren()
        console.log(link.dataset.projectId);
        main.append(renderProject(getState()));
      };
    });
    drawer.classList.toggle("open", state.drawerOpen);
  });
  return drawer;
}
