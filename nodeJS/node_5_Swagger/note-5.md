-- package.json
-- package-lock.json
-- src
    |-- index.js 入口文件 (server.js, app.js)
    |-- routes
        |-- tasks.js (taskRouter) (task.route.js)
        |-- users.js (userRouter)
        |-- index.js (导入上面所有的router，在做一个统一的导出)
    |-- controllers (逻辑处理)
        |-- tasks.js (taskController) (task.controller.js)
        |-- users.js
    |-- models
        |-- Task.js (在数据库中Task这个数据的格式设计) - ORM (object relational mapping), 跟数据库交互
    |-- middleware
        |-- error-middleware
            |-- xxxErrorHandler.js
        |-- authGuard
        |-- cors
    |-- utils (Helper function, shared function, database)
    |-- database
    |-- config 项目配置（环境变量的处理)


routes 和 controller 合并
services

src ->
- users
    -- user.controller.js
    -- user.model.js
- tasks

# Swagger

1. swagger-ui-express
2. swagger.jsdoc