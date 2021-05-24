const word = document.getElementById("word");
const submit = document.getElementById("submit");
const used = document.getElementById("used");

let lastWord = "";

function check(){
    let checkWord = validWords.find(valid => valid == word.value.toUpperCase());
    console.log(checkWord)
    let validChange = 0;


    Array.from(checkWord).forEach( current => {
        Array.from(lastWord).forEach( last => {
            if(current == last){
                validChange++;
            }
        })
    })
    

    if( checkWord && lastWord == "" || checkWord && validChange >= lastWord.length - 1){
        console.log("True!")
        let item = document.createElement("li");
        item.innerHTML = checkWord;
        lastWord = checkWord;
        item.setAttribute("class","list-group-item")
        used.appendChild(item);

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