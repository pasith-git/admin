export interface ProductType {
    id: number;
    restaurantId: number;
    branchId: number;
    name: string;
    isDelete: boolean;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
}

export const colProductType = [
    /*     { header: 'ລະຫັດຮ້ານ', field: 'ລະຫັດຮ້ານ' },
        { header: 'ລະຫັດສາຂາ', field: 'ລະຫັດສາຂາ' }, */
    { header: 'ຊື່', field: 'name' },
    { header: 'ສ້າງເມື່ອ', field: 'createdAt' },
    { header: 'ແກ້ໄຂເມື່ອ', field: 'updatedAt' },
]