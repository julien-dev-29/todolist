import "./BottomNav.css";

export function BottomNav() {
  const footerTemplate = document.querySelector("#footer");
  const footer = footerTemplate.content.cloneNode(true);
  const projectsNavElem = footer.querySelector("#mobile-nav-projects");

  return footer;
}
