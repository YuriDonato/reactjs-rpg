// src/components/types.ts
export interface ShopItem {
    id: number;
    name: string;
    price: number;
    effect: number; // Efeito pode ser, por exemplo, a quantidade de HP restaurada
  }
  
  export interface InventoryItem {
    id: number;
    name: string;
    quantity: number;
    effect: number;
  }
  