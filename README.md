# MyApi


# Testing

## OpenApi

This project has OpenApi(Swagger)

```http
http://localhost:3000/api

```

### Database

//TODO: Create a docker file

Create a test database

run the follow seeds:

1. NODE_ENV=test npx sequelize-cli db:seed --seed 20210423141528-feed-roles.js

### Run tests

```bash
npm run test:e2e
```

> Be sure that you have a test database(with seeds);
