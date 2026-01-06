import "./projectsList.css";

export function ProjectsList(projects) {
  const projectsListTemplate = document.querySelector("#projects-list");
  const projectsListClone = projectsListTemplate.content.cloneNode(true);
  projectsListClone.querySelector("h2").textContent = "Projects";
  const listElement = projectsListClone.querySelector("ul");
  projects.forEach((project) => {
    listElement.append(ListItem(project));
  });
  return projectsListClone;
}

export function ListItem(project) {
  const listItem = document.createElement("li");
  listItem.textContent = project.name;
  listItem.append(Button("delete", "delete"));
  return listItem;
}

export function Button(type, text) {
  const button = document.createElement("button");
  button.classList.add(type);
  if (text) button.textContent = text;
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`;
  button.addEventListener('click', () => {
    
  })
  return button;
}
