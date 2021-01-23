"use strict";

function messageControl() {
  const messageParent = document.querySelector('.director');
  const message = document.querySelector('input[name="user_quest"]');
  const consultationBtn = document.querySelector('.consultation-btn');

  consultationBtn.disabled = true;

  messageParent.addEventListener('input', function(event) {
    const target = event.target;

    if(target.matches('input[name="user_quest"]')) {
      if(message.value !== '') {
        consultationBtn.disabled = false;
      } else {
        return;
      }
    }
  });
}

module.exports = messageControl;