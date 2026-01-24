import "./styles/main.css";
import { renderProjectsList } from "./modules/pages/projectsList";
import { renderProjectEdit } from "./modules/pages/projectEdit";
import { renderProjectDetails} from './modules/pages/projectDetails'

let projects = [];

window.addEventListener("beforeunload", () => {
  localStorage.setItem("projects", JSON.stringify(projects));
});

document.addEventListener("DOMContentLoaded", () => {
  const stored = localStorage.getItem("projects");
  projects = stored ? JSON.parse(stored) : [];
  render("home");
});

export function render(state, projectId) {
  switch (state) {
    case "home":
      renderProjectsList(projects);
      break;
    case "project-details":
      renderProjectDetails(projects, projectId);
      break;
    case "project-edit":
      renderProjectEdit(projects, projectId);
      break;
    default:
      break;
  }
}
