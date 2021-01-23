(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function accordion() {
  let questionAccor;
let constructAccor;

class Accordion {
  constructor(parent, contents, btn) {
    this.parent = document.querySelector(parent);
    this.contents = this.parent.querySelectorAll(contents);
    this.btn = this.parent.querySelectorAll(btn);
  }

  fixClassList() {
    this.contents.forEach(function(item) {
      item.classList.add('accordion-content');
      item.classList.remove('collapse');
      item.classList.remove('in');
    });
  }

  targetSiblingFunc(target) {
    let targetSibling = target.nextElementSibling;
        if(targetSibling.style.maxHeight) {
          targetSibling.style.maxHeight = null;
        } else {
          targetSibling.style.maxHeight = targetSibling.scrollHeight + 'px';
          this.contents.forEach(function(item) {
            if(targetSibling !== item) {
              item.style.maxHeight = null;
            }
          });
        }
  }

  handler() {
    this.parent.addEventListener('click', (event) => {
      let target = event.target;
      if(target.closest('.panel-heading')) {
        event.preventDefault();
        if(target.matches('h4')) {
          target = target.parentNode;
        } else if(target.matches('a')) {
          target = target.parentNode.parentNode;
        }
        this.targetSiblingFunc(target);
      } else {
        return;
      }
    });
    
    this.btn.forEach((item) => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        let heading;
        let targetParent;
        let target = event.target;
        target = target.closest('.accor-btn');
        targetParent = target.parentNode.parentNode;
        heading = targetParent.previousElementSibling;
        if(targetParent.style.maxHeight) {
          targetParent.style.maxHeight = null;
          this.contents.forEach((item, index) => {
            if(item === targetParent) {
              let defineIndex = index + 1;
              let nextAccor = this.contents[defineIndex];
              nextAccor.style.maxHeight = nextAccor.scrollHeight + 'px';
            }
          });
        }
      });
    });
  }

}

questionAccor = new Accordion('.questions', '.panel-collapse');
constructAccor = new Accordion('.constructor', '.panel-collapse', '.accor-btn');

questionAccor.fixClassList();
questionAccor.handler();

constructAccor.fixClassList();
constructAccor.handler();
}

module.exports = accordion;



},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
  "use strict";

  function calculator() {
    const switcherOne = document.getElementById('myonoffswitch');
    const switcherTwo = document.getElementById('myonoffswitch-two');
    const selects = document.querySelectorAll('.select-box');
    const hiddenTitleOne = selects[2].querySelector('p');
    const hiddenTitleTwo = selects[3].querySelector('p');
    const secTitle = document.querySelector('.title-text_second');
    const output = document.getElementById('calc-result');
    const selectOne = selects[0].querySelector('select');
    const selectTwo = selects[1].querySelector('select');
    const selectThree = selects[2].querySelector('select');
    const selectFour = selects[3].querySelector('select');
    const calcParent = document.querySelector('.constructor');
    let valueOne = 10000;
    let valueTwo = 5000;

    function hiddenItems() {
      selectThree.style.display = 'none';
      selectFour.style.display = 'none';
      secTitle.style.display = 'none';
      hiddenTitleOne.style.display = 'none';
      hiddenTitleTwo.style.display = 'none';
    }

    function revealedItems() {
      selectThree.style.display = 'inline-block';
      selectFour.style.display = 'inline-block';
      secTitle.style.display = 'block';
      hiddenTitleOne.style.display = 'inline-block';
      hiddenTitleTwo.style.display = 'inline-block';
    }
    /*При запуске страницы по дефолту отработает данная функция, скрывая ненужные блоки и так как
    первый ползунок у нас по дефолту чекд то сразу будет стоять начальная сумма 10000,
    так же стоит слушатель по показу блоков в зависимости от состояния ползунка*/
    function calcSetting() {
      hiddenItems();
      output.value = 11000;

      switcherOne.addEventListener('change', function() {
        if(switcherOne.checked) {
          hiddenItems();
        } else {
          revealedItems();
        }
      });

      // Смена начальной суммы в зависимости от ссостояния первого ползунка
      switcherOne.addEventListener('change', function() {
        if(switcherOne.checked) {
          output.value = (valueOne * 0.10) + valueOne ;
        } else {
          let tempVal = valueOne + valueTwo;
          output.value = ((valueOne + valueTwo) * 0.20) + tempVal;
        }
      });

    }

    // Функция самого подсчета
    function estimation() {
      output.value = 0;

      if(switcherOne.checked) {
        output.value = valueOne;
      } else {
        output.value = valueOne + valueTwo;
      }

      let sum = 0;
      // Массив селектов
      const selectsArr = [selectOne, selectTwo, selectThree, selectFour];
      // Массив приема value options селектов (по умолчанию все элементы будут равны 0)
      const selectsValue = [];
      // Переменная приема суммы value селектов
      let selectsArrSum = 0;

      // Перебираем все селекты и пушим value выбранного options в массив
      selectsArr.forEach(function(item) {
        let value = item.options[item.selectedIndex].value;
        // Перестрахуемся и преобразуем value в число
        selectsValue.push(+value);
      });

      // Сложим options value которые мы берем с selectsValue
      selectsArrSum = selectsValue.reduce(function(accumulator, value) {
        return accumulator + value;
      }, 0);

      sum = selectsArrSum;

      if(sum === 0) {
        sum = 1;
        if(switcherTwo.checked) {
          let tempValue;
          output.value = +output.value * sum;
          tempValue = output.value;
          output.value = (+output.value) + ((+tempValue) * 0.10);
        } else {
          output.value = +output.value * sum;
        }
      } else {
        if(switcherTwo.checked) {
          let tempValue;
          let partOne = output.value * (selectsValue[0] + selectsValue[1]);
          let partTwo = valueTwo * (selectsValue[2] + selectsValue[3]);
          output.value = +output.value + (+partOne) + (+partTwo);
          tempValue = output.value;
          output.value = (+output.value) + ((+tempValue) * 0.20);
        } else {
          let partOne = output.value * (selectsValue[0] + selectsValue[1]);
          let partTwo = valueTwo * (selectsValue[2] + selectsValue[3]);
          output.value = +output.value + (+partOne) + (+partTwo);
        }
      }
    }

    calcParent.addEventListener('change', function(event) {
      const target = event.target;

      if(target.matches('select') || target.matches('input')) {
        estimation();
      }
    });
    
    calcSetting();
  }

  module.exports = calculator;
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
const accordion = require('./accordion');
const calcInfoCollect = require('./calcInfoCollect');
const calculator = require('./calculator');
const calculatorControl = require('./calculatorControl');
const formValidation = require('./form-validation');
const messageControl = require('./messageControl');
const messageInfoCollect = require('./messageInfoCollect');
const more = require('./more');
const popupCall = require('./popup-call');
const sendForm = require('./send-form');

accordion();
calcInfoCollect();
calculator();
calculatorControl();
formValidation();
messageControl();
messageInfoCollect();
more();
popupCall();
sendForm();

},{"./accordion":1,"./calcInfoCollect":2,"./calculator":3,"./calculatorControl":4,"./form-validation":5,"./messageControl":7,"./messageInfoCollect":8,"./more":9,"./popup-call":10,"./send-form":11}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
"use strict";

function popupCall() {
  const callModal = document.querySelector('.popup-call');
  const contacts = document.querySelectorAll('.contacts');
  const discountBtn = document.querySelectorAll('.discount-btn');
  const discountModal = document.querySelector('.popup-discount');
  const checkBtn = document.querySelector('.check-btn');
  const checkModal = document.querySelector('.popup-check');
  const consultationBtn = document.querySelector('.consultation-btn');
  const consultationModal = document.querySelector('.popup-consultation');

  function modal(units, selector, modal, unit) {
    if(units !== undefined) {
      units.forEach(function(item) {
        item.addEventListener('click', function(event) {
          event.preventDefault();
          const target = event.target;
        
          if(target.matches(selector)) {
            modal.classList.add('popup-active');
          } else {
            return;
          }
        });
      });
    } else {
      unit.addEventListener('click', function(event) {
        event.preventDefault();
        const target = event.target;

        if(target.matches(selector)) {
          modal.classList.add('popup-active');
        } else {
          return;
        }
      });
    }
  }

  function closeModal(modal, selector) {
    modal.addEventListener('click', function(event) {
      const target = event.target;
      if(target.matches('.popup-close') || target.matches(selector)) {
        modal.classList.remove('popup-active');
      }
    });
  }

  modal(contacts, '.call-btn', callModal);
  closeModal(callModal, '.popup-call');

  modal(discountBtn, '.discount-btn', discountModal);
  closeModal(discountModal, '.popup-discount');

  modal(undefined, '.check-btn', checkModal, checkBtn);
  closeModal(checkModal, '.popup-check');

  modal(undefined, '.consultation-btn', consultationModal, consultationBtn);
  closeModal(consultationModal, '.popup-consultation');
}

module.exports = popupCall;





},{}],11:[function(require,module,exports){
"use strict";

function sendForm() {
  const loading = 'Загрузка...';
  const err = 'Ошибка:';
  const done = 'Данные отправлены';
  const forms = document.querySelectorAll('form');
  const output = document.createElement('span');

  output.style.cssText = `
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translate(-50%, 20%);
    width: 270px;
    max-width: 270px;
    text-align: center;
    font-size: 12px;
    color: green;
    font-style: bold;
    margin-bottom: 10px
  `;

  function successful(response) {
    if(response.status !== 200) {
      throw new Error('code is not 200');
    } else {
      output.textContent = done;
    }
  }

  function error(message) {
    output.textContent = `${err} '${message}'`;
  }

  function clearOutput() {
    output.textContent = '';
  }

  function postData(url, data) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }
  
  forms.forEach(function(item) {
    item.addEventListener('submit', function(event) {
      event.preventDefault();
      const submitBtn = item.querySelector('button[type="submit"]');
      const inputs = item.querySelectorAll('input');
      submitBtn.append(output);
      output.textContent = loading;
      const formData = new FormData(item);
      const body = {};
      formData.forEach(function(value, key) {
        body[key] = value;
      });
      if(localStorage.getItem('tempo')) {
        let additionalData = JSON.parse(localStorage.getItem('tempo'));
        let bigData = {...body, ...additionalData};
        postData('./server.php', bigData).then(successful).catch(error);
        localStorage.removeItem('tempo');
      } else {
        postData('./server.php', body).then(successful).catch(error);
      }
      inputs.forEach(function(item) {
        item.value = '';
      });
      setTimeout(clearOutput, 7000);
    });
  });
}

module.exports = sendForm;
},{}]},{},[6]);
