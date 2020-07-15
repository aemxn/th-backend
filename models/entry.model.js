'use strict';
module.exports = (sequelize, DataTypes) => {
  const Entry = sequelize.define('Entry', {
    title: DataTypes.STRING,
    date: DataTypes.STRING,
    body: DataTypes.STRING
  }, {});
  return Entry;
};