

export interface BaseProduct {
    id: number;
    name: string;
    price: number;
    rating: number;
    category: string;
    description: string;
    imageUrl: string;
    stockQuantity: number;
  }
  
  export interface Product extends BaseProduct {
    productId: number;
    createdAt: string;
    updatedAt: string;
  }
  