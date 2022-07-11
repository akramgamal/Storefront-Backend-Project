"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ordersHandler_1 = require("../handlers/ordersHandler");
var authenticate_validation_1 = __importDefault(require("../utilities/authenticate_validation"));
var orderRoute = express_1.default.Router();
orderRoute.get('/order/:id', authenticate_validation_1.default, ordersHandler_1.getOrder);
orderRoute.get('/orders/:id', authenticate_validation_1.default, ordersHandler_1.orders_ByUser);
orderRoute.post('/order', authenticate_validation_1.default, ordersHandler_1.addOrder);
orderRoute.put('/order/:id', authenticate_validation_1.default, ordersHandler_1.updateOrder);
orderRoute.delete('/order/:id', authenticate_validation_1.default, ordersHandler_1.deleteOrder);
orderRoute.post('/order/:id/products', authenticate_validation_1.default, ordersHandler_1.addProduct);
exports.default = orderRoute;
