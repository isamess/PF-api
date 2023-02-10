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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//data base local
const dataBase = (() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongooseOptions = {
            user: config_1.default.MONGO_USER,
            pass: config_1.default.MONGO_PASSWORD,
        };
        const db = yield mongoose_1.default.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clusterpf-henrysmerch.wibjaod.mongodb.net/?retryWrites=true&w=majority`, mongooseOptions);
        // Renaming _id to id
        mongoose_1.default.set("toJSON", {
            virtuals: true,
            transform: (_, converted) => {
                delete converted._id;
            },
        });
        console.log("Our glorious Database is connected to:", db.connection.name);
    }
    catch (error) {
        console.log(error);
    }
}))();
//database deploy
// const dataBase = (async () => {
//   try {
//     const mongooseOptions: ConnectOptions = {
//       user: config.MONGO_USER, //usuario por defecto de esta DB
//       pass: config.MONGO_PASSWORD,
//     };
//     const db = await mongoose.connect(config.MONGO_DEPLOY!);
//     console.log("Our glorious Database is connected to:", db.connection.name);
//   } catch (error) {
//     console.log(error);
//   }
// })();
// aquí se conecta a la base de datos con las variables de entorno de config.ts
//server de prueba por problemas tecnicos
// const dataBase = async () => {
//   const uri: any = `${process.env.DB_URI}`;
//   try {
//     const db: any = await connect(uri, <object>{
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(db.connection.Name + " connected");
//   } catch (err: any) {
//     console.log("mongodb connection failed", err.message);
//   }
// };
exports.default = dataBase;
//# sourceMappingURL=database.js.map