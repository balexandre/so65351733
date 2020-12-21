# StackOverflow helper for question 65351733

Answer can be found on [StackOverflow](https://stackoverflow.com/q/65351733/28004)

***

A simple project that creates a basic REST API to handle MOngoDB documents via mongoose package

It uses an `.http` file (found in the `test` folder) that creates a POSTMAN alike query with the VS Code extension [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

Here's a demo

![](https://i.imgur.com/UxLhy1z.gif)

## Run with Docker

you can easily have a MongoDB instance using Docker, after install Docker Desktop, run

```bash
docker run -d -p 27017:27017 --name mongoDB -d mongo:latest
```

and the application will then be able to connect via `mongodb://localhost/<db_name>` connection string