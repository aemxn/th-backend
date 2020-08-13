var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send({
    status: 200,
    message: 'Juno Backend API v1'
  });
});

module.exports = router;
