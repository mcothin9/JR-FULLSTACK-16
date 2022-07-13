HTTP

0.9
...
3
HTTP
HTTP2 => HTTPS


TCP - UDP


URL  uniform resource identifier


mongodb
file
smtp
ftp
http


ip whitelisting

https 443
http 80

# Common used HTTP Methods

## GET

获取数据
RESTful API commond: Read

## POST

数据添加
RESTful API commond: Create

## PUT

更新数据 => 整体数据替换
RESTful API commond: Update

## DELETE

删除数据
RESTful API commond: Delete

## PATCH

更新数据 => 只更新部分数据

## HTTP headers

- request
METHOD PATH PROTOCOL
    root

- response
PROTOCOL Status code (状态码)

headers format =>
Content-Type: text/html
Allow: GET, PUT, POST (in the preflight, server tell requester which command is allowed)
Referer
User-Agent
Authorization
Access-Control-Allow_Origin

x-custom-header

## Authorization

Authorization: <type> <credentials>

Common types:
1. Basic (username and password)
2. Bearer (bearer token to access Oauth 2.0 protected resources)

C - S
hrrps://s.com

C - P - S
https://p.com/?url=https://s.com
最好自己搭建代理服务器（P）P可以访问所有经过的内容

## Common used Response coed

200 OK
201 Created (request sucesss)
204 No Content (success, but return nothing)
209 Conflicts (ex. Duplicate username)
304 Not Modified (请求端缓存数据未更新)
400 Bad Request (请求端输入不符合要求)
401 Unauthorized (无权限)
404 Not Found
500 Internal server error 尽量避免的错误，错误可能包含敏感数据

## JSON

Java Script Object Notation

序列化与反序列化
```js
const course = {
    name: 'fullstack',
    units: 4,
    price: 3000
};

console.log(JSON.stringify(course)); // { "name": "fullstack", "units": "4", "price": "3000" }
console.log(JSON.parse(JSON.stringify(course))); // { name: 'fullstack', units: 4, price: 3000 }
```
1. 所有JSON的key和value都需要双引号
2. 不支持undefine

## SOAP

Simple Object Access Protocol
安全性较高的协议，常用于银行和政府

## API

Application programming interface

## RESTful API

RCUD: read, create, update, delete

无状态 => server不记录操作
A,B === B,A
现在大部分都是无状态开发

有状态 => server记录信息（登陆后可使用其他功能）

### 设计规范（建议）

1. versioning
example.com/**v1**/books
example.com/**v2**/books

2. url里，尽量使用名词，避免动词，尽量使用复数资源
GET /v1/books
GET /v1/getBookds 命令和资源名重复了

3. 保证GET不会对资源进行修改（污染）
GET /v1/books (只读数据，不做更新和添加)

4. url 推荐使用嵌套结构
GET /posts/:postId/comments
GET /posts/{postId}/comments

5. 对返回的数据进行分页（注意返回的大小）
1000 个数据，无法在一页中展示，分层100页，每页10个数据
GET /v1/books -> 10 elemetn each page
GET /v1/books??page=2&pageSize=100 -> 第2页 -> 101 ~ 200

6. 使用正确的status code来表示返回的结果

7. 尽量返回人性化的文本信息（特指错误信息）
{ "error":"invalid password" }
{ "error": 1001 } // error code -> 需要用户查询文档中对应的错误码

## API authentication & authorization

- Authentication: who you are
- Authorization: what you can do