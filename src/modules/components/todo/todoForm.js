import { render } from "../../..";
export function createTodoForm(project) {
  const $form = document.createElement("form");
  $form.className = "join w-full max-w-2xl";

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
      render("project-details", project.id);
    }
  };

  return $form;
}
