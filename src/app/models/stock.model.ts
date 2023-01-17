export interface Stock{
    id: number;
    restaurantId: number;
    branchId: number;
    productId: number;
    productName: string;
    amount: number;
    stockUnitId: number;
    unitName: string;
    netContent: number;
    typeName: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
}


export const colStock = [
    /*     { header: 'ລະຫັດຮ້ານ', field: 'ລະຫັດຮ້ານ' },
        { header: 'ລະຫັດສາຂາ', field: 'ລະຫັດສາຂາ' }, */
    { header: 'ຊື່', field: 'productName' },
    { header: 'ຈຳນວນ', field: 'amount' },
    { header: 'ປະເພດ', field: 'typeName' },
    { header: 'ຫົວໜ່ວຍ', field: 'unitName' },
    { header: 'ສ້າງເມື່ອ', field: 'createdAt' },
    { header: 'ແກ້ໄຂເມື່ອ', field: 'updatedAt' },
]