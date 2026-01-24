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

export function createTrashIcon(size = 20) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", size);
  svg.setAttribute("height", size);
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  
  // Trash icon paths
  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  path1.setAttribute("points", "3 6 5 6 21 6");
  
  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute("d", "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2");
  
  const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line1.setAttribute("x1", "10");
  line1.setAttribute("y1", "11");
  line1.setAttribute("x2", "10");
  line1.setAttribute("y2", "17");
  
  const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line2.setAttribute("x1", "14");
  line2.setAttribute("y1", "11");
  line2.setAttribute("x2", "14");
  line2.setAttribute("y2", "17");
  
  svg.appendChild(path1);
  svg.appendChild(path2);
  svg.appendChild(line1);
  svg.appendChild(line2);
  
  return svg;
}