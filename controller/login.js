const db = require("../models")
const bcrypt = require("bcrypt");
const { trimName, passwordValidation } = require("../middleware/requestBodyValidation");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const signupUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        let checkIfExists = await db.users.findOne({
            where: {
                email: req.body.email
            }
        })
        if (checkIfExists) return res.status(203).send("User Already Exists")
        let passValidate = passwordValidation(req.body.password)
        if (!passValidate) return res.status(203).send("Password length must be greater than 6")
        let requestBody = {
            email: trimName(req.body.email),
            first_name: trimName(req.body.firstName),
            last_name: trimName(req.body.lastName),
            hash: await bcrypt.hash(req.body.password, salt)
        }
        let userCreation = await db.users.create(requestBody)
        return res.status(200).send(userCreation)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

const loginUser = async (req, res) => {
    try {
        const user = await db.users.findOne({ where: { email: req.body.email } });
        if (user) {
            const password_valid = await bcrypt.compare(req.body.password, user.hash);
            if (password_valid) {
                token = jwt.sign({ "id": user.id, "email": user.email, "first_name": user.first_name, "hash": user.hash },
                    process.env.JWT_KEY,
                    { expiresIn: '3d' }
                );
                res.status(200).json({ token: token });
            } else {
                res.status(400).json({ error: "Password Incorrect" });
            }
        } else {
            res.status(404).json({ error: "User does not exist" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        jwt.verify(authHeader, process.env.JWT_KEY, async (err, user) => {
            if (err) {
                return res.status(403).json({ status: 403, error: err.name, msg: "Token Expired, Please re-generate." });
            } else {
                let user = jwt.decode(authHeader);
                const findUser = await db.users.findOne({
                    where: { email: user.email }
                })
                if (!findUser) return res.status(203).send("User Not Exists")
                next()
            }
        });
    } else {
        return res.status(401).json({ status: 401, error: "Token not provided...!!!" });
    }
};
module.exports = {
    signupUser,
    loginUser,
    verifyToken
}