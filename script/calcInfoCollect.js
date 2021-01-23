"use strict";

function calcInfoCollect() {
  const distance = document.querySelector('.distance');
  const calcParent = document.querySelector('.constructor');
  const discountBtn = calcParent.querySelector('.discount-btn');
  const selects = document.querySelectorAll('.select-box');
  const result = document.getElementById('calc-result');

  function storage(item) {
    localStorage.setItem('tempo', JSON.stringify(item));
  }

  discountBtn.addEventListener('click', function() {
    const selectOne = selects[0].querySelector('select');
    const selectTwo = selects[1].querySelector('select');
    const selectThree = selects[2].querySelector('select');
    const selectFour = selects[3].querySelector('select');
    const selectsArr = [selectOne, selectTwo, selectThree, selectFour];
    let body = {};
    selectsArr.forEach(function(item, index) {
      if(item.style.display === 'none') {
        return;
      } else {
        let value = item.options[item.selectedIndex].text;
        let key = `option ${index}`;
        body[key] = value;
      }
    });

    body.distance = distance.value;
    body.price = result.value;

    storage(body);

  });
}

module.exports = calcInfoCollect;