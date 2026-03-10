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
