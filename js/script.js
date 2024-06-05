(() => {
  arr = getArr();
  arr = arr ? jsonToData(arr) : [];

  const textTemplate = document.querySelector('#template__list').content;
  const movieItemTemplate = textTemplate.querySelector('.movie__item');

  const $inputText = document.querySelector('.js-input');
  const $form = document.querySelector('.app');
  const $ul = document.querySelector('.movie__list');

  let items = $ul.children;

  const $img = document.createElement('img');
  $img.src = './img/btn-delete.svg';

  function clearInput() {
    $inputText.value = '';
  }

  function getTextFromUser() {
    if (!$inputText.value.trim()) {
      return;
    }
    const text = $inputText.value;
    clearInput();
    return text;
  }

  function saveArr(arr, keyName) {
    localStorage.setItem(keyName, JSON.stringify(arr));
  }

  function jsonToData(data) {
    return JSON.parse(data);
  }

  function getArr() {
    return localStorage.getItem('movies');
  }

  function addTextInArray(text, isDone, img) {
    saveArr(
      arr.push({
        text: text,
        isDone: isDone,
        img: img,
      }),
      'movies'
    );
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
      saveArr(arr, 'movies');
    });
  }

  function init(arr) {
    if (arr.length > 0) {
      arr.forEach((movie) => {
        const newItem = movieItemTemplate.cloneNode(true);
        const itemDescr = newItem.querySelector('.movie__item-text');
        itemDescr.textContent = movie.text;
        if (movie.isDone) {
          const svgPath = newItem.querySelector('.svg__path');
          const radioButton = newItem.querySelector('.js-input-radio');
          newItem.style.backgroundColor = '#2d2d2d';
          svgPath.style.fill = 'grey';
          itemDescr.style.textDecoration = 'line-through';
          itemDescr.style.color = 'grey';
          radioButton.checked = true;
        }
        $ul.appendChild(newItem);
        functionalEvents(newItem, '.js-btn-remove', 'click');
        functionalEvents(newItem, '.js-input-radio', 'change');
      });
    }
  }

  init(arr);

  function createItem() {
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
    saveArr(arr, 'movies');
  }

  $form.addEventListener('submit', (e) => {
    e.preventDefault();
    createItem();
  });
})();
