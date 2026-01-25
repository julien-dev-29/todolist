export function createIconSVG(IconClass, size = 20) {
  const icon = new IconClass();
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", size);
  svg.setAttribute("height", size);
  svg.setAttribute("viewBox", `0 0 24 24`);
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  
  const iconString = icon.toSvg();
  const parser = new DOMParser();
  const iconDoc = parser.parseFromString(iconString, "text/html");
  const iconElement = iconDoc.body.firstElementChild;
  
  if (iconElement) {
    while (iconElement.firstChild) {
      svg.appendChild(iconElement.firstChild);
    }
  }
  
  return svg;
}