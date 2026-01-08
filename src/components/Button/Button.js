import { getState, setState } from "../../app/store";
import "./Button.css";

export function Button() {
  const el = document.createElement("div");
  el.classList.add("btn");
  el.innerHTML = `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-plus-icon lucide-plus"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>`;
  el.onclick = () => {
    setState({ activeDisplay: "todoForm" });
    console.log(getState());
  }
  console.log(getState());
  return el;
}
