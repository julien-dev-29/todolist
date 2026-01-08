import { toggleDrawer } from "../../features/Drawer/action";
import "./Header.css";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const el = document.createElement("header");
  el.classList.add("header");
  const button = document.createElement("button");
  button.classList.add('drawer-btn')
  button.textContent = "☰";
  button.onclick = toggleDrawer;
  const h1 = document.createElement("h1");
  const icon = document.createElement("div");
  icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
  h1.textContent = "Super Todo";
  el.append(button);
  el.append(h1);
  el.append(ThemeToggle());
  el.append(icon);
  return el;
}
