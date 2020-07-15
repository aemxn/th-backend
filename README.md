# Terjadinya Hidup Web

Bridging the past and the future.

### Starting

1. Set database config in `.env`
2. Install dependencies - `npm install` 
3. Running:
   - Development - `npm run dev`
   - Production - `npm run prod`
   - Hot reload (production) - `npm run watch`

*See `config/config.js` for environment config routing.*

### Bootstraping from scratch

1. Initialize framework

    Use `express-generator` from npm for bootstraping directory and basic framework.

2. Initialize Sequelize
    ```
    npx sequelize init
    ```
    `/config`, `/migrations`, `/seeders` folder will be created.

3. Create migration file
    ```
    npx sequelize migration:create --name MIGRATION_NAME
    ```
    New migration file will be created in `/migrations` folder

**Sequelize commands:**
```
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