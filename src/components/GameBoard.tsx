import React, { useRef, useEffect, useState } from "react";
import { drawPlayer, Player } from "./Player";
import { drawEnemy, Enemy } from "./Enemy";
import { drawNPC, NPC } from "./NPC";

export interface AreaConfig {
    id: string;
    name: string;
    enemyPositions: { x: number; y: number }[];
    npcPositions: { x: number; y: number }[];
    portalPosition: { x: number; y: number } | null;
    bossPositions?: { x: number; y: number }[]; // nova propriedade opcional
}

interface GameBoardProps {
    onEncounter: (enemy: Enemy) => void;
    onBossEncounter: (boss: Enemy) => void;
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

    const initialPlayer: Player = {
        x: Math.floor(canvasWidth / 2 / gridSize) * gridSize,
        y: Math.floor(canvasHeight / 2 / gridSize) * gridSize,
        size: gridSize,
    };
    const [player, setPlayer] = useState<Player>(initialPlayer);

    const initialEnemies: Enemy[] = area.enemyPositions.map((pos) => ({
        x: pos.x,
        y: pos.y,
        size: gridSize,
    }));
    const [enemies, setEnemies] = useState<Enemy[]>(initialEnemies);

    const initialBosses: Enemy[] = area.bossPositions
        ? area.bossPositions.map((pos) => ({
              x: pos.x,
              y: pos.y,
              size: gridSize,
          }))
        : [];
    const [bosses, setBosses] = useState<Enemy[]>(initialBosses);

    const npc: NPC | null =
        area.npcPositions.length > 0
            ? {
                  x: area.npcPositions[0].x,
                  y: area.npcPositions[0].y,
                  size: gridSize,
              }
            : null;
    const portal = area.portalPosition;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
        }
    }, [canvasWidth, canvasHeight]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        for (let x = 0; x < canvasWidth; x += gridSize) {
            for (let y = 0; y < canvasHeight; y += gridSize) {
                ctx.strokeStyle = "gray";
                ctx.strokeRect(x, y, gridSize, gridSize);
            }
        }

        enemies.forEach((enemy) => {
            drawEnemy(ctx, enemy);
        });

        bosses.forEach(boss => {
          ctx.fillStyle = 'darkred';
          ctx.fillRect(boss.x, boss.y, gridSize, gridSize);
        });

        if (npc) {
            drawNPC(ctx, npc);
        }

        if (portal) {
            ctx.fillStyle = "purple";
            ctx.fillRect(portal.x, portal.y, gridSize, gridSize);
        }

        drawPlayer(ctx, player);

        enemies.forEach((enemy) => {
            if (player.x === enemy.x && player.y === enemy.y) {
                onEncounter(enemy);
            }
        });

        bosses.forEach(boss => {
          if (player.x === boss.x && player.y === boss.y) {
            // onBossEncounter(boss);
          }
        });

        if (npc && player.x === npc.x && player.y === npc.y) {
            onDialogue();
        }

        if (portal && player.x === portal.x && player.y === portal.y) {
            onPortal();
        }
    }, [player, enemies, npc, portal, onEncounter, onDialogue, onPortal]);

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

    useEffect(() => {
        const interval = setInterval(() => {
            setEnemies((prevEnemies) =>
                prevEnemies.map((enemy) => {
                    const distance =
                        Math.abs(enemy.x - player.x) / gridSize +
                        Math.abs(enemy.y - player.y) / gridSize;
                    if (distance <= 3) {
                        const dx =
                            player.x > enemy.x
                                ? gridSize
                                : player.x < enemy.x
                                ? -gridSize
                                : 0;
                        const dy =
                            player.y > enemy.y
                                ? gridSize
                                : player.y < enemy.y
                                ? -gridSize
                                : 0;
                        let newX = enemy.x + dx;
                        let newY = enemy.y + dy;
                        newX = Math.max(
                            0,
                            Math.min(canvasWidth - gridSize, newX)
                        );
                        newY = Math.max(
                            0,
                            Math.min(canvasHeight - gridSize, newY)
                        );
                        return { ...enemy, x: newX, y: newY };
                    } else {
                        const directions = [
                            { dx: gridSize, dy: 0 },
                            { dx: -gridSize, dy: 0 },
                            { dx: 0, dy: gridSize },
                            { dx: 0, dy: -gridSize },
                            { dx: 0, dy: 0 },
                        ];
                        const random =
                            directions[
                                Math.floor(Math.random() * directions.length)
                            ];
                        let newX = enemy.x + random.dx;
                        let newY = enemy.y + random.dy;
                        newX = Math.max(
                            0,
                            Math.min(canvasWidth - gridSize, newX)
                        );
                        newY = Math.max(
                            0,
                            Math.min(canvasHeight - gridSize, newY)
                        );
                        return { ...enemy, x: newX, y: newY };
                    }
                })
            );
        }, 1000);
        return () => clearInterval(interval);
    }, [canvasWidth, canvasHeight, gridSize, player]);

    return <canvas ref={canvasRef} style={{ border: "1px solid black" }} />;
};

export default GameBoard;
