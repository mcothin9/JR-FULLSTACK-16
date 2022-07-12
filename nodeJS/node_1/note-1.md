## Process

Node.js =>
API / RESTful API =>
Express.js =>
MangoDB =>
Mangoose =>
Authorisation / Authentication => 
Testing => 
Deployment =>
Docker

# 异步 asynchronous vs. 同步 synchronous

```js
console.log(1);
setTimeOut(() => {
    console.log(2);
});
console.log(3); // 1, 3, 2
```

同步 = 等待 = 阻塞 (BLOCK)
异步 = 不等待 = 非阻塞 (NON-BLOCKING)

js是一个单线程语言

{长时间事件: Input / Output Operation
I/O操作 => 采用异步}

## Event loop in Browser

- JS
   - heap
   - stack (Call Stack)
- WebAPIs
   - DOM
   - ajax (XMLHttpRequest)
   - setTimeout
- Callback Queue
   - onClick
   - onLoad
- Event loop process:
asynchronous event => WebAPI 注册 => 时间完成，进入callback queue => 等待 call stack 为空，queue里的事件先进先出传入 stack

## About node.js back-end

CRUD: create read update delete
- CRUD Operation
- CRUD service/server

## Node.js Architecture

