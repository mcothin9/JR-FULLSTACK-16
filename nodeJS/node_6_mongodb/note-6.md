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

