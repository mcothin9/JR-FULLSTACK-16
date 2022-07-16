# Express.js

## Semantic version

1. **^** lastest version with the current major version fixed (major.x.x)
2. **~** lastest version with the current major and minor version fixed (major.minor.x)
3. ` (blank)` exact version match

```js
"dependencies": {
    "express": "^4.16.4"
    //         major.minor.patch
    //         break change; change feature; change or fix bug
}
```

## Install a specific version and update a package

npm install express@X => X is the version code

npm outdated
npm update

## Dev dependencies and global dependencies

npm i nodemon --save-dev ( npm i nodemon -D )
不是dependencies而是安装到devDependencies

### 区别

dependencies: 缺少后项目无法运行

devDependencies: 只在开发时使用（后续不需要）

### global dependencies

全局安装，（很少使用）可以自terminal里使用
不会写进package.json, 使其他电脑无法安装需要的模块

## Run script with npm

```js
"scripts": {
    "start": "nodemon index.js"
}
```
给一串长的命令起名

# Express command

## 1. app.post

从request中读取数据

1. 从 body里取数据
body -> POST, PUT, PATCH
req.body (必须使用 express.json() middleware)

2. query param -> GET (?)
req.query

3. route params -> GET, POST, PUT, DELETE (大多数情况都是id)
/:id
保证路径（‘/：id’）和对应的key必须完全一致，否则取回undefine 

```js
app.use(express.json());

app.post('/:id', (req, res) => {
    // 1
    const { name } = req.body;
    // 2
    const { title } = req.query;
    // 3
    const { id } = req.params;

    res.send({ name, title, id });
    // res.json({name: "mitchell"}) 默认 200 status code
    // 只返回 status code
    // res.sendStatus(204);  // 只返回error code
    // res.status(201).json({}) // 返回status code 和内容
});
```

## Middleware

Express 创建的 app 本质上是一堆 middleware 组成的
=>
node.js的原理
event driven => client发了请求到app，事件（一系列callback functin）触发
=>
middleware原理
middleware functions are functions that have access to the request object `(req)`, the response object `(res)`, and the next middleware function `(next)` in the application's **request-response cycle**. The net middleware function commonly denoted nu a variable named next.
=>
Ability of middleware function
- Excute any code
- Make changes to the request and the response obejcts
- End the request-response cycle
- Call the next middlewarefunction in the stack

```js
const m1 = (req, res, next) => {
    if (!token) {
        res.json({ error: "token not found" });
        // xxxx can be string, object {type:xxx, message:xxx}, can be new Error('');
        // next(new Error('error'));
        // next(xxxx);    (no need)
        // return;
    }
    next();
}

// only traget to one type of error (validationError)
const errorHandlerM1 = (error, req, res, next) => {
    // 如果是 library 的error
    if (error.type === 'validationError') {
        res.status(400).json({ error: error.message });
        return;
    }

    // 如果是自定义的 error
    if (error instanceof CustomError) {
        res.status(400).json({ error: error.message });
        return;
    }
    next(error);
}

// Last layer of middleware to control error
const errorHandler = (err, req, res, next) => {
    console.log(err); // logging lib -> db -> log -> logging platform
    res.ststus(500).json({ error: "please try later" });
    return;
}

// next(new customError());
class customError extends Error {

}

class validationError extends CustomError {
    constructor() {
        super();
    }
}
```

## 将 middleware 注册到 app

application level middleware
`app.use`注册到全局
`app.get`注册到 GET 命令上
`app.get('/', m1, m2, m3, (req, res) => {})` 触发顺序从m1开始到m3结束，最后是route handler

```js
app.use(express.json());

app.get('/', errorHandlerM1);
```

# Practice (express-API.js)

## cors problems
```js
const cors = (req, res, next) => {
    res.setHearder("Access-Control-Allow-Origin", "*");
    res.setHearder("Access-Control-Allow-Headers", "content-type");
    res.setHearder("Access-Control-Allow-Origin", "PUT");
    next();
}

app.use(cors);
```

## Router 路由器

```js
const taskRouter = express.Router();
// mini-app
taskRouter.get('/', (req, res) => {
    res.json([1, 2, 3]);
});

// route handler
const v1Router = express.Router();
v1Router.use('/tasks', taskRouter);
app.use('/v1', v1Router);

// GET /v1/tasks
```

## high order function (curring function)

为什么 `express.json()` 在使用时最后有括号？而其他 route handler 没有
=> express.json() 实际上是一个包含着 middleware 的函数，调用后得到return的结果是一个middleware函数

middleware: function(req, res, next) { }
json: ( ) => {
    // high order fucntion
    return (req, res, next) => { }
}

app.use(express.json()) === app.use( (req, res, next) => { } )