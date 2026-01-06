let state = {}

export function initStore() {
  state = { user: null }
}

export function getState() {
  return state
}

export function setState(next) {
  state = { ...state, ...next }
}
