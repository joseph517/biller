export interface Biller {
    id: string;
    name: string;
    dni: string;
    addres: string;
    products: Product[];
}

export interface Product {
    number: string;
    description: string;
    quantity: number;
    unitPrice: number;
    tax: number;
    taxValue: number;
    total: number;
}