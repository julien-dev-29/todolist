import ProjectManager from "./project";

export function getTodayTask() {
    return ProjectManager.getAllTasks().filter(task => {
        const dueDate = new Date(task.dueDate)
        const today = new Date()
        if (dueDate.getDate() === today.getDate()
            && dueDate.getMonth() === today.getMonth()
        ) {
            return task
        }
    })
}