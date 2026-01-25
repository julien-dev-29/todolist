import { render } from "../..";

export function createKanbanBoard(project, projectId) {
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
    $columnHeader.textContent = status.label;
    $column.append($columnHeader);

    const $cards = document.createElement("div");
    $cards.className = "kanban-cards-container";

    const filteredTodos = project.todos.filter(
      (todo) => (todo.status || "todo") === status.key,
    );

    filteredTodos.forEach((todo) => {
      $cards.append(
        createKanbanCard(todo, projectId, () => {
          const index = project.todos.findIndex((t) => t.id === todo.id);
          if (index > -1) {
            project.todos.splice(index, 1);
          }
          render("project-details", projectId);
        }),
      );
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
          render("project-details", projectId);
        } else {
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

function createKanbanCard(todo, onDelete) {
  const $card = document.createElement("div");
  $card.className = "kanban-card";
  $card.draggable = true;
  $card.dataset.todoId = todo.id;

  const $content = document.createElement("div");
  $content.className = "kanban-card-content";

  const $title = document.createElement("p");
  $title.className = "kanban-card-title";
  $title.textContent = todo.title;

  const $deleteBtn = document.createElement("button");
  $deleteBtn.className = "btn btn-error btn-circle btn-xs flex-shrink-0";
  $deleteBtn.setAttribute("aria-label", "Delete todo");
  $deleteBtn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>';
  $deleteBtn.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete();
  };

  $content.append($title, $deleteBtn);
  $card.append($content);

  $card.ondragstart = (e) => {
    $card.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", todo.id);
  };

  $card.ondragend = () => {
    $card.classList.remove("dragging");
    // Remove drag-over from all containers
    document
      .querySelectorAll(".kanban-cards-container")
      .forEach((container) => {
        container.classList.remove("drag-over");
      });
  };
  $card.ondblclick = (e) => {
    console.log(e);
    render("todo-details", todo.id);
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
    { offset: Number.NEGATIVE_INFINITY },
  ).element;
}
