import React, { useState } from 'react';

export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  effect: number; // Exemplo: quantidade de HP restaurada
}

interface InventoryScreenProps {
  onExit: () => void;
  onUseItem: (item: InventoryItem) => void;
}

const InventoryScreen: React.FC<InventoryScreenProps> = ({ onExit, onUseItem }) => {
  // Exemplo de inventário inicial com alguns itens
  const [items, setItems] = useState<InventoryItem[]>([
    { id: 1, name: 'Poção', quantity: 3, effect: 20 },
    { id: 2, name: 'Elixir', quantity: 1, effect: 50 },
  ]);

  const handleUseItem = (item: InventoryItem) => {
    if (item.quantity > 0) {
      // Atualiza o inventário, diminuindo a quantidade do item usado
      setItems((prevItems) =>
        prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
        )
      );
      onUseItem(item);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Inventário</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: '8px' }}>
            {item.name} (x{item.quantity})
            <button onClick={() => handleUseItem(item)} style={{ marginLeft: '10px' }}>
              Usar
            </button>
          </li>
        ))}
      </ul>
      <button onClick={onExit}>Fechar Inventário</button>
    </div>
  );
};

export default InventoryScreen;
