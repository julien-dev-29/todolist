import { createLayout } from "../components/layout";
import { render } from "../../index";

export function renderAllTodos(projects) {
  const $content = document.createElement("div");

  // Header
  const $header = document.createElement("div");
  $header.className = "content-header";
  $header.innerHTML = `
    <h2 class="text-3xl font-bold text-base-content">All Todos</h2>
    <p class="text-base-content/60 mt-1">View and manage all your tasks across projects</p>
  `;

  // Body
  const $body = document.createElement("div");
  $body.className = "content-body";

  // Add todo form
  $body.append(createAddTodoForm(projects));

  // Get all todos from all projects
  const allTodos = getAllTodosWithProject(projects);

  if (allTodos.length > 0) {
    $body.append(createUnifiedKanbanBoard(projects, allTodos));
  } else {
    const $emptyMsg = document.createElement("div");
    $emptyMsg.className = "alert alert-info mt-6";
    $emptyMsg.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>No todos yet. Create a project and add your first task!</span>
    `;
    $body.append($emptyMsg);
  }

  $content.append($header, $body);

  createLayout(projects, { type: "all-todos", projectId: null }, $content);
}

function createAddTodoForm(projects) {
  if (projects.length === 0) {
    return document.createTextNode("");
  }

  const $form = document.createElement("form");
  $form.className = "flex flex-col sm:flex-row gap-3 mb-6 max-w-4xl";

  const $todoInput = document.createElement("input");
  $todoInput.type = "text";
  $todoInput.name = "title";
  $todoInput.placeholder = "Add a new todo...";
  $todoInput.className = "input input-bordered flex-1";
  $todoInput.required = true;

  const $projectSelect = document.createElement("select");
  $projectSelect.name = "projectId";
  $projectSelect.className = "select select-bordered w-full sm:w-48";
  $projectSelect.required = true;

  const $defaultOption = document.createElement("option");
  $defaultOption.value = "";
  $defaultOption.textContent = "Select project...";
  $defaultOption.disabled = true;
  $defaultOption.selected = true;
  $projectSelect.append($defaultOption);

  projects.forEach((project) => {
    const $option = document.createElement("option");
    $option.value = project.id;
    $option.textContent = project.name;
    $projectSelect.append($option);
  });

  const $button = document.createElement("button");
  $button.type = "submit";
  $button.className = "btn btn-primary";
  $button.textContent = "Add";

  $form.append($todoInput, $projectSelect, $button);

  $form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title").trim();
    const projectId = formData.get("projectId");

    if (title && projectId) {
      const project = projects.find((p) => p.id === projectId);
      if (project) {
        project.todos.push({
          id: crypto.randomUUID(),
          title,
          status: "todo",
        });
        e.target.reset();
        render("all-todos");
      }
    }
  };

  return $form;
}

function getAllTodosWithProject(projects) {
  const allTodos = [];
  projects.forEach((project) => {
    project.todos.forEach((todo) => {
      allTodos.push({
        ...todo,
        projectId: project.id,
        projectName: project.name,
      });
    });
  });
  return allTodos;
}

function createUnifiedKanbanBoard(projects, allTodos) {
  const $board = document.createElement("div");
  $board.className = "kanban-board";

  const statuses = [
    { key: "todo", label: "To Do" },
    { key: "in_progress", label: "In Progress" },
    { key: "done", label: "Done" },
  ];

  statuses.forEach((status) => {
    const $column = document.createElement("div");
    $column.className = "kanban-column";
    $column.dataset.status = status.key;

    const $columnHeader = document.createElement("h3");
    $columnHeader.className = "kanban-column-header";
    const filteredTodos = allTodos.filter(
      (todo) => (todo.status || "todo") === status.key,
    );
    $columnHeader.textContent = `${status.label} (${filteredTodos.length})`;
    $column.append($columnHeader);

    const $cards = document.createElement("div");
    $cards.className = "kanban-cards-container";

    filteredTodos.forEach((todo) => {
      const project = projects.find((p) => p.id === todo.projectId);
      $cards.append(createTodoCard(todo, project, projects));
    });

    // Drag and drop handlers
    $cards.ondragover = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    };

    $cards.ondragenter = (e) => {
      if (
        e.target === $cards ||
        e.target.closest(".kanban-cards-container") === $cards
      ) {
        $cards.classList.add("drag-over");
      }
    };

    $cards.ondragleave = (e) => {
      if (e.target === $cards) {
        $cards.classList.remove("drag-over");
      }
    };

    $cards.ondrop = (e) => {
      e.preventDefault();
      $cards.classList.remove("drag-over");
      const todoId = e.dataTransfer.getData("text/plain");
      const projectId = e.dataTransfer.getData("projectId");

      const project = projects.find((p) => p.id === projectId);
      const todo = project?.todos.find((t) => t.id === todoId);

      if (todo) {
        const oldStatus = todo.status || "todo";

        if (oldStatus !== status.key) {
          todo.status = status.key;
          render("all-todos");
        } else {
          // Reorder within same column
          const container = $cards;
          const cards = Array.from(container.querySelectorAll(".kanban-card"));
          const orderedIds = cards.map((c) => c.dataset.todoId);

          const statusTodos = project.todos.filter(
            (t) => (t.status || "todo") === status.key,
          );
          const otherTodos = project.todos.filter(
            (t) => (t.status || "todo") !== status.key,
          );

          const orderedTodos = [];
          for (const id of orderedIds) {
            const t = statusTodos.find((st) => st.id === id);
            if (t) orderedTodos.push(t);
          }

          project.todos = [...otherTodos, ...orderedTodos];
        }
      }
    };

    $column.append($cards);
    $board.append($column);
  });

  return $board;
}

function createTodoCard(todo, project) {
  const $card = document.createElement("div");
  $card.className = "kanban-card";
  $card.draggable = true;
  $card.dataset.todoId = todo.id;
  $card.dataset.projectId = project.id;

  const $content = document.createElement("div");
  $content.className = "kanban-card-content";

  const $title = document.createElement("p");
  $title.className = "kanban-card-title";
  $title.textContent = todo.title;

  const $footer = document.createElement("div");
  $footer.className = "kanban-card-footer";

  const $projectBadge = document.createElement("span");
  $projectBadge.className = "kanban-card-project-badge";
  $projectBadge.textContent = project.name;
  $projectBadge.title = project.name;

  const $deleteBtn = document.createElement("button");
  $deleteBtn.className = "btn btn-error btn-circle btn-xs flex-shrink-0";
  $deleteBtn.setAttribute("aria-label", "Delete todo");
  $deleteBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 6h18"/>
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
    </svg>
  `;
  $deleteBtn.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const index = project.todos.findIndex((t) => t.id === todo.id);
    if (index > -1) {
      project.todos.splice(index, 1);
    }
    render("all-todos");
  };

  $footer.append($projectBadge, $deleteBtn);
  $content.append($title, $footer);
  $card.append($content);

  // Drag handlers
  $card.ondragstart = (e) => {
    $card.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", todo.id);
    e.dataTransfer.setData("projectId", project.id);
  };

  $card.ondragend = () => {
    $card.classList.remove("dragging");
    document
      .querySelectorAll(".kanban-cards-container")
      .forEach((container) => {
        container.classList.remove("drag-over");
      });
  };

  $card.ondragover = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    const afterElement = getDragAfterElement($card.parentElement, e.clientY);
    const draggedCard = document.querySelector(".kanban-card.dragging");

    if (!draggedCard || draggedCard === $card) return;

    if (afterElement == null) {
      $card.parentElement.appendChild(draggedCard);
    } else if (afterElement !== draggedCard) {
      $card.parentElement.insertBefore(draggedCard, afterElement);
    }
  };
  $card.ondblclick = (e) => {
    render("todo-details", project.id, e.target.dataset.todoId);
  };
  return $card;
}

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".kanban-card:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY },
  ).element;
}
