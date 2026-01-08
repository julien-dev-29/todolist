import { subscribe } from "../../app/store";
import { toggleTodo, deleteTodo } from "./actions";
import "./todo.css";

export function renderTodo() {
  const todosElement = document.createElement("div");
  todosElement.classList.add('todos')
  subscribe((state) => {
    todosElement.innerHTML = `
      <ul>
        ${state.todos
          .map(
            (todo) => `
          <li>
            <input type="checkbox" ${todo.done ? "checked" : ""} data-id="${todo.id}" />
            <span>${todo.title}</span>
            <button data-del="${todo.id}">❌</button>
          </li>
        `,
          )
          .join("")}
      </ul>
    `;

    todosElement.querySelectorAll("input[type=checkbox]").forEach((cb) => {
      cb.onchange = () => toggleTodo(cb.dataset.id);
    });

    todosElement.querySelectorAll("button[data-del]").forEach((btn) => {
      console.log("yolo les kikis");
      btn.onclick = () => deleteTodo(btn.dataset.del);
    });
  });
  return todosElement
}
