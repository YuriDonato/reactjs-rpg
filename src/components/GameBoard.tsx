// src/components/GameBoard.tsx
import React, { useRef, useEffect, useState } from 'react';
import { drawPlayer, Player } from './Player';
import { drawEnemy, Enemy } from './Enemy';
import { drawNPC, NPC } from './NPC';

interface GameBoardProps {
  onEncounter: () => void;
  onDialogue: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ onEncounter, onDialogue }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridSize = 40;
  const canvasWidth = 400;
  const canvasHeight = 400;

  // Estado do jogador (centralizado)
  const initialPlayer: Player = {
    x: Math.floor((canvasWidth / 2) / gridSize) * gridSize,
    y: Math.floor((canvasHeight / 2) / gridSize) * gridSize,
    size: gridSize,
  };
  const [player, setPlayer] = useState<Player>(initialPlayer);

  // Estado do inimigo (posição fixa inicial e movimento aleatório)
  const initialEnemy: Enemy = {
    x: gridSize * 2,
    y: gridSize * 2,
    size: gridSize,
  };
  const [enemy, setEnemy] = useState<Enemy>(initialEnemy);

  // NPC fixo para diálogo (posição distinta)
  const initialNPC: NPC = {
    x: gridSize * 5,
    y: gridSize * 2,
    size: gridSize,
  };
  const [npc] = useState<NPC>(initialNPC);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Desenha o grid
    for (let x = 0; x < canvasWidth; x += gridSize) {
      for (let y = 0; y < canvasHeight; y += gridSize) {
        ctx.strokeStyle = 'gray';
        ctx.strokeRect(x, y, gridSize, gridSize);
      }
    }

    // Desenha o inimigo
    drawEnemy(ctx, enemy);

    // Desenha o NPC
    drawNPC(ctx, npc);

    // Desenha o jogador
    drawPlayer(ctx, player);

    // Verifica colisão com o inimigo (para combate)
    if (player.x === enemy.x && player.y === enemy.y) {
      onEncounter();
    }
    // Verifica colisão com o NPC (para diálogo)
    if (player.x === npc.x && player.y === npc.y) {
      onDialogue();
    }
  }, [player, enemy, npc, onEncounter, onDialogue]);

  // Movimento do jogador via teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setPlayer((prev) => {
        let newX = prev.x;
        let newY = prev.y;
        if (e.key === 'ArrowLeft') {
          newX = Math.max(0, prev.x - gridSize);
        } else if (e.key === 'ArrowRight') {
          newX = Math.min(canvasWidth - gridSize, prev.x + gridSize);
        } else if (e.key === 'ArrowUp') {
          newY = Math.max(0, prev.y - gridSize);
        } else if (e.key === 'ArrowDown') {
          newY = Math.min(canvasHeight - gridSize, prev.y + gridSize);
        }
        return { ...prev, x: newX, y: newY };
      });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Movimento aleatório do inimigo a cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setEnemy((prev) => {
        const directions = [
          { dx: gridSize, dy: 0 },
          { dx: -gridSize, dy: 0 },
          { dx: 0, dy: gridSize },
          { dx: 0, dy: -gridSize },
          { dx: 0, dy: 0 },
        ];
        const random = directions[Math.floor(Math.random() * directions.length)];
        let newX = prev.x + random.dx;
        let newY = prev.y + random.dy;
        newX = Math.max(0, Math.min(canvasWidth - gridSize, newX));
        newY = Math.max(0, Math.min(canvasHeight - gridSize, newY));
        return { ...prev, x: newX, y: newY };
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [gridSize, canvasWidth, canvasHeight]);

  return <canvas ref={canvasRef} style={{ border: '1px solid black' }} />;
};

export default GameBoard;
