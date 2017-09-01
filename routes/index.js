var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { num: req.numr, uniq: req.uniq, jcash: req.jcash });
});

module.exports = router;
