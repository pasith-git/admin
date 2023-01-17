export interface Province {
    id?: number,
    name: string,
    region: string,
    isDelete?: boolean,
    createdAt?: Date,
    updatedAt?: Date,
}

export type ProvinceLabel = {
    id: 'ລະຫັດແຂວງ',
    name: 'ຊື່',
    region: 'ເຂດ',
    isDelete: 'isDelete',
    createdAt: 'ສ້າງເມື່ອ',
    updatedAt: 'ແກ້ໄຂເມື່ອ',
}

export type ProvinceCol = {
    field: keyof ProvinceLabel,
    header: ProvinceLabel[keyof ProvinceLabel]
}

export const provinceCols = [
    { field: 'id', header: 'ລະຫັດແຂວງ' },
    { field: 'name', header: 'ຊື່' },
    { field: 'region', header: 'ເຂດ' },
    { field: 'isDelete', header: 'isDelete' },
    { field: 'createdAt', header: 'ສ້າງເມື່ອ' },
]

export const provinceFunLabel = {
    headModal: 'ເພີ່ມຂໍ້ມູນແຂວງ',
    createLabel: 'ເພີ່ມແຂວງ',
}