document.addEventListener("DOMContentLoaded", () => {
    startButton()
})

const startButton = () => {
    const startButton = document.querySelector("#startButton")
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
 //  console.log(deckidURL)
let res = await axios.get(deckidURL)
// console.log(res.data.cards)
getPlayerCards(res)
}

const getPlayerCards = (res) => {
    let  startGameDIV = document.querySelector("#startGame")
    let gameButtonDiv = document.querySelector("#gameButtons")
    let cardsDealt = res.data.cards
    // console.log(cardsDealt)
   
for(let i = 0; i < cardsDealt.length; i++){
    // let currentScore = document.createElement('p')
    //     currentScore.innerText = cardsDealt[i].value
    let playerCards = cardsDealt[i].image
     let img = document.createElement('img')
     img.src = playerCards
    //  startGameDIV.append(currentScore)
     startGameDIV.append(img)
     img.append(playerCards)
    // console.log(playerCards)
 }

 let hitButton = document.createElement("button")
 hitButton.innerHTML= "HIT"
 hitButton.addEventListener("click", hitAction)

 let stayButton = document.createElement("button")
 stayButton.innerHTML= "STAY"
 stayButton.addEventListener("click", stayAction)

 gameButtonDiv.append(hitButton)
 gameButtonDiv.append(stayButton)
}

const hitAction = async(res) => {
    // console.log(res.data)
    url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`
    let oneCardResponse = await axios.get(url)
    
    let hitIMG = document.querySelector("#startGame")
    let image = oneCardResponse.data.cards

    for(let i = 0; i < image.length; i++){
        let extraCard = image[i].image
        let newImg = document.createElement('img')
        newImg.src = extraCard
        console.log(extraCard)

         hitIMG.append(newImg)
         newImg.append(extraCard)
    }
    console.log(image)
}

const stayAction = () => {
    console.log("hi")

}