import React from 'react'
//import {Color,PieceSymbol,Square} from "chess.js"

const ChessBoard = ({ board }) => {


  return (
    <div className="text-white-200">
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((square, j) => (
            <div
              key={j}
              className={`w-8 h-8 ${square ? 'bg-green-500' : 'bg-green-300'}`}
            >
              {square ? square.type : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ChessBoard