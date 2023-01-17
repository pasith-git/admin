export interface Category {
    id: number;
    name: string;
    restaurantId: number;
    restaurantName: string;
    branchId: number;
    brancheName: string;
    printerId: number;
    ipAddress: string;
    portNumber: number;
    placement: string;
    isDelete: boolean;
    createdAt: string;
    updatedAt: string;
    updatedBy: string;
}

export const colCategory = [
    /*     { header: 'ລະຫັດຮ້ານ', field: 'ລະຫັດຮ້ານ' },
     { header: 'ລະຫັດສາຂາ', field: 'ລະຫັດສາຂາ' }, */
    { header: 'ຊື່', field: 'name' },
    { header: 'ໄອພີ', field: 'ipAddress' },
    { header: 'ສ້າງເມື່ອ', field: 'createdAt' },
    { header: 'ແກ້ໄຂເມື່ອ', field: 'updatedAt' },
]