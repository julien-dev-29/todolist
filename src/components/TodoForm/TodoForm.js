import { getState, setState } from "../../app/store";
import "./TodoForm.css";

export function TodoForm() {
  const container = document.createElement("section");
  container.classList.add("todo-form-container");
  const header = document.createElement("h2");
  header.textContent = "Créer une todo";
  const form = document.createElement("form");
  const inputContainer = document.createElement("div");
  const inputContainer2 = document.createElement("div");
  const inputContainer3 = document.createElement("div");
  const inputContainer4 = document.createElement("div");
  inputContainer.classList.add("input-container");
  inputContainer2.classList.add("input-container");
  inputContainer3.classList.add("input-container");
  inputContainer4.classList.add("input-container");
  const titleLabel = document.createElement("label");
  const dueDateLabel = document.createElement("label");
  const descriptionLabel = document.createElement("label");
  const projectsLabel = document.createElement("label");
  projectsLabel.textContent = "Projects";
  titleLabel.textContent = "Title";
  dueDateLabel.textContent = "Due Date";
  descriptionLabel.textContent = "Description";
  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  const dateInput = document.createElement("input");
  const descriptionTextarea = document.createElement("textarea");
  descriptionTextarea.rows = 10
  const projectsSelect = document.createElement("select");
  const state = getState();
  state.projects.forEach((p) => {
    const option = document.createElement("option");
    option.value = p.id;
    option.textContent = p.title;
    projectsSelect.append(option);
  });
  dateInput.type = "date";
  container.append(header);
  container.append(form);
  inputContainer.append(titleLabel);
  inputContainer.append(titleInput);
  inputContainer2.append(dueDateLabel);
  inputContainer2.append(dateInput);
  inputContainer3.append(descriptionLabel);
  inputContainer3.append(descriptionTextarea);
  inputContainer4.append(projectsLabel);
  inputContainer4.append(projectsSelect);
  form.append(inputContainer);
  form.append(inputContainer3);
  form.append(inputContainer2);
  form.append(inputContainer4);
  form.append(submitButton);

  submitButton.onclick = (e) => {
    e.preventDefault();
    setState({
      projects: getState().projects.map((p) => {
        if (p.id === projectsSelect.value) {
          const todo = {
            id: crypto.randomUUID(),
            title: titleInput.value,
            description: descriptionTextarea.value,
            dueDate: dateInput.value,
            done: false,
          };
          return { ...p, todos: [...p.todos, todo] };
        }
        return p;
      }),
      activeDisplay: "project"
    });
  };
  return container;
}
