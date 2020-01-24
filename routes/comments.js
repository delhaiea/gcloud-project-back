var express = require('express');
var router = express.Router();
const comments = require('../controllers/comments');

router.get('/all', (req, res, next) => {
    comments.getComments()
        .then((docs) => res.json(docs))
        .catch((err) => {
            console.log(err);
            res.send('Erreur')
        });
});

router.get('/', (req, res, next) => {
    comments.getComment(req.query.id)
        .then((docs) => res.json(docs))
        .catch((err) => {
            console.log(err);
            res.send('Erreur')
        });
});

router.delete('/', (req, res, next) => {
    comments.deleteComment(req.query.id)
        .then((docs) => res.json(docs))
        .catch((err) => {
            console.log(err);
            res.send('Erreur')
        });
});

router.post('/', (req, res) => {
    const newComment = {
        user: req.body.user,
        content: req.body.content,
        stars: req.body.stars,
        filmTitle: req.body.filmTitle,
        idFilm: req.body.idFilm
    }
    comments.addComment(newComment)
        .then((docs) => res.json(docs))
        .catch((err) => {
            console.log(err);
            res.send('Erreur')
        });
});

router.put('/', (req, res) => {
    const newComment = {
        user: req.body.user,
        content: req.body.content,
        stars: req.body.stars,
        filmTitle: req.body.filmTitle,
        idFilm: req.body.idFilm
    }
    const id = req.body.id;    
    comments.editComment(id, newComment)
        .then((docs) => res.json(docs))
        .catch((err) => {
            console.log(err);
            res.send('Erreur')
        });
});

module.exports = router;
