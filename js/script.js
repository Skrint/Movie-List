(() => {
  const arr = [];

  const $inputText = document.querySelector('.js-input');
  const $form = document.querySelector('.app');
  const $ul = document.querySelector('.movie__list');

  const $img = document.createElement('img');
  $img.src = './img/btn-delete.svg';

  function createItemText() {
    const textInInput = $inputText.value.trim();
    const $p = document.createElement('p');
    $p.classList.add('movie__item-text');
    $p.textContent = textInInput;
    return $p;
  }

  function createItemImg() {
    return $img;
  }

  function createItemButton() {
    const $button = document.createElement('button');
    $button.classList.add('btn');
    $button.append(createItemImg());
    return $button;
  }

  function createInputRadio() {
    const $inputRadio = document.createElement('input');
    $inputRadio.type = 'radio';
    $inputRadio.classList.add('input-radio');
    return $inputRadio;
  }

  function getTextFromUser() {
    if (!$inputText.value.trim()) {
      return;
    }
    const text = $inputText.value;
    clearInput();
    return text;
  }

  function trackText(text, isDone, img) {
    arr.push({
      text: text,
      isDone: isDone,
      img: img,
    });
  }

  function renderList(arr) {
    let movieListHTML = '';

    arr.forEach((item) => {
      movieListHTML += `<li>
          <input class='input-radio js-input-radio' type="radio">
          <p class="movie__item-text">${item.text}</p>
          <img src='${item.img}'>
        </li>`;
    });

    clearInput();

    console.log(arr);

    $ul.innerHTML = movieListHTML;
  }

  function clearInput() {
    $inputText.value = '';
  }

  $form.addEventListener('submit', (e) => {
    e.preventDefault();
    const textFromUser = getTextFromUser();
    trackText(textFromUser, false, $img.src);
    renderList(arr);
  });
})();
