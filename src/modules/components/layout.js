import { createSidebar, createMobileMenuButton } from "./sidebar";

export function createLayout(projects, currentView, contentElement) {
  const $container = document.querySelector("#app");
  $container.replaceChildren();

  // Set global current view for sidebar to access
  window.__currentView = currentView;

  // Create layout wrapper
  const $layout = document.createElement("div");
  $layout.className = "app-layout";

  // Create sidebar
  const $sidebar = createSidebar(projects, currentView);

  // Create main content area
  const $mainContent = document.createElement("main");
  $mainContent.className = "main-content";
  $mainContent.id = "main-content";

  // Add content
  if (contentElement) {
    $mainContent.append(contentElement);
  }

  // Create mobile menu button
  const $mobileMenuBtn = createMobileMenuButton();

  // Assemble layout
  $layout.append($sidebar, $mainContent);
  $container.append($mobileMenuBtn, $layout);

  return $mainContent;
}
