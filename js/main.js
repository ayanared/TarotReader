const displayInstructions = function () {
  $('#instructions').html(`Tarot is a divination tool used to gain clarity about any situation. For <b class='name-of-spread'>this
                            particular spread</b>,the first card represents <span class='card-1-name'>the past</span>. Use this card to gain more clarity
                            about <span class='card-1-definition'>the past influences that affect your query</span>.  The second card represents <span class='card-2-name'>the present</span>.  Use
                            this card to gain clarity about <span class='card-2-definition'>current influences that affect your query</span>.  The last card represents <span class='card-3-name'>the future</span>. Use this card to 
                            <span class='card-3-definition'>gain more insight on where your current path is taking you</span>.`)
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
    const cardElement = $(`<img src='images/back_of_card.png'
                                id='card-pos-${i}'
                                class='d-flex'
                                data-id=${i}></img>`);
    cardElement.one('click', function() {
      flipCard(i)
    });
    $('#game-board').append(cardElement);
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

const saveSpread = function() {  
  const dateString = moment(Date.now()).format('M-D-YYYY')
  const doc = new jsPDF()

  doc.text(dateString, 10, 10)
  doc.save(`${dateString}-tarot-reading.pdf`)
}

$(document).ready(function () {
  displayInstructions();
  createBoard(3);
  $('.select-spread').on('click', function() {
    selectSpread($(this).attr('id'));
  });
  $('#save-pdf').on('click', saveSpread)
})
