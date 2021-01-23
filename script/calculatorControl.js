"use strict";

function calculatorControl() {
  const distance = document.querySelector('.distance');
  const calcParent = document.querySelector('.constructor');
  const discountBtn = calcParent.querySelector('.discount-btn');

  discountBtn.disabled = true;

  calcParent.addEventListener('input', function(event) {
    const target = event.target;

    if(target.matches('.distance')) {
      distance.value = distance.value.replace(/[^0-9]/, '');
      if(distance.value !== '') {
        discountBtn.disabled = false;
      } else {
        return;
      }
    }
  });
}

module.exports = calculatorControl;