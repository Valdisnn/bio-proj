"use strict";

function formValidation() {
  const mainForm = document.querySelector('.main-form');
  const inputsPhone = document.querySelectorAll('input[name="user_phone"]');
  const inputsName = document.querySelectorAll('input[name="user_name"]');

  function formControl() {
    inputsName.forEach(function(item) {
      item.addEventListener('input', function(event) {
        let target = event.target;
      
        target.value = target.value.replace(/[^\W]/, '');
      });
    });

    inputsPhone.forEach(function(item) {
      item.addEventListener('input', function(event) {
        let target = event.target;
  
        target.value = target.value.replace(/[^\+\d-)\(]/, '');
      });
    });
  }

  formControl();
}

module.exports = formValidation;