// src/components/DynamicDialogueScreen.tsx
import React, { useState } from 'react';

export interface DialogueOption {
  text: string;
  nextId?: string;
  questAccepted?: boolean;
}

export interface DialogueNode {
  id: string;
  message: string;
  options: DialogueOption[];
}

interface DynamicDialogueScreenProps {
  dialogueData: DialogueNode[];
  onFinishDialogue: (questAccepted: boolean) => void;
}

const DynamicDialogueScreen: React.FC<DynamicDialogueScreenProps> = ({ dialogueData, onFinishDialogue }) => {
  const [currentNodeId, setCurrentNodeId] = useState<string>(dialogueData[0].id);
  const currentNode = dialogueData.find((node) => node.id === currentNodeId);

  if (!currentNode) {
    return (
      <div style={{ padding: '20px' }}>
        <p>Erro: diálogo não encontrado.</p>
        <button onClick={() => onFinishDialogue(false)}>Fechar</button>
      </div>
    );
  }

  const handleOptionClick = (option: DialogueOption) => {
    if (option.questAccepted) {
      // Finaliza o diálogo com a aceitação da quest
      onFinishDialogue(true);
    } else if (option.nextId) {
      setCurrentNodeId(option.nextId);
    } else {
      onFinishDialogue(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Diálogo</h1>
      <p>{currentNode.message}</p>
      <div>
        {currentNode.options.map((option, index) => (
          <button key={index} onClick={() => handleOptionClick(option)} style={{ margin: '5px' }}>
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DynamicDialogueScreen;
