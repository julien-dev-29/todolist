let state = {};
let listener = null;

export function initStore() {
  state = {
    projects: [
      {
        id: crypto.randomUUID(),
        title: "Vacances à prout land",
        todos: [],
      },
      {
        id: crypto.randomUUID(),
        title: "Sortie à la mer",
        todos: [],
      },
      {
        id: crypto.randomUUID(),
        title: "Cabane au fond du jardin",
        todos: [],
      },
    ],
    drawerOpen: false
  };
}

export function subscribe(fn) {
  listener = fn;
}

export function setState(next) {
  state = { ...state, ...next };
  if (listener) {
    listener(state);
  }
}

export function getState() {
  return state;
}

