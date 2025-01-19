/*import React, { useState } from 'react'
import {useNavigate} from 'react'
import ChessBoard from '../components/ChessBoard'
import useSocket from '../hooks/useSocket'
import { Chess } from 'chess.js'


export const INIT_GAME="init_game"
export const MOVE = "move"
export const GAME_OVER="game_over"

const Game = () => {
  const socket=useSocket()
  const[chess, setChess]= useState(new Chess())
  const [board, setBoard]=useState(board.board())

useEffect(()=>{
  if(!socket){
    return 
  }
  socket.onmessage=(event)=>{
    const message=JSON.parse(event.data)
    console.log(message)
    switch(message.type){
      case INIT_GAME:
        setChess(new Chess())
        setBoard(chess.board())
        console.log('Game initialized')
        break
      case MOVE:
        const move=message.payload
        board.move(move)
        setBoard(chess.board()) 
        console.log('Move made')
        break
      case GAME_OVER:
        console.log('game over')
        break
    }
  }
}, [socket])

  if(!socket) return <div>connecting..</div>

  return (
  <div className='justify-center flex'>
    <div className='pt-8 max-w-screen-lg'>
      <div className='grid grid-cols-6 gap-4 md:grid-cols-2'>
        <div className='cols-span-4 bg-red-200'> 
          <ChessBoard board={board}/>
        </div>
        <div className='col-span-2 bg-green-200'>
          <Button onClick={()=>{
            socket.send(JSON.stringify({
              type:INIT_GAME
            }))
          }}> Play 
          </Button>
        </div>
      </div>
    </div>

  </div>
  //<div>game page</div>
  )
}

export default Game*/

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Fixed import
import ChessBoard from '../components/ChessBoard';
import useSocket from '../hooks/useSocket';
import { Chess } from 'chess.js';

export const INIT_GAME = 'init_game';
export const MOVE = 'move';
export const GAME_OVER = 'game_over';

const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board()); // Fixed initialization

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      switch (message.type) {
        case INIT_GAME:
          setChess(new Chess());
          const chess= new Chess();
          setBoard(new Chess().board());
          console.log('Game initialized');
          console.log(chess.board());

          break;
        case MOVE:
          const move = message.payload;
          chess.move(move); // Apply the move to the chess instance
          setBoard(chess.board());
          console.log('Move made');
          break;
        case GAME_OVER:
          console.log('Game over');
          break;
        default:
          console.warn('Unknown message type:', message.type);
      }
    };
  }, [socket, chess]);

  if (!socket) return <div>Connecting...</div>;

  return (
    <div className="justify-center flex">
      <div className="pt-8 max-w-screen-lg ">
        <div className="grid grid-cols-6 gap-4 md:grid-cols-2">
          <div className="col-span-4 bg-red-200">
            <ChessBoard chess={chess} setBoard={setBoard } socket ={socket} board={board} />
          </div>
          <div className="col-span-2 bg-green-200 ">
            <button
              onClick={() => {
                socket.send(
                  JSON.stringify({
                    type: INIT_GAME,
                  })
                );
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
