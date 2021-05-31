const express = require("express");
const session = require("express-session");
const {check, validationResult} = require("express-validator");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const registration = require("./registration");
const functions = require("./functions");
const Users = require("../models").Users;

//サーバー設定
const app = express();
const port = 3000;
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: "lifaj-secret",
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("./www"));
app.use("/registration", registration);

//サーバー起動
app.listen(port, () => {
    console.log(`Started server : port=${port}, mode=${app.settings.env}`);
});

//セッション
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

//認証処理
passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
}, (email, password, done) => {
    Users.findOne({where: {email: email}}).then(user => {
        if(!user) {
            return done(null, false, {message: "0"});
        }
        let userData = user.dataValues;
        let hashPassword = userData.password;
        let registDate = userData.regist_date;
        let inputPassword = functions.passwordHash(password, registDate);
        if(hashPassword == inputPassword) {
            return done(null, user);
        } else {
            return done(null, false, {message: "3"});
        }
    }).catch(error => {
        return done(error);
    });
}));

//ログイン
app.post("/login", [
    check("email")
        .trim()
        .isEmail().withMessage("1")
        .isLength({min: 1}).withMessage("2"),
    check("password")
        .trim()
        .isLength({min: 1}).withMessage("4"),
], (req, res, next) => {
    const errors = validationResult(req);
    if(errors.errors.length > 0) {
        let str = "?";
        for(let e of errors.errors) {
            str += `param=${e.param}&msg=${e.msg}&`;
        }
        str = str.substring(0, str.length - 1);
        return res.send(str);
    } else {
        passport.authenticate("local", {
            session: req.body.autologin
        }, (error, user, info) => {
            if(error) {
                return next(error);
            }
            if(!user) {
                let str;
                if(info.message == "0") {
                    str = "?param=email&msg=0";
                } else if(info.message == "3") {
                    str = "?param=password&msg=3";
                }
                return res.send(str);
            }
            req.logIn(user, error => {
                if(error) return next(error);
                return res.send("../");
            });
        })(req, res, next);
    }
});