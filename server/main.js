const { callbackify } = require("util");
const {validWords} = require("./dictionary")
const app = require("express")();
const httpServer = require("http").createServer(app);
const options = { 
    cors: {
        origin: "https://localhost:8080",
        methods: ["GET", "POST"]
      }
 };
const io = require("socket.io")(httpServer, options);

io.on("connection", socket => {  
    console.log(" ==== Connected ====")

    socket.on("startGame", (id, callback) => {
        
        //check if game exists
        if(games.get(id)){
            console.log(" ==== Retrive Game ====")

            callback(
                {
                    newGame: false,
                    state: games.get(id)
                }
            )

        }else{
            console.log(" ==== Start Game ====")
            games.set(id , newGameState)
            
            callback({
                newGame: true
            })
        }

    })

    socket.on("addPlayer", (data, callback)=>{
        if(games.get(id).players.length == 7){
            callback({
                confirm: false,
                error: "Max players is 8!"
            })
            return;
        }

        games.get(id).players.push(new Player(data.name))

        socket.emit("newPlayer")
        callback({
            confirm: true,
        })
        
    })

    socket.on("addWord", (data , callback)=>{
        let lastWord = games.get(id).lastWord;
        let previousWords = games.get(id).previousWords;
        let checkWord = validWords.find(valid => valid == data.word.toUpperCase());
        let validChange = 0;

        if(!checkWord){
            callback({
                confirm: false,
                error: "Word is invalid!"
            })
            return
        }

        //checks to see how many letters changed
        Array.from(checkWord).forEach( current => {
            Array.from(lastWord).forEach( last => {
                if(current == last){
                    validChange++;
                }
            })
        })
        

        if( checkWord && lastWord == "" || checkWord && validChange >= lastWord.length - 1){

            let listCheck = false;

            if(checkWord == lastWord){
                callback({
                    confirm: false,
                    error: "The word is matches the last word"
                })
                return;
            }else{
                previousWords.forEach(( pWord , i) =>{
                    if(pWord == checkWord){
                        callback({
                            confirm: false,
                            error: "The word was already used! Game over!"
                        })
                        listCheck = true
                    }
                })
            }

            if(listCheck){
                return;
            }

            games.get(id).previousWords.unshift(checkWord)
            games.get(id).previousWords

            games.get(id).previousWords.currentPlayer++
            if(games.get(id).previousWords.currentPlayer == 
               games.get(id).previousWords.players.length){
                    games.get(id).previousWords.currentPlayer = 0;
            }

            callback({
                confirm: true,
            })
        }else{
            callback({
                confirm: false,
                error: "The word is invalid"
            })
        }

        
    })

});

var games = new Map();

const newGameState = {
    players: [],
    currentPlayer: 0,
    previousWords: [],
    lastWord: ""
  }



console.log("listening on port 3000")

httpServer.listen(3000);

class Player{
    name
    constructor(name){
      this.name = name;
    }
  
  }