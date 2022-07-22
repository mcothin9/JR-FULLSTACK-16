const tasks = [];
class Task {
    constructor(id, description) {
        this.id = id;
        this.description = description;
        this.done = false;
    }
}
let _id = 1;

const getAllTasks = (req, res) => {
    const {description} = req.query;
    if (description) {
        const filteredTasks = tasks.filter((e) => e.description.includes(description));
        res.json(filteredTasks);
        return;
    };
    res.json(tasks);
    return;
};

const getTaskById = (req, res) => {
    const { id } = req.params;
    const task = tasks.find((e) => e.id === Number(id));
    if (!task) {
        res.status(404).json({ error: 'Task not found' });
        return;
    }
    res.json(task);
    return;
};

const addTask = (req, res) => {
    const { description } = req.body;
    const task = new Task(_id++, description);
    tasks.push(task);
    res.status(201).json(task);
    return;
};

const updateById = (req, res) => {
    const { id } = req.params;
    const { description, done } = req.body;
    const task = tasks.find((e) => e.id === Number(id));

    if (!task) {
        res.status(404).json({ error: 'Task not found' });
        return;
    }
    if (description) {
        task.description = description;
    }
    if (done) {
        task.done = !!done;
    }
    res.json(task);
    return;
};

const deleteTaskById = (req, res) => {
    const { id } = req.params;
    const index = tasks.findIndex((i) => i.id === Number(id));
    if (index === 1) {
        res.status(404).json({ error: 'Task not found' });
        return;
    }
    tasks.splice(index, 1);
    res.sendStatus(204);
    return;
};

module.exports = {
    getAllTasks,
    getTaskById,
    updateById,
    deleteTaskById,
    addTask
};