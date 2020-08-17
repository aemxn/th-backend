const entries = require('./entries.controller');

module.exports = {
    entries,

    environment(req, res) {
        let message = process.env.NODE_ENV || 'development';
        return res.status(200).send( { message: message });
    }
};