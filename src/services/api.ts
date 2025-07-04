const API_URL = 'http://localhost:8000/api';

export const getGameState = async () => {
  try {
    const response = await fetch(`${API_URL}/game-state`);
    if (!response.ok) {
      throw new Error('Erro na resposta da rede');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar o estado do jogo:', error);
    throw error;
  }
};

export const updateGameState = async (data: any) => {
  try {
    const response = await fetch(`${API_URL}/game-state`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Erro na resposta da rede');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao atualizar o estado do jogo:', error);
    throw error;
  }
};
