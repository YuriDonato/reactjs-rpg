import React from "react";
import GameBoard from "./components/GameBoard";
import GameHUD from "./components/GameHUD";
import { MainContainer } from "./styles";
import styled from "styled-components";

const ContainerDoBoard = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
const App: React.FC = () => {
    const player_em_combate = false;
    return (
        <MainContainer>
            {/* Switch da tela em combate e a tela normal */}
            <div>
                {!player_em_combate && <GameBoard />}
            </div>
                {player_em_combate && <GameHUD />}
        </MainContainer>
    );
};

export default App;
