import "./Drawer.css";
import { setState, subscribe } from "../../app/store";
import { toggleDrawer } from "./action";

export function Drawer() {
  const drawer = document.createElement("nav");
  drawer.classList.add("drawer");
  const title = document.createElement("h3");
  title.textContent = "Projets";
  const list = document.createElement("ul");
  drawer.append(title, list);

  subscribe((state) => {
    list.innerHTML = state.projects
      .map(
        (project) => `
              <li>
                <span data-project-id=${project.id}>${project.title}</span>
              </li>
            `,
      )
      .join("");
    drawer.querySelectorAll("span[data-project-id]").forEach((link) => {
      link.onclick = () => {
        toggleDrawer();
        setState({ 
          activeProjectId: link.dataset.projectId ,
          activeDisplay: "project"
        });
      };
    });
    drawer.classList.toggle("open", state.drawerOpen)
  });
  return drawer;
}
