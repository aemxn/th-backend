const express = require('express');
const router = express.Router();
const entriesController = require('../controllers/entries');

/* GET home page. */
router.get('/test', function(req, res, next) {
    res.render('entries', { title: 'Butoh' });
  });
router.get('/', entriesController.list);
router.get('/find-title', entriesController.findTitle);
router.get('/search', entriesController.search);
router.get('/search-date', entriesController.searchDate);
router.get('/:id', entriesController.retrieve);

router.post('/', entriesController.create);
router.put('/:id', entriesController.update);
router.delete('/:id', entriesController.destroy);

module.exports = router;