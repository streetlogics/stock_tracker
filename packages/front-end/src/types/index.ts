export type LivePrice = {
    symbol: string;
    price: number;
    date: string;
    quantity: number;
    purchasePrice: number;
};

export type Stock = {
    id: number;
    symbol: string;
    latestPrice: number;
    createdAt: string;
    updatedAt: string;
};