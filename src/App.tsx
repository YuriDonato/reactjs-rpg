// src/App.tsx
import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import GameHUD from './components/GameHUD';
import CombatScreen from './components/CombatScreen';
import InventoryScreen from './components/InventoryScreen';
import DialogueScreen from './components/DialogueScreen';
import QuestLog from './components/QuestLog';
import ShopScreen from './components/ShopScreen';
import { InventoryItem, ShopItem } from './components/types';
import { Quest } from './components/QuestLog';

const App: React.FC = () => {
  // Telas possíveis: 'map', 'combat', 'inventory', 'dialogue', 'quest', 'shop'
  const [screen, setScreen] = useState<'map' | 'combat' | 'inventory' | 'dialogue' | 'quest' | 'shop'>('map');

  // Estados do jogador
  const [playerHP, setPlayerHP] = useState(100);
  const [playerXP, setPlayerXP] = useState(0);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [playerGold, setPlayerGold] = useState(100);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  // Itens disponíveis na loja
  const shopItems: ShopItem[] = [
    { id: 1, name: 'Poção', price: 30, effect: 20 },
    { id: 2, name: 'Elixir', price: 70, effect: 50 },
  ];

  const handleEncounter = () => setScreen('combat');
  const handleDialogue = () => setScreen('dialogue');
  const exitCombatOrInventory = () => setScreen('map');
  const openInventory = () => setScreen('inventory');
  const openQuestLog = () => setScreen('quest');
  const openShop = () => setScreen('shop');

  const handleUseItem = (item: InventoryItem) => {
    setPlayerHP((prev) => Math.min(prev + item.effect, 100));
    setInventory((prev) =>
      prev.map((invItem) =>
        invItem.id === item.id && invItem.quantity > 0
          ? { ...invItem, quantity: invItem.quantity - 1 }
          : invItem
      ).filter((invItem) => invItem.quantity > 0)
    );
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

  const handleAcceptQuest = () => {
    const newQuest: Quest = {
      id: Date.now(),
      title: 'Derrotar monstros na floresta',
      description: 'Elimine os monstros que ameaçam a cidade.',
      completed: false,
    };
    setQuests((prev) => [...prev, newQuest]);
    setScreen('map');
  };

  const exitDialogue = () => setScreen('map');

  const handleBuyItem = (item: ShopItem) => {
    if (playerGold >= item.price) {
      setPlayerGold((prevGold) => prevGold - item.price);
      setInventory((prevInv) => {
        const existing = prevInv.find((invItem) => invItem.id === item.id);
        if (existing) {
          return prevInv.map((invItem) =>
            invItem.id === item.id ? { ...invItem, quantity: invItem.quantity + 1 } : invItem
          );
        } else {
          return [...prevInv, { id: item.id, name: item.name, quantity: 1, effect: item.effect }];
        }
      });
      alert(`Você comprou ${item.name} por ${item.price} de ouro.`);
    } else {
      alert('Ouro insuficiente para comprar este item.');
    }
  };

  return (
    <div>
      {screen === 'map' && (
        <>
          <GameBoard onEncounter={handleEncounter} onDialogue={handleDialogue} />
          <GameHUD onInventory={openInventory} onOpenQuestLog={openQuestLog} onOpenShop={openShop} />
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <p>HP Jogador: {playerHP}</p>
            <p>Nível: {playerLevel} | XP: {playerXP}</p>
            <p>Ouro: {playerGold}</p>
          </div>
        </>
      )}
      {screen === 'combat' && (
        <CombatScreen onExitCombat={exitCombatOrInventory} onVictory={handleVictory} />
      )}
      {screen === 'inventory' && (
        <InventoryScreen inventory={inventory} onClose={exitCombatOrInventory} onUseItem={handleUseItem} />
      )}
      {screen === 'dialogue' && (
        <DialogueScreen onExitDialogue={exitDialogue} onAcceptQuest={handleAcceptQuest} />
      )}
      {screen === 'quest' && (
        <QuestLog quests={quests} onClose={() => setScreen('map')} />
      )}
      {screen === 'shop' && (
        <ShopScreen onClose={() => setScreen('map')} onBuy={handleBuyItem} shopItems={shopItems} playerGold={playerGold} />
      )}
    </div>
  );
};

export default App;
