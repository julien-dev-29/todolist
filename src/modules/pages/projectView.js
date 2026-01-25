import { createLayout } from "../components/layout";
import { render } from "../../index";

export function renderProjectView(projects, projectId) {
  const project = projects.find((p) => p.id === projectId);
  
  if (!project) {
    render('all-todos');
    return;
  }

  const $content = document.createElement("div");

  // Header
  const $header = document.createElement("div");
  $header.className = "content-header";
  
  const $headerTop = document.createElement("div");
  $headerTop.className = "flex items-center justify-between gap-4 mb-2";
  
  const $titleGroup = document.createElement("div");
  $titleGroup.innerHTML = `
    <h2 class="text-3xl font-bold text-base-content">${project.name}</h2>
    <p class="text-base-content/60 mt-1">${project.todos.length} ${project.todos.length === 1 ? 'task' : 'tasks'}</p>
  `;
  
  const $actions = document.createElement("div");
  $actions.className = "action-buttons";

  const $editBtn = document.createElement("button");
  $editBtn.className = "btn btn-primary btn-sm";
  $editBtn.textContent = "Edit Project";
  $editBtn.onclick = () => {
    render("project-edit", projectId);
  };

  const $deleteBtn = document.createElement("button");
  $deleteBtn.className = "btn btn-error btn-sm";
  $deleteBtn.textContent = "Delete Project";
  $deleteBtn.onclick = (e) => {
    e.preventDefault();
    if (
      confirm(
        `Are you sure you want to delete "${project.name}"? This action cannot be undone.`
      )
    ) {
      const index = projects.findIndex((p) => p.id === projectId);
      if (index > -1) {
        projects.splice(index, 1);
      }
      render("all-todos");
    }
  };

  $actions.append($editBtn, $deleteBtn);
  $headerTop.append($titleGroup, $actions);
  $header.append($headerTop);

  // Body
  const $body = document.createElement("div");
  $body.className = "content-body";

  // Add todo form
  $body.append(createTodoForm(project));

  if (project.todos.length > 0) {
    $body.append(createKanbanBoard(project, projectId, projects));
  } else {
    const $emptyMsg = document.createElement("div");
    $emptyMsg.className = "alert alert-info mt-6";
    $emptyMsg.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>No todos yet. Add one above!</span>
    `;
    $body.append($emptyMsg);
  }

  $content.append($header, $body);

  createLayout(projects, { type: 'project', projectId }, $content);
}

function createTodoForm(project) {
  const $form = document.createElement("form");
  $form.className = "join w-full max-w-2xl mb-6";

  const $titleInput = document.createElement("input");
  $titleInput.className = "input input-bordered join-item flex-1";
  $titleInput.placeholder = "Add a new todo...";
  $titleInput.type = "text";
  $titleInput.required = true;

  const $submitBtn = document.createElement("button");
  $submitBtn.className = "btn btn-primary join-item";
  $submitBtn.textContent = "Add";

  $form.append($titleInput, $submitBtn);

  $form.onsubmit = (e) => {
    e.preventDefault();
    const title = $titleInput.value.trim();
    if (title) {
      project.todos.push({
        id: crypto.randomUUID(),
        title,
        status: "todo",
      });
      $titleInput.value = "";
      render("project", project.id);
    }
  };

  return $form;
}

function createKanbanBoard(project, projectId, projects) {
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
    const filteredTodos = project.todos.filter(
      (todo) => (todo.status || "todo") === status.key
    );
    $columnHeader.textContent = `${status.label} (${filteredTodos.length})`;
    $column.append($columnHeader);

    const $cards = document.createElement("div");
    $cards.className = "kanban-cards-container";

    filteredTodos.forEach((todo) => {
      $cards.append(createKanbanCard(todo, project, projectId));
    });

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
      const todo = project.todos.find((t) => t.id === todoId);

      if (todo) {
        const oldStatus = todo.status || "todo";

        if (oldStatus !== status.key) {
          todo.status = status.key;
          render("project", projectId);
        } else {
          const container = $cards;
          const cards = Array.from(container.querySelectorAll(".kanban-card"));
          const orderedIds = cards.map((c) => c.dataset.todoId);

          const statusTodos = project.todos.filter(
            (t) => (t.status || "todo") === status.key
          );
          const otherTodos = project.todos.filter(
            (t) => (t.status || "todo") !== status.key
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

function createKanbanCard(todo, project, projectId) {
  const $card = document.createElement("div");
  $card.className = "kanban-card";
  $card.draggable = true;
  $card.dataset.todoId = todo.id;

  const $content = document.createElement("div");
  $content.className = "kanban-card-content";

  const $title = document.createElement("p");
  $title.className = "kanban-card-title";
  $title.textContent = todo.title;

  const $footer = document.createElement("div");
  $footer.className = "kanban-card-footer";

  const $deleteBtn = document.createElement("button");
  $deleteBtn.className = "btn btn-error btn-circle btn-xs ml-auto";
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
    render("project", projectId);
  };

  $footer.append($deleteBtn);
  $content.append($title, $footer);
  $card.append($content);

  $card.style.cursor = "pointer";
  $card.onclick = (e) => {
    if (!e.target.closest("button")) {
      render("todo-details", projectId, todo.id);
    }
  };

  $card.ondragstart = (e) => {
    $card.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", todo.id);
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
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
