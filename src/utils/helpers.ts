export const toGridCoordinate = (value: number, gridSize: number): number => {
    return Math.floor(value / gridSize) * gridSize;
  };
  
  export const fromGridCoordinate = (value: number, gridSize: number): number => {
    return value / gridSize;
  };
  