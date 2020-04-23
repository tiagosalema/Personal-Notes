# JOIN

Joins different tables together.
There are 2 `JOIN`s: `INNER` (default) and `OUTER`. `INNER` returns only the results that meet the condition given after the `ON` statement. `OUTER` is divided into `LEFT` and `RIGHT` (`OUTER` is actually not used *per se*, but `LEFT`/`RIGHT` instead). `LEFT` will return **all** results of the first table, even if the condition after `ON` isn't met. `RIGHT` will return all the entries from the second table. These keywords have to be written before `JOIN`. 

```mysql
SELECT *
FROM orders
JOIN customers ON customers.id = orders.customer_id
```

This will bring all the info of the customer, which is stored in the table `customers` into the table `orders`, which only has the customer id.

## USING

When the columns on both tables have the same name i.e.

```mysql
JOIN customers ON customers.customer_id = orders.customer_id
```

one can simply write

```mysql
JOIN customers USING (customer_id)
```

## Alias

It's possible to apply an alias for table by writting something after it:

```mysql
FROM orders o
JOIN customers c ON c.id = o.customer_id
```

## Self join

Useful when we want to display relational data within the same table. An example would be having a table of employees for which one column would have a manager, which is also an employee

```mysql
USE sql_hr;

SELECT
	e.employee_id,
	e.first_name,
	e.first_name AS manager
FROM employees e
JOIN employees m
	ON e.reports_to = m.employee_id
```

## Compound join

Usually tables have a column that uniquely identifies each entry. That is not always the case, though. It is possible that some products are uniquely identified by 2+ columns. Example:

| order_id | product_id | quantity | unit_price |
| -------- | ---------- | -------- | ---------- |
| 1        | 1          | 3        | 2          |
| 1        | 2          | 5        | 2          |
| 2        | 1          | 10       | 2          |

In order 1, there were 2 products being ordered. In order 2, another product 1 was order. This way, we need the combination of the first 2 columns to uniquely identify each row. `order_id` is a column that maybe identifies the order uniquely in another table, and the same thing for `product_id`. Here, the table has 2 primary keys. To this, we call *composite primary key*. 

```mysql

```



# WHERE

## 	IN

```mysql
WHERE name IN ('John', 'Carol', 'Peter')
```

## 	BETWEEN

```mysql
WHERE age BETWEEN 10 AND 25
```

`BETWEEN` also works with dates in the format `YYYY-MM-DD`

## 	REGEXP

```mysql
WHERE string REGEXP '^www\.\d+\.\d+$'
```

selects only websites

## 	LIKE

A more simple `REGEXP`. Only 2 special characters exist:

+ `%` - any number of characters go here, including 0; and
+ `_` - exactly one character goes here

```mysql
WHERE url LIKE '%.com'
```

​	- `url`s finishing in `.com`

```mysql
WHERE url LIKE '%.__'
```

​	- `url`s finishing in with 2 characters after the `.`

## 	NULL

```mysql
WHERE phone IS NULL
WHERE phone IS NOT NULL
```

# ORDER BY

```mysql
ORDER BY first_name DESC
```

It's also possible to order more than one column (in case there are duplicates for the first ordered column).

```mysql
ORDER BY last_name, first_name
```

```mysql
SELECT first_name, last_name, age
FROM clients
ORDER BY 1, 2 			-- orders by first_name and then last_name. Should be avoided cause SELECT 												may change in the future
```

Order doesn't have to be a selected column. It can also be an operation of a column e.g.

```mysql
ORDER BY unit_price * units
```

` ASC` is by default

# LIMIT

```mysql
SELECT *
FROM clients
LIMIT 3			-- limits the output to 3 results
```

```mysql
LIMIT 6, 3 	-- limits the output to 3 after having skipped 6 results (offset: 6)
```

# INSERT INTO

Inserts new items into the `orders` table

```mysql
INSERT INTO orders (customer_id, price)
VALUES (1,10)
```

It is not necessary to specify the names of the variables we are going to define (`customer_id`, `price`). The advantage of doing so is that we don't have to give a value to the variables that are automatically assigned i.e. the ones that are set with a default value e.g. the private key, which should be incremented for each new entry.

It's possible to insert into a table by doing, instead of `VALUES`, using a `SELECT` query instead. In this case, if we want all the columns from the select query, we don't need to provide their name under parenthisis. 

## 	LAST_INSERT_ID()

Sometimes we may want to insert an item and right after insert an entry whose id is the item we just created. Since we don't know what that id is going to be, we can use the keyword `LAST_INSERT_ID()` to access that value, stored in the MySQLWorkbench cache.

## CREATE TABLE

```mysql
CREATE TABLE orders_archive AS
SELECT * FROM orders
```

```mysql
CREATE TABLE orders_archive	-- we can add specific columns by adding: (col1, col2)
	SELECT *
	FROM orders
	WHERE date < "___"
```

# UPDATE

```mysql
UPDATE invoices
SET payment = 100, payment_date = "___"
WHERE client_id = 1
```

# DELETE

```mysql
DELETE FROM invoices
```

will delete all the records from the invoices table

```mysql
DELETE FROM invoices
WHERE invoice_id = 1
```



# Extra info

If I am doing

```mysql
WHERE client_id = ...
```

and I need to run yet another query to know the client id, I can do it by surrounding it with parenthisis, which MySQL willl run first:

```mys
WHERE client_id =
					(SELECT client_id
					FROM clients
					WHERE name = "Xixas")
```



+++



Anytime I would like to run just a specific piece of the code to asure that it is outputing the right value, I can select it and run only alone.



+++





