export enum Util {
    Api = 'https://rms.jlsipos.com/api/v1/',
    ApiSecond = 'https://rmstest.jlsipos.com/',
}
export enum ApiPath {
    product = 'products',
    productType = 'product-types',
    unit = 'units',
    stock = 'stocks',
    stockIn = 'stock-ins',
    stockOut = 'stock-outs',
    stockUnit = 'stock-units',
    category = 'categories',
    bank = 'banks',
    order = 'orders',
    orderDetail = 'order-details',
    coupon = 'coupons',
    member = 'members',
    menu = 'menus',
    menuDetail = 'menu-details',
    user = 'users',
    province = 'provinces',
    district = 'districts',
    language = 'languages',
    opPayment = 'purchase-package',
}

export const laWords = {
    headerReport: {
        orderReport: 'ລາຍງານການຂາຍ ແລະ ຍົກເລີກ',
        orderDetailReport: 'ລາຍງານຍອດຂາຍຕາມລາຍການເມນູ',
        stockMainReport: 'ລາຍງານສິນຄ້າ',
    },
    orderReport: 'ການຂາຍ ແລະ ຍົກເລີກ',
    orderDetailReport: 'ຍອດຂາຍຕາມລາຍການເມນູ',
    stockMainReport: 'ສິນຄ້າ',
    stockReport: {
        stockInReport: 'ລາຍງານການຮັບສິນຄ້າເຂົ້າ',
        stockOutReport: 'ລາຍງານການນຳໃຊ້ນຳສິນຄ້າອອກ',
        stockInOutReport: 'ລາຍງານຍອດວັດຖຸດິບທີ່ຍັງເຫຼືອ, ນຳເຂົ້າ ແລະ ຍອດທີ່ນຳໃຊ້ ',
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
        crudCoupon: 'ຈັດການຂໍ້ມູນຄູປອງ',
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
        crudCoupon: 'ຄູປອງ',
    }
}


export const MPSTATUS = {
    rec: 'received',
    cha: 'changed',
}

export enum Status {
    pending = 'pending',
    success = 'success',
    cancel = 'cancel',
}

export enum Roles {
    SUPERADMIN = 'superadmin',
    SYSTEMADMIN = 'systemadmin',
    SYSTEMACCOUNTANT = 'systemaccountant',
    RESTAURANTADMIN = 'restaurantadmin',
    BRANCHMANAGER = 'branchmanager',
    BRANCHACCOUNTANT = 'branchaccountant',
    CASHIER = 'cashier',
    WAITER = 'waiter',
    COOK = 'cook',
}


export const nationalRegexPatternLaos = () => {
    const re = new RegExp(`^[\u0e80-\u0eff\s]{1,}$`);
    return re;
}

export const nationalRegexPatternThai = () => {
    const re = new RegExp(`^[\u0e00-\u0e7f\s]{1,}$`);
    return re;
}

export const nationalRegexPatternVn = () => {
    const re = new RegExp(`^[\u00c0-\u1ef9\s]{1,}$`);
    return re;
}

export const nationalRegexPatternEn = () => {
    const re = new RegExp(`^[a-zA-Z\s]{1,}$`);
    return re;
}
