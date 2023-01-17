export class CouponDto {
    restaurantId: number;
    branchId: number;
    percentAmount?: number;
    generatedCode?: string[];
    dateExit?: string;
    couponId?: number;
    isUsed?: boolean
}