export class PaymentDto {
    orderId: number;
    restaurantId: number;
    branchId: number;
    tableId: number;
    bankId?: number;
    total: number;
    amount: number;
    moneyCoupon?: number;
    moneyDiscount?: number;
    moneyUpfrontPay?: number;
    moneyReceived: number;
    moneyChange: number;
    tariff: number;
    moneyVat: number;
    totalVat: number;
    isStatus: string;
    paymentType: string;
    referenceNumber?: number;
    couponCode?: string;
}