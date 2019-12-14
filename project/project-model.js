const db = require("../data/dbConfig.js")

module.exports = {
    find,
    findTasks,
    findResources,
    add,
    addTask,
    addResource,
    findById
}

function find() {
    return db("project")
}

function findResources() {
    return db("resource");
}

function addResource(resource) {
    return db("resource")
    .insert(resource, "id")
    .then(ids => {
        const [id] = ids;
        return findById(id);
    });
}

function findById(id) {
    return db("project")
        .where({ id })
        .first()
}

function add(project) {
    return db("project")
    .insert(project, "id")
    .then(ids => {
        const [id] = ids;
        return findById(id);
    });
}

function findTasks() {
    return db("task")
    .join("project", "task.project_id "," project.id")
    .select("project_name", "project_description", "task_description", "task_notes", "task_completed")
}

function addTask(task) {
    return db("task")
    .insert(task, "id")
    .then(ids => {
        const [id] = ids;
        return findById(id);
    });
}
