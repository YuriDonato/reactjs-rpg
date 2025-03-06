
# RPG

Projeto de um RPG 2D para navegador utilizando React, TypeScript e HTML5 Canvas.
O backend (não incluso aqui) é desenvolvido com Flask/FastAPI e SQLAlchemy para gerenciar a lógica e os dados do jogo.

## Estrutura do Projeto

- **public/**: Arquivos estáticos, como o HTML principal.
- **src/**:
  - **assets/**: Imagens, sprites e áudios.
  - **components/**: Componentes React do jogo (GameBoard, GameHUD, Player).
  - **hooks/**: Custom hooks, como o loop do jogo.
  - **services/**: Funções para chamadas à API.
  - **utils/**: Funções auxiliares (ex.: conversão de coordenadas).
  - **App.tsx**: Componente principal que une os outros.
  - **index.tsx**: Ponto de entrada da aplicação.

## Scripts

- `npm start`: Inicia o servidor de desenvolvimento.
- `npm build`: Gera o build para produção.
