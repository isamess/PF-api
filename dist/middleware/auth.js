"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.auth = void 0;
const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token)
        return res.status(401).send("No puede entrar, no está autenticado");
    try {
        const secretKey = process.env.JWT_SECRET_KEY;
        const user = jwt.verify(token, secretKey);
        req.user = user;
        next();
    }
    catch (ex) {
        res.status(400).send("No puede entrar, token inválido");
    }
};
exports.auth = auth;
const isAdmin = (req, res, next) => {
    auth(req, res, () => {
        if (req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).send("No puede entrar, no está autorizado");
        }
    });
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=auth.js.map