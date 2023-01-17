export interface StockUnit {
    id: number;
    restaurantId: number;
    branchId: number;
    name: string;
    netContent: number;
    isDelete: boolean;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
}

export const colStockUnit = [
    /*     { header: 'ລະຫັດຮ້ານ', field: 'ລະຫັດຮ້ານ' },
        { header: 'ລະຫັດສາຂາ', field: 'ລະຫັດສາຂາ' }, */
    { header: 'ຊື່', field: 'name' },
    { header: 'netContent', field: 'netContent' },
    { header: 'ສ້າງເມື່ອ', field: 'createdAt' },
    { header: 'ແກ້ໄຂເມື່ອ', field: 'updatedAt' },
]