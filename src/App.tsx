// src/App.tsx
import React, { useState } from "react";
import GameBoard, { AreaConfig } from "./components/GameBoard";
import GameHUD from "./components/GameHUD";
import CombatScreen from "./components/CombatScreen";
import InventoryScreen from "./components/InventoryScreen";
import DialogueScreen from "./components/DialogueScreen";
import DynamicDialogueScreen, {
  DialogueNode,
} from "./components/DynamicDialogueScreen";
import QuestLog from "./components/QuestLog";
import ShopScreen from "./components/ShopScreen";
import AreaSelectionScreen from "./components/AreaSelectionScreen";
import UpgradeScreen from "./components/UpgradeScreen";
import EquipmentScreen from "./components/EquipmentScreen";
import { InventoryItem, ShopItem, EquipmentItem } from "./components/types";
import { Quest } from "./components/QuestLog";
import { Enemy } from "./components/Enemy";
import BossCombatScreen from "./components/BossCombatScreen";
import { PlayerStats } from "./styles/StyledHUD";
import { ContainerApp } from "./styles/ContainerApp";
import { StyledHUD } from "./styles/StyledHUD";
import { Alert, AlertContainer } from "./styles/Alert";

const App: React.FC = () => {
  // Telas possíveis: 'map', 'combat', 'inventory', 'dialogue', 'quest', 'shop', 'areaSelection', 'dynamicDialogue', 'upgrade', 'equipment'
  const [screen, setScreen] = useState<
    | "map"
    | "combat"
    | "inventory"
    | "dialogue"
    | "quest"
    | "shop"
    | "areaSelection"
    | "dynamicDialogue"
    | "upgrade"
    | "equipment"
    | "bossCombat"
  >("map");

  // Estado para a área atual
  const areas: AreaConfig[] = [
    {
      id: "town",
      name: "Cidade",
      enemyPositions: [{ x: 80, y: 80 }],
      npcPositions: [{ x: 200, y: 80 }],
      portalPosition: { x: 0, y: 240 },
      bossPositions: [{ x: 320, y: 320 }], // Exemplo: um boss na Cidade
    },
    {
      id: "forest",
      name: "Floresta",
      enemyPositions: [{ x: 120, y: 120 }],
      npcPositions: [{ x: 280, y: 120 }],
      portalPosition: { x: 360, y: 200 },
      // Pode ou não ter boss na Floresta
    },
  ];
  const [currentArea, setCurrentArea] = useState<AreaConfig>(areas[0]);

  // Estados do jogador
  const [playerHP, setPlayerHP] = useState(100);
  const [playerXP, setPlayerXP] = useState(0);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [playerGold, setPlayerGold] = useState(100);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [upgradePoints, setUpgradePoints] = useState(0);
  const [playerMaxHP, setPlayerMaxHP] = useState(100);
  const [playerAttack, setPlayerAttack] = useState(20);
  const [playerCooldownReduction, setPlayerCooldownReduction] = useState(0);

  // Salvar e carregar progresso
  const [saveMessage, setSaveMessage] = useState("");
  const [loadMessage, setLoadMessage] = useState("");

  // Estado para equipamentos
  const [currentEquipment, setCurrentEquipment] = useState<{
    weapon: EquipmentItem | null;
    armor: EquipmentItem | null;
  }>({ weapon: null, armor: null });
  // Itens de equipamento disponíveis (exemplo fixo)
  const [availableEquipment] = useState<EquipmentItem[]>([
    {
      id: 1,
      name: "Espada de Bronze",
      type: "weapon",
      bonus: 5,
      description: "Uma espada de bronze",
    },
    {
      id: 2,
      name: "Escudo de Madeira",
      type: "armor",
      bonus: 3,
      description: "Um escudo de madeira",
    },
  ]);

  // Itens disponíveis na loja
  const shopItems: ShopItem[] = [
    {
      id: 1,
      name: "Poção",
      price: 30,
      effect: 20,
      description: "Restaura 20 HP",
    },
    {
      id: 2,
      name: "Elixir",
      price: 70,
      effect: 50,
      description: "Isso é apenas um teste",
    },
  ];

  // (Funções de combate, diálogo, salvar/carregar, etc. permanecem inalteradas)
  // ...
  const handleEncounter = () => setScreen("combat");
  const handleDialogue = () => setScreen("dialogue");
  const handleDynamicDialogue = () => setScreen("dynamicDialogue");
  const handlePortal = () => {
    alert(
      `Você entrou na área: ${
        currentArea.name === "Cidade" ? "Floresta" : "Cidade"
      }`
    );
    const newArea =
      currentArea.id === "town"
        ? areas.find((a) => a.id === "forest")!
        : areas.find((a) => a.id === "town")!;
    setCurrentArea(newArea);
    setScreen("map");
  };
  const exitCombatOrInventory = () => setScreen("map");
  const openInventory = () => setScreen("inventory");
  const openQuestLog = () => setScreen("quest");
  const openShop = () => setScreen("shop");
  const openAreaSelection = () => setScreen("areaSelection");
  const openEquipment = () => setScreen("equipment");

  const handleUseItem = (item: InventoryItem) => {
    setPlayerHP((prev) => Math.min(prev + item.effect, playerMaxHP));
    setInventory((prev) =>
      prev
        .map((invItem) =>
          invItem.id === item.id && invItem.quantity > 0
            ? { ...invItem, quantity: invItem.quantity - 1 }
            : invItem
        )
        .filter((invItem) => invItem.quantity > 0)
    );
    console.log(`Usou ${item.name} e curou ${item.effect} de HP`);
  };

  const handleVictory = (xp: number, remainingHP: number) => {
    setPlayerXP((prevXP) => {
      const newXP = prevXP + xp;
      if (newXP >= 100 * playerLevel) {
        setPlayerLevel(playerLevel + 1);
        setUpgradePoints((prev) => prev + 1);
        setScreen("upgrade");
      }
      return newXP;
    });
    setPlayerHP(remainingHP);
    setScreen("map");
  };

  const handleAcceptQuest = () => {
    const newQuest: Quest = {
      id: Date.now(),
      title: "Derrotar monstros na floresta",
      description: "Elimine os monstros que ameaçam a cidade.",
      completed: false,
    };
    setQuests((prev) => [...prev, newQuest]);
    setScreen("map");
  };

  const exitDialogue = () => setScreen("map");

  // Exemplo de diálogo dinâmico (mantido)
  const dynamicDialogueData = [
    {
      id: "start",
      message: "Olá, viajante! Tenho uma missão para você. Gostaria de ajudar?",
      options: [
        { text: "Sim, aceito a missão", questAccepted: true },
        { text: "Não, obrigado", nextId: "decline" },
      ],
    },
    {
      id: "decline",
      message: "Tudo bem, se mudar de ideia, estarei aqui.",
      options: [{ text: "Fechar" }],
    },
  ];

  const finishDynamicDialogue = (questAccepted: boolean) => {
    if (questAccepted) {
      handleAcceptQuest();
    } else {
      setScreen("map");
    }
  };

  // Funções de salvar e carregar (mantidos)
  const handleSaveGame = () => {
    const gameState = {
      playerHP,
      playerXP,
      playerLevel,
      playerGold,
      quests,
      inventory,
      currentArea,
      currentEquipment,
    };
    localStorage.setItem("gameState", JSON.stringify(gameState));
    setSaveMessage("Progresso salvo com sucesso!");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleLoadGame = () => {
    const savedState = localStorage.getItem("gameState");
    if (savedState) {
      const {
        playerHP,
        playerXP,
        playerLevel,
        playerGold,
        quests,
        inventory,
        currentArea,
        currentEquipment,
      } = JSON.parse(savedState);
      setPlayerHP(playerHP);
      setPlayerXP(playerXP);
      setPlayerLevel(playerLevel);
      setPlayerGold(playerGold);
      setQuests(quests);
      setInventory(inventory);
      setCurrentArea(currentArea);
      setCurrentEquipment(currentEquipment);
      setLoadMessage("Progresso carregado!");
      setTimeout(() => setLoadMessage(""), 3000);
    } else {
      setLoadMessage("Nenhum progresso salvo encontrado.");
      setTimeout(() => setLoadMessage(""), 3000);
    }
  };

  const handleBuyItem = (item: ShopItem) => {
    if (playerGold >= item.price) {
      setPlayerGold((prevGold) => prevGold - item.price);
      // Adiciona o item comprado ao inventário
      setInventory((prevInv) => {
        const existing = prevInv.find((invItem) => invItem.id === item.id);
        if (existing) {
          return prevInv.map((invItem) =>
            invItem.id === item.id
              ? { ...invItem, quantity: invItem.quantity + 1 }
              : invItem
          );
        } else {
          return [
            ...prevInv,
            {
              id: item.id,
              name: item.name,
              quantity: 1,
              effect: item.effect,
              description: item.description,
            },
          ];
        }
      });
      alert(`Você comprou ${item.name} por ${item.price} de ouro.`);
    } else {
      alert("Ouro insuficiente para comprar este item.");
    }
  };

  // Função para equipar um item
  const handleEquip = (item: EquipmentItem) => {
    setCurrentEquipment((prev) => {
      if (item.type === "weapon") {
        return { ...prev, weapon: item };
      } else if (item.type === "armor") {
        return { ...prev, armor: item };
      }
      return prev;
    });
    alert(`Você equipou ${item.name}!`);
  };

  const handleSelectArea = (areaId: string) => {
    const selectedArea = areas.find((a) => a.id === areaId);
    if (selectedArea) {
      setCurrentArea(selectedArea);
      setScreen("map");
    }
  };

  const handleBossEncounter = (boss: Enemy) => {
    // Aqui você pode definir lógica extra, se necessário
    setScreen("bossCombat");
  };

  return (
    <ContainerApp>
      {screen === "map" && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <GameBoard
            onEncounter={(enemy) => {
              // Aqui você pode definir qual inimigo foi encontrado
              // e iniciar o combate passando informações específicas, se necessário.
              handleEncounter(); // ou alguma lógica mais avançada
            }}
            onBossEncounter={handleBossEncounter}
            onDialogue={handleDialogue}
            onPortal={handlePortal}
            area={currentArea}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <GameHUD
              onInventory={openInventory}
              onOpenQuestLog={openQuestLog}
              onOpenShop={openShop}
              onSaveGame={handleSaveGame}
              onLoadGame={handleLoadGame}
              onOpenAreaSelection={openAreaSelection}
              onOpenEquipment={openEquipment}
            />
          </div>
          <StyledHUD>
            <PlayerStats>Área: {currentArea.name}</PlayerStats>
            <PlayerStats>
              HP Jogador: {playerHP} / {playerMaxHP}
            </PlayerStats>
            <PlayerStats>
              Nível: {playerLevel} | XP: {playerXP}
            </PlayerStats>
            <PlayerStats>Ouro: {playerGold}</PlayerStats>
          </StyledHUD>
        </div>
      )}
      {screen === "combat" && (
        <CombatScreen
          playerHP={playerHP}
          onUpdateHP={setPlayerHP}
          onExitCombat={exitCombatOrInventory}
          onVictory={handleVictory}
          attackBonus={playerAttack + (currentEquipment.weapon?.bonus || 0)}
          defenseBonus={currentEquipment.armor?.bonus || 0}
        />
      )}

      {screen === "inventory" && (
        <InventoryScreen
          inventory={inventory}
          onClose={exitCombatOrInventory}
          onUseItem={handleUseItem}
        />
      )}
      {screen === "dialogue" && (
        <DialogueScreen
          onExitDialogue={exitDialogue}
          onAcceptQuest={handleAcceptQuest}
        />
      )}
      {screen === "dynamicDialogue" && (
        <DynamicDialogueScreen
          dialogueData={dynamicDialogueData}
          onFinishDialogue={finishDynamicDialogue}
        />
      )}
      {screen === "quest" && (
        <QuestLog quests={quests} onClose={() => setScreen("map")} />
      )}
      {screen === "shop" && (
        <ShopScreen
          onClose={() => setScreen("map")}
          onBuy={handleBuyItem}
          shopItems={shopItems}
          playerGold={playerGold}
        />
      )}
      {screen === "areaSelection" && (
        <AreaSelectionScreen
          areas={areas.map(({ id, name }) => ({ id, name }))}
          onSelectArea={handleSelectArea}
        />
      )}
      {screen === "upgrade" && <UpgradeScreen onApplyUpgrade={() => {}} />}
      {screen === "equipment" && (
        <EquipmentScreen
          currentEquipment={currentEquipment}
          availableEquipment={availableEquipment}
          onEquip={handleEquip}
          onClose={() => setScreen("map")}
        />
      )}
      {screen === "bossCombat" && (
        <BossCombatScreen
          playerHP={playerHP}
          onUpdateHP={setPlayerHP}
          onExitCombat={exitCombatOrInventory}
          onVictory={handleVictory}
          attackBonus={playerAttack + (currentEquipment.weapon?.bonus || 0)}
          defenseBonus={currentEquipment.armor?.bonus || 0}
        />
      )}
      {(saveMessage || loadMessage) && (
        <AlertContainer>
          {saveMessage && <Alert>{saveMessage}</Alert>}
          {loadMessage && <Alert>{loadMessage}</Alert>}
        </AlertContainer>
      )}
    </ContainerApp>
  );
};

export default App;
