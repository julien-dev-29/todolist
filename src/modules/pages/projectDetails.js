import { render } from "../../index";
import { createTrashIcon } from "../../utils/dom";
import { createTodoForm } from "../components/todo/todoForm";
import { createKanbanBoard } from "../components/kanban";

export function renderProjectDetails(projects, projectId) {
  const project = projects.find((p) => p.id === projectId);
  const $container = document.querySelector("#app");

  const $header = document.createElement("div");
  $header.className = "flex flex-wrap items-center justify-between gap-4 mb-6";

  const $backButton = document.createElement("button");
  $backButton.className = "btn btn-success";
  $backButton.textContent = "← Back";
  $backButton.onclick = () => {
    render("home");
  };

  const $actions = document.createElement("div");
  $actions.className = "action-buttons";

  const $editBtn = document.createElement("button");
  $editBtn.className = "btn btn-primary";
  $editBtn.textContent = "Edit";
  $editBtn.onclick = () => {
    render("project-edit", projectId);
  };

  const $deleteBtn = document.createElement("button");
  $deleteBtn.className = "btn btn-error btn-circle btn-sm";
  $deleteBtn.setAttribute("aria-label", "Delete project");
  $deleteBtn.appendChild(createTrashIcon(18));
  $deleteBtn.onclick = (e) => {
    e.preventDefault();
    if (
      confirm(
        `Are you sure you want to delete "${project.name}"? This action cannot be undone.`,
      )
    ) {
      const index = projects.findIndex((p) => p.id === projectId);
      if (index > -1) {
        projects.splice(index, 1);
      }
      render("home");
    }
  };

  $actions.append($editBtn, $deleteBtn);
  $header.append($backButton, $actions);

  const $projectName = document.createElement("h2");
  $projectName.className = "text-3xl font-bold text-base-content mb-4";
  $projectName.textContent = project.name;

  $container.replaceChildren();
  $container.append($header, $projectName, createTodoForm(project));

  if (project.todos.length > 0) {
    $container.append(createKanbanBoard(project, projectId));
  } else {
    const $emptyMsg = document.createElement("div");
    $emptyMsg.className = "alert alert-info mt-6";
    $emptyMsg.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>No todos yet. Add one above!</span>
    `;
    $container.append($emptyMsg);
  }
}
