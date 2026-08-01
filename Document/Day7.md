# Day 7: Advanced Data Seeding with Faker.js and Database Populators

## Concepts Learned Today
* **Automated Data Mocking:** Integrated `@faker-js/faker` to programmatically generate realistic dataset details (names, emails, product titles, prices, and quantities).
* **Asynchronous Seed Pipelines:** Wrapped callback-based MySQL queries with JavaScript Promises to support synchronous control flow using `async/await`.
* **Structured Data Generation:** Generated exact mock schema matches including specific range restrictions for `BIGINT` phone numbers and `FLOAT` decimal values.
* **Bulk Insert Operations:** Leveraged MySQL parameter formatting `[ [row1], [row2] ]` to insert all mock records in a single query execution.

## Mistakes Made
* **Invalid Parameter Nesting in Bulk SQL:** Initially attempted to pass the raw nested data array directly without nesting it inside another parameters array, causing SQL syntax errors.
* **Date Format Serialization:** Tried to insert raw Date objects into the database instead of formatting them as `YYYY-MM-DD` string format, causing MySQL invalid date warnings.

## Debugging Methods
* **SQL Log Tracing:** Printed generated SQL arrays directly to the console before executing to confirm the array structure matches MySQL parameters expectation.
* **Post-Seed CLI Auditing:** Ran select count queries in the MySQL command line immediately after seeding to verify that the rows were successfully created.

## Key Questions Addressed
* **Why use bulk inserts rather than individual loops?** Individual insert queries trigger separate database roundtrips, which degrades database performance; bulk inserts group operations into a single network transmission and transaction.
* **How should date formats be managed for MySQL DATE columns?** Extract the ISO date segment `toISOString().split('T')[0]` to guarantee compatibility with MySQL's `YYYY-MM-DD` expectations.
