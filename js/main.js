var cardsInPlay = [];

var flipCard = function () {

  //get random card
  cardId = Math.floor(Math.random() * cards.length);

  //put card in cardsInPlay array
  cardsInPlay.push(cards[cardId].name);
  //get card position
  var descriptionNum = this.getAttribute('data-id');
  //get the card Description to display
  var descriptionText = cards[cardId].cardDescription;
  document.getElementById('description-' + descriptionNum).innerHTML = descriptionText;

  this.setAttribute('src', cards[cardId].cardImage);
  this.removeEventListener('click', flipCard);
  var linkId = document.getElementById("link-" + descriptionNum);
  linkId.setAttribute('href', cards[cardId].info);
  linkId.innerHTML = "click here for more info";

}

var createBoard = function (num_of_cards) {
  console.log("board was created");
  for (var i = 0; i < num_of_cards; i++) {
    var cardElement = document.createElement('img');
    cardElement.setAttribute('data-id', i);
    cardElement.setAttribute('src', 'images/back_of_card.png');
    cardElement.addEventListener('click', flipCard);
    document.getElementById('space-' + i).appendChild(cardElement);

  }
}
const selectSpread = function (spread_type) {
  const selected_spread = spreads[spread_type]
  $('.name-of-spread').html(selected_spread.name_of_spread)
  $('.card-1-name').html(selected_spread.card_1_name)
  $('.card-1-definition').html(selected_spread.card_1_definition)
  $('.card-2-name').html(selected_spread.card_2_name)
  $('.card-2-definition').html(selected_spread.card_2_definition)
  $('.card-3-name').html(selected_spread.card_3_name)
  $('.card-3-definition').html(selected_spread.card_3_definition)
}

const saveSpread = function() {  
  const dateString = moment(Date.now()).format('M-D-YYYY')
  const doc = new jsPDF()

  doc.text(dateString, 10, 10)
  doc.save(`${dateString}-tarot-reading.pdf`)
}

$(document).ready(function () {
  createBoard(3);
  $('.select-spread').on('click', function() {
    selectSpread($(this).attr('id'));
  });
  $('#save-pdf').on('click', saveSpread)
})
