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