import { ProductType } from "./product-type.model";

export interface Product {
    id: number;
    branchId: number;
    restaurantId: number;
    productTypeId: number;
    productType: string;
    stockUnitId: number;
    unitName: string;
    productName: string;
    isDelete: boolean;
    createdAt: string;
    updatedAt: string;
    updatedBy: string;
}

export const colProduct = [
    /*     { header: 'ລະຫັດຮ້ານ', field: 'ລະຫັດຮ້ານ' },
     { header: 'ລະຫັດສາຂາ', field: 'ລະຫັດສາຂາ' }, */
    { header: 'ຊື່', field: 'productName' },
    { header: 'ປະເພດ', field: 'productType' },
    { header: 'ຫົວໜ່ວຍ', field: 'unitName' },
    { header: 'ສ້າງເມື່ອ', field: 'createdAt' },
    { header: 'ແກ້ໄຂເມື່ອ', field: 'updatedAt' },
]