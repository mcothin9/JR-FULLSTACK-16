1. SQL
structured query language
关系型数据库

2. non-SQL
(no-sql, not only sql)

- SQL:
MySQL
PostgresQL
SQLite

# non-SQL

1. document-oriented -> mongodb
2. key-value -> redis
3. graph-oriented -> neo4j
4. column-family -> cassandra

mongo -> store data in a `JSON-like` documents (key value pairs)

{
    _id: ObjectId,
}

数据类型: BSON - binary JSON

[
    {
        _id: xxx1,
        name: yyy,
        age: 10,
        dob: xxxx
    },
    {
        _id: xxx2,
        username: yyy
    }
]

## Structure Terminology

1. Database Server
2. Databases
3. Collections
4. Documents
5. Fields

## Relations

Embedded <=> Reference

1 to 1 || 1 to many || many to many

## Advanced Relations Thoughts
- Bi-directional referencing v.s parent-reference or child-reference
- Normalization v.s Denormalization
- one to millions relationship

# Promise

用来解决 callback hell
```js
const promise = new Promise((res, rej) => {
    res([data]);
    rej({err});
});

promise.then((data) => {
    // data = [data];
});

promise.catch((err) => {
    // err = {err};
});
```
三种状态:
- pending (函数被创建时）
- resolved (fulfilled)
- rejected
pending -> resolved || pending -> rejected

resolved -> monitor by `.then()` function
the param of .then() same as param of res() in the constructor of promise

rejected -> monitor by `.catch()` function
the param of .catch() same as param of rej() in the constructor of promise

.then() and .catch() could return anything (include new promise => new promise is pending)

## async ~ await

syntax sugar

```js
async function main() {
    // fetchDataPromise().then().then()
    const result = await fetchDataPromise();
    const result2 = await fetchDataPromise();
    // ...
}
```

## quiz

```js
setTimeOut(() => console.log(1));
Promise.resolve().then(() => console.log(2));
setTimeOut(() => {
	console.log(3);
	Promise.resolve().then(() => console.log(3.1));
});
setTimeOut(() => console.log(4));
Promise.resolve().then(() => {
	console.log(5);
	Promise.resolve().then(() => console.log(5.1));
	setTimeOut(() => console.log(5.2));
});
Promise.resolve().then(() => console.log(6));
```

# Mongoose

A ORM (object relational mapper) or ODM (oebject data mapping)
