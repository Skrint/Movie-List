(() => {
  const $input = document.querySelector('.js-input');
  const $button = document.querySelector('.js-btn-submit');
  const $form = document.querySelector('.app');
  const $list = document.querySelector('.movie-list');
  $form.addEventListener('submit', (e) => {
    e.preventDefault();
    let textInInput = $input.value.trim();
    const $li = document.createElement('li');
    $li.textContent = textInInput;
    $list.append($li);
    $input.value = '';
  });
})();
