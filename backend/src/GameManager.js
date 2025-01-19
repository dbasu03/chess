import { WebSocket } from "ws";
import { MOVE, INIT_GAME, GAME_OVER } from "./messages.js";
import Game from "./Game.js"
import {Chess } from 'chess.js'

export class GameManager{
    constructor(){
        this.games=[];
        this.pendingUser=null;
        this.users=[];
    }

    addUser(socket){
        this.users.push(socket)
        this.addHandler(socket)
    }

    removeUser(socket){
        this.users=this.users.filter(user=>user !== socket)
    }

    addHandler(socket){
        socket.on("message", (data) =>{
            const message = JSON.parse(data.toString());

            if(message.type === INIT_GAME){
                if(this.pendingUser){
                    const game= new Game(this.pendingUser, socket)
                    this.games.push(game);
                    this.pendingUser=null
                }
                else{
                    this.pendingUser=socket
                }

                if(message.type===MOVE){
                    const game = this.games.find(game.player1===socket || game.player2===socket)
                    if(game){
                        game.makeMove(socket,message.payload.move)
                    }
                }

                
            }
        })
    }
}
