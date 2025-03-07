// src/components/types.ts
export interface ShopItem {
  id: number;
  name: string;
  price: number;
  effect: number;
  description: string;
}

export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  effect: number;
  description: string;
}

// Nova interface para equipamentos
export interface EquipmentItem {
  id: number;
  name: string;
  type: "weapon" | "armor";
  bonus: number; // Por exemplo: bonus de dano para arma ou bonus de defesa para armadura
  description: string;
}
