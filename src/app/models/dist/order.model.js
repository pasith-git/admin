"use strict";
exports.__esModule = true;
exports.billCheckOrderCol = exports.exportOrderCol = exports.orderCol = exports.orderDetailColError = exports.orderDetailCol = void 0;
exports.orderDetailCol = [
    /*     { field: 'id', header: 'ລະຫັດ' }, */
    /*     { field: 'userId', header: 'ລະຫັດຜູ້ໃຊ້' }, */
    /*     { field: 'orderId', header: 'ລະຫັດບິນ' }, */
    /*     { field: 'restaurantId', header: 'ລະຫັດຮ້ານ' }, */
    /*     { field: 'branchId', header: 'ລະຫັດສາຂາ' }, */
    /*     { field: 'tableId', header: 'ລະຫັດໂຕະ' }, */
    /*     { field: 'tableNumber', header: 'ເລກໂຕະ' }, */
    /*     { field: 'menuId', header: 'ລະຫັດເມນຸ' }, */
    { field: 'menuName', header: 'ຊື່ເມນູ' },
    /*     { field: 'bankId', header: 'ລະຫັດທະນາຄານ' }, */
    { field: 'amount', header: 'ຈຳນວນ' },
    { field: 'price', header: 'ລາຄາ' },
    { field: 'total', header: 'ລວມ' },
];
exports.orderDetailColError = [
    /*     { field: 'id', header: 'ລະຫັດ' }, */
    /*     { field: 'userId', header: 'ລະຫັດຜູ້ໃຊ້' }, */
    /*     { field: 'orderId', header: 'ລະຫັດບິນ' }, */
    /*     { field: 'restaurantId', header: 'ລະຫັດຮ້ານ' }, */
    /*     { field: 'branchId', header: 'ລະຫັດສາຂາ' }, */
    /*     { field: 'tableId', header: 'ລະຫັດໂຕະ' }, */
    /*     { field: 'tableNumber', header: 'ເລກໂຕະ' }, */
    /*     { field: 'menuId', header: 'ລະຫັດເມນຸ' }, */
    { field: 'menuName', header: 'ຊື່ເມນູ' },
    /*     { field: 'bankId', header: 'ລະຫັດທະນາຄານ' }, */
    { field: 'amount', header: 'ຈຳນວນ' },
    { field: 'price', header: 'ລາຄາ' },
    { field: 'total', header: 'ລວມ' },
    /*     { field: 'comment', header: 'ຄວາມຄິດເຫັນ' }, */
    /*     { field: 'isStatus', header: 'isStatus' }, */
    { field: 'reason', header: 'ເຫດຜົນ' },
];
exports.orderCol = [
    /*     { field: 'id', header: 'ລະຫັດ' }, */
    { field: 'billNumber', header: 'ເລກບິນ' },
    /*  { field: 'userId', header: 'ລະຫັດຜູ້ໃຊ້' }, */
    /* { field: 'restaurantId', header: 'ລະຫັດຮ້ານ' }, */
    /*     { field: 'restaurantName', header: 'ຊື່ຮ້ານ' }, */
    /*     { field: 'branchId', header: 'ລະຫັດສາຂາ' }, */
    /*     { field: 'branchName', header: 'ຊື່ສາຂາ' }, */
    /*  { field: 'tableId', header: 'ລະຫັດໂຕະ' }, */
    /*     { field: 'tableName', header: 'ເລກໂຕະ' }, */
    /*     { field: 'bankId', header: 'ລະຫັດທະນາຄານ' }, */
    /*     { field: 'bankName', header: 'ຊື່ທະນາຄານ' }, */
    { field: 'amount', header: 'ຈຳນວນ' },
    { field: 'moneyCoupon', header: 'ສ່ວນຫຼຸດ / ເປັນເງິນ' },
    { field: 'moneyDiscount', header: 'ສ່ວນຫຼຸດ / ເປັນເປີເຊັນ' },
    { field: 'moneyUpfrontPay', header: 'ເງິນຈ່າຍກ່ອນ' },
    { field: 'total', header: 'ລວມ' },
    /*     { field: 'moneyReceived', header: 'ເງິນທີ່ຮັບມາ' }, */
    /*     { field: 'moneyChange', header: 'ເງິນທອນ' },
        { field: 'isStatus', header: 'ສະຖານະ' },
        { field: 'paymentType', header: 'ປະເພດການຊຳລະ' }, */
    /*     { field: 'referenceNumber', header: 'ເລກອ້າງອີງ' },
        { field: 'updatedAt', header: 'ແກ້ໄຂເມື່ອ' }, */
    { field: 'createdAt', header: 'ວັນທີສ້າງໃບບິນ' },
];
exports.exportOrderCol = [
    /*     { field: 'id', header: 'ລະຫັດ' }, */
    { field: 'createdAt', header: 'ວັນທີສ້າງໃບບິນ' },
    { field: 'billNumber', header: 'ເລກບິນ' },
    /*  { field: 'userId', header: 'ລະຫັດຜູ້ໃຊ້' }, */
    /* { field: 'restaurantId', header: 'ລະຫັດຮ້ານ' }, */
    /*     { field: 'restaurantName', header: 'ຊື່ຮ້ານ' }, */
    /*     { field: 'branchId', header: 'ລະຫັດສາຂາ' }, */
    /*     { field: 'branchName', header: 'ຊື່ສາຂາ' }, */
    /*  { field: 'tableId', header: 'ລະຫັດໂຕະ' }, */
    /*     { field: 'tableName', header: 'ເລກໂຕະ' }, */
    /*     { field: 'bankId', header: 'ລະຫັດທະນາຄານ' }, */
    /*     { field: 'bankName', header: 'ຊື່ທະນາຄານ' }, */
    { field: 'moneyDiscount', header: 'ສ່ວນຫຼຸດ / ເປັນເປີເຊັນ' },
    { field: 'paymentType', header: 'ປະເພດການຊຳລະ' },
    { field: 'amount', header: 'ຈຳນວນ' },
    { field: 'total', header: 'ລວມ' },
];
exports.billCheckOrderCol = [
    { field: 'menuName', header: 'ຊື່ເມນູ' },
    { field: 'amount', header: 'ຈຳນວນ' },
    { field: 'price', header: 'ລາຄາ' },
    { field: 'total', header: 'ລວມ' },
];
