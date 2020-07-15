# Terjadinya Hidup Web

### Starting

Install dependencies - `npm install` 

Normal start - `npm start`

Hot reload - `npm run server`

### Bootstraping from scratch

0. Initialize framework

Use express-generator from npm.

1. Initialize Sequelize

```
npx sequelize init
```

config, migrations, seeders folder will be created.

2. Create migration file

```
npx sequelize migration:create --name MIGRATION_NAME
```

New migration file will be created in /migrations folder

**Sequelize commands:**
```
$ npx sequelize db:migrate        # Run pending migrations.
$ npx sequelize db:migrate:undo   # Revert the last migration run.
$ npx sequelize help              # Display this help text.
$ npx sequelize init              # Initializes the project.
$ npx sequelize migration:create  # Generates a new migration file.
$ npx sequelize version           # Prints the version number.
```

Models definition: https://sequelize.org/v5/manual/models-definition.html
Adding new column: https://dev.to/nedsoft/add-new-fields-to-existing-sequelize-migration-3527