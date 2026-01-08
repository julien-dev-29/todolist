let state = {
  count: 0,
  activeProjectId: null,
  activeDisplay: null,
  drawerOpen: false,
  projects: [
    {
      id: crypto.randomUUID(),
      title: "Aller à la plage",
      todos: [
        {
          id: crypto.randomUUID(),
          title: "todo1",
          description: "Acheter de la crême solaire pour les pieds",
          dueDate: Date.now(),
          priroty: "low",
        },
        {
          id: crypto.randomUUID(),
          title: "todo2",
          description: "Acheter de la crême solaire pour les mains",
          dueDate: Date.now(),
          priroty: "low",
        },
        {
          id: crypto.randomUUID(),
          title: "todo3",
          description: "Acheter de la crême solaire pour le cucul",
          dueDate: Date.now(),
          priroty: "low",
        },
      ],
    },
    {
      id: crypto.randomUUID(),
      title: "Aller sur la lune",
      todos: [
        {
          id: crypto.randomUUID(),
          title: "todo1",
          description: "Acheter de la crême lunaire pour les pieds",
          dueDate: Date.now(),
          priroty: "low",
        },
        {
          id: crypto.randomUUID(),
          title: "todo2",
          description: "Acheter de la crême lunaire pour les mains",
          dueDate: Date.now(),
          priroty: "low",
        },
        {
          id: crypto.randomUUID(),
          title: "todo3",
          description: "Acheter de la crême lunaire pour le cucul",
          dueDate: Date.now(),
          priroty: "low",
        },
      ],
    },
  ],
};

const listeners = [];

export function getState() {
  return state;
}

export function setState(partialState) {
  state = { ...state, ...partialState };
  listeners.forEach((fn) => fn(state));
}

export function subscribe(fn) {
  listeners.push(fn);
  fn(state);
}
