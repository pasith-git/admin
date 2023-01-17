"use strict";
exports.__esModule = true;
exports.nationalRegexPatternEn = exports.nationalRegexPatternVn = exports.nationalRegexPatternThai = exports.nationalRegexPatternLaos = exports.Roles = exports.Status = exports.MPSTATUS = exports.laWords = exports.ApiPath = exports.Util = void 0;
var Util;
(function (Util) {
    Util["Api"] = "https://rmstest.jlsipos.com/api/v1/";
    Util["ApiSecond"] = "https://rmstest.jlsipos.com/";
})(Util = exports.Util || (exports.Util = {}));
var ApiPath;
(function (ApiPath) {
    ApiPath["product"] = "products";
    ApiPath["productType"] = "product-types";
    ApiPath["unit"] = "units";
    ApiPath["stock"] = "stocks";
    ApiPath["stockIn"] = "stock-ins";
    ApiPath["stockOut"] = "stock-outs";
    ApiPath["stockUnit"] = "stock-units";
    ApiPath["category"] = "categories";
    ApiPath["bank"] = "banks";
    ApiPath["order"] = "orders";
    ApiPath["orderDetail"] = "order-details";
    ApiPath["coupon"] = "coupons";
    ApiPath["menu"] = "menus";
    ApiPath["menuDetail"] = "menu-details";
    ApiPath["user"] = "users";
    ApiPath["province"] = "provinces";
    ApiPath["district"] = "districts";
    ApiPath["language"] = "languages";
})(ApiPath = exports.ApiPath || (exports.ApiPath = {}));
exports.laWords = {
    headerReport: {
        orderReport: 'ລາຍງານການຂາຍ ແລະ ຍົກເລີກ',
        orderDetailReport: 'ລາຍງານຍອດຂາຍຕາມລາຍການເມນູ',
        stockMainReport: 'ລາຍງານສິນຄ້າ'
    },
    orderReport: 'ການຂາຍ ແລະ ຍົກເລີກ',
    orderDetailReport: 'ຍອດຂາຍຕາມລາຍການເມນູ',
    stockMainReport: 'ສິນຄ້າ',
    stockReport: {
        stockInReport: 'ລາຍງານການຮັບສິນຄ້າເຂົ້າ',
        stockOutReport: 'ລາຍງານການນຳໃຊ້ນຳສິນຄ້າອອກ',
        stockInOutReport: 'ລາຍງານຍອດວັດຖຸດິບທີ່ຍັງເຫຼືອ, ນຳເຂົ້າ ແລະ ຍອດທີ່ນຳໃຊ້ '
    },
    billManangement: 'ຈັດການໃບບິນ',
    headerCrud: {
        crudMenu: 'ຈັດການຂໍ້ມູນເມນູ',
        crudPrinter: 'ຈັດການຂໍ້ມູນປິ່ນເຕີ້',
        crudProduct: 'ຈັດການຂໍ້ມູນສິນຄ້າ',
        crudProductType: 'ຈັດການຂໍ້ມູນປະເພດສິນຄ້າ',
        crudUnit: 'ຈັດການຂໍ້ມູນຫົວໜ່ວຍ',
        crudCategory: 'ຈັດການຂໍ້ມູນປະເພດ',
        crudStockUnit: 'ຈັດການຂໍ້ມູນສະຕ໊ອກຫົວໜ່ວຍ',
        crudStock: 'ຈັດການຂໍ້ມູນສະຕ໊ອກ',
        crudStockIn: 'ຈັດການຂໍ້ມູນຮັບສິນຄ້າເຂົ້າ',
        crudUser: 'ຈັດການຂໍ້ມູນຜູ້ໃຊ້',
        crudStockOut: 'ຈັດການຂໍ້ມູນນຳສິນຄ້າອອກ',
        crudCoupon: 'ຈັດການຂໍ້ມູນຄູປອງ'
    },
    crud: {
        crudPrinter: 'ປິ່ນເຕີ້',
        crudProduct: 'ສິນຄ້າ',
        crudProductType: 'ປະເພດສິນຄ້າ',
        crudUnit: 'ຫົວໜ່ວຍ',
        crudCategory: 'ປະເພດ',
        crudStockUnit: 'ສະຕ໊ອກຫົວໜ່ວຍ',
        crudStock: 'ສະຕ໊ອກ',
        crudStockIn: 'ຮັບສິນຄ້າເຂົ້າ',
        crudStockOut: 'ນຳສິນຄ້າອອກ',
        crudMenu: 'ເມນູ',
        crudUser: 'ຜູ້ໃຊ້',
        crudCoupon: 'ຄູປອງ'
    }
};
exports.MPSTATUS = {
    rec: 'received',
    cha: 'changed'
};
var Status;
(function (Status) {
    Status["pending"] = "pending";
    Status["success"] = "success";
    Status["cancel"] = "cancel";
})(Status = exports.Status || (exports.Status = {}));
var Roles;
(function (Roles) {
    Roles["SUPERADMIN"] = "superadmin";
    Roles["SYSTEMADMIN"] = "systemadmin";
    Roles["SYSTEMACCOUNTANT"] = "systemaccountant";
    Roles["RESTAURANTADMIN"] = "restaurantadmin";
    Roles["BRANCHMANAGER"] = "branchmanager";
    Roles["BRANCHACCOUNTANT"] = "branchaccountant";
    Roles["CASHIER"] = "cashier";
    Roles["WAITER"] = "waiter";
    Roles["COOK"] = "cook";
})(Roles = exports.Roles || (exports.Roles = {}));
exports.nationalRegexPatternLaos = function () {
    var re = new RegExp("^[\u0E80-\u0EFFs]{1,}$");
    return re;
};
exports.nationalRegexPatternThai = function () {
    var re = new RegExp("^[\u0E00-\u0E7Fs]{1,}$");
    return re;
};
exports.nationalRegexPatternVn = function () {
    var re = new RegExp("^[\u00C0-\u1EF9s]{1,}$");
    return re;
};
exports.nationalRegexPatternEn = function () {
    var re = new RegExp("^[a-zA-Zs]{1,}$");
    return re;
};
