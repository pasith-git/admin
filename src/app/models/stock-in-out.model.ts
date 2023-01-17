export interface Stockinout {
    id: number;
    restaurantId: number;
    branchId: number;
    productId: number;
    productName: string;
    amount: number;
    inAmount: number;
    usedAmount: number;
    stockUnitId: number;
    unitName: string;
    netContent: number;
    typeName: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
}

export type StockinoutLabel = {
    id: 'ລະຫັດ';
    restaurantId: 'ລະຫັດຮ້ານ';
    branchId: 'ລະຫັດສາຂາ';
    productId: 'ລະຫັດສິນຄ້າ';
    productName: 'ຊື່ສິນຄ້າ';
    amount: 'ຍັງເຫຼືອ';
    inAmount: 'ນຳເຂົ້າ';
    usedAmount: 'ນຳໃຊ້';
    stockUnitId: 'ລະຫັດສະຕ໊ອກ';
    unitName: 'ໜ່ວຍ';
    netContent: 'netContent';
    typeName: 'ປະເພດ';
    createdAt: 'ວັນທີ',
    updatedAt: 'ແກ້ໄຂເມື່ອ',
    createdBy: 'ສ້າງໂດຍ',
    updatedBy: 'ແກ້ໄຂໂດຍ',
}

export type StockinoutCol = {
    field: keyof StockinoutLabel,
    header: StockinoutLabel[keyof StockinoutLabel],
}

export const stockinoutCol: StockinoutCol[] = [
    /*     { field: 'id', 'header': 'ລະຫັດ' },
        { field: 'restaurantId', 'header': 'ລະຫັດຮ້ານ' },
        { field: 'branchId', 'header': 'ລະຫັດສາຂາ' },
        { field: 'productId', 'header': 'ລະຫັດສິນຄ້າ' }, */
    { field: 'productName', 'header': 'ຊື່ສິນຄ້າ' },
    { field: 'unitName', 'header': 'ໜ່ວຍ' },
    { field: 'typeName', 'header': 'ປະເພດ' },
    { field: 'inAmount', 'header': 'ນຳເຂົ້າ' },
    { field: 'usedAmount', 'header': 'ນຳໃຊ້' },
    { field: 'amount', 'header': 'ຍັງເຫຼືອ' },
    /*    { field: 'stockUnitId', 'header': 'ລະຫັດສະຕ໊ອກ' }, */
    /* { field: 'netContent', 'header': 'netContent' }, */
    /*     { field: 'updatedAt', 'header': 'ແກ້ໄຂເມື່ອ' },
        { field: 'createdBy', 'header': 'ສ້າງໂດຍ' },
        { field: 'updatedBy', 'header': 'ແກ້ໄຂໂດຍ' }, */
]

export const exportStockinoutCOl: StockinoutCol[] = [
    /*     { field: 'id', 'header': 'ລະຫັດ' },
     { field: 'restaurantId', 'header': 'ລະຫັດຮ້ານ' },
     { field: 'branchId', 'header': 'ລະຫັດສາຂາ' },
     { field: 'productId', 'header': 'ລະຫັດສິນຄ້າ' }, */
    { field: 'productName', 'header': 'ຊື່ສິນຄ້າ' },
    { field: 'unitName', 'header': 'ໜ່ວຍ' },
    /*    { field: 'stockUnitId', 'header': 'ລະຫັດສະຕ໊ອກ' }, */
    /* { field: 'netContent', 'header': 'netContent' }, */
    { field: 'typeName', 'header': 'ປະເພດ' },
    { field: 'inAmount', 'header': 'ນຳເຂົ້າ' },
    { field: 'usedAmount', 'header': 'ນຳໃຊ້' },
    { field: 'amount', 'header': 'ຍັງເຫຼືອ' },
    /*     { field: 'updatedAt', 'header': 'ແກ້ໄຂເມື່ອ' },
        { field: 'createdBy', 'header': 'ສ້າງໂດຍ' },
        { field: 'updatedBy', 'header': 'ແກ້ໄຂໂດຍ' }, */
]