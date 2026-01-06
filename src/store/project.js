const ProjectManager = (() => {
  const STORAGE_KEY = 'projects'
  let projects = [];

  const addProject = (project) => {
    projects.push(project)
    saveToLocalStorage()
  };

  const addTaskToProject = (projectID, task) => {
    getById(projectID).tasks.push(task)
    saveToLocalStorage()
  };

  const deleteTask = () => {
    saveToLocalStorage();
  };

  const getById = (id) => projects.find(p => p.id === id)

  const getAllProjects = () => projects;

  const getAllTasks = () => {
    let tasksList = []
    projects.forEach(p => {
      p.tasks.forEach(t => tasksList.push(t))
    })
    return tasksList
  }

  const loadFromLocalStorage = () => {
    projects = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  };

  const saveToLocalStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  };

  loadFromLocalStorage();

  return {
    getById,
    addProject,
    addTaskToProject,
    getAllTasks,
    deleteTask,
    getAllProjects,
    saveToLocalStorage
  };
})()

export default ProjectManager;
