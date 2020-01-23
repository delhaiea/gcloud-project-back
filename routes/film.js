var express = require('express');
var router = express.Router();
const films = require('../controllers/filmdb');


router.get('/', (req, res, next) => {
    films.getFilmsList(req.query.f).then((films) => res.json(films))
    .catch((err) => res.send(err));
});

router.get('/byId', (req, res, next) => {
    films.getFilmById(req.query.id).then((films) => res.json(films))
    .catch((err) => res.send(err));
});

module.exports = router;
