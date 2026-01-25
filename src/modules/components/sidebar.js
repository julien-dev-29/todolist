import { render } from "../../index";

export function createSidebar(projects, currentView) {
  const $sidebar = document.createElement("aside");
  // Only add mobile-closed on mobile viewports
  const isMobile = window.innerWidth < 768;
  $sidebar.className = isMobile ? "sidebar mobile-closed" : "sidebar";
  $sidebar.id = "sidebar";

  // Header
  const $header = document.createElement("div");
  $header.className = "sidebar-header";
  $header.innerHTML = `
    <h1>Todo App</h1>
    <p>Organize your tasks</p>
  `;

  // Navigation
  const $nav = document.createElement("nav");
  $nav.className = "sidebar-nav";

  // All Todos Link
  const $allTodosBtn = document.createElement("button");
  $allTodosBtn.className = `cursor-pointer sidebar-link ${currentView.type === "all-todos" ? "sidebar-link-active" : ""}`;
  $allTodosBtn.innerHTML = `
    <span class="flex items-center gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="7" height="7" x="3" y="3" rx="1"/>
        <rect width="7" height="7" x="14" y="3" rx="1"/>
        <rect width="7" height="7" x="14" y="14" rx="1"/>
        <rect width="7" height="7" x="3" y="14" rx="1"/>
      </svg>
      All Todos
    </span>
    <span class="badge badge-sm badge-primary">${getAllTodosCount(projects)}</span>
  `;
  $allTodosBtn.onclick = () => {
    render("all-todos");
    closeSidebarOnMobile();
  };

  $nav.append($allTodosBtn);

  // Projects Section
  const $projectsTitle = document.createElement("div");
  $projectsTitle.className = "sidebar-section-title mt-6";
  $projectsTitle.textContent = "Projects";

  $nav.append($projectsTitle);

  // Project List
  projects.forEach((project) => {
    const $projectItem = document.createElement("button");
    $projectItem.className = `sidebar-project-item ${currentView.type === "project" && currentView.projectId === project.id ? "active" : ""}`;
    $projectItem.innerHTML = `
      <span class="flex items-center gap-3 flex-1 min-w-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
        </svg>
        <span class="truncate">${project.name}</span>
      </span>
      <span class="ml-4 badge badge-sm badge-secondary">${project.todos.length}</span>
    `;
    $projectItem.onclick = () => {
      render("project", project.id);
      closeSidebarOnMobile();
    };
    $nav.append($projectItem);
  });

  // Footer with Add Project Form
  const $footer = document.createElement("div");
  $footer.className = "sidebar-footer";
  $footer.append(createAddProjectForm(projects));

  $sidebar.append($header, $nav, $footer);

  return $sidebar;
}

function createAddProjectForm(projects) {
  const $form = document.createElement("form");
  $form.className = "flex gap-2";

  const $input = document.createElement("input");
  $input.type = "text";
  $input.name = "name";
  $input.placeholder = "New project...";
  $input.className = "input input-sm input-bordered flex-1";
  $input.required = true;

  const $button = document.createElement("button");
  $button.type = "submit";
  $button.className = "btn btn-sm btn-primary";
  $button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 12h14"/>
      <path d="M12 5v14"/>
    </svg>
  `;

  $form.append($input, $button);

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
      // Re-render current view to update sidebar
      const currentView = getCurrentView();
      render(currentView.type, currentView.projectId);
    }
  };

  return $form;
}

function getAllTodosCount(projects) {
  return projects.reduce((total, project) => total + project.todos.length, 0);
}

function closeSidebarOnMobile() {
  if (window.innerWidth < 768) {
    const sidebar = document.getElementById("sidebar");
    const backdrop = document.getElementById("sidebar-backdrop");
    if (sidebar) sidebar.classList.add("mobile-closed");
    if (backdrop) backdrop.remove();
  }
}

function getCurrentView() {
  // This will be set by the main app
  return window.__currentView || { type: "all-todos", projectId: null };
}

export function createMobileMenuButton() {
  const $button = document.createElement("button");
  $button.className = "mobile-menu-btn";
  $button.setAttribute("aria-label", "Toggle menu");
  $button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" x2="20" y1="12" y2="12"/>
      <line x1="4" x2="20" y1="6" y2="6"/>
      <line x1="4" x2="20" y1="18" y2="18"/>
    </svg>
  `;

  $button.onclick = () => {
    const sidebar = document.getElementById("sidebar");
    const isOpen = !sidebar.classList.contains("mobile-closed");

    if (isOpen) {
      sidebar.classList.add("mobile-closed");
      const backdrop = document.getElementById("sidebar-backdrop");
      if (backdrop) backdrop.remove();
    } else {
      sidebar.classList.remove("mobile-closed");

      // Add backdrop
      const $backdrop = document.createElement("div");
      $backdrop.className = "sidebar-backdrop";
      $backdrop.id = "sidebar-backdrop";
      $backdrop.onclick = () => {
        sidebar.classList.add("mobile-closed");
        $backdrop.remove();
      };
      document.body.append($backdrop);
    }
  };

  return $button;
}
