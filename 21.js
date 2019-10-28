document.addEventListener("DOMContentLoaded", () => {
    startButton()
})



const startButton = () => {
    const startButton = document.querySelector("#startGame")
    startButton.addEventListener('click', getCards)

}

const getCards = async() => {
    let url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    try{
        let response = await axios.get(url)
        // console.log(response)
              startGame(response)
    }catch(err){
        // console.log(err)
    }
}

const startGame = async(response) => {
deckID = response.data.deck_id
// console.log(deckID)
let button = document.querySelector("#startButton")
let startButtonDIV = document.querySelector("#startGame")
startButtonDIV.removeChild(button)

let deckidURL = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`
//   console.log(deckidURL)
let res = await axios.get(deckidURL)
// console.log(res.data.cards)
getPlayerCards(res)
}

const getPlayerCards = (res) => {
    let  startGameDIV = document.querySelector("#playerDIV")
    let cardsDealt = res.data.cards
    // console.log(cardsDealt)
   
for(let i = 0; i < cardsDealt.length; i++){
    let playerCards = cardsDealt[i].image
     let img = document.createElement('img')
     img.src = playerCards

     startGameDIV.append(img)
     img.append(playerCards)
    // console.log(playerCards)
 }
currentScore(cardsDealt)
gameButtons()
}

    let count = 0;
    const currentScore = (arr) => {
    let para = document.querySelector('#scorePTag')
   
        // console.log(arr)

   for(let i = 0; i < arr.length; i++){
   let score = arr[i].value
    //    console.log(score)
       if(score === "KING" || score === "QUEEN" || score === "JACK"){
        //    score += 10 
           count += 10
       }else if(score === "ACE"){
        //    score += 1
           count += 1
       } else {
        count += parseInt(score) 
       }  
    }
    // console.log(count)
    para.innerText = "Player Score: " + count
    checkUserScore(count)
      // check21(count)
   }

   const checkUserScore = (score) => {
    if (score === 21){
    let heading = document.querySelector('#heading')
    let youWon_heading = document.createElement('h1')
    youWon_heading.innerText = "You Won!"
    heading.append(youWon_heading)
    removeButtons()
    }
    else if(score > 21){
        busted()
    }
   }

const busted = () => {
let heading = document.querySelector('#heading')
let busted_heading = document.createElement('h1')
busted_heading.innerText = "Busted!"
heading.append(busted_heading)
removeButtons()
}

const removeButtons = () => {
let hit_btn = document.querySelector('#hitBtn')
let stay_btn = document.querySelector('#stayBtn')
let hit_and_stayBtn = document.querySelector("#gameButtons")
hit_and_stayBtn.removeChild(hit_btn)
hit_and_stayBtn.removeChild(stay_btn)

}

const gameButtons = () => {
    let gameButtonDiv = document.querySelector("#gameButtons")
 
    let hitButton = document.createElement("button")
    hitButton.innerHTML= "HIT"
    hitButton.id = "hitBtn"
    hitButton.addEventListener("click", hitAction)
   
    let stayButton = document.createElement("button")
    stayButton.innerHTML= "STAY"
    stayButton.id = "stayBtn"
    stayButton.addEventListener("click", stayAction)
   
    gameButtonDiv.append(hitButton)
    gameButtonDiv.append(stayButton)
}

const hitAction = async(res) => {
    // console.log(res.data)
    url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`
    let oneCardResponse = await axios.get(url)
    
    let hitIMG = document.querySelector("#playerDIV")
    let image = oneCardResponse.data.cards
    let newImg = document.createElement('img')

    hitIMG.append(newImg)

    for(let i = 0; i < image.length; i++){
        let extraCard = image[i].image
        newImg.src = extraCard
        // console.log(extraCard)
        newImg.append(extraCard)        

    }
    
    let addToScore = oneCardResponse.data.cards
    // console.log(addToScore)
    currentScore(addToScore)
    // console.log(image)
}

const stayAction = async(res) => {
    compURL = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=3`

    let compResponse = await axios.get(compURL)

    let stayCards = document.querySelector("#compDIV")
    let compCards = compResponse.data.cards
    // console.log(compCards)

    for(let i = 0; i < compCards.length; i++){
        let compCardImage = compCards[i].image
        let compImg = document.createElement('img')
        compImg.src = compCardImage

        stayCards.append(compImg)
        compImg.append(compCardImage)
       
    }
    computerCount(compCards)
}

let compCount = 0;
const computerCount = (arr) => {
    let para = document.querySelector('#compScorePTag')
   
for(let i = 0; i < arr.length; i++){
    let score = arr[i].value

   if(score === "KING" || score === "QUEEN" || score === "JACK"){
       compCount += 10
   }else if(score === "ACE"){
    
       compCount += 1
   } else {
    compCount += parseInt(score)  
   }
    //    console.log(compCount)  
}
para.innerText = "Computer Score: " + compCount
  checkComputerScore(compCount)
   }
  
const checkComputerScore =(score) => {
    if(score === 21){
        // console.log("computer wins!")
    let heading = document.querySelector('#heading')
    let compWon_heading = document.createElement('h1')
    compWon_heading.innerText = "Computer Wins!"
    heading.append(compWon_heading)
    removeButtons()
    }else if(score > 21){
    let heading = document.querySelector('#heading')
    let youWon_heading = document.createElement('h1')
    youWon_heading.innerText = "You Won!"
    heading.append(youWon_heading)
    removeButtons()

    }else{
        check21(count, compCount)
    }
} 

const check21 = (count, compCount) => {
    // console.log(count)
    // console.log("COmp " , compCount)
if(count === compCount){
    // console.log("its a tie!")
    let heading = document.querySelector('#heading')
    let tie_heading = document.createElement('h1')
    tie_heading.innerText = "it's a tie!"
    heading.append(tie_heading)
}else if(count > compCount){
    // console.log("You win!")
    let heading = document.querySelector('#heading')
    let youWon_heading = document.createElement('h1')
    youWon_heading.innerText = "You Won!"
    heading.append(youWon_heading)
}else{
    // console.log("computer wins")
    let heading = document.querySelector('#heading')
    let compWon_heading = document.createElement('h1')
    compWon_heading.innerText = "Computer Wins!"
    heading.append(compWon_heading)
}
removeButtons()
}



