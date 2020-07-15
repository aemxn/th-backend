const Entry = require('../models').Entry;
const { Op } = require('sequelize');

module.exports = {

    list() {
        return Entry.findAll();
    },

    findTitle(title){
        return Entry.findAll({
                where: {
                    title: {
                        [Op.substring]: title
                    }
                }
            });
    },

    // SELECT * FROM entries WHERE title LIKE '%query%' OR body LIKE '%query%'
    search(query){
        return Entry.findAll({
                where: {
                    [Op.or]: [
                        { title: { [Op.substring]: query } },
                        { body: { [Op.substring]: query } }
                    ]
                }
            });
    },

    searchDate(date){
        return Entry.findAll({
                where: {
                    date: {
                        [Op.like]: date
                    }
                }
            });
    },

    retrieve(id){
        return Entry.findByPk(id);
    },

    latest() {
        return Entry.findOne({
            order: [['id', 'DESC']]
        });
    },

    create(new_entry){
        return Entry.create(new_entry);
    },

    update(id, update_entry){
        return Entry.findByPk(id)
        .then(entry => {
            if (!entry) {
                return res.status(404).send({ message: 'Entry Not Found' });
            }
            return entry
                .update(update_entry)
                .then(() => res.status(200).send({ message: 'Entry Updated Successfully.' }))
                .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },

    destroy(id){
        return Entry.findByPk(id)
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