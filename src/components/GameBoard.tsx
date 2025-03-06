// src/components/GameBoard.tsx
import React, { useRef, useEffect, useState } from "react";
import { drawPlayer, Player } from "./Player";
import { drawEnemy, Enemy } from "./Enemy";
import { drawNPC, NPC } from "./NPC";
import { GameBoardContainer } from "../styles/GameBoard";

export interface AreaConfig {
  id: string;
  name: string;
  enemyPositions: { x: number; y: number }[];
  npcPositions: { x: number; y: number }[];
  portalPosition: { x: number; y: number } | null;
}

interface GameBoardProps {
  onEncounter: () => void;
  onDialogue: () => void;
  onPortal: () => void;
  area: AreaConfig;
}

const GameBoard: React.FC<GameBoardProps> = ({
  onEncounter,
  onDialogue,
  onPortal,
  area,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridSize = 40;
  const canvasWidth = 400;
  const canvasHeight = 400;

  // Estado do jogador (centralizado inicialmente)
  const initialPlayer: Player = {
    x: Math.floor(canvasWidth / 2 / gridSize) * gridSize,
    y: Math.floor(canvasHeight / 2 / gridSize) * gridSize,
    size: gridSize,
  };
  const [player, setPlayer] = useState<Player>(initialPlayer);

  // Utiliza a primeira posição do array para inimigo e NPC (se existir)
  const enemy =
    area.enemyPositions.length > 0
      ? {
          x: area.enemyPositions[0].x,
          y: area.enemyPositions[0].y,
          size: gridSize,
        }
      : null;
  const npc =
    area.npcPositions.length > 0
      ? { x: area.npcPositions[0].x, y: area.npcPositions[0].y, size: gridSize }
      : null;
  const portal = area.portalPosition;

  // Configura o canvas uma única vez
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    }
  }, [canvasWidth, canvasHeight]);

  // Desenha o grid e os elementos do mapa
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Desenha o grid
    for (let x = 0; x < canvasWidth; x += gridSize) {
      for (let y = 0; y < canvasHeight; y += gridSize) {
        ctx.strokeStyle = "gray";
        ctx.strokeRect(x, y, gridSize, gridSize);
      }
    }

    // Desenha o inimigo, se existir
    if (enemy) {
      drawEnemy(ctx, enemy as Enemy);
    }

    // Desenha o NPC, se existir
    if (npc) {
      drawNPC(ctx, npc as NPC);
    }

    // Desenha o portal, se existir (cor roxa)
    if (portal) {
      ctx.fillStyle = "purple";
      ctx.fillRect(portal.x, portal.y, gridSize, gridSize);
    }

    // Desenha o jogador
    drawPlayer(ctx, player);

    // Verifica colisões
    if (enemy && player.x === enemy.x && player.y === enemy.y) {
      onEncounter();
    }
    if (npc && player.x === npc.x && player.y === npc.y) {
      onDialogue();
    }
    if (portal && player.x === portal.x && player.y === portal.y) {
      onPortal();
    }
  }, [
    player,
    enemy,
    npc,
    portal,
    onEncounter,
    onDialogue,
    onPortal,
    canvasWidth,
    canvasHeight,
  ]);

  // Movimento do jogador via teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setPlayer((prev) => {
        let newX = prev.x;
        let newY = prev.y;
        if (e.key === "ArrowLeft") {
          newX = Math.max(0, prev.x - gridSize);
        } else if (e.key === "ArrowRight") {
          newX = Math.min(canvasWidth - gridSize, prev.x + gridSize);
        } else if (e.key === "ArrowUp") {
          newY = Math.max(0, prev.y - gridSize);
        } else if (e.key === "ArrowDown") {
          newY = Math.min(canvasHeight - gridSize, prev.y + gridSize);
        }
        return { ...prev, x: newX, y: newY };
      });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canvasWidth, canvasHeight, gridSize]);

  return (
    <GameBoardContainer>
      <canvas ref={canvasRef} style={{ border: "1px solid black" }} />
    </GameBoardContainer>
  );
};

export default GameBoard;
