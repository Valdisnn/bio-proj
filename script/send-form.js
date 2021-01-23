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