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
exports.orders_model = void 0;
var database_1 = __importDefault(require("../database"));
var orders_model = /** @class */ (function () {
    function orders_model() {
    }
    orders_model.prototype.orders_ByUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "select * from orders where status='complete' and user_id=".concat(id);
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("couldn't show all orders . ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orders_model.prototype.current_order = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "select * from orders where status='active' and user_id=".concat(id);
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        if (result.rows.length)
                            return [2 /*return*/, result.rows[0]];
                        else
                            return [2 /*return*/, "order is not found"];
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("couldn't find the required order ".concat(id, " . ").concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orders_model.prototype.create = function (ord) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, find_user, found, conn_1, sql, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        find_user = "select * from users where id=".concat(ord.user_id);
                        return [4 /*yield*/, conn.query(find_user)];
                    case 2:
                        found = _a.sent();
                        conn.release();
                        if (!(found.rows.length > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, database_1.default.connect()];
                    case 3:
                        conn_1 = _a.sent();
                        sql = "insert into orders(status,user_id) values('".concat(ord.status, "',").concat(ord.user_id, ") returning *");
                        return [4 /*yield*/, conn_1.query(sql)];
                    case 4:
                        result = _a.sent();
                        conn_1.release();
                        return [2 /*return*/, result.rows[0]];
                    case 5: return [2 /*return*/, "the order is not added"];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        err_3 = _a.sent();
                        throw new Error("couldn't add this order. ".concat(err_3));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    orders_model.prototype.update = function (ord) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "update orders set status='".concat(ord.status, "',user_id=").concat(ord.user_id, " where id=").concat(ord.id, " returning *");
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        if (result.rowCount > 0)
                            return [2 /*return*/, result.rows[0]];
                        else
                            return [2 /*return*/, "the order is not updated"];
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("couldn't update this order. ".concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orders_model.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "delete from orders where id=".concat(id, " returning *");
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        if (result.rowCount > 0)
                            return [2 /*return*/, result.rows[0]];
                        else
                            return [2 /*return*/, "the order ".concat(id, " is not found")];
                        return [3 /*break*/, 4];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("couldn't delete this order ".concat(id, " . ").concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orders_model.prototype.addProduct = function (make_order) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, find_order, find_product, result, result2, err_6, conn, sql, result, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        find_order = "select * from orders where id=".concat(make_order.order_id);
                        find_product = "select * from products where id=".concat(make_order.product_id);
                        return [4 /*yield*/, conn.query(find_order)];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, conn.query(find_product)];
                    case 3:
                        result2 = _a.sent();
                        if (result.rows.length == 0) {
                            throw new Error('order is not found');
                        }
                        else if (result2.rows.length == 0) {
                            throw new Error('product is not found');
                        }
                        if (result.rows[0].status !== 'active') {
                            throw new Error("order ".concat(make_order.id, " is not active"));
                        }
                        conn.release();
                        return [3 /*break*/, 5];
                    case 4:
                        err_6 = _a.sent();
                        throw new Error("".concat(err_6));
                    case 5:
                        _a.trys.push([5, 8, , 9]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 6:
                        conn = _a.sent();
                        sql = "insert into order_product(quantity,order_id,product_id) values(".concat(make_order.quantity, ",").concat(make_order.order_id, ",").concat(make_order.product_id, ") returning *");
                        return [4 /*yield*/, conn.query(sql)];
                    case 7:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 8:
                        err_7 = _a.sent();
                        throw new Error("the product is not added to the order".concat(err_7));
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    orders_model.prototype.delete_order_product = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "delete from order_product where id=".concat(id, " returning *");
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        if (result.rowCount > 0)
                            return [2 /*return*/, result.rows[0]];
                        else
                            return [2 /*return*/, "the order ".concat(id, " is not found")];
                        return [3 /*break*/, 4];
                    case 3:
                        err_8 = _a.sent();
                        throw new Error("couldn't delete this order ".concat(id, " . ").concat(err_8));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return orders_model;
}());
exports.orders_model = orders_model;
exports.default = orders_model;
