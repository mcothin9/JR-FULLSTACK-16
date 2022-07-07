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
