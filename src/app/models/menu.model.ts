export interface MenuItems {
  label: string,
  url: string,
  icon?: string,
  routerLink?: string,
}

export interface Menu {
  id: number
  name: string
  price: number
  languages?: any[]
  countOrder: number
  categoryId: number
  categoryName: string
  unitId: number
  unitName: string
  branchId: number
  branchName: string
  restaurantId: number
  restaurantName: string
  image: string
  isDelete: boolean
  outofStock: boolean
  menudetails: Menudetail[]
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
}

export interface Menudetail {
  id: number
  menuId: number
  stockId: number
  amount: number
  productId: number
  productName: string
  stockUnitId: number
  stockAmount: number
  unit: string
  status: string
  createdBy: string
  updatedBy: string
  createdAt: string
  updatedAt: string
}

export const colMenu = [
  /*   { field: 'id', header: 'ລະຫັດ' }, */
  { field: 'name', header: 'ຊື່' },
  { field: 'price', header: 'ລາຄາ' },
  /*   { field: 'countOrder', header: 'countOrder' }, */
  /*   { field: 'categoryId', header: 'ລະຫັດປະເພດ' }, */
  { field: 'categoryName', header: 'ຊື່ປະເພດ' },
  /*   { field: 'unitId', header: 'ລະຫັດຫົວໜ່ວຍ' }, */
  { field: 'unitName', header: 'ຊື່ຫົວໜ່ວຍ' },
  /*   { field: 'branchId', header: 'ລະຫັດສາຂາ' }, */
  /*   { field: 'branchName', header: 'ຊື່ສາຂາ' }, */
  /*   { field: 'restaurantId', header: 'ລະຫັດຮ້ານ' },
    { field: 'restaurantName', header: 'ຊື່ຮ້ານ' }, */
  { field: 'image', header: 'ຮູບ' },
  /*   { field: 'isDelete', header: 'isDelete' }, */
  /*   { field: 'outofStock', header: 'outofStock' }, */
  /*   { field: 'menudetails', header: 'menudetails' }, */
  { field: 'createdAt', header: 'ສ້າງເມື່ອ' },
  { field: 'updatedAt', header: 'ແກ້ໄຂເມື່ອ' },
  /*   { field: 'createdBy', header: 'createdBy' },
    { field: 'updatedBy', header: 'updatedBy' }, */

]

export const colMenuDetail = [
  /*   { field: 'id', header: 'ລະຫັດ' },
    { field: 'menuId', header: 'ລະຫັດເມນູ' },
    { field: 'stockId', header: 'ລະຫັດສຕ໊ອກ' }, */
  { field: 'productName', header: 'ຊື່' },
  { field: 'amount', header: 'ຈຳນວນ' },
  /*   { field: 'productId', header: 'ລະຫັດສິນຄ້າ' }, */
  /*  { field: 'stockUnitId', header: 'ລະຫັດຫົວໜ່ວຍສຕ໊ອກ' }, */
  /*   { field: 'stockAmount', header: 'ຈຳນວນສຕ໊ອກ' }, */
  { field: 'unit', header: 'ຫົວໜ່ວຍ' },
  { field: 'status', header: 'ສະຖານະ' },
  /*   { field: 'createdAt', header: 'createdAt' },
    { field: 'updatedAt', header: 'updatedAt' }, */
  /*   { field: 'createdBy', header: 'createdBy' },
    { field: 'updatedBy', header: 'updatedBy' }, */
]