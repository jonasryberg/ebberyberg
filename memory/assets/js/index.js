import {shuffle} from './utils.js';
let personer = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
let clickable = true;
let gameArea;
let openCard;
let pair = 0;


addEventListener('load', main);

function main() {
    removeEventListener('load', main);
    gameArea = document.querySelector('#game-area');
    createGameAre();
    gameArea.addEventListener('click', cardClick);
}

function cardClick(event) {
    const TARGET = event.target;
    if(TARGET.tagName.toLowerCase() != 'img' || !clickable) return;
    

    TARGET.classList.remove('hidden');

    if(openCard === undefined) {
        openCard = TARGET;
    } else if(openCard.src != TARGET.src) {
        clickable = false;
        setTimeout(function() {
            openCard.classList.add('hidden');
            TARGET.classList.add('hidden');
            openCard = undefined;
            clickable = true;
        }, 1000);
       
    } else {
        openCard = undefined;
        pair +=1;
        playSoundMario();
        if (pair == 10) {
            tada();
            TARGET.classList.remove('hidden');
  
            alert('Grattis du klarade spelet!')
            location.reload(); 

        }


    }

}


function playSoundMario () {
	let ding = new Audio('assets/sound/mario-money-sound.mp3');
	ding.play();
}

function playSoundCow () {
	let ding = new Audio('assets/sound/Cow-moo-sound.mp3');
	ding.play();
}

function tada () {
	let ding = new Audio('assets/sound/tada-fanfare-a-6313.mp3');
	ding.play();
}

function createGameAre() {
    personer = personer.concat(personer);
    personer = shuffle(personer);

    for (let index = 0; index < personer.length; index++) {
        const PERSON_NUMBER = personer[index];

        let div = document.createElement('div');
            div.classList.add('card');
        let img = document.createElement('img');
            img.classList.add('hidden');
            img.setAttribute('src', `assets/img/${PERSON_NUMBER}.png`);

        div.appendChild(img);
        gameArea.appendChild(div);
    }
}
