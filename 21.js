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
    let cardsDealt = res.data.cards
    // console.log(cardsDealt)

 for(let i = 0; i < cardsDealt.length; i++){
    let playerCards = cardsDealt[i].image
     let img = document.createElement('img')
     img.src = playerCards
     startGameDIV.append(img)
    // console.log(playerCards)
    img.append(playerCards)
 }

}