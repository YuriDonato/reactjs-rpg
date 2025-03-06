export interface Enemy {
    x: number;
    y: number;
    size: number;
  }
  
  export const drawEnemy = (
    ctx: CanvasRenderingContext2D,
    enemy: Enemy
  ) => {
    ctx.fillStyle = 'red';
    ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
  };
  