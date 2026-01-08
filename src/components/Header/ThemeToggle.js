import { toggleTheme } from "../../theme";

export function ThemeToggle() {
  const btn = document.createElement("button");
  btn.classList.add("theme-toggle");
  btn.setAttribute("role", "switch");
  const isDark = document.documentElement.classList.contains("theme-dark");
  btn.setAttribute("aria-checked", isDark ? "true" : "false");
  btn.title = "Toggle theme";
  btn.textContent = isDark ? "🌙" : "☀️";

  function update() {
    const nowDark = document.documentElement.classList.contains("theme-dark");
    btn.setAttribute("aria-checked", nowDark ? "true" : "false");
    btn.textContent = nowDark ? "🌙" : "☀️";
  }

  btn.addEventListener("click", () => {
    toggleTheme();
    update();
  });

  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      btn.click();
    }
  });

  return btn;
}

export default ThemeToggle;
