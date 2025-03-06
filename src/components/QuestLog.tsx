// src/components/QuestLog.tsx
import React from 'react';

export interface Quest {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface QuestLogProps {
  quests: Quest[];
  onClose: () => void;
}

const QuestLog: React.FC<QuestLogProps> = ({ quests, onClose }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Registro de Quests</h1>
      {quests.length === 0 ? (
        <p>Nenhuma quest ativa.</p>
      ) : (
        <ul>
          {quests.map((quest) => (
            <li key={quest.id} style={{ marginBottom: '10px' }}>
              <h3>{quest.title}</h3>
              <p>{quest.description}</p>
              <p>{quest.completed ? 'Concluída' : 'Ativa'}</p>
            </li>
          ))}
        </ul>
      )}
      <button onClick={onClose}>Fechar</button>
    </div>
  );
};

export default QuestLog;
