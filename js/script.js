(() => {
  const arr = [];

  const textTemplate = document.querySelector('#template__list').content;
  const movieItemTemplate = textTemplate.querySelector('.movie__item');

  const $inputText = document.querySelector('.js-input');
  const $form = document.querySelector('.app');
  const $ul = document.querySelector('.movie__list');
  let items = $ul.children;

  const $img = document.createElement('img');
  $img.src = './img/btn-delete.svg';

  function getTextFromUser() {
    if (!$inputText.value.trim()) {
      return;
    }
    const text = $inputText.value;
    clearInput();
    return text;
  }

  function addTextInArray(text, isDone, img) {
    arr.push({
      text: text,
      isDone: isDone,
      img: img,
    });
  }

  function clearInput() {
    $inputText.value = '';
  }

  function functionalEvents(item, selector, eventElement) {
    const element = item.querySelector(selector);
    element.addEventListener(eventElement, function () {
      const indexOfItem = Array.from(items).indexOf(item);
      if (eventElement === 'click') {
        arr.splice(indexOfItem, 1);
        item.remove();
      } else {
        const svgPath = item.querySelector('.svg__path');
        const text = item.querySelector('.movie__item-text');
        arr[indexOfItem].isDone = true;
        item.style.backgroundColor = '#2d2d2d';
        svgPath.style.fill = 'grey';
        text.style.textDecoration = 'line-through';
        text.style.color = 'grey';
      }
    });
  }

  $form.addEventListener('submit', (e) => {
    e.preventDefault();
    const textFromUser = getTextFromUser();
    if (!textFromUser) {
      return;
    }
    const newItem = movieItemTemplate.cloneNode(true);
    const itemDescr = newItem.querySelector('.movie__item-text');
    itemDescr.textContent = textFromUser;
    $ul.appendChild(newItem);
    functionalEvents(newItem, '.js-btn-remove', 'click');
    functionalEvents(newItem, '.js-input-radio', 'change');
    addTextInArray(textFromUser, false, $img.src);
  });
})();
