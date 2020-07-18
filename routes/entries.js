const express = require('express');
const router = express.Router();
const controller = require('../controllers/entries.controller')

router.get('/', controller.list);
router.get('/find-title', controller.findTitle);
router.get('/search', controller.search);
router.get('/search-date', controller.searchDate);
router.get('/latest', controller.latest);
router.get('/export', controller.exportAll);
router.get('/:id', controller.retrieve);

router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;