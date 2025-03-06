import React, { useState } from 'react';

interface CombatScreenProps {
  onExitCombat: () => void;
  onVictory: (xp: number) => void;
}

const CombatScreen: React.FC<CombatScreenProps> = ({ onExitCombat, onVictory }) => {
  const [playerHP, setPlayerHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);
  const [message, setMessage] = useState('Sua vez de agir!');
  const [playerTurn, setPlayerTurn] = useState(true);

  const handlePlayerAttack = () => {
    if (!playerTurn) return;
    const damage = Math.floor(Math.random() * 20) + 5;
    const newEnemyHP = Math.max(enemyHP - damage, 0);
    setEnemyHP(newEnemyHP);
    setMessage(`Você causou ${damage} de dano!`);
    setPlayerTurn(false);

    if (newEnemyHP > 0) {
      setTimeout(handleEnemyAttack, 1000);
    }
  };

  const handleEnemyAttack = () => {
    const damage = Math.floor(Math.random() * 15) + 3;
    const newPlayerHP = Math.max(playerHP - damage, 0);
    setPlayerHP(newPlayerHP);
    setMessage(`O inimigo causou ${damage} de dano!`);
    setPlayerTurn(true);
  };

  const handleDefend = () => {
    if (!playerTurn) return;
    setMessage('Você se defendeu e reduziu o dano do inimigo!');
    setPlayerTurn(false);
    setTimeout(() => {
      const damage = Math.floor(Math.random() * 10) + 1;
      const newPlayerHP = Math.max(playerHP - damage, 0);
      setPlayerHP(newPlayerHP);
      setMessage(`O inimigo atacou e causou ${damage} de dano!`);
      setPlayerTurn(true);
    }, 1000);
  };

  // Se o inimigo foi derrotado, calcula XP ganho e exibe a tela de vitória
  if (enemyHP === 0) {
    const xpGained = Math.floor(Math.random() * 30) + 20; // XP entre 20 e 50
    return (
      <div style={{ padding: '20px' }}>
        <h1>Você venceu!</h1>
        <p>Ganhou {xpGained} XP!</p>
        <button onClick={() => onVictory(xpGained)}>Continuar</button>
      </div>
    );
  }

  // Se o jogador foi derrotado, exibe a tela de derrota
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
      </div>
      <button onClick={handlePlayerAttack} disabled={!playerTurn}>
        Atacar
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
