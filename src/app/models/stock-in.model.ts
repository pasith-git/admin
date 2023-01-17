export interface StockIn {
    id: number;
    restaurantId: number;
    branchId: number;
    productId: number;
    productName: string;
    stockUnitId: number;
    unitName: string;
    amount: number;
    price: number;
    isDelete: boolean;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
}

export type StockInLabel = {
    id: 'ລະຫັດ';
    restaurantId: 'ລະຫັດຮ້ານຄ້າ';
    branchId: 'ລະຫັດສາຂາ';
    productId: 'ລະຫັດສິນຄ້າ';
    productName: 'ຊື່';
    stockUnitId: 'ລະຫັດສຕ໊ອກ';
    unitName: 'ປະເພດ';
    amount: 'ຈຳນວນ';
    price: 'ລາຄາ';
    isDelete: 'isDelete';
    createdAt: 'ສ້າງເມື່ອ',
    updatedAt: 'ແກ້ໄຂເມື່ອ',
    createdBy: 'ສ້າງໂດຍ',
    updatedBy: 'ແກ້ໄຂໂດຍ',
}

export type StockInCol = {
    field: keyof StockInLabel,
    header: StockInLabel[keyof StockInLabel],
}

export const stockInCol: StockInCol[] = [
/*     { field: 'id', 'header': 'ລະຫັດ' }, */
/*     { field: 'restaurantId', 'header': 'ລະຫັດຮ້ານຄ້າ' }, */
/*     { field: 'branchId', 'header': 'ລະຫັດສາຂາ' }, */
/*     { field: 'productId', 'header': 'ລະຫັດສິນຄ້າ' }, */
    { field: 'productName', 'header': 'ຊື່'},
/*     { field: 'stockUnitId', 'header': 'ລະຫັດສຕ໊ອກ' }, */
    { field: 'unitName', 'header': 'ປະເພດ' },
    { field: 'amount', 'header': 'ຈຳນວນ' },
    { field: 'price', 'header': 'ລາຄາ' },
/*     { field: 'isDelete', 'header': 'ຈຳນວນ' }, */
        { field: 'createdAt', header: 'ສ້າງເມື່ອ'},
    { field: 'updatedAt', header: 'ແກ້ໄຂເມື່ອ' },
    /*     { field: 'createdBy', header: 'ສ້າງໂດຍ' }, */
    /*     { field: 'updatedBy', header: 'ແກ້ໄຂໂດຍ' }, */
]