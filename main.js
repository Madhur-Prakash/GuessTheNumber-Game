let number = parseInt(Math.random() * 100 + 1)
const submit = document.querySelector('#subt')
const user_input = document.querySelector('#guessField') 
const user_guesses = document.querySelector('.guesses') 
const remaining = document.querySelector('.lastResult') 
const lowOrHi = document.querySelector('.lowOrHi') 
const start_over = document.querySelector('.resultParas') 
const p = document.createElement('p')

let prev_guess = []
let num_guess = 1
let play_game = true

if(play_game){
    submit.addEventListener('click', (e) => {
        e.preventDefault()
        const guess = parseInt(user_input.value)
        validate_guess(guess)

    })
}

function validate_guess(guess){
    if(isNaN(guess)){
        alert('Please enter a valid number')
    } else if(guess<1){
        alert('Please enter a positive number')
    } else if(guess>100){
        alert('Please enter a number between 1 and 100')
    }  else{
        prev_guess.push(guess)
        if(num_guess === 11){
            display_guess(guess)
            display_message(`Game over. Random number was ${number}`)
            end_game()
        } else{
            display_guess(guess)
            check_guess(guess)
        }
    }
}

function check_guess(guess){
    if(guess<number){
        display_message('Number is lower than the random number')
    } else if(guess>number){
        display_message("Number is higher than the random number")
    } else{
        display_message('You guessed it right')
        end_game()
    }
}

function display_message(message){
    lowOrHi.innerHTML = `<h2>${message}</h2>`
}

function display_guess(guess){
    user_input.value = '' 
    user_guesses.innerHTML += `${guess}, `
    num_guess++
    remaining.innerHTML = `${11 - num_guess}`
}


function new_game(){
    const game = document.querySelector("#newgame")
    game.addEventListener('click', (e) => {
        number = parseInt(Math.random() * 100 + 1)
        prev_guess = []
        num_guess = 1
        user_guesses.innerHTML = ''
        remaining.innerHTML = `${11 - num_guess}`
        user_input.removeAttribute('disabled')
        start_over.removeChild(p)
        play_game = true
    })
}

function end_game(){
    user_input.value = ''
    user_input.setAttribute('disabled', '')
    p.classList.add('button')
    p.innerHTML = `<h2 id="newgame">Start new game</h2>`
    start_over.appendChild(p)
    play_game = false
    new_game()
}