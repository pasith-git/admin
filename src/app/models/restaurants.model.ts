export interface Branch {
    id: number,
    restaurantId: number,
    name: string,
    phone: string,
    address: string,
    logo: string,
    isStatus: string,
    isDelete: boolean,
    createdAt: Date,
    updatedAt: Date,
    createdBy: string,
    updatedBy: string,
    startDate: string,
    expiredDate: string,
    expired: boolean,
    expiredIn: number,
}

export interface Restaurant {
    id: number,
    name: string,
    phone: string,
    address: string,
    logo: string,
    isStatus: string,
    isDelete: boolean,
    createAt: Date,
    updatedAt: Date,
    createdBy: string,
    updatedBy: string,
    startDate: Date,
    endDate: Date,
    branches: Branch[]
}

export type BranchLabel = {
    id: 'ລະຫັດ',
    restaurantId: 'ລະຫັດຮ້ານ',
    name: 'ຊື່',
    phone: 'ເບີໂທ',
    address: 'ທີ່ຢູ່',
    logo: 'ໂລໂກ້',
    isStatus: 'isStatus',
    isDelete: 'isDelete',
    createdAt: 'ສ້າງເມື່່ອ',
    updatedAt: 'ແກ້ໄຂເມື່ອ',
    createdBy: 'ສ້າງໂດຍ',
    updatedBy: 'ແກ້ໄຂໂດຍ',
}

export type RestaurantLabel = {
    id: 'ລະຫັດ',
    name: 'ຊື່',
    phone: 'ເບີໂທ',
    address: 'ທີ່ຢູ່',
    logo: 'ໂລໂກ້',
    isStatus: 'isStatus',
    isDelete: 'isDelete',
    createdAt: 'ສ້າງເມື່່ອ',
    updatedAt: 'ແກ້ໄຂເມື່ອ',
    createdBy: 'ສ້າງໂດຍ',
    updatedBy: 'ແກ້ໄຂໂດຍ',
    startDate: 'startDate',
    endDate: 'endDate',
    branches: 'branches',
}

export type RestaurantCol = {
    field: keyof RestaurantLabel,
    header: RestaurantLabel[keyof RestaurantLabel]
}

export type BranchCol = {
    field: keyof BranchLabel,
    header: BranchLabel[keyof BranchLabel]
}

export const RestaurantCol: RestaurantCol[] = [
    { field: 'id', header: 'ລະຫັດ' },
    { field: 'name', header: 'ຊື່' },
    { field: 'phone', header: 'ເບີໂທ' },
    { field: 'address', header: 'ທີ່ຢູ່' },
    { field: 'logo', header: 'ໂລໂກ້' },
    { field: 'isStatus', header: 'isStatus' },
    { field: 'isDelete', header: 'isDelete' },
    { field: 'createdAt', header: 'ສ້າງເມື່່ອ' },
    { field: 'updatedAt', header: 'ແກ້ໄຂເມື່ອ' },
    { field: 'createdBy', header: 'ສ້າງໂດຍ' },
    { field: 'updatedBy', header: 'ແກ້ໄຂໂດຍ' },
    { field: 'startDate', header: 'startDate' },
    { field: 'endDate', header: 'endDate' },
    { field: 'branches', header: 'branches' },
]

export const BranchCol: BranchCol[] = [
    { field: 'id', header: 'ລະຫັດ' },
    { field: 'restaurantId', header: 'ລະຫັດຮ້ານ' },
    { field: 'name', header: 'ຊື່' },
    { field: 'phone', header: 'ເບີໂທ' },
    { field: 'address', header: 'ທີ່ຢູ່' },
    { field: 'logo', header: 'ໂລໂກ້' },
    { field: 'isStatus', header: 'isStatus' },
    { field: 'isDelete', header: 'isDelete' },
    { field: 'createdAt', header: 'ສ້າງເມື່່ອ' },
    { field: 'updatedAt', header: 'ແກ້ໄຂເມື່ອ' },
    { field: 'createdBy', header: 'ສ້າງໂດຍ' },
    { field: 'updatedBy', header: 'ແກ້ໄຂໂດຍ' },
]

export const restaurantFunLabel = {
    headModal: 'ເພີ່ມຂໍ້ມູນແຂວງ',
    createLabel: 'ເພີ່ມແຂວງ',
}