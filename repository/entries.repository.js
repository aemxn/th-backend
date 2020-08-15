const Entry = require('../models').Entry;
const { Op } = require('sequelize');

module.exports = {

    all() {
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
    explore({ query, date, limit, offset }){
        console.log({ date, limit, offset });
        return Entry.findAndCountAll({
                where: {
                    [Op.or]: [
                        { title: { [Op.substring]: query } },
                        { body: { [Op.substring]: query } }
                    ],
                    date: {
                        [Op.substring]: date
                    }
                },
                limit,
                offset
            });
    },

    retrieve(id){
        return Entry.findByPk(id);
    },

    latest() { // return recent 5 entries
        return Entry.findAll({
            limit: 5,
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