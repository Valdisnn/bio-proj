"use strict";

function messageInfoCollect() {
  const message = document.querySelector('input[name="user_quest"]');
  const consultationBtn = document.querySelector('.consultation-btn');
  
  function storage(item) {
    localStorage.setItem('tempo', JSON.stringify(item));
  }

  consultationBtn.addEventListener('click', function() {
    let body = {};
    let text = message.value;
    body.message = text;

    storage(body);

    message.value = '';
  });


}

module.exports = messageInfoCollect;