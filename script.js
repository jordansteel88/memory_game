const gameContainer = document.getElementById("game");
//game logic
let card1, card2; 
let cardsFlipped = 0;
let flipBlock = false;
let hasFlipped = false;
//alert logic
let modal = document.getElementById('modal'); 
let shade = document.getElementById('shade');
let close = document.getElementById('close');

const IMGS = [
  "img/lela.png",
  "img/fry.png",
  "img/prof.png",
  "img/hermes.png",
  "img/scruffy.png",
  "img/bender.png",
  "img/amy.png",
  "img/zoid.png",  
  "img/lela.png",
  "img/fry.png",
  "img/prof.png",
  "img/hermes.png",
  "img/scruffy.png",
  "img/bender.png",
  "img/amy.png",
  "img/zoid.png"
];

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}
let shuffledImgs = shuffle(IMGS);

function createDivsForImgs(imgArray) {
  for (let img of imgArray) {
    // create a new div
    const newDiv = document.createElement("div");
    //add front and back images to div
    const frontImg = document.createElement("img"); 
    const backImg = document.createElement("img");
    // give both sides a class attribute 
    frontImg.classList.add('front');
    backImg.classList.add('back');
    //add img sources
    frontImg.src = img;
    backImg.src = 'img/PEShip.jpeg';
    //append imgs to div
    newDiv.append(frontImg);
    newDiv.append(backImg);
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    //add data attribute for matching
    newDiv.dataset.imgSrc = img;
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function resetGameDivs() {
  let parent = document.querySelector('#game');
  let children = document.querySelectorAll('#game div');
  //loop through #game div and remove all elements
  for (let i = 0; i < children.length; i++) {
      parent.removeChild(children[i]);  
  }
  //add new card divs 
  shuffle(IMGS);
  createDivsForImgs(shuffledImgs);
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (flipBlock) return;
  //initiate guess variable and image matching variable
  let guess = event.target.parentElement;
  //prevent clicking same card
  if (guess.classList.contains('flipped')) return;
  //add flipped class
  guess.classList.add('flipped');
  //on first flip, change hasFlipped state and assign card1 to guess  
  if (!hasFlipped) {
    //first guess
    hasFlipped = true;
    card1 = guess;  
  } else {
    //second guess: initiate flipBlock, change hasFlipped state and assign card2 to guess
    flipBlock = true;
    hasFlipped = false;
    card2 = guess;
    //if cards match, remove eventListeners on those cards
    if (card1.dataset.imgSrc === card2.dataset.imgSrc) {
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      //reset flipBlock
      flipBlock = false;
      //increment cardsFlipped to track game status
      cardsFlipped += 2;
    } else {
    //if cards don't match, remove flipped class  
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        //reset flipBlock
        flipBlock = false; 
      }, 1000); 
    }
  }

  if (cardsFlipped === IMGS.length) {
    //game won, use timeout to ensure final card gets flipped
    setTimeout(() => {
      //show modal
      modal.style.display = shade.style.display = 'block';
      resetGameDivs();
      cardsFlipped = 0;
    }, 1000);
  }
}

// when the DOM loads
createDivsForImgs(shuffledImgs);

//close alert
close.onclick = function() {
  modal.style.display = shade.style.display = 'none';
};
