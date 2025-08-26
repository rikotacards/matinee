export interface Item {
    id: string;
    create_at: string;
    name: string;
    user_id: string;
    rating: number; 
    date_watched: string;
    api_id: number ;
    has_watched: boolean;
}

export interface List_Item {
    id: string;
    create_at: string;
    list_id: string;
    item_id: string;
}