"use strict";

function more() {
  const addMore = document.querySelector('.add-more');
  const cards = document.querySelectorAll('.product-card');

  addMore.addEventListener('click', function(event) {
    event.preventDefault();

    cards.forEach(function(item) {
      if(item.classList.contains('hidden')) {
        item.classList.remove('hidden');
      }
    });

    addMore.style.display = 'none';
  });
}

module.exports = more;