const cache = require('../controllers/cache-controller');

const checkAdminAccess = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const isAdmin = cache.isAdmin(authHeader);
        if (!isAdmin) {
            return res.sendStatus(403);
        }
        next();

    } else {
        res.sendStatus(401);
    }
};

module.exports = checkAdminAccess;
