const Entry = require('../models').Entry;
const { Op } = require('sequelize');

module.exports = {

    create(req, res){
        return Entry
            .create({
                title: req.body.title,
                date: req.body.date,
                body: req.body.body
            })
            .then(entry => res.status(201).send({ message: 'Entry Created Successfully.' }))
            .catch(error => res.status(400).send(error));
    },

    findTitle(req, res){
        return Entry
            .findAll({
                where: {
                    title: {
                        [Op.substring]: req.body.title
                    }
                }
            })
            .then(entries => res.status(200).send(entries))
            .catch(error => res.status(400).send(error));
    },

    // SELECT * FROM entries WHERE title LIKE '%query%' OR body LIKE '%query%'
    search(req, res){
        return Entry
            .findAll({
                where: {
                    [Op.or]: [
                        { title: { [Op.substring]: req.body.query } },
                        { body: { [Op.substring]: req.body.query } }
                    ]
                }
            })
            .then(entries => res.status(200).send(entries))
            .catch(error => res.status(400).send(error));
    },

    searchDate(req, res){
        return Entry
            .findAll({
                where: {
                    date: {
                        [Op.like]: req.body.date
                    }
                }
            })
            .then(entries => res.status(200).send(entries))
            .catch(error => res.status(400).send(error));
    },

    list(req, res){
        return Entry
            .findAll()
            .then(entries => res.status(200).send(entries))
            .catch(error => res.status(400).send(error));
    },

    retrieve(req, res){
        return Entry
            .findByPk(req.params.id)
            .then(entry => {
                if(!entry) {
                    return res.status(404).send({ message: 'Entry Not Found' })
                }
                res.status(200).send(entry);
            })
            .catch(error => res.status(400).send(error));
    },

    update(req, res){
        return Entry
            .findByPk(req.params.id)
            .then(entry => {
                if (!entry) {
                    return res.status(404).send({ message: 'Entry Not Found' });
                }
                return entry
                    .update({
                        title: req.body.title || entries.title,
                        body: req.body.body || entries.body,
                        date: req.body.date || entries.date
                    })
                    .then(() => res.status(200).send({ message: 'Entry Updated Successfully.' }))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    destroy(req, res){
        return Entry
            .findByPk(req.params.id)
            .then(entry => {
                if (!entry) {
                    return res.status(400).send({ message: 'Entry Not Found' });
                }
                return entry
                    .destroy()
                    .then(() => res.status(200).send({ message: 'Entry Deleted Successfully.' }))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
};