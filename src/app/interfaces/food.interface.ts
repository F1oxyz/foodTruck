export interface Food {
    id: number;
    created_at: string;
    name: string;
    description: string;
    price: number;
    url_img: string;
    category: string;
    available: boolean;
    // waiting_time: number;
}

export interface FoodCreate {
    name: string;
    description: string;
    price: number;
    url_img: string;
    category: string;
    available: boolean;
}

export interface newItemCarrito{
    total: number;
    id_food: number;
    quantity: number;
    options: string | null;
}

export interface ItemCarrito extends newItemCarrito {
    id: number;
    foods: Food;
}