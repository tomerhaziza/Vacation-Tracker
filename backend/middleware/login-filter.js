const jwt = require('jsonwebtoken')
const { secret } = require('../config.json');

const authenticateJwtRequestToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // const decoded = jwt.verify(token, secret);
    
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, secret, (err) => {
            if (err) {
                return res.sendStatus(403);
            }
            next();
        });

    } else {
        res.sendStatus(401);
    }
};

module.exports = authenticateJwtRequestToken;
