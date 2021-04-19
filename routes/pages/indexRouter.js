const express = require('express');
const authController = require('./../../controllers/authController')

const indexRouter = express.Router();

indexRouter.route('/')
    .get(authController.authenticateTokenOnly,
        (req, res) => {
        res.statusCode = 200;

        if (req.user.id)
            res.render('index', {
                logged: "logged"
            });
        else 
            res.render('index');
    });

indexRouter.route('/login')
    .get((req, res) => {
        res.statusCode = 200;
        res.render('login', {
            error_message: req.flash("error_message"),
            success_message: req.flash("success_message")
        });
    })

indexRouter.route('/register')
    .get((req, res) => {      
        res.statusCode = 200;
        res.render('register', {
            error_message: req.flash("error_message"),
            success_message: req.flash("success_message")
        });
});

indexRouter.route('/homepage')
    .get(authController.authenticateTokenAndRedirect,
        (req, res) => {
        res.statusCode = 200;
        res.render(__dirname + './../../public/userPlace/userHomepage', {
            logged: "logged"
        });
    });

module.exports = indexRouter;