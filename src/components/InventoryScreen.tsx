// src/components/InventoryScreen.tsx
import React from 'react';
import { InventoryItem } from './types';

interface InventoryScreenProps {
  inventory: InventoryItem[];
  onClose: () => void;
  onUseItem: (item: InventoryItem) => void;
}

const InventoryScreen: React.FC<InventoryScreenProps> = ({ inventory, onClose, onUseItem }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Inventário</h1>
      {inventory.length === 0 ? (
        <p>Nenhum item no inventário.</p>
      ) : (
        <ul>
          {inventory.map((item) => (
            <li key={item.id} style={{ marginBottom: '8px' }}>
              {item.name} (x{item.quantity})
              <button onClick={() => onUseItem(item)} style={{ marginLeft: '10px' }}>
                Usar
              </button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={onClose}>Fechar Inventário</button>
    </div>
  );
};

export default InventoryScreen;
