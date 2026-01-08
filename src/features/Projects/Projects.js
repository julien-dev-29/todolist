import "./Projects.css";

export function renderProject(state) {
  const projectElement = document.createElement("div");
  projectElement.classList.add("project");

  console.log("yolo les kikis");
  projectElement.innerHTML = `
    <h3>Project</h3>
      <ul>
        ${state.projects
          .map(
            (project) => `
          <li>
            <span>${project.title}</span>
          </li>
        `,
          )
          .join("")}
      </ul>
    `;
  return projectElement;
}
