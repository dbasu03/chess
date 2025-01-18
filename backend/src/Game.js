import { MOVE, INIT_GAME, GAME_OVER } from './messages.js';
import {Chess} from 'chess.js';
import { WebSocket } from 'ws';

class Game{
    constructor(player1,player2){
    this.player1=player1;
        this.player2=player2;
        this.board=new Chess();
        this.startTime=new Date();
        this.moveCount=0;
        this.player1.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"white"
            }
        }))
        this.player2.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"black"
            }
        }))
    }

    makeMove(socket, move)
    {
        if(this.moveCount%2===0 && socket!== this.player1){
            return;
        }
        if(this.moveCount%2===1 && socket!== this.player){
            return;
        }
        try{
            this.board.move(move);
        } catch(e){
            return;
        }
        if(this.board.isGameOver()){
            this.player1.send(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.substring()==="w"? "black": "white"
                }
            }))
            return;
        }
        if(this.moveCount%2===0){
            this.player2.send(JSON.stringify({
                type:MOVE,
                payload:move
            }))
            
        }
        else{
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload:move
            }))
        }
        this.moveCount++;
    }
}

export default Game