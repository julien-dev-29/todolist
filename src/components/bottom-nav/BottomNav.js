import { setMainContent } from "../main/Main";
import { ProjecstList } from "../projectsList/ProjectsList";
import "./BottomNav.css";

export function BottomNav() {
  const footerTemplate = document.querySelector("#footer");
  const footer = footerTemplate.content.cloneNode(true);
  const projectsNavElem = footer.querySelector("#mobile-nav-projects");
  projectsNavElem.addEventListener("click", () =>
    setMainContent(
      ProjecstList([
        {
          name: "yolo",
        },
      ]),
    ),
  );
  return footer;
}
