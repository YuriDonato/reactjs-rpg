// src/components/ShopScreen.tsx
import React from 'react';
import { ShopItem } from './types';

interface ShopScreenProps {
  onClose: () => void;
  onBuy: (item: ShopItem) => void;
  shopItems: ShopItem[];
  playerGold: number;
}

const ShopScreen: React.FC<ShopScreenProps> = ({ onClose, onBuy, shopItems, playerGold }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Loja</h1>
      <p>Ouro: {playerGold}</p>
      <ul>
        {shopItems.map((item) => (
          <li key={item.id} style={{ marginBottom: '10px' }}>
            <strong>{item.name}</strong> - Preço: {item.price} | Efeito: {item.effect}
            <button onClick={() => onBuy(item)} style={{ marginLeft: '10px' }}>
              Comprar
            </button>
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Fechar Loja</button>
    </div>
  );
};

export default ShopScreen;
