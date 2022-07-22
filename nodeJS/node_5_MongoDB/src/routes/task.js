const express = require('express');
const { getAllTasks, getTaskById, addTask, updateById, deleteTaskById } = require('../controllers/task');

const taskRouter = express.Router();

taskRouter.get('', getAllTasks);

taskRouter.get('/:id', getTaskById);

taskRouter.post('', addTask);

taskRouter.put('/:id', updateById);

taskRouter.delete('/:id', deleteTaskById);

module.exports = taskRouter;