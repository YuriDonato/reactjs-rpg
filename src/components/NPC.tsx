// src/components/NPC.tsx
export interface NPC {
    x: number;
    y: number;
    size: number;
  }
  
  export const drawNPC = (ctx: CanvasRenderingContext2D, npc: NPC) => {
    ctx.fillStyle = 'green';
    ctx.fillRect(npc.x, npc.y, npc.size, npc.size);
  };
  