function createProject(name) {
    return {
        id: crypto.randomUUID(),
        name,
        createdAt: new Date().toISOString(),
        tasks: []
    };
}

export default createProject;
