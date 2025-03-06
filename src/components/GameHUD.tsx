import React from 'react';

const GameHUD: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px',
        gap: '10px',
      }}
    >
      <h3>anda na seta tá kothas</h3>
      {/* <button>Ataque</button>
      <button>Defesa</button>
      <button>Inventário</button> */}
    </div>
  );
};

export default GameHUD;
