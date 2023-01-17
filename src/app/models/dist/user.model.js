"use strict";
exports.__esModule = true;
exports.colProfile = exports.colUser = exports.profileLabel = exports.profileField = exports.userLabel = exports.userField = void 0;
/* Fields and Labels */
exports.userField = {
    id: 'id',
    username: 'username',
    isActive: 'isActive',
    isDelete: 'isDelete',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    profile: 'profile',
    roles: 'roles',
    roleIds: 'roleIds'
};
exports.userLabel = {
    id: 'ລະຫັດ',
    username: 'ຊື່',
    isActive: 'isActive',
    isDelete: 'isDelete',
    createdAt: 'ສ້າງເມື່່ອ',
    updatedAt: 'ແກ້ໄຂເມື່ອ',
    profile: 'profile',
    roles: 'ສະຖານະ',
    roleIds: 'ລະຫັດສະຖານະ'
};
exports.profileField = {
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
    updatedBy: 'updatedBy'
};
exports.profileLabel = {
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
    updatedBy: 'ແກ້ໄຂໂດຍ'
};
exports.colUser = [
    /*   { field: 'userId', header: 'ລະຫັດ' }, */
    { field: 'username', header: 'ຊື່ຜູ້ໃຊ້' },
    /*     { field: 'isActive', header: 'isActive' },
        { field: 'isDelete', header: 'isDelete' }, */
    { field: 'roles', header: 'ສະຖານະ' },
    /*     { field: 'roleIds', header: 'ລະຫັດສະຖານະ' }, */
    { field: 'displayName', header: 'ສະແດງ' },
    { field: 'createdAt', header: 'ສ້າງເມື່ອ' },
    { field: 'updatedAt', header: 'ແກ້ໄຂເມື່ອ' },
];
exports.colProfile = [
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
];
