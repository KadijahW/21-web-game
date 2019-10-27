document.addEventListener("DOMContentLoaded", () => {
    startButton()
})

const startButton = () => {
    const startButton = document.querySelector("#startButton")
    startButton.addEventListener('click', getPlayerCards)

    // const startGame = document.querySelector("#gameButtons")
    // startGame.addEventListener('click', startGame)
}

const getPlayerCards = async() => {
    let url = "https://cors-anywhere.herokuapp.com/https://deckofcardsapi.com/"
    try{
        let response = await axios.get(url)
        console.log(response)
        startGame(url)
    }catch(err){
        console.log(err)
    }
}

const startGame = () => {


}