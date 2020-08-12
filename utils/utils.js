const moment = require('moment');
const fs = require('fs');

module.exports = {
    
    getPagination: function (page, size) {
        const limit = size ? +size : 5;
        const offset = page ? page * limit : 0;
    
        return { limit, offset };
    },

    getPagingData: function (data, page, limit) {
        const { count: totalItems, rows: entries } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);
    
        return { totalPages, currentPage, totalItems, entries };
    },

    writeToFile: function(json, callback) {
        let data = JSON.stringify(json);
        let path = '../';
        let filename = 'juno-export-' + this.formatFilename(new Date()) + '.json';

        fs.writeFile(`${path + filename}`, data, 'utf8', function cb(err) {
            if (err) return err;
            callback(filename, data);
        });
    },

    formatFilename: function(date) {
        moment.locale('ms-my');
        return moment(date).format('YYYY-MM-DD.hhmmss');
    },

    // escape character for MySQL purpose
    escape_html: function (str) {
        if (typeof str != 'string')
        return str;

        return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
            switch (char) {
                case "\0":
                    return "\\0";
                case "\x08":
                    return "\\b";
                case "\x09":
                    return "\\t";
                case "\x1a":
                    return "\\z";
                case "\n":
                    return "\\n";
                case "\r":
                    return "\\r";
                case "\"":
                case "'":
                case "\\":
                case "%":
                    return "\\"+char; // prepends a backslash to backslash, percent,
                                    // and double/single quotes
            }
        });
    }
}