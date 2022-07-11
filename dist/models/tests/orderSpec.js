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
Object.defineProperty(exports, "__esModule", { value: true });
var products_1 = require("../products");
var users_1 = require("../users");
var orders_1 = require("../orders");
var order = new orders_1.orders_model;
var users = new users_1.users_model;
var product = new products_1.products_model;
describe("orders_model", function () {
    it('should have an orders_ByUser method', function () {
        expect(order.orders_ByUser).toBeDefined();
    });
    it('should have a current_order method', function () {
        expect(order.current_order).toBeDefined();
    });
    it('should have a create method', function () {
        expect(order.create).toBeDefined();
    });
    it('should have an update method', function () {
        expect(order.update).toBeDefined();
    });
    it('should have a delete method', function () {
        expect(order.delete).toBeDefined();
    });
    it('should have an addProduct method', function () {
        expect(order.addProduct).toBeDefined();
    });
    it("create method should add new order", function () { return __awaiter(void 0, void 0, void 0, function () {
        var customer, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, users.create({
                        firstname: "akram",
                        lastname: "gamal",
                        password: "123"
                    })];
                case 1:
                    customer = _a.sent();
                    return [4 /*yield*/, order.create({
                            status: "complete",
                            user_id: 1
                        })];
                case 2:
                    data = _a.sent();
                    expect(data).toEqual({
                        id: 1,
                        status: "complete",
                        user_id: 1
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("orders_ByUser method should show all complete orders for specific user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order.orders_ByUser(1)];
                case 1:
                    data = _a.sent();
                    expect(data).toEqual([{
                            id: 1,
                            status: "complete",
                            user_id: 1
                        }]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("current_order method should show active order", function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order.create({
                        status: "active",
                        user_id: 1
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, order.current_order(1)];
                case 2:
                    data = _a.sent();
                    expect(data).toEqual({
                        id: 2,
                        status: "active",
                        user_id: 1
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("update method should update order", function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order.update({
                        id: 1,
                        status: "active",
                        user_id: 1
                    })];
                case 1:
                    data = _a.sent();
                    expect(data).toEqual({
                        id: 1,
                        status: "active",
                        user_id: 1
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("delete method should delete one order", function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order.create({
                        status: "complete",
                        user_id: 1
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, order.delete(3)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, order.orders_ByUser(1)];
                case 3:
                    data = _a.sent();
                    expect(data).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("addProduct method should add product to order", function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, product.create({
                        name: "apple",
                        price: 2000,
                        category: "lap"
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, order.addProduct({
                            quantity: 20,
                            product_id: 1,
                            order_id: 1
                        })];
                case 2:
                    data = _a.sent();
                    expect(data).toEqual({
                        id: 1,
                        quantity: 20,
                        product_id: 1,
                        order_id: 1
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
