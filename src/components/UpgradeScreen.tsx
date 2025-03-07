import React from 'react';

interface UpgradeScreenProps {
  onApplyUpgrade: (upgrade: 'hp' | 'attack' | 'cooldown') => void;
}

const UpgradeScreen: React.FC<UpgradeScreenProps> = ({ onApplyUpgrade }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Escolha seu Upgrade</h1>
      <button onClick={() => onApplyUpgrade('hp')}>Aumentar HP Máximo (+20)</button>
      <button onClick={() => onApplyUpgrade('attack')} style={{ marginLeft: '10px' }}>
        Aumentar Ataque (+5)
      </button>
      <button onClick={() => onApplyUpgrade('cooldown')} style={{ marginLeft: '10px' }}>
        Reduzir Cooldown (-1 turno)
      </button>
    </div>
  );
};

export default UpgradeScreen;
