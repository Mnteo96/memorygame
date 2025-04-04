let firstCard = null;
let secondCard = null;
let tryingNum = 0;

let animals = ["bear.png", "bird.png", "chameleon.png", "deer.png", "fox.png", "parrot.png", "rhino.png", "squirrel.png", "tiger.png", "wolf.png", "monkey.png", "cat.png"];

let cards = [...animals, ...animals];

cards.sort(() => Math.random() - 0.5);

const gameContainer = document.querySelector(".cards");

cards.forEach((animal) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <p>?</p>
            </div>
            <div class="card-back">
                <img src="images/${animal}" class="card-img">
            </div>
        </div>
    `;
    gameContainer.appendChild(card);
});

const allCards = document.querySelectorAll(".card");
let trying = document.querySelector(".trying");


allCards.forEach(card => {
    card.addEventListener("click", () => {
        if(firstCard && secondCard) return;

        if(card === firstCard) return;
        
        card.classList.add("flipped");

        if(!firstCard){
            firstCard = card;
        }else{
            secondCard = card;
        }

        let firstImg = firstCard.querySelector(".card-back img").src.split("/").pop();
        let secondImg = secondCard.querySelector(".card-back img").src.split("/").pop();

        if(firstImg === secondImg){
            firstCard.classList.add("matched");  
            secondCard.classList.add("matched");
            firstCard = null;
            secondCard = null;
            const flippedCards = document.querySelectorAll(".flipped");
            if(flippedCards.length === cards.length){
                document.querySelector(".win-screen").classList.remove("hidden");
                document.querySelector(".final-attempts").innerText = `Number of attempts: ${tryingNum}`;
            }
        }else{
            setTimeout(()=>{
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");
                firstCard = null;
                secondCard = null;
                tryingNum++;
                trying.innerHTML = `Number of attempts: ${tryingNum}`;
            }, 1000)
        }

    })
})

document.querySelector(".restart-btn").addEventListener("click", () => {
    location.reload();
})
