import React, { useState } from 'react';

interface CombatScreenProps {
  playerHP: number;
  onUpdateHP: (newHP: number) => void;
  onExitCombat: () => void;
  onVictory: (xp: number, remainingHP: number) => void;
  attackBonus: number;
  defenseBonus: number;
}

const CombatScreen: React.FC<CombatScreenProps> = ({
  playerHP,
  onUpdateHP,
  onExitCombat,
  onVictory,
  attackBonus,
  defenseBonus,
}) => {
  const [enemyHP, setEnemyHP] = useState(100);
  const [message, setMessage] = useState('Sua vez de agir!');
  const [playerTurn, setPlayerTurn] = useState(true);
  const [specialCooldown, setSpecialCooldown] = useState<number>(0);

  const handlePlayerAttack = () => {
    if (!playerTurn) return;
    const baseDamage = Math.floor(Math.random() * 20) + 5;
    const effectiveDamage = baseDamage + attackBonus;
    const newEnemyHP = Math.max(enemyHP - effectiveDamage, 0);
    setEnemyHP(newEnemyHP);
    setMessage(`Você atacou e causou ${effectiveDamage} de dano!`);
    setPlayerTurn(false);
    if (newEnemyHP > 0) {
      setTimeout(handleEnemyAttack, 1000);
    }
  };

  const handleSpecialAttack = () => {
    if (!playerTurn || specialCooldown > 0) return;
    const baseDamage = Math.floor(Math.random() * 25) + 15;
    const effectiveDamage = baseDamage + attackBonus;
    const newEnemyHP = Math.max(enemyHP - effectiveDamage, 0);
    setEnemyHP(newEnemyHP);
    setMessage(`Você usou Habilidade Especial e causou ${effectiveDamage} de dano!`);
    setPlayerTurn(false);
    setSpecialCooldown(3);
    if (newEnemyHP > 0) {
      setTimeout(handleEnemyAttack, 1000);
    }
  };

  const handleDefend = () => {
    if (!playerTurn) return;
    setMessage('Você se defendeu e reduziu o dano do inimigo!');
    setPlayerTurn(false);
    setTimeout(() => {
      const baseDamage = Math.floor(Math.random() * 10) + 1;
      const effectiveDamage = Math.max(baseDamage - defenseBonus, 1);
      const newHP = Math.max(playerHP - effectiveDamage, 0);
      onUpdateHP(newHP);
      setMessage(`O inimigo atacou e causou ${effectiveDamage} de dano!`);
      setSpecialCooldown(prev => (prev > 0 ? prev - 1 : 0));
      setPlayerTurn(true);
    }, 1000);
  };

  const handleEnemyAttack = () => {
    const baseDamage = Math.floor(Math.random() * 15) + 3;
    const effectiveDamage = Math.max(baseDamage - defenseBonus, 1);
    const newHP = Math.max(playerHP - effectiveDamage, 0);
    onUpdateHP(newHP);
    setMessage(`O inimigo atacou e causou ${effectiveDamage} de dano!`);
    setSpecialCooldown(prev => (prev > 0 ? prev - 1 : 0));
    setPlayerTurn(true);
  };

  if (enemyHP === 0) {
    const xpGained = Math.floor(Math.random() * 30) + 20;
    return (
      <div style={{ padding: '20px' }}>
        <h1>Você venceu!</h1>
        <p>Ganhou {xpGained} XP!</p>
        <button onClick={() => onVictory(xpGained, playerHP)}>Continuar</button>
      </div>
    );
  }

  if (playerHP === 0) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Você foi derrotado...</h1>
        <button onClick={onExitCombat}>Voltar ao Mapa</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Combate</h1>
      <p>{message}</p>
      <div style={{ marginBottom: '10px' }}>
        <p>HP Jogador: {playerHP}</p>
        <p>HP Inimigo: {enemyHP}</p>
        <p>Cooldown Habilidade Especial: {specialCooldown}</p>
      </div>
      <button onClick={handlePlayerAttack} disabled={!playerTurn}>
        Atacar
      </button>
      <button
        onClick={handleSpecialAttack}
        disabled={!playerTurn || specialCooldown > 0}
        style={{ marginLeft: '10px' }}
      >
        Habilidade Especial
      </button>
      <button onClick={handleDefend} disabled={!playerTurn} style={{ marginLeft: '10px' }}>
        Defender
      </button>
      <button onClick={onExitCombat} style={{ marginLeft: '10px' }}>
        Fugir
      </button>
    </div>
  );
};

export default CombatScreen;
