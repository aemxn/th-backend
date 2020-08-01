# Juno
**Server**

Description: Bridging the past and the future.

## Starting

**System dependencies:**

- MySQL (v8+)
- Node (v12+), npm (v6+)

Clone the repo then,

1. Set database config in `.env`
2. Install dependencies - `npm i` 
3. Running:
   - Development - `$ npm run dev`
   - Hot reload (development) - `$ npm run dev-watch`
   - Production - `$ npm run prod`
   - Hot reload (production) - `$ npm run watch`

*See `config/config.js` for environment config routing.*

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

## Structure and Documentation

Using MVC architecture and Repository Pattern.

![Structure][structure-image]

### Creating a new route

Assuming the route needs to fetch/send data to database.

1. Create a new API routes 
    - in `app.js` &mdash; define API route
    - in `/routes` folder &mdash; create new route file
2. Add API resources in newly created file in `/routes`
    - eg. `router.get('/', controller.list);` &mdash; GET list
3. Create a controller file for this route
    - in `/controllers` folder
    - Controller &mdash; as an intermediary to control data coming in and out (rendering to view).
4. Create a repository file for this route
    - in `/repository` folder
    - Repository &mdash; any job related to database (fetch, delete, update) is to be put in here
5. Create a model for this route
    - in `/models` folder
    - Models &mdash; only put database schema here, no business logic

### Naming convention

Naming convention is important for easy code navigation. Every routes, controllers, repository, and models are using the same name.

Depending on where the file came from, append it with its corresponding folder.

*Eg. `*.controller.js` for Controller or `*.repository.js` for Repository.*


### Passing parameter

Passing parameter from a function to a function need to be said explicitly.

If the concrete function needs a STRING ID, pass a STRING ID from the function it is called from. **DO NOT** pass object if the concrete function just needs a STRING variable, *unless it needs to*. Otherwise, you are dumb and won't be able to know what the fuck it means in the future.

*Example:*

From a caller:

```javascript
repository.findTitle(req.body.title); // explicit
```

To a function:

```javascript
findTitle(title){
    return Entry.findAll({
            where: {
                title: {
                    [Op.substring]: title
                }
            }
        });
}
```

### Front-end

https://github.com/aemxn/juno-ui

[express-generator]: https://expressjs.com/en/starter/generator.html
[structure-image]: https://i.imgur.com/yB8AqTj.jpg