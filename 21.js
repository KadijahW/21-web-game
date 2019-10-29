document.addEventListener("DOMContentLoaded", () => {
    startButton()
})


//when start game button clicks
const startButton = () => {
    const startButton = document.querySelector("#startGame")
    startButton.addEventListener('click', getCards)

}
//fetchs card using axios
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

//uses the deck ID to get cards from API, and removes button
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

// calls the div created for player and append the images from API to that DIV
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

    //creates a global count for player
    let count = 0;
    //grabs value of each card and sets it to a number and adss it to the global count then calls check score function.
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
    para.innerText =  count
    checkUserScore(count)
      // check21(count)
   }

   //creates a h1 tag that says if player won of went over 21 then calls busted function 
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

   // creates h1 tag that tells player they went over 21
const busted = () => {
let heading = document.querySelector('#heading')
let busted_heading = document.createElement('h1')
busted_heading.innerText = "Busted!"
heading.append(busted_heading)
removeButtons()
}

//removes buttons after either player or computer wins or loses
const removeButtons = () => {
let hit_btn = document.querySelector('#hitBtn')
let stay_btn = document.querySelector('#stayBtn')
let hit_and_stayBtn = document.querySelector("#gameButtons")
hit_and_stayBtn.removeChild(hit_btn)
hit_and_stayBtn.removeChild(stay_btn)

}

// creates and appends the HIT and STAY button once game starts
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

//when hit button is pressed it grabs one card from the API and appeneds the image, 
//it also takes the data and calls currentScore where it adds the value to the global count
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

// when stay button is pressed it grabs 3 card from the API and appends it to the computer div
//computer count is called and passes the card values
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

//creates global variable for computer
let compCount = 0;
    //grabs value of each card and sets it to a number and adds it to the global count then calls check score function.
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
para.innerText = compCount
  checkComputerScore(compCount)
   }
  
   //check if computer = to 21 or greater and removes the buttons
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

//checks if you or computer wins and removes the buttons
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

// const ResetButton = () =>{

// }



