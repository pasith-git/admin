export interface StockOut {
    id: number;
    restaurantId: number;
    branchId: number;
    productId: number;
    productName: string;
    stockUnitId: number;
    unitName: string;
    amount: number;
    reason: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
}

export type StockoutLabel = {
    id: 'ລະຫັດ';
    restaurantId: 'ລະຫັດຮ້ານ';
    branchId: 'ລະຫັດສາຂາ';
    productId: 'ລະຫັດສິນຄ້າ';
    productName: 'ຊື່ສິນຄ້າ';
    stockUnitId: 'ລະຫັດສະຕ໊ອກ';
    unitName: 'ປະເພດ';
    amount: 'ຈຳນວນ';
    reason: 'ເຫດຜົນ', 
    createdAt: 'ສ້າງເມື່ອ',
    updatedAt: 'ແກ້ໄຂເມື່ອ',
    createdBy: 'ສ້າງໂດຍ',
    updatedBy: 'ແກ້ໄຂໂດຍ',
}

export type StockoutCol = {
    field: keyof StockoutLabel,
    header: StockoutLabel[keyof StockoutLabel],
}

export const stockoutcol: StockoutCol[] = [
/*     { field: 'id', 'header': 'ລະຫັດ' }, */
/*     { field: 'restaurantId', 'header': 'ລະຫັດຮ້ານ' },
    { field: 'branchId', 'header': 'ລະຫັດສາຂາ' },
    { field: 'productId', 'header': 'ລະຫັດສິນຄ້າ' }, */
    { field: 'productName', 'header': 'ຊື່ສິນຄ້າ' },
/*     { field: 'stockUnitId', 'header': 'ລະຫັດສະຕ໊ອກ' }, */
    { field: 'unitName', 'header': 'ປະເພດ' },
    { field: 'amount', 'header': 'ຈຳນວນ' },
    { field: 'reason', 'header': 'ເຫດຜົນ' },
    { field: 'createdAt', 'header': 'ສ້າງເມື່ອ' },
    { field: 'updatedAt', 'header': 'ແກ້ໄຂເມື່ອ' },
/*     { field: 'createdBy', 'header': 'ສ້າງໂດຍ' },
    { field: 'updatedBy', 'header': 'ແກ້ໄຂໂດຍ' }, */

]