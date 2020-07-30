# Simple 21 - Cards Web Game

## The Game
In this game of 21 the player will play against the computer. The goal of the game is to draw cards whose added value will be as close as possible or equal to 21. At the beginning the player will draw two cards. Upon receiving the two cards the player will look at them and decide to `HIT` or `STAY`. If the player picks `HIT` he will be dealt one more card. The player can `HIT` as many times as they wish. When the user choses to `STAY` the computer will draw three cards from the same deck and the added value of the players cards will be compared. Whoever is closest to 21 wins.

## API
Created an website to play a simplified version of the 21 game. Used the [Deck Of Cards API](https://deckofcardsapi.com/) to manage a deck of cards. 

### Value Of Cards
- 2-9 = Face Value e.g. 5 of hearts = 5 points, 8 of diamonds = 8 points
- J,Q,K = 10 points
- A = 1 point

## Details

* When the page loads there is a button that displays "Start Game" and the website makes a network request to get a SHUFFLED NEW DECK. 

* When the user clicks on the "START GAME" button, the button is replaced with the list below. 

  - The player's card images are shown
  - The Current Score (sum of card values)
  - `HIT` button
  - `STAY` button 
  
### User Flow
* If a player chooses the `HIT` button, another card should be drawn from a deck and displayed next to the previous cards. 
* If the sum of their value is greater than 21, a header that display "BUSTED" will be shown.   
* If not, the current score will be updated to reflect the value of the new card. The two buttons should still be there for the player will choose again.
* If a player chooses the `STAY` button, three cards from the deck will be fetched and those will be the computer's cards.
* If the computer's score, is greater than 21 then display "YOU WIN" will be shown. If not, whichever score is closer to 21 wins. 

## Demo
[![Watch the video ](./assets/demo-video-mock.png)](https://www.youtube.com/watch?v=Pg5i0L73ncU)

