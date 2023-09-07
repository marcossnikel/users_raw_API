# Users CRUD 🚀🤩

## Running Locally

1. Clone the repository:

```bash
git clone git@github.com:marcossnikel/users_raw_API.git
```

2. Navigate to the project folder:

```bash
cd users_raw_API
```

3. Verify that you have Node.js installed:

```bash
node --version
```

4. Run the project:

```bash
npm run dev
```

You might be wondering, "Is it not necessary to run `npm install`?" No, you know why? This is a CRUD built using only native Node.js tools; no external libraries are required.

### Project Overview

This CRUD project was developed as part of Ignite to reinforce fundamental backend concepts and further enhance our knowledge of Node.js.

Throughout this project, we explored the following key concepts:

1. `Streams`
2. `Query Parameters`
3. `Route Parameters`
4. `Request Body`
5. `Middlewares`
6. `Databases`

### Functionality

This CRUD application for managing users allows you to:

- **_Add a new user_**
- **_Update information about an existing user based on their ID_**
- **_Delete a user based on their ID_**
- **_Retrieve a list of users_**

We have implemented a "fake database" using the Node.js `fs` module to persist the data.

### How to Use Query Parameters

To illustrate how to use query parameters, consider the following example: `localhost:3333/users?userId=1&name=Marko`.

#### Sample Files for Implementing Query Parameters

Here are some example files that demonstrate how to handle query parameters:

```javascript
// Routes.js
export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const { search } = req.query;
      const users = database.select(
        "users",
        search
          ? {
              name: search,
              email: search,
            }
          : null
      );

      return res.writeHead(200).end(JSON.stringify(users));
    },
  },
];

// Database.js
select(table, search) {
  let data = this.#database[table] ?? [];

  if (search) {
    data = data.filter((row) => {
      return Object.entries(search).some(([key, value]) => {
        return row[key].toLowerCase().includes(value.toLowerCase());
      });
    });
  }
  return data;
}

// Function to extract query parameters
export function extractQueryParams(query) {
  return query
    .substr(1)
    .split("&")
    .reduce((queryParams, param) => {
      const [key, value] = param.split("=");
      queryParams[key] = value;

      return queryParams;
    }, {});
}
```

Feel free to explore this project, and enjoy your journey into Node.js backend development! 🚀🤓
