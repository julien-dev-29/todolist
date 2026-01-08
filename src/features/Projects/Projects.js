import "./Projects.css";

export function renderProject(state, id) {
  const projectElement = document.createElement("div");
  projectElement.classList.add("project");
  const project = state.projects.find(p => p.id === id)
  console.log(project);
  console.log("yolo les kikis");
  projectElement.innerHTML = `
    <h3>${project.title}</h3>
    `;
  return projectElement;
}
