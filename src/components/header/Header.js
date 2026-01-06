import './Header.css'

export function Header() {
  const headerTemplate = document.querySelector("#header");
  const header = headerTemplate.content.cloneNode(true)
  
  return header
}
