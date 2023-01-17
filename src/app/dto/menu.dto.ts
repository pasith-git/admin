export class MenuDto {
    restaurantId?: number;
    branchId?: number;
    categoryId?: number;
    unitId?: number;
    menuId?: number;
    name?: string;
    price?: number;
    languages?: LanguagesDto[] | [];
    menudetails?: MenuDetailDto[];
    photo?: any;
}

export class MenuDetailDto {
    status: string;
    stockId: number;
    amount: number;
}

export class LanguagesDto {
    id: number;
    languageCode: string;
    name: string;
}