"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var productRoutes_1 = __importDefault(require("./routes/productRoutes"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(productRoutes_1.default);
app.use(userRoutes_1.default);
app.use(orderRoutes_1.default);
app.listen(process.env.PORT, function () {
    console.log("starting app");
});
