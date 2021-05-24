const word = document.getElementById("word");
const submit = document.getElementById("submit");
const used = document.getElementById("used");
const error = document.getElementById("error");
const playerContainers = document.getElementById("playerContainers")
//hardcoded right now, 0 based
let players = 2;
let player = 2;

let lastWord = "";
let previousWords = [];

function check(){
    let checkWord = validWords.find(valid => valid == word.value.toUpperCase());
    let validChange = 0;

    if(!checkWord){
        showError("The word is invalid");
        return
    }


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
            showError("The word is matches the last word")
            return;
        }else{
            previousWords.forEach(( pWord , i) =>{
                if(pWord == checkWord){
                    showError("The word was already used! Game over!")
                    used.children[i].classList.add("bg-danger")
                    used.children[i].classList.add("fw-bold")
                    used.children[i].classList.add("text-white")
                    listCheck = true
                }
            })
        }

        if(listCheck){
            return;
        }
        
        let item = document.createElement("li");
        item.innerHTML = checkWord;

        
        item.setAttribute("class","list-group-item")
        used.appendChild(item);


        lastWord = checkWord;
        word.value = ""
        previousWords.push(checkWord);
        nextPlayer()
        errorReset()
    }else{
        showError("The word is invalid")
    }
}

submit.addEventListener("click", ()=>{
    check()
})

word.addEventListener("keyup", (e)=>{
    e.preventDefault();
    if(e.keyCode == 13){
        check()
    }
    
})

function showError(string){
    error.classList.remove("d-none")
    error.innerHTML = string;
}

function errorReset(){
    error.classList.add("d-none")
    error.innerHTML = '';
}

function nextPlayer(){
    player++
    if(player > players){
        player = 0;
    }
    Array.from(playerContainers.children).forEach( player =>{
        player.classList.remove("bg-primary")
        player.classList.remove("fw-bold")
    })
    playerContainers.children[player].classList.add("bg-primary")
    playerContainers.children[player].classList.add("fw-bold")
}
nextPlayer()