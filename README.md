# Build Week Scaffolding Node

## Requirements

- [PostgreSQL, pgAdmin 4](https://www.postgresql.org/download/) and [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed in your local machine.
- A Heroku app with the [Heroku PostgreSQL Addon](https://devcenter.heroku.com/articles/heroku-postgresql#provisioning-heroku-postgres) added to it.
- Development and testing databases created with [pgAdmin 4](https://www.pgadmin.org/docs/pgadmin4/4.29/database_dialog.html).

## Starting a New Project

- Clone this project to your local.
- Destroy the existing git repository by running `rm -rf .git` inside the cloned project.
- Initialize a git repository by running `git init`.
- Create a new repository on Github and link the local repo to the one on Github.
- Create a `.env` file and follow the instructions inside `knexfile.js`.
- Fix the scripts inside `package.json` to use your Heroku app.

## Scripts

- **start**: Runs the app.
- **server**: Runs the app with Nodemon.
- **migrate**: Migrates the local development database to the latest.
- **rollback**: Rolls back migrations in the local development database.
- **seed**: Truncates all tables in the local development database, you can add extra seed files.
- **test**: Runs tests.
- **deploy**: Deploys the main branch to Heroku.

**The following scripts NEED TO BE EDITED before using: replace `YOUR_HEROKU_APP_NAME_HERE`**

- **migrateh**: Migrates the Heroku database to the latest.
- **rollbackh**: Rolls back migrations in the Heroku database.
- **databaseh**: Opens a psql session that allows you to interact with the Heroku database from the command line.
- **seedh**: Truncates all tables in the Heroku database, you can add extra seed files.

## Hot Tips

- Figure out dbAdmin 4 and the deployment flow before writing any code.

- If you need to make changes to a migration file that has already been released, follow this sequence:

  1. Roll back migrations in the Heroku database
  2. Deploy the latest code to Heroku
  3. Migrate the Heroku database to the latest

- If your frontend devs are clear on the shape of the data they need, you can quickly build provisional endpoints that return mock data. They shouldn't have to wait for you to build the entire backend.

- Keep your endpoints super lean: the bulk of the code belongs inside middlewares and models.

- Validating and sanitizing client data using a library is much less work than doing it manually.

- Revealing crash messages to clients is a security risk, but during development it's best if your frontend devs can tell you what really crashed.

- PostgreSQL comes with [fantastic built-in functions](https://hashrocket.com/blog/posts/faster-json-generation-with-postgresql) to massage rows into JSON.

- If you need to edit a migration that has already been released but don't want to destroy the data, make a new migration instead. This is a more realistic flow too: production databases are never migrated down. We migrate Heroku down freely only because there's no valuable data from customers in it.

- If your fronted devs are interested in running the API locally, help them set up pgAdmin 4 and PostgreSQL in their machines, and teach them how to run migrations. This empowers them to (1) help you troubleshoot bugs, (2) obtain the latest code by simply doing `git pull` and (3) work with their own data without it being wiped every time you roll back the Heroku db to tweak a migration. Collaboration is more fun and direct, and you don't need to deploy as often.
