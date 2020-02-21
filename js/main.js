const displayInstructions = function (type_of_spread) {
  $('#name-of-type-of-spread').html(spreads[type_of_spread].name_of_spread)
  $('#instructions').html(spreads[type_of_spread].instructions());
}

const flipCard = function (cardPosition) {
  const cardId = Math.floor(Math.random() * cards.length);
  const card = cards.splice(cardId,1)[0];
  $(`#card-pos-${cardPosition}`).attr('src', card.cardImage);
  $(`#description-${cardPosition}`).html(card.cardDescription);
  $(`#link-${cardPosition}`).html('click here for more information').attr('href', card.info);
}

const createBoard = function (num_of_cards) {
  for (let i = 0; i < num_of_cards; i++) {
    const cardElement = $(`<div class='img-div'><img src='images/back_of_card.jpg'
                                id='card-pos-${i}'
                                data-id=${i}></img></div>`);
    cardElement.one('click', function() {
      flipCard(i)
    });
    $('#spread').append(cardElement);
  }
}
const selectSpread = function (spread_type) {
  const selected_spread = spreads[spread_type]
  $('.name-of-spread').html(selected_spread.name_of_spread);
  $('.card-1-name').html(selected_spread.card_1_name);
  $('.card-1-definition').html(selected_spread.card_1_definition);
  $('.card-2-name').html(selected_spread.card_2_name);
  $('.card-2-definition').html(selected_spread.card_2_definition);
  $('.card-3-name').html(selected_spread.card_3_name);
  $('.card-3-definition').html(selected_spread.card_3_definition);
}
const cardInfoString = function(selected_spread, card_num) {
  const spread_type = spreads[selected_spread];
  let cardInfo = ` Card ${card_num} represents ${spread_type[`card_${card_num}_name`]}.`
                + ` ${$(`#description-${card_num-1}`).html()}\n`;

  return cardInfo;
}
const saveSpread = function(selected_spread) {  
  const dateString = moment(Date.now()).format('M-D-YYYY');
  const doc = new jsPDF();
  doc.text(dateString, 10, 10);
  doc.text(spreads[selected_spread].name_of_spread, 10, 20)
  doc.text('', 10, 30 )
  
  let line_number = 6;
  const spread_type = spreads[selected_spread];
  
  let cardsInfo = '';
  for(let i = 1; i < (spread_type.num_of_cards +1); i++){
    cardsInfo += cardInfoString(selected_spread, i);
  }
  const cardString = cardsInfo.match(/.{1,100}/g);
  doc.setFontSize(10);
  cardString.forEach(function(stringSection) {
    doc.text(stringSection, 10, line_number * 5);
    line_number ++;
  })
  doc.save(`${dateString}-tarot-reading.pdf`)
}

$(document).ready(function () {
  let selected_spread = 'past_present_future';
  displayInstructions(selected_spread);
  createBoard(3);
  $('.select-spread').on('click', function() {
    selected_spread = $(this).attr('id');
    selectSpread(selected_spread);
    displayInstructions(selected_spread)
  });
  $('#save-pdf').on('click', function() {
    saveSpread(selected_spread)})
})
