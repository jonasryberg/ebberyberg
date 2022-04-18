import {shuffle} from './utils.js';
let personer = ["ebbe_tn", "elias_tn", "ellenfrida_tn", "emil_tn", "janne_tn", "johanna_tn", "jonasfrida_tn", "martinmarisol_tn", "simon_tn", "johan_tn"];
let clickable = true;
let gameArea;
let openCard;


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
        playSoundCow();
    } else {
        openCard = undefined;
        playSoundMario();


    }

}


function playSoundMario () {
	let ding = new Audio('../sound/mario-money-sound.mp3');
	ding.play();
}

function playSoundCow () {
	let ding = new Audio('../sound/Cow-moo-sound.mp3');
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
            img.setAttribute('src', `assets/img/${PERSON_NUMBER}.jpg`);

        div.appendChild(img);
        gameArea.appendChild(div);
    }
}

