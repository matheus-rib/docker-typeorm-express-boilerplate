# Docker Typeorm Express Boilerplate
[![GitHub license](https://img.shields.io/github/license/matheus-rib/docker-typeorm-express-boilerplate)](https://github.com/matheus-rib/docker-typeorm-express-boilerplate/blob/main/LICENSE)
![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/matheus-rib/docker-typeorm-express-boilerplate/main)

Boilerplate for an API made using Typescript, Express, PostgreSQL, Docker and Jest (for unit and feature testing)[^1].

## Table of Contents
  - [Features](#features)
  - [Requirements](#requirements)
  - [How to run](#how-to-run)
  - [Commands](#commands)
    - [Install dependencies](#install-dependencies)
    - [Run the API](#run-the-api)
    - [Migrations](#migrations)
    - [Run commands](#run-commands)
    - [Tests](#tests)
  - [Authors](#authors)

## Features
Few features included in this project (check [templates folder](https://github.com/matheus-rib/docker-typeorm-express-boilerplate/tree/main/templates) for better description / documentation)
- Base entity (to avoid creating same fields as `id`, `createdAt` and `updatedAt` over and over again)
- Testing setup (Factories and Feature testing)
- Premade pagination service / middleware
- Error handling
- Swagger documentation

## Requirements
- [Docker](https://www.docker.com) (and docker-compose)
- Node v18

## How to run
- Create `.env` file using `.env.example` as base
- Install dependencies ([check commands session](#commands))
- Run the API ([check commands session](#commands))

## Commands

### Install dependencies
```bash
# Install dependencies
docker-compose run --rm api yarn
```

### Run the API
```bash
# Start the api
docker-compose up
# Then open http://localhost:4000
```

### Migrations
- Run migrations
```bash
# API must be running
yarn docker:migration:run
# or: npm run yarn docker:migration:run
```

- Generate new migration
```bash
# API must be running
yarn docker:migration:generate MigrationName
# or: npm run docker:migration:generate MigrationName
```

## Run commands
```bash
docker-compose run --rm api ...
```

## Tests
To run all tests: 
```bash
yarn docker:test
# or: npm run docker:test
```

To run a specific test: 
```bash
yarn docker:test yarn test tests/folder_you_wanna_test/...
# or: npm run docker:test yarn test tests/folder_you_wanna_test/...
```

## Authors
- Matheus Ribeiro

[^1]: It contains an Adminer instance running on port 8080 for easier DB access, if you want to disable it, just erase (or comment) the lines on `docker-compose.yml`
