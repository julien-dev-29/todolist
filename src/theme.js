export function getTheme() {
  try {
    return localStorage.getItem("theme");
  } catch (e) {
    return null;
  }
}

export function setTheme(theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("theme-dark");
  } else {
    document.documentElement.classList.remove("theme-dark");
  }
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {}
}

export function toggleTheme() {
  const isDark = document.documentElement.classList.contains("theme-dark");
  setTheme(isDark ? "light" : "dark");
}

export function initTheme() {
  const stored = getTheme();
  let theme = "light";
  if (stored) {
    theme = stored;
  } else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    theme = "dark";
  }
  setTheme(theme);
}

export default {
  getTheme,
  setTheme,
  toggleTheme,
  initTheme,
};
