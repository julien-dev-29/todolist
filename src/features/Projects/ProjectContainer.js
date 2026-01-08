import { subscribe } from "../../app/store";
import { renderProject } from "./Projects";

export function ProjectContainer() {
  const container = document.createElement("section");
  container.classList.add("projects");

  subscribe((state) => {
    container.innerHTML = "";
    if (!state.activeProjectId) return;
    const project = state.projects.find((p) => p.id === state.activeProjectId);
    if (project) {
      container.append(renderProject(project));
    }
  });
  return container;
}
