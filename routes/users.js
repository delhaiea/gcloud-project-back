var express = require('express');
var router = express.Router();
const comments = require('../controllers/comments');

/* GET users listing. */
router.get('/all', (req, res, next) => {
    comments.getComments()
        .then((docs) => res.json(docs))
        .catch((err) => {
            console.log(err);
            res.send('efhuiifhufhui')
        });
});

router.get('/', (req, res, next) => {
    comments.getComment(req.query.id)
        .then((docs) => res.json(docs))
        .catch((err) => {
            console.log(err);
            res.send('efhuiifhufhui')
        });
});

router.delete('/', (req, res, next) => {
    comments.deleteComment(req.query.id)
        .then((docs) => res.json(docs))
        .catch((err) => {
            console.log(err);
            res.send('efhuiifhufhui')
        });
});

router.post('/', (req, res) => {
    const newComment = {
        user: req.body.user,
        content: req.body.content,
        stars: req.body.stars,
        filmTitle: req.body.film
    }
    comments.addComment(newComment)
        .then((docs) => res.json(docs))
        .catch((err) => {
            console.log(err);
            res.send('efhuiifhufhui')
        });
});

router.put('/', (req, res) => {
    const newComment = {
        user: req.body.user,
        content: req.body.content,
        stars: req.body.stars,
        filmTitle: req.body.film
    }
    const id = req.body.id;    
    comments.editComment(id, newComment)
        .then((docs) => res.json(docs))
        .catch((err) => {
            console.log(err);
            res.send('efhuiifhufhui')
        });
});

module.exports = router;
