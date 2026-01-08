import { getState, setState } from "../../app/store";

export function addTodo(text) {
  const { todos } = getState();
  setState({
    todos: [...todos, { id: Date.now(), text, done: false }],
  });
}

export function toggleTodo(id) {
  const { todos } = getState();

  setState({
    todos: todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo,
    ),
  });
}

export function deleteTodo(id) {
  const { todos } = getState();

  setState({
    todos: todos.filter((todo) => todo.id !== id),
  });
}
