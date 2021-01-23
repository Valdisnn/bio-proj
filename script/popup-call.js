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




