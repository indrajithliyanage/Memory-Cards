const board = document.querySelector('.memory-game');
const cards = document.querySelectorAll('.memory-card');
let firstCardFlipped = false;
let firstCard, secondCard;
let lockCards = false;

cardsShuffle();

function cardsShuffle() {
    let shuffledCollection = [];
    cards.forEach((card) => {
        let random = Math.floor(Math.random() * cards.length);
        shuffledCollection.splice(random, 0, card);
    })

    shuffledCollection.forEach(card => {
        card.addEventListener('click', flipCard);
        board.append(card);
    })
}

function flipCard() {
    if(lockCards){
        return;
    }
    this.classList.toggle('flip');
    if (!firstCardFlipped) {
        firstCardFlipped = true;
        firstCard = this;
    } else if (firstCard != this) {
        firstCardFlipped = false;
        secondCard = this;
        lockCards = true;
        cardChecker();
    } else {
        firstCardFlipped = false;
    }
}

function cardChecker() {
    let isMatch = firstCard.dataset.framework == secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    lockCards = false;
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.toggle('flip');
        secondCard.classList.toggle('flip');
        lockCards = false;
    }, 800)
}