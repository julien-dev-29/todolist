import { render } from "../../../..";
import createDate from "./todo-components/createDate";

export function renderTodoDetails(projects, projectId, todoId) {
  const $container = document.querySelector("#app");
  $container.replaceChildren();

  // Find the project and todo
  const project = projects.find((p) => p.id === projectId);
  if (!project) {
    render("all-todos");
    return;
  }

  const todo = project.todos.find((t) => t.id === todoId);
  if (!todo) {
    render("project", projectId);
    return;
  }

  // Create main container
  const $content = document.createElement("div");
  $content.className = "min-h-screen bg-base-100 p-6";

  // Header with back button
  const $header = document.createElement("div");
  $header.className = "mb-6 flex items-center gap-4";

  const $backBtn = document.createElement("button");
  $backBtn.onclick = () => {
    render("project", projectId);
  };
  $backBtn.className = "btn btn-primary btn-sm";
  $backBtn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg> Back to Project';
  $header.append($backBtn);

  $content.append($header);

  // Main card
  const $card = document.createElement("div");
  $card.className = "card bg-base-200 shadow-xl max-w-3xl";

  const $cardBody = document.createElement("div");
  $cardBody.className = "card-body";

  // Title section
  const $titleSection = document.createElement("div");
  $titleSection.className = "mb-6";

  const $title = document.createElement("h1");
  $title.className = "card-title text-3xl";
  $title.textContent = todo.title;
  $titleSection.append($title);

  // Status badge
  const $statusBadge = document.createElement("div");
  $statusBadge.className = "mt-2";
  const statusLabel = getStatusLabel(todo.status || "todo");
  const statusColor = getStatusColor(todo.status || "todo");
  $statusBadge.innerHTML = `<div class="badge ${statusColor}">${statusLabel}</div>`;
  $titleSection.append($statusBadge);

  $cardBody.append($titleSection);

  // Meta info row
  const $metaRow = document.createElement("div");
  $metaRow.className =
    "grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-base-300";

  // Created date
  $metaRow.append(createDate(todo));

  // Priority
  const $priorityCol = document.createElement("div");
  const priority = todo.priority || "medium";
  $priorityCol.innerHTML = `
    <div class="text-xs text-base-content/60 uppercase">Priority</div>
    <div class="text-sm font-semibold capitalize">${priority}</div>
  `;
  $metaRow.append($priorityCol);

  // Tags
  const $tagsCol = document.createElement("div");
  const tags = todo.tags || [];
  $tagsCol.innerHTML = `
    <div class="text-xs text-base-content/60 uppercase">Tags</div>
    <div class="flex gap-1 flex-wrap">${
      tags.length > 0
        ? tags
            .map((tag) => `<span class="badge badge-sm">${tag}</span>`)
            .join("")
        : '<span class="text-sm opacity-60">None</span>'
    }</div>
  `;
  $metaRow.append($tagsCol);

  $cardBody.append($metaRow);

  // Description section
  const $descSection = document.createElement("div");
  $descSection.className = "mb-6";
  $descSection.innerHTML = `
    <h3 class="font-bold text-lg mb-2">Description</h3>
    <div class="p-4 bg-base-100 rounded-lg min-h-[100px] whitespace-pre-wrap">${
      todo.description ||
      "<span class='opacity-60'>No description provided</span>"
    }</div>
  `;
  $cardBody.append($descSection);

  // Comments section
  const $commentsSection = document.createElement("div");
  $commentsSection.className = "mb-6";
  $commentsSection.innerHTML = `
    <h3 class="font-bold text-lg mb-2">Comments</h3>
    <div class="p-4 bg-base-100 rounded-lg">
      <p class="opacity-60 text-sm">No comments yet</p>
    </div>
  `;
  $cardBody.append($commentsSection);

  // Action buttons
  const $actions = document.createElement("div");
  $actions.className =
    "card-actions justify-end gap-2 pt-6 border-t border-base-300";

  const $statusSelect = document.createElement("select");
  $statusSelect.className = "select select-bordered select-sm";
  $statusSelect.value = todo.status || "todo";
  $statusSelect.innerHTML = `
    <option value="todo">To Do</option>
    <option value="in_progress">In Progress</option>
    <option value="done">Done</option>
  `;
  $statusSelect.onchange = (e) => {
    todo.status = e.target.value;
    render("todo-details", projectId, todoId);
  };
  $actions.append($statusSelect);

  const $editBtn = document.createElement("button");
  $editBtn.className = "btn btn-primary btn-sm";
  $editBtn.textContent = "Edit";
  $editBtn.onclick = () => {
    renderEditMode(projects, projectId, todoId);
  };
  $actions.append($editBtn);

  const $deleteBtn = document.createElement("button");
  $deleteBtn.className = "btn btn-error btn-sm";
  $deleteBtn.textContent = "Delete";
  $deleteBtn.onclick = (e) => {
    e.preventDefault();
    if (
      confirm(
        `Are you sure you want to delete "${todo.title}"? This action cannot be undone.`,
      )
    ) {
      const index = project.todos.findIndex((t) => t.id === todoId);
      if (index > -1) {
        project.todos.splice(index, 1);
      }
      render("project", projectId);
    }
  };
  $actions.append($deleteBtn);

  $cardBody.append($actions);
  $card.append($cardBody);
  $content.append($card);

  $container.append($content);
}

function renderEditMode(projects, projectId, todoId) {
  const $container = document.querySelector("#app");
  const project = projects.find((p) => p.id === projectId);
  const todo = project.todos.find((t) => t.id === todoId);

  $container.replaceChildren();

  const $content = document.createElement("div");
  $content.className = "min-h-screen bg-base-100 p-6";

  // Header
  const $header = document.createElement("div");
  $header.className = "mb-6";
  $header.innerHTML = "<h2 class='text-2xl font-bold'>Edit Todo</h2>";
  $content.append($header);

  // Form
  const $form = document.createElement("form");
  $form.className = "card bg-base-200 shadow-xl max-w-3xl";

  const $formBody = document.createElement("div");
  $formBody.className = "card-body";

  // Title input
  const $titleGroup = document.createElement("div");
  $titleGroup.className = "form-control mb-4";
  $titleGroup.innerHTML = `
    <label class="label">
      <span class="label-text font-semibold">Title</span>
    </label>
    <input type="text" class="input input-bordered" id="titleInput" value="${escapeHtml(todo.title)}" required />
  `;
  $formBody.append($titleGroup);

  // Description input
  const $descGroup = document.createElement("div");
  $descGroup.className = "form-control mb-4";
  $descGroup.innerHTML = `
    <label class="label">
      <span class="label-text font-semibold">Description</span>
    </label>
    <textarea class="textarea textarea-bordered" id="descInput" rows="5">${escapeHtml(
      todo.description || "",
    )}</textarea>
  `;
  $formBody.append($descGroup);

  // Status dropdown
  const $statusGroup = document.createElement("div");
  $statusGroup.className = "form-control mb-4";
  $statusGroup.innerHTML = `
    <label class="label">
      <span class="label-text font-semibold">Status</span>
    </label>
    <select class="select select-bordered" id="statusSelect">
      <option value="todo">To Do</option>
      <option value="in_progress">In Progress</option>
      <option value="done">Done</option>
    </select>
  `;
  $statusGroup.querySelector("#statusSelect").value = todo.status || "todo";
  $formBody.append($statusGroup);

  // Priority dropdown
  const $priorityGroup = document.createElement("div");
  $priorityGroup.className = "form-control mb-4";
  $priorityGroup.innerHTML = `
    <label class="label">
      <span class="label-text font-semibold">Priority</span>
    </label>
    <select class="select select-bordered" id="prioritySelect">
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  `;
  $priorityGroup.querySelector("#prioritySelect").value =
    todo.priority || "medium";
  $formBody.append($priorityGroup);

  // Form actions
  const $formActions = document.createElement("div");
  $formActions.className =
    "card-actions justify-end gap-2 pt-6 border-t border-base-300";

  const $cancelBtn = document.createElement("button");
  $cancelBtn.type = "button";
  $cancelBtn.className = "btn btn-ghost btn-sm";
  $cancelBtn.textContent = "Cancel";
  $cancelBtn.onclick = () => {
    render("todo-details", projectId, todoId);
  };
  $formActions.append($cancelBtn);

  const $saveBtn = document.createElement("button");
  $saveBtn.type = "submit";
  $saveBtn.className = "btn btn-primary btn-sm";
  $saveBtn.textContent = "Save Changes";
  $formActions.append($saveBtn);

  $formBody.append($formActions);
  $form.append($formBody);

  $form.onsubmit = (e) => {
    e.preventDefault();
    const titleInput = $form.querySelector("#titleInput");
    const descInput = $form.querySelector("#descInput");
    const statusSelect = $form.querySelector("#statusSelect");
    const prioritySelect = $form.querySelector("#prioritySelect");

    if (titleInput.value.trim()) {
      todo.title = titleInput.value.trim();
      todo.description = descInput.value.trim();
      todo.status = statusSelect.value;
      todo.priority = prioritySelect.value;

      render("todo-details", projectId, todoId);
    }
  };

  $content.append($form);
  $container.append($content);
}

function getStatusLabel(status) {
  const labels = {
    todo: "To Do",
    in_progress: "In Progress",
    done: "Done",
  };
  return labels[status] || status;
}

function getStatusColor(status) {
  const colors = {
    todo: "badge-warning",
    in_progress: "badge-info",
    done: "badge-success",
  };
  return colors[status] || "badge-neutral";
}

function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return (text || "").replace(/[&<>"']/g, (m) => map[m]);
}
