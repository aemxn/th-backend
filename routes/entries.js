const express = require('express');
const router = express.Router();
const repository = require('../repository/entries');

router.get('/', (req, res, next) => {
  repository
  .list()
  .then(entries => {
    res.status(200).send(entries);
    // res.render('entries', { title: 'Entries', items: entries });
  })
  .catch(error => res.status(400).send(error))
});

router.get('/find-title', (req, res, next) => {
  repository
  .findTitle(req)
  .then(entries => res.status(200).send(entries))
  .catch(error => res.status(400).send(error));
});


router.get('/search', (req, res, next) => {
  repository
  .search(req)
  .then(entries => res.status(200).send(entries))
  .catch(error => res.status(400).send(error));
});

router.get('/search-date', (req, res, next) => {
  repository
  .searchDate(req)
  .then(entries => res.status(200).send(entries))
  .catch(error => res.status(400).send(error));
});

router.get('/:id', (req, res, next) => {
  repository
  .retrieve(req)
  .then(entry => {
      if(!entry) {
          return res.status(404).send({ message: 'Entry Not Found' })
      }
      res.status(200).send(entry);
  })
  .catch(error => res.status(400).send(error));
});

router.post('/', repository.create);
router.put('/:id', repository.update);
router.delete('/:id', repository.destroy);

module.exports = router;