var express = require('express');
var router = express.Router();
const index = require('../controllers/index')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send({
    status: 200,
    message: 'Juno Backend API v1'
  });
});

router.get('/environment', index.environment);

module.exports = router;
