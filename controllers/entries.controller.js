const repository = require('../repository/entries.repository');

module.exports = {
    list(req, res) {
        return repository.list()
        .then(entries => {
        //   do anything here
          res.status(200).send(entries);
        //   res.render('entries', { title: 'Entries', items: entries });
        })
        .catch(error => res.status(400).send(error));
    },

    findTitle(req, res) {
        return repository.findTitle(req.body.title)
        .then(entries => res.status(200).send(entries))
        .catch(error => res.status(400).send(error));
    },

    search(req, res) {
        return repository.search(req.body.query)
        .then(entries => res.status(200).send(entries))
        .catch(error => res.status(400).send(error));
    },

    searchDate(req, res) {
        return repository.searchDate(req.body.date)
        .then(entries => res.status(200).send(entries))
        .catch(error => res.status(400).send(error));
    },

    retrieve(req, res) {
        return repository.retrieve(req.params.id)
        .then(entry => {
            if(!entry) {
                return res.status(404).send({ message: 'Entry Not Found' })
            }
            res.status(200).send(entry);
        })
        .catch(error => res.status(400).send(error));
    },

    latest(req, res) {
        return repository.latest()
        .then(entries => {
            res.status(200).send(entries);
        })
        .catch(error => res.status(400).send(error))
    },

    create(req, res){
        var new_entry = {
            title: req.body.title,
            date: req.body.date,
            body: req.body.body
        };

        return repository
            .create(new_entry)
            .then(entry => res.status(201).send({ message: 'Entry Created Successfully.' }))
            .catch(error => res.status(400).send(error));
    },

    update(req){
        var update_entry = {
            title: req.body.title,
            body: req.body.body,
            date: req.body.date
        };
        return repository.update(req.params.id, update_entry);
    },

    destroy(req){
        return repository.destroy(req.params.id);
    }
};