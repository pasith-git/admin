"use strict";
exports.__esModule = true;
exports.getOrdersDto = exports.status = exports.OrderDetailDto = exports.OrderDto = exports.PaymentType = exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["pending"] = "pending";
    OrderStatus["success"] = "success";
    OrderStatus["cancel"] = "cancel";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
var PaymentType;
(function (PaymentType) {
    PaymentType["pending"] = "pending";
    PaymentType["cash"] = "cash";
    PaymentType["bank"] = "bank";
})(PaymentType = exports.PaymentType || (exports.PaymentType = {}));
var OrderDto = /** @class */ (function () {
    function OrderDto() {
    }
    return OrderDto;
}());
exports.OrderDto = OrderDto;
var OrderDetailDto = /** @class */ (function () {
    function OrderDetailDto() {
    }
    return OrderDetailDto;
}());
exports.OrderDetailDto = OrderDetailDto;
var status;
(function (status) {
    status["success"] = "success";
    status["pending"] = "pending";
    status["cancel"] = "cancel";
})(status = exports.status || (exports.status = {}));
var getOrdersDto = /** @class */ (function () {
    function getOrdersDto() {
    }
    return getOrdersDto;
}());
exports.getOrdersDto = getOrdersDto;
