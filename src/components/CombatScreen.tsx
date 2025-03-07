import React, { useState } from "react";
import { StyledButton } from "../styles/StyledButtons";
import { PlayerStats, StyledHUD } from "../styles/StyledHUD";
import { StyledH1 } from "../styles/StyledWord";

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
  const [message, setMessage] = useState("Sua vez de agir!");
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
    setMessage(
      `Você usou Habilidade Especial e causou ${effectiveDamage} de dano!`
    );
    setPlayerTurn(false);
    setSpecialCooldown(3);
    if (newEnemyHP > 0) {
      setTimeout(handleEnemyAttack, 1000);
    }
  };

  const handleDefend = () => {
    if (!playerTurn) return;
    setMessage("Você se defendeu e reduziu o dano do inimigo!");
    setPlayerTurn(false);
    setTimeout(() => {
      const baseDamage = Math.floor(Math.random() * 10) + 1;
      const effectiveDamage = Math.max(baseDamage - defenseBonus, 1);
      const newHP = Math.max(playerHP - effectiveDamage, 0);
      onUpdateHP(newHP);
      setMessage(`O inimigo atacou e causou ${effectiveDamage} de dano!`);
      setSpecialCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      setPlayerTurn(true);
    }, 1000);
  };

  const handleEnemyAttack = () => {
    const baseDamage = Math.floor(Math.random() * 15) + 3;
    const effectiveDamage = Math.max(baseDamage - defenseBonus, 1);
    const newHP = Math.max(playerHP - effectiveDamage, 0);
    onUpdateHP(newHP);
    setMessage(`O inimigo atacou e causou ${effectiveDamage} de dano!`);
    setSpecialCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    setPlayerTurn(true);
  };

  if (enemyHP === 0) {
    const xpGained = Math.floor(Math.random() * 30) + 20;
    return (
      <div>
        <StyledHUD
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
        >
          <StyledH1 style={{ textAlign: "center" }}>Você venceu!</StyledH1>
          <PlayerStats
            style={{ marginBottom: "8px", width: "100%", padding: "8px" }}
          >
            Ganhou {xpGained} XP!
          </PlayerStats>
          <StyledButton onClick={() => onVictory(xpGained, playerHP)}>
            Continuar
          </StyledButton>
        </StyledHUD>
      </div>
    );
  }

  if (playerHP === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <StyledHUD
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
        >
          <StyledH1 style={{ textAlign: "center" }}>
            Você foi derrotado...
          </StyledH1>
          <StyledButton onClick={onExitCombat}>Voltar ao Mapa</StyledButton>
        </StyledHUD>
      </div>
    );
  }

  return (
    <div>
      <StyledHUD
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        <StyledH1 style={{ textAlign: "center" }}>Combate</StyledH1>
        <PlayerStats>{message}</PlayerStats>
        <PlayerStats>HP Jogador: {playerHP}</PlayerStats>
        <PlayerStats>HP Inimigo: {enemyHP}</PlayerStats>
        <PlayerStats>
          Cooldown Habilidade Especial: {specialCooldown}
        </PlayerStats>
        <StyledButton onClick={handlePlayerAttack} disabled={!playerTurn}>
          Atacar
        </StyledButton>
        <StyledButton
          onClick={handleSpecialAttack}
          disabled={!playerTurn || specialCooldown > 0}
        >
          Habilidade Especial
        </StyledButton>
        <StyledButton onClick={handleDefend} disabled={!playerTurn}>
          Defender
        </StyledButton>
        <StyledButton onClick={onExitCombat}>Fugir</StyledButton>
      </StyledHUD>
    </div>
  );
};

export default CombatScreen;
