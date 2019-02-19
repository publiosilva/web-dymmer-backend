const user = require('../models/user');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticationConfig = require('../../config/authentication');

const generateToken = (params = {}) => {
    return jwt.sign(params, authenticationConfig.secretKey, {
        expiresIn: 86400,
    });
}

const register = async (req, res) => {
    const { email } = req.body;

    try {
        if (await user.findOne({ email }))
            return res.status(400).send({ error: 'User already exists' });

        const newUser = await user.create(req.body);

        // so that the password is not shown on return
        user.password = undefined;

        return res.send({
            user,
            token: generateToken({ id: user.id })
        });
    } catch (err) {
        return res.send(400).send({ error: 'Registration failed' });
    }
}

const authenticate = async (req, res) => {
    const { email, password } = req.body;

    const loggedUser = await user.findOne({ email }).select('+password');

    if (!loggedUser)
        return res.status(400).send({ error: 'User not found' });

    if (!await bycrypt.compare(password, loggedUser.password))
        return res.status(400).send({ error: 'Invalid password' });

    // so that the password is not shown on return
    user.password = undefined;

    return res.send({
        user,
        token: generateToken({ id: loggedUser.id })
    });
}

module.exports = { register, authenticate };