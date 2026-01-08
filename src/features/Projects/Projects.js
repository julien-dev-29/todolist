import { subscribe } from "../../app/store";
import "./Projects.css";
import { deleteTodo } from "./actions";

export function renderProject(project) {
  const projectElement = document.createElement("div");
  const projectName = document.createElement("h3");
  projectElement.classList.add("project");
  projectName.textContent = project.title;
  projectElement.append(projectName);
  projectElement.append(renderTodos());
  return projectElement;
}

function renderTodos() {
  const todosElmt = document.createElement("ul");
  todosElmt.classList.add("todos");
  subscribe((state) => {
    const project = state.projects.find((p) => p.id == state.activeProjectId);
    project.todos.map((t) => {
      const todoElmt = document.createElement("li");
      todoElmt.classList.add("todo");
      const checkbox = document.createElement("input");
      const text = document.createElement("span");
      const deleteButton = document.createElement("button");
      deleteButton.dataset.todoId = t.id;
      const deleteIcon = document.createElement("div");
      deleteIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`;
      deleteButton.append(deleteIcon);
      deleteButton.addEventListener("click", (e) => {
        e.preventDefault();
        deleteTodo(
          state.activeProjectId,
          e.target.parentElement.parentElement.dataset.todoId,
        );
      });
      text.textContent = t.title;
      checkbox.type = "checkbox";
      todoElmt.append(checkbox);
      todoElmt.append(text);
      todoElmt.append(deleteButton);
      todosElmt.append(todoElmt);
    });
  });
  return todosElmt;
}
