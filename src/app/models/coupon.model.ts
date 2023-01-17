export interface Coupon {
    id: number;
    restaurantId: number;
    branchId: number;
    generatedCode: string;
    percentAmount: number;
    isUsed: boolean;
    dateExit: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
}

export const colCoupon = [
    /*     { header: 'ລະຫັດຮ້ານ', field: 'ລະຫັດຮ້ານ' },
     { header: 'ລະຫັດສາຂາ', field: 'ລະຫັດສາຂາ' }, */
/*     { header: 'ລະຫັດ', field: 'id' },
    { header: 'ລະຫັດຮ້ານ', field: 'restaurantId' },
    { header: 'ລະຫັດສາຂາ', field: 'branchId' }, */
    { header: 'ລະຫັດຄູປອງ', field: 'generatedCode' },
    { header: 'ເປິເຊັນສ່ວນຫຼຸດ', field: 'percentAmount' },
/*     { header: 'ຊື່', field: 'name' },
    { header: 'isUsed', field: 'isUsed' }, */
    { header: 'ວັນໝົດອາຍຸ', field: 'dateExit' },
    { header: 'ສ້າງເມື່ອ', field: 'createdAt' },
    { header: 'ແກ້ໄຂເມື່ອ', field: 'updatedAt' },
/*     { header: 'createdBy', field: 'createdBy' },
    { header: 'updatedBy', field: 'updatedBy' }, */
]