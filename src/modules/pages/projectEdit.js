import { createLayout } from "../components/layout";
import { render } from "../../index";

export function renderProjectEdit(projects, projectId) {
  const project = projects.find((p) => p.id === projectId);
  
  if (!project) {
    render('all-todos');
    return;
  }

  const $content = document.createElement("div");

  // Header
  const $header = document.createElement("div");
  $header.className = "content-header";
  $header.innerHTML = `
    <h2 class="text-3xl font-bold text-base-content">Edit Project</h2>
    <p class="text-base-content/60 mt-1">Update project information</p>
  `;

  // Body
  const $body = document.createElement("div");
  $body.className = "content-body";

  const $form = document.createElement("form");
  $form.className = "form-section";

  const $formGroup = document.createElement("div");
  $formGroup.className = "form-group";

  const $label = document.createElement("label");
  $label.className = "label";
  $label.innerHTML = `<span class="label-text font-semibold">Project Name</span>`;

  const $input = document.createElement("input");
  $input.type = "text";
  $input.className = "input input-bordered w-full";
  $input.value = project.name;
  $input.required = true;

  $formGroup.append($label, $input);

  const $buttonGroup = document.createElement("div");
  $buttonGroup.className = "button-group";

  const $cancelBtn = document.createElement("button");
  $cancelBtn.type = "button";
  $cancelBtn.className = "btn btn-neutral";
  $cancelBtn.textContent = "Cancel";
  $cancelBtn.onclick = () => {
    render("project", projectId);
  };

  const $saveBtn = document.createElement("button");
  $saveBtn.type = "submit";
  $saveBtn.className = "btn btn-primary";
  $saveBtn.textContent = "Save Changes";

  $buttonGroup.append($cancelBtn, $saveBtn);
  $form.append($formGroup, $buttonGroup);

  $form.onsubmit = (e) => {
    e.preventDefault();
    const newName = $input.value.trim();
    if (newName) {
      project.name = newName;
      render("project", projectId);
    }
  };

  $body.append($form);
  $content.append($header, $body);

  createLayout(projects, { type: 'project', projectId }, $content);
}
