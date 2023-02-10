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
const { Order } = require("../models/order");
const { isAdmin } = require("../middleware/auth");
const moment = require("moment");
const router = (0, express_1.Router)();
router.get("/stats", isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const previousMonth = moment()
        .month(moment().month() - 1)
        .set("date", 1)
        .format("YYYY-MM-DD HH:mm:ss");
    try {
        const orders = yield Order.aggregate([
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
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).send(orders);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
router.get("/total-income", isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const income = yield Order.aggregate([
            {
                $project: {
                    sales: "$total",
                },
            },
        ]);
        res.status(200).send(income);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
router.get("/income/stats", isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const previousMonth = moment()
        .month(moment().month() - 1)
        .set("date", 1)
        .format("YYYY-MM-DD HH:mm:ss");
    try {
        const income = yield Order.aggregate([
            {
                $match: { createdAt: { $gte: new Date(previousMonth) } },
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$total",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        res.status(200).send(income);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
router.get("/week-sales", isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const last7Days = moment()
        .day(moment().day() - 7)
        .format("YYYY-MM-DD HH:mm:ss");
    try {
        const income = yield Order.aggregate([
            {
                $match: { createdAt: { $gte: new Date(last7Days) } },
            },
            {
                $project: {
                    day: { $dayOfWeek: "$createdAt" },
                    sales: "$total",
                },
            },
            {
                $group: {
                    _id: "$day",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        res.status(200).send(income);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
router.get("/", isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.new;
    try {
        const orders = query
            ? yield Order.find().sort({ _id: -1 }).limit(4)
            : yield Order.find().sort({ _id: -1 });
        res.status(200).send(orders);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
router.get("/list", isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield Order.find();
        res.status(200).send(list);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
router.get("/list/:id", isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield Order.filter((item) => item._id === req.params.id);
        res.status(200).send(list);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
router.put("/:id", isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedOrder = yield Order.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).send(updatedOrder);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
module.exports = router;
//# sourceMappingURL=orders.js.map