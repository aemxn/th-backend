# Juno (Server)

The backend server for [Juno (Client)][juno-ui].

## Starting

**System dependencies:**

- MySQL (v8+)
- Node (v12+), npm (v6+)

Clone the repo then,

1. Set database config in `.env`
2. Install dependencies - `npm i` 
3. Running:
   - Development (hot reload) - `$ npm run dev`
   - Production - `$ npm run prod`
   - Production (hot reload) - `$ npm run prod-watch`

*See `config/config.js` for environment config routing.*

A successful build will return:

```
----------------------
SERVER STARTED
Listening on port 3000
Environment: development
Database: db_name
----------------------
```

## Bootstraping from scratch

1. Initialize Express framework

    Use [`express-generator`][express-generator] to bootstrap directory and basic framework.
    
    ```
    $ npx express-generator
    ```

2. Initialize Sequelize
    ```
    $ npx sequelize init
    ```
    `/config`, `/migrations`, `/seeders` folder will be created.

3. Create migration file
    ```
    $ npx sequelize migration:create --name MIGRATION_NAME
    ```
    New migration file will be created in `/migrations` folder

**Sequelize commands:**
```bash
$ npx sequelize db:migrate        # Run pending migrations.
$ npx sequelize db:migrate:undo   # Revert the last migration run.
$ npx sequelize help              # Display this help text.
$ npx sequelize init              # Initializes the project.
$ npx sequelize migration:create  # Generates a new migration file.
$ npx sequelize version           # Prints the version number.
```

RTFM: https://sequelize.org/master/  
Models definition: https://sequelize.org/v5/manual/models-definition.html  
Adding new column: https://dev.to/nedsoft/add-new-fields-to-existing-sequelize-migration-3527  
Sequelize config: https://sequelize.org/master/manual/migrations.html#the--code--sequelizerc--code--file

[express-generator]: https://expressjs.com/en/starter/generator.html
[juno-ui]: http://github.com/aemxn/juno-ui/