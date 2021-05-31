const express = require("express");
const router = express.Router();
const {check, validationResult, matchedData} = require("express-validator");
const Users = require("../models").Users;
const functions = require("./functions");

//会員登録
router.use((req, res, next) => {
    next();
});
router.post("/", [
    check("name")
        .trim()
        .isLength({min: 1}).withMessage("0"),
    check("email")
        .trim()
        .custom(async(value) => {
            let result;
            await Users.findOne({where: {email: value}}).then(data => {
                result = data;
            });
            if(result) {
                throw new Error("1");
            }
            return true;
        })
        .isEmail().withMessage("2")
        .isLength({min: 1}).withMessage("3"),
    check("password")
        .trim()
        .isLength({min: 8}).withMessage("4"),
    check("age")
        .trim()
        .isInt().withMessage("5")
        .isLength({min: 1}).withMessage("6"),
    check("telnumber")
        .trim()
        .isInt().withMessage("7")
        .isLength({min: 1}).withMessage("8")
], (req, res) => {
    const errors = validationResult(req);
    if(errors.errors.length > 0) {
        let str = "?";
        for(let e of errors.errors) {
            str += `param=${e.param}&msg=${e.msg}&`;
        }
        str = str.substring(0, str.length - 1);
        res.redirect(str);
    } else {
        let data = matchedData(req);
        let userData = {
            name: data.name,
            email: data.email,
            age: data.age,
            telnumber: data.telnumber
        };
        userData.regist_date = functions.getDatetime("YYYYMMDDHHmmss");
        userData.password = functions.passwordHash(data.password, userData.regist_date);
        Users.create(userData);
        res.redirect("../login");
    }
    
});

module.exports = router;