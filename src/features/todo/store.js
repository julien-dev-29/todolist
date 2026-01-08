let state = {
  todos: [],
};

const listeners = [];

export function getState() {
  return state;
}

export function setState(newState) {
  state = { ...state, ...newState };
  listeners.forEach((fn) => fn(state));
}

export function subscribe(fn) {
  listeners.push(fn);
}
