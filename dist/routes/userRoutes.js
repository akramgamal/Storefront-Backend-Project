"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var usersHandler_1 = require("../handlers/usersHandler");
var authenticate_validation_1 = __importDefault(require("../utilities/authenticate_validation"));
var userRoute = express_1.default.Router();
userRoute.get('/user', usersHandler_1.getAllUsers);
userRoute.get('/user/:id', usersHandler_1.getUser);
userRoute.post('/user', usersHandler_1.addUser);
userRoute.put('/user/:id', authenticate_validation_1.default, usersHandler_1.updateUser);
userRoute.delete('/user/:id', authenticate_validation_1.default, usersHandler_1.deleteUser);
userRoute.post('/user/authenticate', usersHandler_1.authenticate);
exports.default = userRoute;
