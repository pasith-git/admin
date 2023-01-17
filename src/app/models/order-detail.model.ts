export interface OrderDetail {
    menuId: number
    menuName: string
    unitName: string
    price: number
    amount: number
    reason: string,
}

export type OrderDetailLabel = {
    menuId: 'ລະຫັດ'
    menuName: 'ຊື່ເມນູ'
    unitName: 'ຫົວໜ່ວຍເມນູ'
    price: 'ລາຄາ'
    amount: 'ຈຳນວນ'
}

export type OrderDetailCol = {
    field: keyof OrderDetailLabel,
    header: OrderDetailLabel[keyof OrderDetailLabel],
}

export const orderdetailCol: OrderDetailCol[] = [
    /*  {field: 'menuId', 'header': 'ລະຫັດ'}, */
    { field: 'menuName', 'header': 'ຊື່ເມນູ' },
    { field: 'unitName', 'header': 'ຫົວໜ່ວຍເມນູ' },
    { field: 'amount', 'header': 'ຈຳນວນ' },
    { field: 'price', 'header': 'ລາຄາ' },
]