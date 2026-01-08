import "./styles/main.css";
import { initTheme } from "./theme";
import { initApp } from "./app/init";

// apply theme early so styles are correct before render
initTheme();

document.addEventListener("DOMContentLoaded", initApp);
