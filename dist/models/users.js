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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users_model = void 0;
var database_1 = __importDefault(require("../database"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var dotenv_1 = __importDefault(require("dotenv"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
var users_model = /** @class */ (function () {
    function users_model() {
    }
    users_model.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "select * from users";
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("couldn't show all users . ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    users_model.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "select * from users where id=".concat(id);
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        if (result.rows.length)
                            return [2 /*return*/, result.rows[0]];
                        else
                            return [2 /*return*/, "user is not found"];
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("couldn't find the required user ".concat(id, " . ").concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    users_model.prototype.create = function (customer) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, hash, sql, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        hash = bcrypt_1.default.hashSync(customer.password, parseInt(process.env.SALT_ROUNDS));
                        sql = "insert into users(firstname,lastname,password) values('".concat(customer.firstname, "','").concat(customer.lastname, "','").concat(hash, "') returning *");
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        if (result.rowCount > 0)
                            return [2 /*return*/, result.rows[0]];
                        else
                            return [2 /*return*/, "user ".concat(customer.firstname, " is not added")];
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("couldn't add this user ".concat(customer.firstname, " . ").concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    users_model.prototype.update = function (customer) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "update users set firstname='".concat(customer.firstname, "',lastname='").concat(customer.lastname, "',password='").concat(customer.password, "' where id=").concat(customer.id, " returning *");
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        if (result.rowCount > 0)
                            return [2 /*return*/, result.rows[0]];
                        else
                            return [2 /*return*/, "the user ".concat(customer.firstname, " is not updated")];
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("couldn't update this user ".concat(customer.firstname, " . ").concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    users_model.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "delete from users where id=".concat(id, " returning *");
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        if (result.rowCount > 0)
                            return [2 /*return*/, result.rows[0]];
                        else
                            return [2 /*return*/, "the user ".concat(id, " is not found")];
                        return [3 /*break*/, 4];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("couldn't delete this user ".concat(id, " . ").concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    users_model.prototype.authenticate = function (customer) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, find_user, result, data, isAuthenticated, token, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        find_user = "select * from users where firstname='".concat(customer.firstname, "' and lastname='").concat(customer.lastname, "'");
                        return [4 /*yield*/, conn.query(find_user)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        if (result.rows.length) {
                            data = result.rows[0];
                            isAuthenticated = bcrypt_1.default.compareSync(customer.password, data.password);
                            if (isAuthenticated) {
                                token = jsonwebtoken_1.default.sign(data, process.env.SECRET_KEY);
                                console.log(token);
                                return [2 /*return*/, "you're successfully logged in"];
                            }
                            else {
                                return [2 /*return*/, "wrong name or password please try again"];
                            }
                        }
                        else {
                            return [2 /*return*/, "cannot find user with this name"];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_6 = _a.sent();
                        throw new Error("couldn't login ".concat(err_6));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return users_model;
}());
exports.users_model = users_model;
exports.default = users_model;
