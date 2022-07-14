const express = require('express');

const app = express();

app.use(express.json());

const taskMap = new Map();
const taskIdList = [0];

app.post('/tasks', (req, res) => {
    // check whether bad input
    if (req.body === null) {
        res.sendStatus(400);
        return;
    }

    // abstract the description of task from body
    const { description } = req.body;

    // create ID for new task
    const newId = taskIdList[taskIdList.length - 1] + 1;
    taskIdList.push(newId);

    // create new task and store into task map
    taskMap.set(newId, {
        "id": newId,
        "description": description,
        "done": false
    });

    // finish post and send create success status code 201
    res.status(201);
    res.send('The task sucessfully added.');
    return;
});

app.get('/tasks', (req, res) => {
    // abstract the description from query
    const description = req.query.description;

    // create empty array to store filter result
    const matchedTasks = [];

    // filter
    taskMap.forEach(element => {
        if(element.description === description) {
            matchedTasks.push(element);
        }
    });

    // finish get by description with 200
    res.status(200).json(matchedTasks);
    return;
});

app.get('tasks/{id}', (req, res) => {
    // abstract the id from the param in url
    const id = req.params.id;
    console.log(id);
    console.log(taskMap.get(id));

    // send the matched task to client
    res.status(200).json(taskMap.get(id));
    return;
});

app.put('tasks/{id}', (req, res) => {
    // abstract the id from the param in url
    const id = req.params.id;

    // abstract the description from the body
    const { description } = req.body;

    // update matching task
    taskMap.passedId = {
        description: description,
        done: true
    };

    // send updated data
    res.json(taskMap.get(id));
});

app.delete('tasks/{id}', (req, res) => {
    // abstract the id from the param in url
    const id = req.params.id;

    // delete the matching task
    if(taskMap.has(id)) {
        taskMap.delete(id);
        res.sendStatus(204);
        return;
    }
    res.sendStatus(404);
    return;
});

app.listen(3000);