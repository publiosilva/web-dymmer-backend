const jwt = require('jsonwebtoken');
const authenticationConfig = require('../../config/authentication');

module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader)
        return res.status(401).send({ error: 'No token provided' });

    const parts = authorizationHeader.split(' ');

    if (!parts.lenght === 2)
        return res.status(401).send({ error: 'Token malformed' });

    const [ scheme, token ] = parts;

    if (!/^Bearer$/)
        return res.status(401).send({ error: 'Token malformed' });

    jwt.verify(token, authenticationConfig.secretKey, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Invalid token' });

        req.userId = decoded.id;

        return next();
    });
};
