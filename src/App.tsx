// src/App.tsx
import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import GameHUD from './components/GameHUD';
import CombatScreen from './components/CombatScreen';
import InventoryScreen, { InventoryItem } from './components/InventoryScreen';
import DialogueScreen from './components/DialogueScreen';
import QuestLog, { Quest } from './components/QuestLog';

const App: React.FC = () => {
  // Possíveis telas: 'map', 'combat', 'inventory', 'dialogue', 'quest'
  const [screen, setScreen] = useState<'map' | 'combat' | 'inventory' | 'dialogue' | 'quest'>('map');

  // Estados do jogador: HP, XP, nível e quests
  const [playerHP, setPlayerHP] = useState(100);
  const [playerXP, setPlayerXP] = useState(0);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [quests, setQuests] = useState<Quest[]>([]);

  const handleEncounter = () => {
    setScreen('combat');
  };

  const handleDialogue = () => {
    setScreen('dialogue');
  };

  const exitCombatOrInventory = () => {
    setScreen('map');
  };

  const openInventory = () => {
    setScreen('inventory');
  };

  const openQuestLog = () => {
    setScreen('quest');
  };

  const handleUseItem = (item: InventoryItem) => {
    setPlayerHP((prevHP) => Math.min(prevHP + item.effect, 100));
    console.log(`Usou ${item.name} e curou ${item.effect} de HP`);
  };

  const handleVictory = (xp: number) => {
    setPlayerXP((prevXP) => {
      const newXP = prevXP + xp;
      if (newXP >= 100 * playerLevel) {
        setPlayerLevel(playerLevel + 1);
        alert(`Parabéns! Você subiu para o nível ${playerLevel + 1}!`);
      }
      return newXP;
    });
    setScreen('map');
  };

  // Quando o jogador aceita a quest, adicionamos uma nova quest ao registro e voltamos para o mapa
  const handleAcceptQuest = () => {
    const newQuest: Quest = {
      id: Date.now(), // id único
      title: "Derrotar monstros na floresta",
      description: "Elimine os monstros que ameaçam a cidade.",
      completed: false,
    };
    setQuests((prevQuests) => [...prevQuests, newQuest]);
    setScreen('map');
  };

  const exitDialogue = () => {
    setScreen('map');
  };

  return (
    <div>
      {screen === 'map' && (
        <>
          <GameBoard onEncounter={handleEncounter} onDialogue={handleDialogue} />
          <GameHUD onInventory={openInventory} onOpenQuestLog={openQuestLog} />
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <p>HP Jogador: {playerHP}</p>
            <p>Nível: {playerLevel} | XP: {playerXP}</p>
          </div>
        </>
      )}
      {screen === 'combat' && (
        <CombatScreen onExitCombat={exitCombatOrInventory} onVictory={handleVictory} />
      )}
      {screen === 'inventory' && (
        <InventoryScreen onExit={exitCombatOrInventory} onUseItem={handleUseItem} />
      )}
      {screen === 'dialogue' && (
        <DialogueScreen onExitDialogue={exitDialogue} onAcceptQuest={handleAcceptQuest} />
      )}
      {screen === 'quest' && (
        <QuestLog quests={quests} onClose={() => setScreen('map')} />
      )}
    </div>
  );
};

export default App;
