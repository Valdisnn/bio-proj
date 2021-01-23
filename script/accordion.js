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


