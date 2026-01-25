import "./styles/main.css";
import { renderAllTodos } from "./modules/pages/allTodos";
import { renderProjectView } from "./modules/pages/projectView";
import { renderProjectEdit } from "./modules/pages/projectEdit";
import { renderTodoDetails } from "./modules/components/todo/todo-details/todoDetails";

let projects = [];

window.addEventListener("beforeunload", () => {
  localStorage.setItem("projects", JSON.stringify(projects));
});

document.addEventListener("DOMContentLoaded", () => {
  const stored = localStorage.getItem("projects");
  projects = stored ? JSON.parse(stored) : [];
  render("all-todos");
});

export function render(state, projectId, todoId) {
  switch (state) {
    case "all-todos":
      renderAllTodos(projects);
      break;
    case "project":
      renderProjectView(projects, projectId);
      break;
    case "project-edit":
      renderProjectEdit(projects, projectId);
      break;
    case "todo-details":
      renderTodoDetails(projects, projectId, todoId);
      break;
    default:
      renderAllTodos(projects);
      break;
  }
}
