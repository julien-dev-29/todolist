import { getState, setState } from "../../app/store";

export function addProject(text) {
  const { todos } = getState();
  console.log(text);
  setState({
    todos: [...todos, { id: Date.now(), text, done: false }],
  });
}

export function deleteProject(id) {
  const { todos } = getState();

  setState({
    todos: todos.filter((todo) => todo.id !== id),
  });
}

export function getProject(id) {
  const { todos } = getState();
}
