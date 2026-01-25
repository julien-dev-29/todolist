import { formatDate } from "../../../../../utils/date";
export default function createDate(todo) {
  const $dateCol = document.createElement("div");
  $dateCol.innerHTML = `
    <div class="text-xs text-base-content/60 uppercase">Created</div>
    <div class="text-sm font-semibold">${formatDate(todo.createdAt || new Date().toISOString())}</div>
  `;
  return $dateCol;
}
