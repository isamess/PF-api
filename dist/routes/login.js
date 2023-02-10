"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../models/users");
const genAuthToken = require("../utils/genAuthToken");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required(),
    });
    const { error } = schema.validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    let user = yield User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send("User or password is inorrect");
    const isValid = yield bcrypt.compare(req.body.password, user.password);
    if (!isValid)
        return res.status(400).send("User or password is inorrect");
    const token = genAuthToken(user);
    res.send(token);
}));
module.exports = router;
//# sourceMappingURL=login.js.map