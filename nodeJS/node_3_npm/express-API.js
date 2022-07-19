const express = require('express');

const app = express();

app.use(express.json());

const taskMap = new Map();
const taskIdList = [0];

app.post('/tasks', (req, res) => {
    // check whether bad input         文档没有需求400 不需要这一部分功能
    // if (req.body === null) {
    //     res.sendStatus(400);
    //     return;
    // }

    // abstract the description of task from body
    const { description } = req.body;

    // create ID for new task
    const newId = taskIdList[taskIdList.length - 1] + 1;
    taskIdList.push(newId);

    // create new task and store into task map
    taskMap.set(newId.toString(), {
        "id": newId,
        "description": description,
        "done": false
    });

    // finish post and send create success status code 201
    // res.status(201);
    // res.send('The task sucessfully added.');   保持格式统一，不要返回字符串
    res.status(201).json({ "description": "The task successfully added" });
    return;
});

app.get('/tasks', (req, res) => {

    // If query contain description, return matched result
    if(req.query.description !== null) {

        const description = req.query.description;

        // create empty array to store filter result
        const matchedTasks = [];

        // filter
        taskMap.forEach(element => {
            if(element.description.includes(description)) {
                matchedTasks.push(element);
            }
        });

        // finish with 200
        res.status(200).json(matchedTasks);
        return;
    }

    // create empty array to store filter result
    const matchedTasks = [];

    taskMap.forEach(element => {
        matchedTasks.push(element);
    });

    // finish get by description with 200
    res.status(200).json(matchedTasks);
    return;
});

app.get('/tasks/:id', (req, res) => {
    // abstract the id from the param in url
    const id = req.params.id;

    if(taskMap.has(id)) {
        // send the matched task to client
        res.status(200).json(taskMap.get(id));
        return;
    }

    res.status(404).json({ "description": "Task not found" });
    return;
});

app.put('/tasks/:id', (req, res) => {
    // abstract the id from the param in url
    const id = req.params.id;

    if(taskMap.has(id)) {
        // abstract the description and done from the body
        const { description, done } = req.body;
        const newTask = {
            "description": description,
            "done": done
        };

        // update matching task
        Object.assign(taskMap.get(id), newTask);
        // console.log(`Updated task id: ${taskMap.get(id).id}`);
        // console.log(`Updated task descripton: ${taskMap.get(id).description}`);
        // console.log(`Updated task done: ${taskMap.get(id).done}`);

        // send updated data
        res.status(200).json(taskMap.get(id));
        return;
    }

    res.status(404).json({ "description": "Task not found"});
    return;
});

app.delete('/tasks/:id', (req, res) => {
    // abstract the id from the param in url
    const id = req.params.id;

    // delete the matching task
    if(taskMap.delete(id)) {
        res.status(204).json({ "description": "The task successfully deleted" });
        return;
    }

    res.status(404).json({ "description": "Task not found" });
    return;
});

app.listen(3000);

const cors = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Headers', 'content-type');
    next();
};

app.use(cors);