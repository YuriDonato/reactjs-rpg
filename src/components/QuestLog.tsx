// src/components/QuestLog.tsx
import React from "react";
import { StyledH1, StyledH3, StyledP } from "../styles/StyledWord";
import { StyledButton } from "../styles/StyledButtons";
import { StyledHUD } from "../styles/StyledHUD";

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
    <div style={{ padding: "20px" }}>
      <StyledHUD>
        <StyledH1>Registro de Quests</StyledH1>
        {quests.length === 0 ? (
          <p>Nenhuma quest ativa.</p>
        ) : (
          <ul>
            {quests.map((quest) => (
              <li key={quest.id} style={{ marginBottom: "10px" }}>
                <StyledH3>{quest.title}</StyledH3>
                <StyledP>{quest.description}</StyledP>
                <StyledP>{quest.completed ? "Concluída" : "Ativa"}</StyledP>
              </li>
            ))}
          </ul>
        )}
        <StyledButton onClick={onClose}>Fechar</StyledButton>
      </StyledHUD>
    </div>
  );
};

export default QuestLog;
