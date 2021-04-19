const db_user = require("./../database/tables/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config();

exports.register = (req, res) => {
    const {username, email, password, password_confirm} = req.body;

    if (password !== password_confirm) {
        req.flash('error_message', 'Passwords do not match!');
        res.redirect('/register');
    }

    db_user.db_user_check_if_already_in_database(username, email)
        .then((recordset) => {
            if (recordset) {
                req.flash('error_message', 'Username or Email already used!');
                res.redirect('/register');
            } else {
                let hashed_password = bcrypt.hashSync(password, 8);

                db_user.db_user_add_user (username, email, hashed_password);
                req.flash("success_message", 'User registered successfully!');
                res.redirect('/register');    
            }
        })
}

exports.login = (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        error_message_redirect_to_login(req, res, 'Please provide an email/username and password!')
    } else {
        db_user.db_user_check_if_already_in_database(username, username)
            .then((recordset) => {
                if (recordset && bcrypt.compareSync(password, recordset.Password)) { /* compare password to verify user */
                    const id = recordset.User_ID;
                    const token = jwt.sign({id: id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
                    const cookieOptions = {
                        expires: new Date(
                            /* Expiration date is now + no. of days, then turn it to milliseconds */
                            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                        ),
                        httpOnly: true,
                        secure: false /* Set to true if your using https */
                    }

                    res.cookie('token', token, cookieOptions); /* Cookie name, data, options */
                    res.statusCode = 200;
                    res.redirect("/homepage");
                } else {
                    error_message_redirect_to_login (req, res, 'Email/Username or Password is incorrect!');
                }
            });
    }
}

exports.authenticateTokenAndRedirect = (req, res, next) => {
    authenticateToken(req, res, next, true);
}

exports.authenticateTokenOnly = (req, res, next) => {
    authenticateToken(req, res, next, false);
}

function authenticateToken(req, res, next, redirect_if_failed) {
    const token = req.cookies.token || '';

    try {
        if (!token) {
            if (redirect_if_failed)
                error_message_redirect_to_login (req, res, 'You need to Login');
            else {
                req.user = {id: null};
                next();
            }
        } else {
            const decrypt = jwt.verify(token, process.env.JWT_SECRET);
            req.user = {id: decrypt.id};
            next();
        }
    } catch (err) { /* failed in verification in jwt.verify */
        if (redirect_if_failed)
            error_message_redirect_to_login (req, res, 'You need to Login');
        else {
            req.user = {id: null};
            next();
        }
    }
}

exports.logout = (req, res, next) => {
    try {
        res.clearCookie('token');
        res.redirect('/login');
    } catch (err) {
        res.statusCode = 500;
        res.end();
    }
} 

function error_message_redirect_to_login (req, res, message) {
    req.flash('error_message', message);
    res.statusCode = 401; /* forbiden */
    res.clearCookie('token'); /* incase it exists but not verified, so frontend can set 'login button; */
    res.redirect('/login');
}