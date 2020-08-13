const repository = require('../repository/entries.repository');
const util = require('../utils/utils.js');

module.exports = {
    exportAll(req, res) {
        return repository.all()
        .then(entries => {
            let json = { 'entries' : [] };
            for (entry of entries) {
                json.entries.push(entry);
            }
            util.writeToFile(json, function callback(filename, data) {
                data = JSON.parse(data);
                res.status(200).send({
                    'message': 'Successfully exported',
                    'filename': `${filename}`,
                    'length': data.entries.length,
                    'last_row': data.entries[data.entries.length-1]});
            });
        })
        .catch(error => res.status(400).send(error));
    },

    list(req, res) {
        const { page, size } = req.query;
        const { limit, offset } = util.getPagination(page, size);

        if (page < 0) return res.status(400).send({ message: 'Page must be positive number'});
        
        return repository.list({ limit, offset })
        .then(entries => {
            const paged = util.getPagingData(entries, page, limit);
            res.status(200).send(paged)
        })
        .catch(error => res.status(400).send({ message: error.name }));
    },

    findTitle(req, res) {
        return repository.findTitle(req.body.title)
        .then(entries => res.status(200).send(entries))
        .catch(error => res.status(400).send(error));
    },

    search(req, res) {
        const { page, size, query } = req.query;
      
        const { limit, offset } = util.getPagination(page, size);
        
        return repository.search({ query, limit, offset })
        .then(entries => {
            const paged = util.getPagingData(entries, page, limit);
            res.status(200).send(paged)
        })
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
            .then(entry => res.status(201).send({ message: 'Entry created successfully', data: entry }))
            .catch(error => res.status(400).send(error));
    },

    update(req, res){
        var update_entry = {
            title: req.body.title,
            body: req.body.body,
            date: req.body.date
        };

        repository.retrieve(req.params.id)
        .then(entry => {
            if(!entry) {
                return res.status(404).send({ message: 'Entry Not Found' })
            }
            return repository.update(entry, update_entry)
            .then(() => res.status(200).send({ message: 'Entry Updated Successfully.' }))
            .catch((error) => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },

    destroy(req, res){
        repository.retrieve(req.params.id)
        .then(entry => {
            if(!entry) {
                return res.status(404).send({ message: 'Entry Not Found' })
            }
            return repository.destroy(entry)
            .then(() => res.status(200).send({ message: 'Entry Deleted Successfully.' }))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }
};