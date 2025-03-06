import { useRef, useEffect } from 'react';

const useGameLoop = (callback: (deltaTime: number) => void) => {
  // Permite que o valor inicial seja undefined ou null.
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | undefined>(undefined);

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [callback]);

  // O hook não retorna nada, pois gerencia o loop internamente.
};

export default useGameLoop;
