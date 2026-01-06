function createTask({ title, description, dueDate, priority, notes = "", checklist = [], project = "default" }) {
  return {
    id: crypto.randomUUID(),
    title,
    description,
    dueDate,
    priority,
    notes,
    checklist,
    completed: false,
    project
  };
}

export default createTask;