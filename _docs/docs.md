- [Structure and Documentation](#structure-and-documentation)
  - [Creating a new route](#creating-a-new-route)
  - [Naming convention](#naming-convention)
  - [Passing parameter](#passing-parameter)
  - [Front-end](#front-end)
  - [Read](#read)

# Structure and Documentation

Using MVC architecture and Repository Pattern.

![Structure][structure-image]

## Creating a new route

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

## Naming convention

Naming convention is important for easy code navigation. Every routes, controllers, repository, and models are using the same name.

Depending on where the file came from, append it with its corresponding folder.

*Eg. `*.controller.js` for Controller or `*.repository.js` for Repository.*


## Passing parameter

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

## Front-end

[Juno (Client)][juno-ui]

---

## Read

- [Promise chaining][promise-chaining]
- [Async-await in loops][async-loop]

[express-generator]: https://expressjs.com/en/starter/generator.html
[structure-image]: https://i.imgur.com/yB8AqTj.jpg
[promise-chaining]: https://javascript.info/promise-chaining
[async-loop]: https://zellwk.com/blog/async-await-in-loops/
[juno-ui]: http://github.com/aemxn/juno-ui/