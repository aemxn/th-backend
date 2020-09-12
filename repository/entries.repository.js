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
                offset,
                order: [['date', 'DESC']]
            });
    },

    // SELECT `id`, `title`, `date`, `body`, `createdAt`, `updatedAt` FROM `Entries` AS `Entry` WHERE concat(year(`date`), '-', month(`date`), '2020-8') IS NULL ORDER BY `Entry`.`id` DESC LIMIT 0, 5;
    async exploreMonth({ date, limit, offset }) {
        let criteria = Entry.sequelize.fn("concat", Entry.sequelize.fn("year", Entry.sequelize.col("date")), "-", Entry.sequelize.fn("month", Entry.sequelize.col("date")));

        return Entry.findAndCountAll({
            where: Entry.sequelize.where(criteria, date),
            limit,
            offset,
            order: [['date', 'DESC']]
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

    totalRows() {
        return Entry.findAll({
            attributes: [
              [Entry.sequelize.fn('COUNT', Entry.sequelize.col('id')), 'total_rows']
            ]
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
    },

    async customQuery(query) {
        const [results, metadata] = await Entry.sequelize.query(query);
        return results;
    }
};