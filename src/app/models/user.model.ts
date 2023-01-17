export interface User {
    id?: number
    userId?: number
    username: string
    isActive: string
    isDelete: string
    createdAt: Date
    updatedAt: Date
    profile: Profile
    roles: string[]
    roleIds: number[]
}


export interface GenUser {
    id?: number
    userId?: number
    username: string
    isActive: string
    isDelete: string
    createdAt: Date
    updatedAt: Date
    profile: Profile[]
    roles: string[]
    roleIds: number[]
}

export interface Profile {
    id: number
    firstname: string
    lastname: string
    gender: string
    phone: number
    provinceId: number
    districtId: number,
    provinceName: string
    districtName: string
    village: string
    createdAt: Date
    updatedAt: Date
    createdBy: string
    updatedBy: string
}

/* Fields and Labels */

export const userField: { [p in keyof User]: p } = {
    id: 'id',
    username: 'username',
    isActive: 'isActive',
    isDelete: 'isDelete',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    profile: 'profile',
    roles: 'roles',
    roleIds: 'roleIds',

} as const

export const userLabel: { [p in keyof User]: string } = {
    id: 'ລະຫັດ',
    username: 'ຊື່',
    isActive: 'isActive',
    isDelete: 'isDelete',
    createdAt: 'ສ້າງເມື່່ອ',
    updatedAt: 'ແກ້ໄຂເມື່ອ',
    profile: 'profile',
    roles: 'ສະຖານະ',
    roleIds: 'ລະຫັດສະຖານະ',
}

export const profileField: { [p in keyof Profile]: p } = {
    id: 'id',
    firstname: 'firstname',
    lastname: 'lastname',
    gender: 'gender',
    phone: 'phone',
    provinceId: 'provinceId',
    districtId: 'districtId',
    provinceName: 'provinceName',
    districtName: 'districtName',
    village: 'village',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy',

} as const

export const profileLabel: { [p in keyof Profile]: string } = {
    id: 'id',
    firstname: 'ຊື່',
    lastname: 'ນາມສະກຸນ',
    gender: 'ເພດ',
    phone: 'ເບີໂທ',
    provinceId: 'ລະຫັດແຂວງ',
    districtId: 'ລະຫັດຖະໜົນ',
    provinceName: 'ແຂວງ',
    districtName: 'ຖະໜົນ',
    village: 'ບ້ານ',
    createdAt: 'ສ້າງເມື່່ອ',
    updatedAt: 'ແກ້ໄຂເມື່ອ',
    createdBy: 'ສ້າງໂດຍ',
    updatedBy: 'ແກ້ໄຂໂດຍ',
} as const;

export const colUser = [
    /*   { field: 'userId', header: 'ລະຫັດ' }, */
    { field: 'username', header: 'ຊື່ຜູ້ໃຊ້' },
    /*     { field: 'isActive', header: 'isActive' },
        { field: 'isDelete', header: 'isDelete' }, */
    { field: 'roles', header: 'ສະຖານະ' },
    /*     { field: 'roleIds', header: 'ລະຫັດສະຖານະ' }, */
    { field: 'displayName', header: 'ສະແດງ' },
    { field: 'createdAt', header: 'ສ້າງເມື່ອ' },
    { field: 'updatedAt', header: 'ແກ້ໄຂເມື່ອ' },

]

export const colProfile = [
    /*   { field: 'id', header: 'ລະຫັດ' },
      */
    { field: 'firstname', header: 'ຊື່ຈິງ' },
    { field: 'lastname', header: 'ນາມສະກຸນ' },
    { field: 'gender', header: 'ເພດ' },
    { field: 'phone', header: 'ເບີໂທ' },
    /*     { field: 'provinceId', header: 'ລະຫັດແຂວງ' }, */
    { field: 'village', header: 'ບ້ານ' },
    { field: 'districtName', header: 'ເມືອງ' },
    { field: 'provinceName', header: 'ແຂວງ' },
    /*     { field: 'districtId', header: 'ລະຫັດຖະໜົນ' }, */
    /*   { field: 'createdAt', header: 'createdAt' },
      { field: 'updatedAt', header: 'updatedAt' }, */
    /*   { field: 'createdBy', header: 'createdBy' },
      { field: 'updatedBy', header: 'updatedBy' }, */
]
