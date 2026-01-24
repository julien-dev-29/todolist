import { render } from "../../index";

export function renderProjectEdit(projects, projectId) {
  const project = projects.find((p) => p.id === projectId);
  const $container = document.querySelector("#app");
  
  const $backButton = document.createElement("button");
  $backButton.className = "btn btn-success mb-6";
  $backButton.textContent = "← Back";
  $backButton.onclick = () => {
    render("project-details", projectId);
  };
  
  const $title = document.createElement("h2");
  $title.className = "text-3xl font-bold text-base-content mb-6"
  $title.textContent = "Edit Project";
  
  const $form = document.createElement("form");
  $form.className = "form-section";
  
  const $formGroup = document.createElement("div");
  $formGroup.className = "form-group";
  
  const $label = document.createElement("label");
  $label.className = "form-label";
  $label.setAttribute("for", "project-name-input");
  $label.textContent = "Project Name";
  
  const $input = document.createElement("input");
  $input.id = "project-name-input";
  $input.type = "text";
  $input.className = "input input-bordered w-full mt-2";
  $input.value = project.name;
  $input.required = true;
  
  $formGroup.append($label, $input);
  
  const $buttonGroup = document.createElement("div");
  $buttonGroup.className = "button-group";
  
  const $cancelBtn = document.createElement("button");
  $cancelBtn.type = "button";
  $cancelBtn.className = "btn btn-neutral";
  $cancelBtn.textContent = "Cancel";
  $cancelBtn.onclick = (e) => {
    e.preventDefault();
    render("project-details", projectId);
  };
  
  const $saveBtn = document.createElement("button");
  $saveBtn.type = "submit";
  $saveBtn.className = "btn btn-primary";
  $saveBtn.textContent = "Save";
  
  $buttonGroup.append($cancelBtn, $saveBtn);
  
  $form.append($formGroup, $buttonGroup);
  
  $form.onsubmit = (e) => {
    e.preventDefault();
    const newName = $input.value.trim();
    if (newName) {
      project.name = newName;
      render("project-details", projectId);
    }
  };
  
  $container.replaceChildren();
  $container.append($backButton, $title, $form);
}
