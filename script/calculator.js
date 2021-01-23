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