const express = require('express');
const router = express.Router();
const db = require('../db/queries')

router.get('/', function(req, res, next) {
  res.render('home')
});

router.get('/categories', db.showAllCategories)
router.get('/categories/:id', db.showCategory)

router.get('/problem/:id', db.showProblem)

router.get('/random', db.getRandom)

// router.get('/add', function(req, res, next) {
//   res.render('add')
// })
//router.post('/add', db.saveProblem)

module.exports = router;
