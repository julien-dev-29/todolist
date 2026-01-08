import { getState, setState } from "../../app/store";

export function addProject(text) {
  const { projects } = getState();
  setState({
    projects: [...projects, { id: Date.now(), text, done: false }],
  });
}

export function deleteProject(id) {
  const { projects } = getState();
  setState({
    projects: projects.filter((project) => project.id !== id),
  });
}

export function addTodo(projectId, todo) {
  const { projects } = getState();
  setState({
    projects:
      projects.map((p) => {
        if (p.id === projectId) {
          return (p = { ...p, todos: [...p.todos, todo] });
        }
        return p;
      }) ?? [],
  });
}

export function deleteTodo(projectId, todoId) {
  console.log(todoId);
  console.log(getState());
  const { projects } = getState();
  setState({
    projects: projects.map((p) =>
      p.id === projectId
        ? {
            ...p,
            todos: p.todos.filter((todo) => todo.id != todoId),
          }
        : p,
    ),
  });
}
