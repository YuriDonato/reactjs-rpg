// src/components/BossCombatScreen.tsx
import React, { useState } from 'react';

interface BossCombatScreenProps {
  playerHP: number;
  onUpdateHP: (newHP: number) => void;
  onExitCombat: () => void;
  onVictory: (xp: number, remainingHP: number) => void;
  attackBonus: number;
  defenseBonus: number;
}

const BossCombatScreen: React.FC<BossCombatScreenProps> = ({
  playerHP,
  onUpdateHP,
  onExitCombat,
  onVictory,
  attackBonus,
  defenseBonus,
}) => {
  const [bossHP, setBossHP] = useState(200);
  const [message, setMessage] = useState('A batalha contra o Boss começou!');
  const [playerTurn, setPlayerTurn] = useState(true);
  const [specialCooldown, setSpecialCooldown] = useState<number>(0);

  const handlePlayerAttack = () => {
    if (!playerTurn) return;
    const baseDamage = Math.floor(Math.random() * 20) + 5;
    const effectiveDamage = baseDamage + attackBonus;
    const newBossHP = Math.max(bossHP - effectiveDamage, 0);
    setBossHP(newBossHP);
    setMessage(`Você atacou o Boss e causou ${effectiveDamage} de dano!`);
    setPlayerTurn(false);
    if (newBossHP > 0) {
      setTimeout(handleBossAttack, 1500);
    }
  };

  const handleSpecialAttack = () => {
    if (!playerTurn || specialCooldown > 0) return;
    const baseDamage = Math.floor(Math.random() * 25) + 15;
    const effectiveDamage = baseDamage + attackBonus;
    const newBossHP = Math.max(bossHP - effectiveDamage, 0);
    setBossHP(newBossHP);
    setMessage(`Você usou sua habilidade especial contra o Boss e causou ${effectiveDamage} de dano!`);
    setPlayerTurn(false);
    setSpecialCooldown(3);
    if (newBossHP > 0) {
      setTimeout(handleBossAttack, 1500);
    }
  };

  const handleDefend = () => {
    if (!playerTurn) return;
    setMessage('Você se defendeu contra o ataque do Boss!');
    setPlayerTurn(false);
    setTimeout(() => {
      const baseDamage = Math.floor(Math.random() * 10) + 1;
      const effectiveDamage = Math.max(baseDamage - defenseBonus, 1);
      const newHP = Math.max(playerHP - effectiveDamage, 0);
      onUpdateHP(newHP);
      setMessage(`O Boss atacou e causou ${effectiveDamage} de dano!`);
      setSpecialCooldown(prev => (prev > 0 ? prev - 1 : 0));
      setPlayerTurn(true);
    }, 1500);
  };

  const handleBossAttack = () => {
    const baseDamage = Math.floor(Math.random() * 20) + 5;
    const effectiveDamage = Math.max(baseDamage - defenseBonus, 1);
    const newHP = Math.max(playerHP - effectiveDamage, 0);
    onUpdateHP(newHP);
    setMessage(`O Boss atacou e causou ${effectiveDamage} de dano!`);
    setSpecialCooldown(prev => (prev > 0 ? prev - 1 : 0));
    setPlayerTurn(true);
  };

  if (bossHP === 0) {
    const xpGained = Math.floor(Math.random() * 50) + 50;
    return (
      <div style={{ padding: '20px' }}>
        <h1>Você venceu o Boss!</h1>
        <p>Ganhou {xpGained} XP!</p>
        <button onClick={() => onVictory(xpGained, playerHP)}>Continuar</button>
      </div>
    );
  }

  if (playerHP === 0) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Você foi derrotado pelo Boss...</h1>
        <button onClick={onExitCombat}>Voltar ao Mapa</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Batalha contra o Boss</h1>
      <p>{message}</p>
      <div style={{ marginBottom: '10px' }}>
        <p>HP Jogador: {playerHP}</p>
        <p>HP do Boss: {bossHP}</p>
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

export default BossCombatScreen;
