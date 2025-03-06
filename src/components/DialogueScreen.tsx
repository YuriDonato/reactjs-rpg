// src/components/DialogueScreen.tsx
import React, { useState } from 'react';

interface DialogueScreenProps {
  onExitDialogue: () => void;
  onAcceptQuest?: () => void;
}

const DialogueScreen: React.FC<DialogueScreenProps> = ({ onExitDialogue, onAcceptQuest }) => {
  const dialogues = [
    "Olá, viajante! Seja bem-vindo à nossa cidade.",
    "Tenho uma missão importante para você.",
    "Há monstros na floresta que precisam ser derrotados. Você pode nos ajudar?",
  ];
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < dialogues.length - 1) {
      setIndex(index + 1);
    } else {
      // Se a função de aceitar quest foi passada, a chamamos; caso contrário, apenas finalizamos o diálogo.
      if (onAcceptQuest) {
        onAcceptQuest();
      } else {
        onExitDialogue();
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Diálogo</h1>
      <p>{dialogues[index]}</p>
      <button onClick={handleNext}>
        {index < dialogues.length - 1 ? "Próximo" : (onAcceptQuest ? "Aceitar Quest" : "Fechar")}
      </button>
    </div>
  );
};

export default DialogueScreen;
