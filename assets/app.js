/* Ферма «Теремок» — логика макета */

document.addEventListener('DOMContentLoaded', function () {
  burger();
  seasons();
  gallery();
  checkout();
  copyLink();
});

/* Мобильное меню */
function burger() {
  const btn = document.getElementById('burger');
  const nav = document.getElementById('mobileNav');
  if (!btn || !nav) return;
  btn.addEventListener('click', function () {
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('open');
    });
  });
}

/* Прайс на живой вес по сезонам */
const SEASONS = {
  spring: [
    ['Барашек', '18–20 кг', 750, '13 500 – 15 000 ₽'],
    ['Козлёнок', '11–13 кг', 690, '7 590 – 8 970 ₽'],
    ['Ягнёнок (до 5 мес)', '8–10 кг', 620, '4 960 – 6 200 ₽']
  ],
  summer: [
    ['Барашек', '18–20 кг', 690, '12 420 – 13 800 ₽'],
    ['Козлёнок', '11–13 кг', 640, '7 040 – 8 320 ₽'],
    ['Ягнёнок (до 5 мес)', '8–10 кг', 580, '4 640 – 5 800 ₽']
  ],
  winter: [
    ['Барашек', '18–20 кг', 780, '14 040 – 15 600 ₽'],
    ['Козлёнок', '11–13 кг', 720, '7 920 – 9 360 ₽'],
    ['Ягнёнок (до 5 мес)', '8–10 кг', 660, '5 280 – 6 600 ₽']
  ]
};

function seasons() {
  const table = document.getElementById('priceTable');
  const tabs = document.querySelectorAll('.seasons button');
  if (!table || !tabs.length) return;

  function render(key) {
    const body = table.querySelector('tbody');
    body.innerHTML = SEASONS[key].map(function (row) {
      return '<tr><td>' + row[0] + '</td><td>' + row[1] + '</td><td>' +
        row[2].toLocaleString('ru-RU') + ' ₽</td><td>' + row[3] + '</td></tr>';
    }).join('');
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.setAttribute('aria-selected', 'false'); });
      tab.setAttribute('aria-selected', 'true');
      render(tab.dataset.season);
    });
  });

  render('spring');
}

/* Галерея карточки животного */
function gallery() {
  const main = document.getElementById('galleryMain');
  const thumbs = document.querySelectorAll('.gallery__thumbs button');
  if (!main || !thumbs.length) return;

  thumbs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const img = btn.querySelector('img');
      main.src = img.getAttribute('src');
      main.alt = img.getAttribute('alt');
      thumbs.forEach(function (b) { b.setAttribute('aria-current', 'false'); });
      btn.setAttribute('aria-current', 'true');
    });
  });
}

/* Оформление заказа: шаги */
function checkout() {
  const steps = document.querySelectorAll('[data-step]');
  if (!steps.length) return;

  function show(id) {
    steps.forEach(function (s) { s.hidden = s.dataset.step !== id; });
    document.querySelectorAll('.stepper [data-step-label]').forEach(function (l) {
      const active = l.dataset.stepLabel === id;
      l.classList.toggle('active', active);
      const dot = l.querySelector('span');
      if (dot) dot.textContent = active ? '✓' : l.dataset.stepLabel;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.querySelectorAll('[data-goto]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      show(btn.dataset.goto);
    });
  });

  const first = document.querySelector('[data-step]');
  if (first) show(first.dataset.step);
}

/* Копирование ссылки на оплату */
function copyLink() {
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const text = btn.dataset.copy;
      if (navigator.clipboard) navigator.clipboard.writeText(text);
      const label = btn.querySelector('[data-copy-label]') || btn;
      const original = label.textContent;
      label.textContent = 'Скопировано';
      setTimeout(function () { label.textContent = original; }, 1600);
    });
  });
}
