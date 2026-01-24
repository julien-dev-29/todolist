import { createTrashIcon } from "../utils/dom";

export function renderTodoList() {}

export function createTodoListItem(todo, onDelete, onToggle) {
  const $listItem = document.createElement("li");
  $listItem.className = "flex items-center justify-between p-3 border-b border-base-300";
  
  const $flex = document.createElement("div");
  $flex.className = "flex items-center gap-3";
  
  const $checkbox = document.createElement("input");
  $checkbox.type = "checkbox";
  $checkbox.className = "checkbox checkbox-primary";
  $checkbox.checked = todo.completed || false;
  $checkbox.onchange = () => onToggle();
  
  const $title = document.createElement("span");
  $title.className = todo.completed ? "line-through opacity-60" : "";
  $title.textContent = todo.title;
  
  $flex.append($checkbox, $title);
  
  const $actionColumn = document.createElement("div");
  $actionColumn.className = "flex items-center gap-2";
  
  const $deleteBtn = document.createElement("button");
  $deleteBtn.className = "btn btn-error btn-circle btn-xs";
  $deleteBtn.setAttribute("aria-label", "Delete todo");
  $deleteBtn.appendChild(createTrashIcon(14));
  $deleteBtn.onclick = (e) => {
    e.preventDefault();
    onDelete();
  };
  
  $actionColumn.append($deleteBtn);
  
  $listItem.append($flex, $actionColumn);
  return $listItem;
}


