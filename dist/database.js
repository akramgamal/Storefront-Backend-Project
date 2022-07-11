"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1.default.config();
var _a = process.env, USER_NAME = _a.USER_NAME, DATABASE_NAME = _a.DATABASE_NAME, PASSWORD = _a.PASSWORD, HOST = _a.HOST, ENV = _a.ENV, DATABASE_TEST_NAME = _a.DATABASE_TEST_NAME;
var client;
client = new pg_1.Pool({
    user: USER_NAME,
    database: ENV === 'dev' ? DATABASE_NAME : DATABASE_TEST_NAME,
    password: PASSWORD,
    host: HOST
});
exports.default = client;
