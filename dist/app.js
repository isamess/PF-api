"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("./config"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path = require('path');
// import fs from 'fs'
// import path, { dirname } from 'path'
const products_1 = __importDefault(require("./models/products"));
const register = require("./routes/register");
const login = require("./routes/login");
const stripe = require("./routes/stripe");
const products = require("./productsController");
const users = require('./routes/users');
const orders = require('./routes/orders');
dotenv_1.default.config();
const app = (0, express_1.default)();
mongoose_1.default.set("strictQuery", true);
require("dotenv/config");
app.set("port", config_1.default.PORT || '*'); // quiero que se establezca este puerto
// app.set('Access-Control-Allow-Origin', '*')
app.use((0, morgan_1.default)("dev")); // me muestra la petición que hice en la terminal
app.use((0, cors_1.default)()); // cors me permite a cualquier servidor hacer peticiones
app.use("/api/stripe/webhook", express_1.default.raw({ type: "*/*" }));
app.use(express_1.default.json({ limit: "10mb" })); // para poder entender los obj json cuando hacemos peticiones Post con un dato
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" })); // para que pueda entender los campos que llegan desde el formulario
app.use(body_parser_1.default.json({ limit: "10mb" }));
app.use(body_parser_1.default.urlencoded({ extended: true, limit: "10mb" }));
app.set("view engine", "ejs"); // se ve en el vistas carpeta para las plantillas que hacen.
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/stripe", stripe);
app.use("/api/products", products);
app.use("/api/users", users);
app.use("/api/orders", orders);
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static('client/buid'));
}
;
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
app.get("/products", (req, res) => {
    try {
        products_1.default.find({}).then((product) => {
            res.json(product);
        });
    }
    catch (error) {
        res.send(error);
    }
});
app.get("/products/:productName", (req, res) => {
    try {
        const { productName } = req.params;
        products_1.default.find({ name: productName }).then((product) => {
            res.json(product.length > 0 ? product : "No hay ningun producto con ese nombre");
        });
    }
    catch (error) {
        res.send(error);
    }
});
exports.default = app;
//# sourceMappingURL=app.js.map