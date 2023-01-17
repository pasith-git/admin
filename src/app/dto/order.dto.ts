export enum OrderStatus {
    pending = 'pending',
    success = 'success',
    cancel = 'cancel',
}

export enum PaymentType {
    pending = 'pending',
    cash = 'cash',
    bank = 'bank',
}

export class OrderDto {
    orderId: number;
    restaurantId: number;
    branchId: number;
    tableId: number;
    bankId?: number | null;
    total?: number;
    amount?: number;
    moneyCoupon: number;
    moneyDiscount: number;
    moneyUpfrontPay: number;
    moneyReceived: number;
    moneyChange: number;
    tariff?: number;
    moneyVat?: number;
    totalVat?: number;
    isStatus: OrderStatus;
    paymentType: PaymentType;
    referenceNumber?: number | null;
    orderdetails: OrderDetailDto[] | null;
}

export class OrderDetailDto {
    orderDetailId: number;
    orderId: number;
    restaurantId: number;
    branchId: number;
    tableId: number;
    menuId: number;
    bankId: number | null;
    price: number;
    amount: number;
    total: number;
    isStatus: string;
    paymentType: string;
    comment: string;
    reason: string;
    referenceNumber: number | null;
}

export enum status {
    success = 'success',
    pending = 'pending',
    cancel = 'cancel',

}

export class getOrdersDto {
    restaurantId?: number;
    branchId?: number;
    status?: string | status;
    langcode?: string | null;
    limit?: number | null;
    startDate?: string | null;
    toDate?: string | null;
}