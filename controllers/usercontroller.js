const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../db');

router.post('/signup', (req, res) => {
    User.create({
        full_name: req.body.full_name,
        username: req.body.username,
        passwordhash: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
    })
        .then(
            function signupSuccess(user) {
                let token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });
                res.status(200).json({
                    user: user,
                    token: token
                })
            },

            function signupFail(err) {
                res.status(500).send(err.message)
            }
        )
})

router.post('/signin', (req, res) => {
    User.findOne({ where: { username: req.body.username } }).then(user => {
        if (user) {
            bcrypt.compare(req.body.password, user.passwordhash, function (err, matches) {
                if (matches) {
                    var token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });
                    res.json({
                        user: user,
                        message: "Successfully authenticated.",
                        sessionToken: token
                    });
                } else {
                    res.status(500).send({ error: "Passwords do not match." })
                }
            });
        } else {
            res.status(404).send({ error: "User not found." })
        }

    })
})

module.exports = router;