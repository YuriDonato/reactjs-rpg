import React, { useRef, useEffect, useState } from 'react';
import { drawPlayer, Player } from './Player';

const GameBoard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Configurações do canvas e grid
  const gridSize = 40;
  const canvasWidth = 400;
  const canvasHeight = 400;

  // Define a posição inicial do jogador (centro do canvas)
  const initialPlayer: Player = {
    x: Math.floor((canvasWidth / 2) / gridSize) * gridSize,
    y: Math.floor((canvasHeight / 2) / gridSize) * gridSize,
    size: gridSize,
  };

  // Estado para o jogador
  const [player, setPlayer] = useState<Player>(initialPlayer);

  // Configura as dimensões do canvas uma única vez
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    }
  }, []);

  // Desenha o grid e o jogador toda vez que a posição do jogador mudar
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Limpa o canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Desenha o grid
    for (let x = 0; x < canvasWidth; x += gridSize) {
      for (let y = 0; y < canvasHeight; y += gridSize) {
        ctx.strokeStyle = 'gray';
        ctx.strokeRect(x, y, gridSize, gridSize);
      }
    }

    // Desenha o jogador
    drawPlayer(ctx, player);
  }, [player]);

  // Adiciona o event listener para movimentação com as teclas
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Usa o setPlayer com função para garantir a atualização correta
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
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ border: '1px solid black' }} />;
};

export default GameBoard;
