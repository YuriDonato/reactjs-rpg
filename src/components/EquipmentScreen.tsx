// src/components/EquipmentScreen.tsx
import React from 'react';
import { EquipmentItem } from './types';

interface EquipmentScreenProps {
  currentEquipment: {
    weapon: EquipmentItem | null;
    armor: EquipmentItem | null;
  };
  availableEquipment: EquipmentItem[];
  onEquip: (item: EquipmentItem) => void;
  onClose: () => void;
}

const EquipmentScreen: React.FC<EquipmentScreenProps> = ({
  currentEquipment,
  availableEquipment,
  onEquip,
  onClose,
}) => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Equipamentos</h1>
      <div>
        <h3>Equipamento Atual</h3>
        <p>Arma: {currentEquipment.weapon ? currentEquipment.weapon.name : 'Nenhuma'}</p>
        <p>Armadura: {currentEquipment.armor ? currentEquipment.armor.name : 'Nenhuma'}</p>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>Itens Disponíveis</h3>
        {availableEquipment.length === 0 ? (
          <p>Nenhum item disponível para equipar.</p>
        ) : (
          <ul>
            {availableEquipment.map((item) => (
              <li key={item.id} style={{ marginBottom: '10px' }}>
                <strong>{item.name}</strong> ({item.type}) - Bônus: {item.bonus}
                <button onClick={() => onEquip(item)} style={{ marginLeft: '10px' }}>
                  Equipar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={onClose} style={{ marginTop: '20px' }}>Fechar</button>
    </div>
  );
};

export default EquipmentScreen;
