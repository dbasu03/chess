/*import React, { useState } from 'react'

const ChessBoard = ({ board, socket, MOVE, chess, setBoard }) => {

  const [from, setFrom]=useState(null);
  const [to, setTo]=useState(null);
  const currentValidMoves = chess.moves({ verbose: true });
  console.log('Valid moves:', currentValidMoves);
  console.log(chess.get(from));  // Should return the piece on the square, e.g., { type: 'p', color: 'w' }
  console.log(chess.turn());  // Should print 'w' for White or 'b' for Black
  console.log('from:', from); // Check if it has the correct value, e.g., 'a2'
  const validMoves = chess.moves({ square: from, verbose: true });
  console.log(validMoves);


  
  return (
    <div className="text-white-200">
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((square, j) => {
            // Calculate the square representation here
            const squareRepresentation =
              String.fromCharCode(97 + (j % 8)) + (8 - i);

            return (
              <div
                key={j}
                onClick={() => {
                  if (!from) {
                    setFrom(squareRepresentation);
                  } else {
                    const to = squareRepresentation;
                    console.log(square);
                    socket.send(
                      JSON.stringify({
                        type: MOVE,
                        payload: {
                          move:{
                          from,
                          to:squareRepresentation
                        }
                        },
                      })
                       
                        
                    );
                    console.log({ from, to });
                    if (!chess.get(from)) {console.error(`No piece on square: ${from}`); return;}
                    
                    chess.move({
                      from,
                      to: squareRepresentation,
                  })
                  const validMoves = chess.moves({ square: from, verbose: true });
                  console.log(validMoves); // Debugging: Check valid moves
                  if (!validMoves.some((move) => move.to === to)) { console.error(`Invalid move from ${from} to ${to}`); return; }
                  
                    setBoard(Chess,board())
                    setFrom(null); // Reset after move
                  }
                }}
                className={`w-8 h-8 ${
                  (i + j) % 2 === 0 ? 'bg-green-500' : 'bg-green-300'
                }`}
              >
                {square ? square.type : ''}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default ChessBoard

*/

import React, { useState, useEffect } from 'react'

const ChessBoard = ({ board, socket, MOVE, chess, setBoard }) => {

  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [validMoves, setValidMoves] = useState([]);

  // Calculate valid moves only when `from` state changes
  useEffect(() => {
    if (from) {
      const moves = chess.moves({ square: from, verbose: true });
      console.log('Valid moves for', from, ':', moves);
      setValidMoves(moves);
    }
  }, [from, chess]);  // Dependency on `from` and `chess`

  const handleSquareClick = (squareRepresentation) => {
    if (!from) {
      // Set `from` when the user clicks the first square
      setFrom(squareRepresentation);
    } else {
      // If `from` is already set, set `to` and handle the move
      setTo(squareRepresentation);
      console.log(`Moving from ${from} to ${squareRepresentation}`);

      // Ensure there is a piece on the `from` square
      if (!chess.get(from)) {
        console.error(`No piece on square: ${from}`);
        return;
      }

      // Check if the move is valid
      if (!validMoves.some((move) => move.to === squareRepresentation)) {
        console.error(`Invalid move from ${from} to ${squareRepresentation}`);
        return;
      }

      // Make the move on the chess board
      const move = chess.move({
        from,
        to: squareRepresentation,
      });

      // If move was successful, update the board
      if (move) {
        setBoard(chess.board());
        socket.send(
          JSON.stringify({
            type: MOVE,
            payload: {
              move: { from, to: squareRepresentation },
            },
          })
        );
      }

      // Reset `from` and `to` after the move
      setFrom(null);
      setTo(null);
    }
  };

  return (
    <div className="text-white-200">
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((square, j) => {
            const squareRepresentation =
              String.fromCharCode(97 + j) + (8 - i);  // Calculate the square representation

            return (
              <div
                key={j}
                onClick={() => handleSquareClick(squareRepresentation)}
                className={`w-8 h-8 ${ (i + j) % 2 === 0 ? 'bg-green-500' : 'bg-green-300' }`}
              >
                {square ? square.type : ''}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ChessBoard;
