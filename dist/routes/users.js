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
const express_1 = require("express");
const { User } = require("../models/users");
const { auth, isUser, isAdmin } = require("../middleware/auth");
const moment = require("moment");
const router = (0, express_1.Router)();
router.get("/stats", isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const previousMonth = moment()
        .month(moment().month() - 1)
        .set("date", 1)
        .format("YYYY-MM-DD HH:mm:ss");
    try {
        const users = yield User.aggregate([
            {
                $match: { createdAt: { $gte: new Date(previousMonth) } },
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).send(users);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
router.get("/find", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.find();
        res.status(200).send(user);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
router.get("/find/:id", isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findById(req.params.id);
        if (!user)
            return res.status(404).json({
                message: "Usuario doesn't exist",
            });
        return res.json(user);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
router.delete("delete/:id"),
    isAdmin,
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield User.findById(req.params.id);
            if (user) {
                const deleteProduct = yield user.findByIdAndDelete(req.params.id);
                res.status(200).send(deleteProduct);
            }
            else {
                console.log("Acción terminada. Falla al eliminar el producto");
            }
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
router.put("/:id", isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedResponse = yield User.findByIdAndUpdate(req.params.id, {
            $set: Object.assign({}, req.body),
        }, { new: true });
        console.log(updatedResponse);
        res.status(200).send(updatedResponse);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
module.exports = router;
//# sourceMappingURL=users.js.map