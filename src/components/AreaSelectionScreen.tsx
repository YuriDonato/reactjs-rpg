// src/components/AreaSelectionScreen.tsx
import React from 'react';

interface Area {
  id: string;
  name: string;
}

interface AreaSelectionScreenProps {
  areas: Area[];
  onSelectArea: (areaId: string) => void;
}

const AreaSelectionScreen: React.FC<AreaSelectionScreenProps> = ({ areas, onSelectArea }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Selecione uma Área</h1>
      <ul>
        {areas.map((area) => (
          <li key={area.id} style={{ marginBottom: '10px' }}>
            <button onClick={() => onSelectArea(area.id)}>{area.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AreaSelectionScreen;
