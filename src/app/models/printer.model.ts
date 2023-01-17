export interface Printer {
    id: number;
    restaurantId: number;
    branchId: number;
    ipAddress: string;
    portNumber: number;
    placement: string;
    isDelete: boolean;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
}

export const colPrinter = [
/*     { header: 'ລະຫັດຮ້ານ', field: 'restaurantId' },
    { header: 'ລະຫັດສາຂາ', field: 'branchId' }, */
    { header: 'ເລກໄອພີ', field: 'ipAddress' },
    { header: 'ພັອດ', field: 'portNumber' },
    { header: 'ຕຳແໜ່ງວາງ', field: 'placement' },
    { header: 'ສ້າງເມື່ອ', field: 'createdAt' },
    { header: 'ແກ້ໄຂເມື່ອ', field: 'updatedAt' },
]