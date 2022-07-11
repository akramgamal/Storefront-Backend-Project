"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var productsHandler_1 = require("../handlers/productsHandler");
var authenticate_validation_1 = __importDefault(require("../utilities/authenticate_validation"));
var productRoute = express_1.default.Router();
productRoute.get('/hello', function (req, res) {
    res.send("hello kimo");
});
productRoute.get('/products', productsHandler_1.getAllProducts);
productRoute.get('/products/:id', productsHandler_1.getProduct);
productRoute.post('/products', authenticate_validation_1.default, productsHandler_1.addProduct);
productRoute.put('/products/:id', authenticate_validation_1.default, productsHandler_1.updateProduct);
productRoute.delete('/products/:id', authenticate_validation_1.default, productsHandler_1.deleteProduct);
exports.default = productRoute;
