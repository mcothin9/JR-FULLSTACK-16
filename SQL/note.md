# What is SQL

SQL => Structured Query Language
Designed to manipulate and manage data stored in relational databases.

- Relational database
__Database__ that organizes information into one or more tables.

- able
__Table__ is a collection of data organized into rows and columns. Sometime __table__ are referred as __relations__.

- column
A set of data values of a particular type.

- statement
A statement is text that databse recognizes as a valid command. Always end with semicolon.`;`

- common data type
   - Integer (whole number)
   - Text (text string)
   - Date (date)
   - Real (decimal number)

# Manipulation

## 1. CREATE TABLE
Create new table in the database.
```sql
CREATE TABLE celebs (
   id INTEGER, 
   name TEXT, 
   age INTEGER
);
```

## 2. INSERT INTO
Insert a new `row` into a table.
Always come with `VALUES`.
```sql
INSERT INTO celebs (id, name, age) 
VALUES (1, 'Justin Bieber', 22);
```

## 3. SELECT
Fetch data from a database. This statement will return all data in the `name` column of the `celebs` table.
```sql
SELECT name FROM celebs;
```

## 4. ALTER TABLE
Adds a new column to a table.
Always come with `ADD COLUMN`.
```sql
ALTER TABLE celebs 
ADD COLUMN twitter_handle TEXT;
```

## 5. UPDATE
Edit row in a table.
```sql
UPDATE celebs 
SET twitter_handle = '@taylorswift13' 
WHERE id = 4;
```

## 6. DELETE FROM
Delete one or more `rows` from a table.
```sql
DELETE FROM celebs 
WHERE twitter_handle IS NULL;
```

## 7. __Constraints__
Add information about how a column can be used are invoked after specifying the data type for a column. They can tell the database to reject inserted data that does not adhere to certain restriction.
```sql
CREATE TABLE celebs (
   id INTEGER PRIMARY KEY, 
   name TEXT UNIQUE,
   date_of_birth TEXT NOT NULL,
   date_of_death TEXT DEFAULT 'Not Applicable'
);
```
   1. PRIMARY KEY
   To uniquely identify the row.
   Attempts to insert a row with an existed identical value will result in a __constraint violation__ which will not allow you to insert the new row.

   2. UNIQUE
   Have different value for every row. Smilar to `PRIMARY KEY` except a table can have many different `UNIQUE` columns.

   3. NOT NULL
   This column must have a value. Else, result in a __contraint violation__.

   4. DEFAULT
   Take an additional argument that will be the assumed value for an inserted row if the new row does not specify a value for that column.



# Queries

## 1. SELECT

Query data from a database.
```sql
SELECT column1, column2 
FROM table_name;
```

## 2. AS

Allows user to __rename__ a column or table using an alias.
```sql
SELECT name AS 'Alias'
FROM targetTable;
```

## 3. DISTINCT

Used to return unique values in the output. It filters out all dupliate values in the specified column(s).
```sql
SELECT DISTINCT tools 
FROM inventory;
```

## 4. WHERE

To restrict query result
```sql
SELECT * 
FROM movies 
WHERE imdb_rating < 5;
```

## 5. LIKE

Compare similar values. Always come with `WHERE` clause to search specific pattern in a column.

### i. wildcard character `-`

```sql
SELECT * 
FROM movies
WHERE name LIKE 'Se_en';
```
The `_` means that position can be substitute with any individual character.

### ii. wildcard character `%`

```sql
SELECT * 
FROM movies
WHERE name LIKE 'A%';
```
`%` matches zero or more missing letters in the pattern.
- `A%` matches all movies with name that begin with letter 'A'
- `%a` matches all movies that end with 'a'

## 6. NULL

Unknown value are indicated by `NULL`. Use in `WHERE` clause.

## 7. BETWEEN

Used in `WHERE` clause to filter the result set within a certain range. It accept **two** values that are eithrt numbers, text and dates.
```sql
SELECT * 
FROM movies 
WHERE year BETWEEN 1970 AND 1979;
```
## 8. AND

Combine multiple confitions in a WHERE clause.
```sql
SELECT * 
FROM movies
WHERE year BETWEEN 1990 AND 1999
   AND genre = 'romance';
```

## 9. OR

Display a row if `any` condition if true.

## 10. ORDER BY

Sort the result by either alphabetically or numerically.
- DESC
Sort from high to low (Z-A)
- ASC
Sort from low to high (A-Z)
```sql
SELECT *
FROM movies
WHERE imdb_rating > 8
ORDER BY year DESC;
```

## LIMIT

Let you specify the maximum number of rows the result set will have.
```sql
SELECT * 
FROM movies 
ORDER BY imdb_rating DESC 
LIMIT 3;
```
`LIMIT` always hoes at the end of the query. **NOt all database support `LIMIT`.**

## CASE

To create different outputs (usually in the `SELECT` statement).
- Each `WHEN` tests a condition and the following `THEN` hives us the string if the condition is true.
- The `ELSE` gives us the string if __all__ the above conditions are false.
- The `CASE` statement must end with `END`.
```sql
SELECT name,
 CASE
  WHEN genre = 'romance' THEN 'Chill'
  WHEN genre = 'comedy' THEN 'Chill'
  ELSE 'Intense'
 END AS 'Mood' 
FROM movies;
```