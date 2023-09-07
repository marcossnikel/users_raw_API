# Project to review some backend concepts and learn more about NodeJS 🤩

### This CRUD was made in Ignite, to reinforce some basic backend concepts, learned a lot about

1. `Streams`
2. `Query Parameters`
3. `Route Parameters`
4. `Request Body`
5. `Middlewares`
6. `Databases`

### It is an CRUD of users, it is possible to

- **_Add new user_**
- **_Update info about existing user on his id_**
- **_Delete an user based on his id_**
- **_Get a listage of users_**

**I Created an 'fake database' using fs from node to persist the data**

### How to capture query parameters

-> Query Parameters Example : `localhost:3333/users?userId=1&name=Marko`

#### Example of files to implement an query parameter

```javascript
//Routes.js
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
  ]
//Database.js
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
//Function to stract query params
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
