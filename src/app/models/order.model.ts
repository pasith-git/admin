export interface OrderDetail {
    id: number,
    userId: string,
    orderId: number,
    restaurantId: number,
    branchId: string,
    tableId: number,
    tableNumber: null | number,
    menuId: number,
    menuName: string,
    bankId: null | string,
    price: number,
    amount: number,
    total: number,
    comment: string | null,
    isStatus: string,
    reason: string,
    paymentType: string,
    referenceNumber: null,
    createdBy: string,
    updatedBy: string,
    createdAt: Date,
    updatedAt: Date
    cb?: boolean
}

export interface Order {
    id: number,
    billNumber: string,
    userId: string,
    restaurantId: number,
    restaurantName: string,
    branchId: number,
    branchName: string,
    tableId: number,
    tableName: string,
    bankId: null | string,
    bankName: string | null,
    total: number,
    amount: number,
    moneyBalance: number,
    moneyCoupon: number,
    moneyDiscount: number,
    moneyUpfrontPay: number,
    moneyReceived: number,
    moneyChange: number,
    isStatus: string,
    paymentType: string,
    referenceNumber: null,
    excTHB: number,
    excUSD: number,
    moneyTHB: number,
    moneyUSD: number,
    moneyVat: number,
    totalVat: number,
    tariff: number,
    vatOption: string,
    updatedAt: Date,
    createdAt: Date,
    orderdetails: OrderDetail[],
}

export type OrderDetailLabel = {
    id: "ລະຫັດ",
    userId: "ລະຫັດຜູ້ໃຊ້",
    orderId: "ລະຫັດບິນ",
    restaurantId: "ລະຫັດຮ້ານ",
    branchId: "ລະຫັດສາຂາ",
    tableId: "ລະຫັດໂຕະ",
    tableNumber: "ເລກໂຕະ",
    menuId: "ລະຫັດເມນຸ",
    menuName: "ຊື່ເມນູ",
    bankId: "ລະຫັດທະນາຄານ",
    price: "ລາຄາ",
    amount: "ຈຳນວນ",
    total: "ລວມ",
    comment: "ຄວາມຄິດເຫັນ",
    isStatus: "isStatus",
    reason: "ເຫດຜົນ",
    paymentType: "ປະເພດການຊຳລະ",
    referenceNumber: "referenceNumber",
    createdAt: 'ສ້າງເມື່ອ',
    updatedAt: 'ແກ້ໄຂເມື່ອ',
    createdBy: 'ສ້າງໂດຍ',
    updatedBy: 'ແກ້ໄຂໂດຍ',
}

export type OrderLabel = {
    id: "ລະຫັດ",
    billNumber: "ເລກບິນ",
    userId: "ລະຫັດຜູ້ໃຊ້",
    restaurantId: "ລະຫັດຮ້ານ",
    restaurantName: "ຊື່ຮ້ານ",
    branchId: "ລະຫັດສາຂາ",
    branchName: "ຊື່ສາຂາ",
    tableId: "ລະຫັດໂຕະ",
    tableName: "ເລກໂຕະ",
    bankId: "ລະຫັດທະນາຄານ",
    bankName: "ຊື່ທະນາຄານ",
    total: "ລວມ",
    amount: "ຈຳນວນ",
    moneyCoupon: "ສ່ວນຫຼຸດ / ເປັນເງິນ",
    moneyDiscount: "ສ່ວນຫຼຸດ / ເປັນເປີເຊັນ",
    moneyUpfrontPay: "ເງິນຈ່າຍກ່ອນ",
    moneyReceived: "ເງິນທີ່ຮັບມາ",
    moneyChange: "ເງິນທອນ",
    isStatus: "ສະຖານະ",
    paymentType: "ປະເພດການຊຳລະ",
    referenceNumber: "ເລກອ້າງອີງ",
    orderdetails: "ລາຍລະອຽດໃບບິນ",
    createdAt: 'ວັນທີສ້າງໃບບິນ',
    updatedAt: 'ແກ້ໄຂເມື່ອ',
    createdBy: 'ສ້າງໂດຍ',
    updatedBy: 'ແກ້ໄຂໂດຍ',
}

export type OrderDetailCol = {
    field: keyof OrderDetailLabel,
    header: OrderDetailLabel[keyof OrderDetailLabel]
}

export type OrderCol = {
    field: keyof OrderLabel,
    header: OrderLabel[keyof OrderLabel],
}

export const orderDetailCol: OrderDetailCol[] = [
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
    /*      { field: 'reason', header: 'ເຫດຜົນ' }, */
    /*     { field: 'paymentType', header: 'ປະເພດການຊຳລະ' }, */
    /*     { field: 'referenceNumber', header: 'referenceNumber' }, */
    /*     { field: 'createdAt', header: 'ສ້າງເມື່ອ' }, */
    /*     { field: 'updatedAt', header: 'ແກ້ໄຂເມື່ອ' }, */
    /*     { field: 'createdBy', header: 'ສ້າງໂດຍ' }, */
    /*     { field: 'updatedBy', header: 'ແກ້ໄຂໂດຍ' }, */

]

export const orderDetailColError: OrderDetailCol[] = [
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
    /*     { field: 'paymentType', header: 'ປະເພດການຊຳລະ' }, */
    /*     { field: 'referenceNumber', header: 'referenceNumber' }, */
    /*     { field: 'createdAt', header: 'ສ້າງເມື່ອ' }, */
    /*     { field: 'updatedAt', header: 'ແກ້ໄຂເມື່ອ' }, */
    /*     { field: 'createdBy', header: 'ສ້າງໂດຍ' }, */
    /*     { field: 'updatedBy', header: 'ແກ້ໄຂໂດຍ' }, */

]

export const orderCol: OrderCol[] = [
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
]

export const exportOrderCol: OrderCol[] = [
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
    /*     { field: 'moneyCoupon', header: 'ຄູປອງ' }, */
    /*     { field: 'moneyUpfrontPay', header: 'moneyUpfrontPay' }, */
    /*     { field: 'moneyReceived', header: 'ເງິນທີ່ຮັບມາ' }, */
    /*     { field: 'moneyChange', header: 'ເງິນທອນ' }, */
    /* { field: 'isStatus', header: 'ສະຖານະ' }, */
    /*     { field: 'referenceNumber', header: 'ເລກອ້າງອີງ' },
    { field: 'updatedAt', header: 'ແກ້ໄຂເມື່ອ' }, */
]

export const billCheckOrderCol: OrderDetailCol[] = [
    { field: 'menuName', header: 'ຊື່ເມນູ' },
    { field: 'amount', header: 'ຈຳນວນ' },
    { field: 'price', header: 'ລາຄາ' },
    { field: 'total', header: 'ລວມ' },
]

/* type delete sales */

export interface Menudetail {
    id: number;
    menuId: number;
    stockId: number;
    amount: number;
    status: string;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface MenuOrder {
    id: number;
    userId: string;
    orderId: number;
    restaurantId: number;
    branchId: number;
    tableId: number;
    tableNumber: string;
    billNumber: string;
    moneyTotal: number;
    moneyDiscount: number;
    moneyCoupon: number;
    moneyUpfrontPay: number;
    ipAddress: string;
    portNumber: number;
    placement: string;
    menuId: number;
    menuName: string;
    bankId?: any;
    price: number;
    amount: number;
    total: number;
    comment: string;
    isStatus: string;
    reason: string;
    paymentType: string;
    referenceNumber?: any;
    menudetails: Menudetail[];
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
}
