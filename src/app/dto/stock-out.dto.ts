export class StockOutDto {
    restaurantId: number;
    branchId: number;
    productId: number;
    stockUnitId: number;
    stockOutId?: number;
    amount?: number;
    reason?: string;
}
