export interface Bank {
    id: number;
    restaurantId: number;
    restaurantName: string;
    branchId: number;
    branchName: string;
    name: string;
    logo: string;
    QRCode: string;
    isDelete: boolean;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
}

export interface BankOptions extends Partial<Bank> { }