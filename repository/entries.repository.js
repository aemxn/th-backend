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

    update(entry, update_entry){
        return entry.update(update_entry);
    },

    destroy(entry){
        return entry.destroy();
    }
};