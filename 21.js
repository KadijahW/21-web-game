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
        console.log(err)
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
currentScore(res)
}

const currentScore = (res) => {
    let scoreBoard = document.querySelector("#score")
    let para = document.createElement('p')
   
   para.innerText = "Current Score: "
    let currScore = res.data.cards
    	console.log(currScore)
   let count = 0;
   for(let i = 0; i < currScore.length; i++){
   let score = currScore[i].value
   // console.log(score)
       if(score === "KING" || score === "QUEEN" || score === "JACK"){
           score = parseInt("10") 
           count += score
       }else if(score === "ACE"){
           score = parseInt("1")
           count += score
       }else{
           count += parseInt(score)    
       }
    }
       // console.log(count)
       scoreBoard.append(para)
       para.append(count)
       
       gameButtons()
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
    }
        newImg.append(extraCard)
    
    let addToScore = oneCardResponse
    console.log(addToScore)
    currentScore(addToScore)
    // console.log(image)
}

const stayAction = async(res) => {
    compURL = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=3`

    let compResponse = await axios.get(compURL)

    let stayCards = document.querySelector("#compDIV")
    let compCards = compResponse.data.cards
    console.log(compCards)

    for(let i = 0; i < compCards.length; i++){
        let compCardImage = compCards[i].image
        let compImg = document.createElement('img')
        compImg.src = compCardImage

        stayCards.append(compImg)
        compImg.append(compCardImage)
       
    }

}