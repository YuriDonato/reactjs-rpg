export interface Player {
    x: number;
    y: number;
    size: number;
  }
  
  export const drawPlayer = (
    ctx: CanvasRenderingContext2D,
    player: Player
  ) => {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.size, player.size);
  };
  