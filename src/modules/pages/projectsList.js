import { render } from "../..";

export function renderProjectsList(projects) {
  const $container = document.querySelector("#app");
  $container.replaceChildren();

  const $projectTitle = document.createElement("h2");
  $projectTitle.className = "text-3xl font-bold text-base-content mb-6";
  $projectTitle.textContent = "Projects";

  const $projectList = document.createElement("ul");
  $projectList.className = "projects-grid";

  projects.forEach((project, index) => {
    $projectList.append(
      createProject(project, () => {
        if (confirm(`Are you sure you want to delete "${project.name}"?`)) {
          projects.splice(index, 1);
          render("home");
        }
      }),
    );
  });

  $container.append($projectTitle, createProjectForm(projects), $projectList);
}

function createProject(project, onDelete) {
  const $listItem = document.createElement("li");
  $listItem.className = "project-card";
  $listItem.dataset.projectId = project.id;

  const $cardBody = document.createElement("div");
  $cardBody.className = "card-body";

  // Header with name and todo count
  const $header = document.createElement("div");
  $header.className = "card-header flex";

  const $projectName = document.createElement("span");
  $projectName.className = "project-name";
  $projectName.textContent = project.name;

  const $badge = document.createElement("span");
  $badge.className = "badge badge-success badge-lg";
  $badge.textContent = `${project.todos.length} ${project.todos.length === 1 ? "task" : "tasks"}`;

  $header.append($projectName, $badge);

  // Action column
  const $actionColumn = document.createElement("div");
  $actionColumn.className = "flex justify-start";

  const $deleteBtn = document.createElement("button");
  $deleteBtn.className = "btn btn-error btn-circle btn-sm";
  $deleteBtn.setAttribute("aria-label", "Delete project");
  $deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`;
  $deleteBtn.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete();
  };

  $actionColumn.append($deleteBtn);

  $cardBody.append($header, $actionColumn);
  $listItem.append($cardBody);

  // Add click handler to card for navigation
  $listItem.onclick = (e) => {
    if (!e.target.closest("button")) {
      render("project-details", project.id);
    }
  };

  return $listItem;
}

function createProjectForm(projects) {
  const $form = document.createElement("form");
  $form.className = "join w-full max-w-2xl mb-2";

  const $nameInput = document.createElement("input");
  $nameInput.className = "input input-bordered join-item flex-1";
  $nameInput.name = "name";
  $nameInput.placeholder = "Project name...";
  $nameInput.required = true;

  const $button = document.createElement("button");
  $button.className = "btn btn-primary join-item";
  $button.textContent = "Add";

  $form.append($nameInput, $button);

  $form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name").trim();
    if (name) {
      projects.push({
        id: crypto.randomUUID(),
        name,
        todos: [],
      });
      e.target.reset();
      render("home");
    }
  };

  return $form;
}
