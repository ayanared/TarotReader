
var cardsInPlay=[];

var flipCard = function(){

  cardId = Math.floor(Math.random() * cards.length);
  var descriptionNum = this.getAttribute('data-id');
  var descriptionText = cards[cardId].cardDescription;
  document.getElementById('description-'+ descriptionNum).innerHTML = descriptionText;
  cardsInPlay.push(cards[cardId].name);
  this.setAttribute('src', cards[cardId].cardImage);
  this.removeEventListener('click', flipCard);
  var linkId = document.getElementById("link-"+descriptionNum);
  linkId.setAttribute('href', cards[cardId].info);
  linkId.innerHTML = "click here for more info";

}

var createBoard = function (){
  console.log("board was created");
  for (var i = 0; i<3; i++){
    var cardElement = document.createElement('img');
    cardElement.setAttribute('data-id',i);
    cardElement.setAttribute('src', 'images/blank.jpg');
    cardElement.addEventListener('click', flipCard);
    document.getElementById('space-'+ i).appendChild(cardElement);

  }
}

createBoard();
