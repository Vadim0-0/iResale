/* Header - menu */

document.addEventListener("DOMContentLoaded", () => {
  // Находим необходимые элементы
  const headerMenu = document.querySelector('.header-menu');
  const headerBottom = document.querySelector('.header-bottom');
  const headerBottomBtn = document.querySelector('.header-bottom__btn');

  // Добавляем обработчик наведения на кнопку
  headerBottomBtn.addEventListener('mouseenter', () => {
      headerMenu.classList.add('active');
      headerBottom.classList.add('active');
  });

  // Убираем класс 'active', когда курсор покидает область header-menu
  headerMenu.addEventListener('mouseleave', () => {
      headerMenu.classList.remove('active');
      headerBottom.classList.remove('active');
  });
});

/* Header - переключение блоков */

document.addEventListener("DOMContentLoaded", () => {
  // Получаем все кнопки в меню
  const menuItems = document.querySelectorAll('.header-menu__content-menu__list-item button');
  // Получаем все списки с продуктами
  const productLists = document.querySelectorAll('.header-menu__content-products__card-list');

  // Функция для обработки клика на кнопку
  function handleMenuClick(event) {
    const targetId = event.currentTarget.id;

    // Удаляем класс active у всех элементов меню
    menuItems.forEach(item => {
      item.parentElement.classList.remove('active');
    });

    // Добавляем класс active к нажатому элементу меню
    event.currentTarget.parentElement.classList.add('active');

    // Удаляем класс active у всех списков продуктов
    productLists.forEach(list => {
      list.classList.remove('active');
    });

    // Находим список продуктов, который соответствует выбранному меню
    const targetList = document.querySelector(`.header-menu__content-products__card-list[data-target="${targetId}"]`);

    // Добавляем класс active к соответствующему списку продуктов
    if (targetList) {
      targetList.classList.add('active');
    }
  }

  // Назначаем обработчики событий для всех кнопок
  menuItems.forEach(button => {
    button.addEventListener('click', handleMenuClick);
  });

});

/* Header - menu-mobile - открытие закрытие  */

document.addEventListener('DOMContentLoaded', () => {
  // Получаем элементы кнопок и блока меню
  const menuMobile = document.querySelector('.header-menu-mobile');
  const menuBtn = document.querySelector('.header-mobile__btn');
  const menuCloseBtn = document.querySelector('.header-menu-mobile__content-top__close');

  // Обработчик для открытия меню
  menuBtn.addEventListener('click', () => {
    menuMobile.classList.add('active');
  });

  // Обработчик для закрытия меню
  menuCloseBtn.addEventListener('click', () => {
    menuMobile.classList.remove('active');
  });
});

/* Header - menu-mobile - открытие карточек  */

document.addEventListener('DOMContentLoaded', () => {
  // Получаем все элементы меню
  const menuItems = document.querySelectorAll('.header-menu-mobile__content-menu__list-item');

  // Функция для установки начальной высоты элементов (высота кнопки)
  menuItems.forEach(item => {
    const button = item.querySelector('button');
    item.style.height = `${button.offsetHeight}px`;
  });

  // Функция для обработки кликов на кнопки
  menuItems.forEach(item => {
    const button = item.querySelector('button');

    button.addEventListener('click', () => {
      // Проверяем, активен ли элемент уже
      const isActive = item.classList.contains('active');

      // Убираем активный класс у всех элементов и сбрасываем их высоту
      menuItems.forEach(i => {
        i.classList.remove('active');
        const btn = i.querySelector('button');
        i.style.height = `${btn.offsetHeight}px`;
      });

      // Если текущий элемент не был активен, активируем его
      if (!isActive) {
        item.classList.add('active');

        // Получаем высоту кнопки и вложенного списка
        const itemList = item.querySelector('.header-menu-mobile__content-menu__list-item__list');
        const totalHeight = button.offsetHeight + (itemList ? itemList.offsetHeight : 0);

        // Устанавливаем новую высоту для активного элемента
        item.style.height = `${totalHeight}px`;
      }
    });
  });
});


/* Главная странциа - hero */

document.addEventListener("DOMContentLoaded", () => {
  const images = [
    "./img/index/index-img.png", // Замените на пути к вашим изображениям
    "./img/index/index-img.png",
    "./img/index/index-img.png",
    "./img/index/index-img.png",
    "./img/index/index-img.png"
  ];

  const titles = [
    "Apple Vision Pro",
    "Apple MacBook Pro",
    "Apple iPhone 15",
    "Apple Watch Series 9",
    "Apple AirPods Pro"
  ];

  const descriptions = [
    "Добро пожаловать в новую пространственную эру.",
    "Мощь профессионального ноутбука.",
    "Новый уровень мобильной связи.",
    "Ваш персональный тренер на запястье.",
    "Чистота звука нового поколения."
  ];

  const buyLinks = [
    "https://example.com/apple-vision-pro",
    "https://example.com/macbook-pro",
    "https://example.com/iphone-15",
    "https://example.com/apple-watch-series-9",
    "https://example.com/airpods-pro"
  ];

  let currentIndex = 0;

  const imgElement = document.querySelector(".index-hero__content-images img");
  const titleElement = document.querySelector(".index-hero__content-info__block-title");
  const descriptionElement = document.querySelector(".index-hero__content-info__block-descr");
  const buyButton = document.querySelector(".index-hero__content-info__block-btn");
  const positionCircles = document.querySelectorAll(".index-hero__content-positions__circle");
  const prevButton = document.getElementById("index-hero__prev-btn");
  const nextButton = document.getElementById("index-hero__next-btn");

  let startX = 0;
  let endX = 0;

  // Функция плавного скрытия и смены текста
  function updateText(index) {
    titleElement.style.opacity = 0;
    descriptionElement.style.opacity = 0;
    setTimeout(() => {
      titleElement.textContent = titles[index];
      descriptionElement.textContent = descriptions[index];
      titleElement.style.opacity = 1;
      descriptionElement.style.opacity = 1;
    }, 400); // Совпадает с моментом завершения смены изображения
  }

  // Обновляем ссылку на кнопку "Купить"
  function updateBuyLink(index) {
    buyButton.setAttribute("data-link", buyLinks[index]);
  }

  // Анимация с плавным переходом изображения
  function animateSlide(direction) {
    imgElement.style.transition = "transform 0.8s ease-in-out, opacity 0.4s ease-in-out";
    imgElement.style.transform = `translateX(${direction === 'next' ? '-100%' : '100%'})`; // Сдвиг картинки
    imgElement.style.opacity = 0; // Исчезновение картинки
  }

  // Обновляем изображение и синхронизируем с текстом
  function changeSlide(newIndex, direction) {
    if (newIndex >= images.length) newIndex = 0;
    if (newIndex < 0) newIndex = images.length - 1;

    animateSlide(direction); // Запуск анимации сдвига картинки

    setTimeout(() => {
      imgElement.src = images[newIndex]; // Меняем изображение
      imgElement.style.transition = "none"; // Отключаем анимацию для возврата
      imgElement.style.transform = `translateX(${direction === 'next' ? '100%' : '-100%'})`; // Меняем картинку за пределами видимости
      setTimeout(() => {
        imgElement.style.transition = "transform 0.8s ease-in-out, opacity 0.4s ease-in-out"; // Включаем анимацию
        imgElement.style.transform = "translateX(0)"; // Возвращаем картинку на место
        imgElement.style.opacity = 1; // Появление картинки
      }, 50); // Небольшая задержка перед возвращением картинки
      updateText(newIndex); // Обновляем текст одновременно
      updateBuyLink(newIndex); // Обновляем ссылку для кнопки
      currentIndex = newIndex;
      updatePositions(newIndex); // Обновляем позиции (кружки)
    }, 400); // Тайминг совпадает с окончанием исчезновения изображения
  }

  // Обновление активного индикатора (позиции)
  function updatePositions(index) {
    positionCircles.forEach((circle, idx) => {
      circle.classList.toggle("active", idx === index);
    });
  }

  // Обработчики для кнопок "предыдущий" и "следующий"
  prevButton.addEventListener("click", () => {
    changeSlide(currentIndex - 1, 'prev');
  });

  nextButton.addEventListener("click", () => {
    changeSlide(currentIndex + 1, 'next');
  });

  // Обработчик для клика по индикаторам (кружкам)
  positionCircles.forEach((circle, index) => {
    circle.addEventListener("click", () => {
      const direction = index > currentIndex ? 'next' : 'prev';
      changeSlide(index, direction);
    });
  });

  // Обработчик для свайпов
  imgElement.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX;
  });

  imgElement.addEventListener("touchmove", (event) => {
    endX = event.touches[0].clientX;
  });

  imgElement.addEventListener("touchend", () => {
    const threshold = 50; // Минимальное расстояние для регистрации свайпа
    if (startX - endX > threshold) {
      // Свайп влево
      changeSlide(currentIndex + 1, 'next');
    } else if (endX - startX > threshold) {
      // Свайп вправо
      changeSlide(currentIndex - 1, 'prev');
    }
  });

  // Инициализация первой картинки, контента и ссылки
  updateText(currentIndex);
  updateBuyLink(currentIndex);
  updatePositions(currentIndex);

  // Добавляем обработчик на кнопку "Купить"
  buyButton.addEventListener("click", () => {
    const link = buyButton.getAttribute("data-link");
    window.location.href = link; // Переход на нужную ссылку
  });
});

/* Главная странциа - reviews */

document.addEventListener('DOMContentLoaded', function() {
  const prevBtn = document.getElementById('index-reviews__prev-btn');
  const nextBtn = document.getElementById('index-reviews__next-btn');
  const circles = document.querySelectorAll('.index-reviews__content-positions__circle');
  const reviews = document.querySelector('.index-reviews__content-reviews');
  const cards = document.querySelectorAll('.index-reviews__content-reviews__card');

  let currentIndex = 0; // Начальный индекс
  let cardWidth = cards[0].offsetWidth; // Ширина карточки
  let cardMargin = parseFloat(getComputedStyle(cards[0]).marginRight); // Автоматическое определение отступа

  let startX = 0; // Начальная позиция касания
  let endX = 0; // Конечная позиция касания

  // Функция для обновления активной карточки
  function updateActiveCard(index) {
    cardWidth = cards[0].offsetWidth; // Обновляем ширину карточки каждый раз
    cardMargin = parseFloat(getComputedStyle(cards[0]).marginRight); // Автоматическое обновление отступа
    const offset = index * (cardWidth + cardMargin); // Смещение с учетом ширины и отступа

    reviews.style.transform = `translateX(-${offset}px)`; // Смещаем контейнер на нужное количество пикселей

    // Удаляем классы active у всех кружков и карточек
    circles.forEach(circle => circle.classList.remove('active'));
    cards.forEach(card => card.classList.remove('active'));

    // Добавляем класс active к нужной карточке и кружку
    circles[index].classList.add('active');
    cards[index].classList.add('active');
  }

  // Обработчики для кнопки "Следующая"
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length; // Переход к следующей карточке (циклично)
    updateActiveCard(currentIndex); // Обновляем позицию
  });

  // Обработчики для кнопки "Предыдущая"
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length; // Переход к предыдущей карточке (циклично)
    updateActiveCard(currentIndex); // Обновляем позицию
  });

  // Обработчики для кружков (индексации)
  circles.forEach((circle, index) => {
    circle.addEventListener('click', () => {
      currentIndex = index; // Устанавливаем текущий индекс нажатого кружочка
      updateActiveCard(currentIndex); // Обновляем позицию
    });
  });

  // Обработчики для свайпов
  reviews.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
  });

  reviews.addEventListener('touchmove', (event) => {
    endX = event.touches[0].clientX;
  });

  reviews.addEventListener('touchend', () => {
    const threshold = 50; // Минимальное расстояние для регистрации свайпа
    if (startX - endX > threshold) {
      // Свайп влево
      currentIndex = (currentIndex + 1) % cards.length;
      updateActiveCard(currentIndex);
    } else if (endX - startX > threshold) {
      // Свайп вправо
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      updateActiveCard(currentIndex);
    }
  });

  // Обновляем карточки при изменении размера окна
  window.addEventListener('resize', () => {
    updateActiveCard(currentIndex); // Пересчитываем смещение при изменении ширины окна
  });

  // Инициализация начального состояния
  updateActiveCard(currentIndex);
});


/* Главная странциа - stocks */

document.addEventListener('DOMContentLoaded', function() {
  // Находим элементы
  const prevBtn = document.getElementById('index-stocks__prev-btn');
  const nextBtn = document.getElementById('index-stocks__next-btn');
  const scrollContainer = document.querySelector('.index-stocks__content-cards');

  // Определяем ширину одного карточного блока и его правый отступ
  const card = document.querySelector('.index-stocks__content-cards__scroll');
  const cardStyle = getComputedStyle(card);
  const cardWidth = card.offsetWidth;
  const cardMarginRight = parseInt(cardStyle.marginRight);

  // Рассчитываем полный шаг прокрутки (ширина блока + правый отступ)
  const scrollStep = cardWidth + cardMarginRight;

  // Добавляем обработчик на кнопку "Следующий"
  nextBtn.addEventListener('click', () => {
      scrollContainer.scrollBy({
          left: scrollStep, // Прокручиваем на ширину карточки плюс отступ
          behavior: 'smooth' // Плавная прокрутка
      });
  });

  // Добавляем обработчик на кнопку "Предыдущий"
  prevBtn.addEventListener('click', () => {
      scrollContainer.scrollBy({
          left: -scrollStep, // Прокручиваем в обратную сторону
          behavior: 'smooth' // Плавная прокрутка
      });
  });
});

/* Главная странциа - stocks - mobile */

document.addEventListener('DOMContentLoaded', function() {
  const prevBtn = document.getElementById('index-stocks__prev-btn');
  const nextBtn = document.getElementById('index-stocks__next-btn');
  const scrollContainer = document.querySelector('.index-stocks__content-mobile-cards__scroll');
  const cards = document.querySelectorAll('.index-stocks__content-mobile-cards__scroll-card');
  const circles = document.querySelectorAll('.index-stocks__content-mobile-cards__positions-circle');

  let currentIndex = 0; // Текущий индекс
  let cardWidth = cards[0].offsetWidth; // Ширина одной карточки
  let cardMargin = parseFloat(getComputedStyle(cards[0]).marginRight); // Отступ между карточками

  let startX = 0; // Начальная позиция касания
  let endX = 0; // Конечная позиция касания

  // Функция для обновления видимой карточки и индикаторов
  function updateVisibleCard(index) {
    cardWidth = cards[0].offsetWidth; // Обновляем ширину карточки при каждом вызове
    cardMargin = parseFloat(getComputedStyle(cards[0]).marginRight); // Обновляем отступ

    const offset = index * (cardWidth + cardMargin); // Рассчитываем смещение
    scrollContainer.style.transform = `translateX(-${offset}px)`; // Смещаем контейнер с карточками

    // Обновляем активные кружки
    circles.forEach((circle, idx) => {
      circle.classList.toggle('active', idx === index); // Активируем кружок, соответствующий текущей карточке
    });
  }

  // Обработчик для кнопки "Следующая"
  nextBtn.addEventListener('click', () => {
    currentIndex = Math.min(currentIndex + 1, cards.length - 1); // Не превышаем количество карточек
    updateVisibleCard(currentIndex);
  });

  // Обработчик для кнопки "Предыдущая"
  prevBtn.addEventListener('click', () => {
    currentIndex = Math.max(currentIndex - 1, 0); // Не уходим за пределы первой карточки
    updateVisibleCard(currentIndex);
  });

  // Обработчики для свайпов
  scrollContainer.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX; // Фиксируем начальное касание
  });

  scrollContainer.addEventListener('touchmove', (event) => {
    endX = event.touches[0].clientX; // Отслеживаем движение пальца
  });

  scrollContainer.addEventListener('touchend', () => {
    const threshold = 50; // Минимальная дистанция для регистрации свайпа
    if (startX - endX > threshold) {
      // Свайп влево
      currentIndex = Math.min(currentIndex + 1, cards.length - 1); // Переход к следующей карточке
    } else if (endX - startX > threshold) {
      // Свайп вправо
      currentIndex = Math.max(currentIndex - 1, 0); // Переход к предыдущей карточке
    }
    updateVisibleCard(currentIndex); // Обновляем видимую карточку и индикаторы
  });

  // Добавляем обработчики для кружков, чтобы при нажатии происходил переход
  circles.forEach((circle, index) => {
    circle.addEventListener('click', () => {
      currentIndex = index; // Устанавливаем текущий индекс на нажатый кружок
      updateVisibleCard(currentIndex); // Обновляем видимую карточку и индикаторы
    });
  });

  // Обновляем размеры карточек при изменении окна
  window.addEventListener('resize', () => {
    updateVisibleCard(currentIndex); // Пересчитываем смещение карточек при изменении размера окна
  });

  // Инициализация начальной позиции
  updateVisibleCard(currentIndex);
});



/* Каталог - верхний скролл */

document.addEventListener("DOMContentLoaded", function () {
  const scrollContainer = document.querySelector('.catalog-content__scroll-content');
  const scrollContent = document.querySelector('.catalog-content__scroll-content__container');
  const prevButton = document.querySelector('.catalog-content__scroll-btn.prev');
  const nextButton = document.querySelector('.catalog-content__scroll-btn.next');
  const card = document.querySelector('.catalog-content__scroll-content__link');
  const progressBar = document.querySelector('.catalog-content__scroll-indicator__progress');

  // Рассчет ширины карточки с учетом отступов
  function getCardWidth() {
    const cardStyles = window.getComputedStyle(card);
    const cardWidth = card.offsetWidth;
    const cardMarginRight = parseInt(cardStyles.marginRight);
    return cardWidth + cardMarginRight;
  }

  // Обновление прогресс-бара в зависимости от прокрутки
  function updateProgressBar() {
    const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const scrollLeft = scrollContainer.scrollLeft;

    // Рассчет процента прокрутки
    const scrollPercentage = (scrollLeft / maxScrollLeft) * 100;

    // Устанавливаем ширину полоски в зависимости от прокрутки
    progressBar.style.width = `${scrollPercentage}%`;
  }

  // Плавный скролл по нажатию на кнопки
  nextButton.addEventListener('click', () => {
    scrollContainer.scrollBy({
      left: getCardWidth(),
      behavior: 'smooth'
    });
  });

  prevButton.addEventListener('click', () => {
    scrollContainer.scrollBy({
      left: -getCardWidth(),
      behavior: 'smooth'
    });
  });

  // Логика для свайпа
  let startX;
  let scrollLeft;

  scrollContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX;
    scrollLeft = scrollContainer.scrollLeft;
  });

  scrollContainer.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const moveX = touch.pageX - startX;

    scrollContainer.scrollLeft = scrollLeft - moveX;
  });

  // Обновление прогресс-бара при скролле
  scrollContainer.addEventListener('scroll', updateProgressBar);

  // Инициализация полосы при загрузке
  updateProgressBar();


});

/* Каталог - изменение цены */

document.addEventListener('DOMContentLoaded', function () {
  const minSlider = document.getElementById('minPriceSlider');
  const maxSlider = document.getElementById('maxPriceSlider');
  const minPriceInput = document.getElementById('minPriceInput');
  const maxPriceInput = document.getElementById('maxPriceInput');
  const sliderTrack = document.querySelector('.price-slider-track');
  const minGap = 10000; // Минимальный разрыв между значениями
  const minPrice = 50000; // Минимальная цена
  const maxPrice = 250000; // Максимальная цена

  // Функция обновления ползунков и полей ввода
  function updateSlider() {
      let minValue = parseInt(minSlider.value);
      let maxValue = parseInt(maxSlider.value);

      if (maxValue - minValue <= minGap) {
          if (this.id === "minPriceSlider") {
              minSlider.value = maxValue - minGap;
          } else {
              maxSlider.value = minValue + minGap;
          }
      }

      minPriceInput.value = minSlider.value;
      maxPriceInput.value = maxSlider.value;
      updateTrackFill();
  }

  // Функция обновления трека (заполненной части слайдера)
  function updateTrackFill() {
      const percentMin = ((minSlider.value - minPrice) / (maxPrice - minPrice)) * 100;
      const percentMax = ((maxSlider.value - minPrice) / (maxPrice - minPrice)) * 100;
      sliderTrack.style.left = percentMin + '%';
      sliderTrack.style.right = (100 - percentMax) + '%';
  }

  // Функция обновления слайдера при изменении значения в поле ввода
  function updateFromInput() {
      let minValue = parseInt(minPriceInput.value);
      let maxValue = parseInt(maxPriceInput.value);

      // Проверка и исправление значения минимальной цены
      if (minValue < minPrice) {
          minValue = minPrice;
      } else if (minValue > maxSlider.value - minGap) {
          minValue = maxSlider.value - minGap;
      }

      // Проверка и исправление значения максимальной цены
      if (maxValue > maxPrice) {
          maxValue = maxPrice;
      } else if (maxValue < minSlider.value + minGap) {
          maxValue = minSlider.value + minGap;
      }

      // Обновляем ползунки в зависимости от новых значений
      minSlider.value = minValue;
      maxSlider.value = maxValue;

      updateTrackFill(); // Обновляем визуальное отображение трека
  }

  // Обработка событий на ползунках
  minSlider.addEventListener('input', updateSlider);
  maxSlider.addEventListener('input', updateSlider);

  // Обработка событий на полях ввода
  minPriceInput.addEventListener('change', updateFromInput);
  maxPriceInput.addEventListener('change', updateFromInput);

  // Инициализация трека слайдера при загрузке
  updateTrackFill();
});

/* Каталог - фильтр */

document.addEventListener("DOMContentLoaded", function() {
  // Находим все нужные элементы
  const filterBlocks = document.querySelectorAll('.catalog-content__products-bottom__filter-block');

  filterBlocks.forEach(filterBlock => {
    const topBlock = filterBlock.querySelector('.catalog-content__products-bottom__filter-block__top');
    const checkboxGroup = filterBlock.querySelector('.catalog-content__products-bottom__filter-block__ui-checkbox-group');
    const toggleButton = filterBlock.querySelector('.catalog-content__products-bottom__filter-block button');
    const checkboxes = checkboxGroup.getElementsByTagName('label');

    // Изначально устанавливаем высоту блока как высота topBlock
    filterBlock.style.height = `${topBlock.offsetHeight}px`;

    let isExpanded = false;
    let isFilterActive = false;
    let initialHeight = 0;

    // Функция для вычисления высоты первых N элементов
    function calculateHeightForFirstNItems(n) {
      let totalHeight = 0;
      for (let i = 0; i < n && i < checkboxes.length; i++) {
        totalHeight += checkboxes[i].offsetHeight;
      }
      return totalHeight;
    }

    // Функция для переключения высоты checkboxGroup
    function toggleCheckboxGroupHeight() {
      if (isExpanded) {
        // Свернуть до начальной высоты (первые 5 элементов)
        checkboxGroup.style.height = `${initialHeight}px`;
        toggleButton.textContent = 'Показать ещё';
      } else {
        // Развернуть до полной высоты всех элементов
        checkboxGroup.style.height = 'auto';
        toggleButton.textContent = 'Показать меньше';
      }
      isExpanded = !isExpanded;
      adjustFilterBlockHeight();
    }

    // Функция для изменения высоты всего filterBlock при изменении checkboxGroup
    function adjustFilterBlockHeight() {
      const totalHeight = topBlock.offsetHeight + checkboxGroup.offsetHeight + toggleButton.offsetHeight;
      filterBlock.style.height = `${totalHeight}px`;
    }

    // Изначально вычисляем высоту для первых 5 элементов и устанавливаем её
    initialHeight = calculateHeightForFirstNItems(5);
    checkboxGroup.style.height = `${initialHeight}px`;
    checkboxGroup.style.overflow = 'hidden';

    // Добавляем обработчик события клика на кнопку toggleButton
    toggleButton.addEventListener('click', toggleCheckboxGroupHeight);

    // Добавляем обработчик события клика на topBlock для раскрытия/скрытия блока
    topBlock.addEventListener('click', function() {
      if (!isFilterActive) {
        // Если блок не активен, увеличиваем его высоту
        adjustFilterBlockHeight();
        filterBlock.classList.add('active');
      } else {
        // Если блок уже активен, сворачиваем его до высоты topBlock
        filterBlock.style.height = `${topBlock.offsetHeight}px`;
        filterBlock.classList.remove('active');
      }
      isFilterActive = !isFilterActive;
    });
  });
});

/* Каталог - смена расположения карточек в списке */

document.addEventListener("DOMContentLoaded", function () {
  const change1Button = document.getElementById('change1');
    const change2Button = document.getElementById('change2');
    const lists = document.querySelectorAll('.catalog-content__products-bottom__cards-content__list');
    const container = document.querySelector('.catalog-content__products-bottom__cards-content');

    // Функция для обновления высоты контейнера в зависимости от блока с классом active
    function updateContainerHeight() {
      let activeList = null;

      // Ищем элемент с классом active
      lists.forEach(list => {
        if (list.classList.contains('active')) {
          activeList = list;
        }
      });

      // Если найден элемент с классом active, изменяем высоту контейнера
      if (activeList) {
        container.style.height = activeList.offsetHeight + 'px';
      } else {
        // Если нет активного элемента, сбрасываем высоту контейнера
        container.style.height = 'auto';
      }
    }

    // Клик по кнопке change1
    change1Button.addEventListener('click', () => {
      // Убираем класс change у всех списков
      lists.forEach(list => {
        list.classList.remove('change');
      });

      // Переключаем классы active на кнопках
      change1Button.classList.add('active');
      change2Button.classList.remove('active');

      // Обновляем высоту контейнера
      updateContainerHeight();
    });

    // Клик по кнопке change2
    change2Button.addEventListener('click', () => {
      // Добавляем класс change всем спискам
      lists.forEach(list => {
        list.classList.add('change');
      });

      // Переключаем классы active на кнопках
      change2Button.classList.add('active');
      change1Button.classList.remove('active');

      // Обновляем высоту контейнера
      updateContainerHeight();
    });

    // Инициализируем высоту контейнера при загрузке
    updateContainerHeight();
});


document.addEventListener("DOMContentLoaded", function () {
  const listBlocks = document.querySelectorAll(".catalog-content__products-bottom__cards-content__list");
  const pageButtons = document.querySelectorAll(".catalog-content__products-bottom__cards-pages__number");
  const prevButton = document.querySelector(".catalog-content__products-bottom__cards-pages__btn.prev");
  const nextButton = document.querySelector(".catalog-content__products-bottom__cards-pages__btn.next");
  const cardsContainer = document.querySelector(".catalog-content__products-bottom__cards-content");
  const maxVisiblePages = 4;
  let currentPage = 0;

  // Обновляем высоту родительского контейнера
  function updateContainerHeight() {
    const activeList = document.querySelector(".catalog-content__products-bottom__cards-content__list.active");
    cardsContainer.style.height = `${activeList.scrollHeight}px`;
  }

  // Обновляем видимые страницы (показываем максимум 4)
  function updateVisiblePages() {
    const totalPages = pageButtons.length;

    // Показываем только 4 страницы
    pageButtons.forEach((btn, index) => {
      btn.style.display = (index >= currentPage && index < currentPage + maxVisiblePages) ? "inline-block" : "none";
    });
  }

  // Активируем определённую страницу
  function activatePage(pageIndex) {
    // Убираем активный класс у всех блоков
    listBlocks.forEach((list) => list.classList.remove("active"));
    pageButtons.forEach((btn) => btn.classList.remove("active"));

    // Добавляем активный класс для выбранного блока и кнопки
    listBlocks[pageIndex].classList.add("active");
    pageButtons[pageIndex].classList.add("active");

    // Обновляем высоту контейнера
    updateContainerHeight();

    // Обновляем видимость страниц
    updateVisiblePages();
  }

  // Слушатели для кнопок страниц
  pageButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      currentPage = Math.min(index, pageButtons.length - maxVisiblePages);
      activatePage(index);
    });
  });

  // Слушатель для кнопки "Предыдущая"
  prevButton.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      activatePage(currentPage);
    }
  });

  // Слушатель для кнопки "Следующая"
  nextButton.addEventListener("click", () => {
    if (currentPage < pageButtons.length - 1) {
      currentPage++;
      activatePage(currentPage);
    }
  });

  // Инициализация
  activatePage(0);
});

/* Каталог - открытие фильтра в мобильной версии */

document.addEventListener("DOMContentLoaded", function () {
    // Получаем элементы кнопок и блока
  const filterButton = document.getElementById('catalog-products-mobile-filter');
  const closeButton = document.getElementById('catalog-filter-closed');
  const filterBlock = document.querySelector('.catalog-content__products-bottom__filter');

  // Обработчик нажатия на кнопку "Фильтр"
  filterButton.addEventListener('click', () => {
    filterBlock.classList.add('active');
  });

  // Обработчик нажатия на кнопку "Закрыть"
  closeButton.addEventListener('click', () => {
    filterBlock.classList.remove('active');
  });

});

/* Карточка товара - прибавление значения */

document.addEventListener("DOMContentLoaded", function () {
  let valueElement = document.getElementById('value');
  let currentValue = 1;

  document.getElementById('increase').addEventListener('click', () => {
      currentValue++;
      valueElement.innerText = currentValue;
  });

  document.getElementById('decrease').addEventListener('click', () => {
      currentValue--;
      valueElement.innerText = currentValue;
  });

});

/* Карточка товара - скролл изображений и перенос изображений для просмотра */

document.addEventListener("DOMContentLoaded", function () {
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const scrollContainer = document.querySelector('.productCard-hero__content-images__container-scroll');
  const imageButtons = document.querySelectorAll('.productCard-hero__content-images__container-scroll button');
  const mainImageContainer = document.querySelector('.productCard-hero__content-images__img-container img');

  let scrollAmount = 0;
  const scrollStep = 100; // количество пикселей для скролла

  // Установка первого изображения как активного при загрузке страницы
  const firstImageSrc = imageButtons[0].querySelector('img').src;
  mainImageContainer.src = firstImageSrc;
  imageButtons[0].classList.add('active');

  // Автоматическое определение ширины и отступа кнопок
  function setButtonStyles() {
    const totalButtons = imageButtons.length;
    const containerWidth = scrollContainer.offsetWidth;
    const buttonWidth = Math.floor(containerWidth / totalButtons) - 10; // Ширина кнопки
    const marginRight = 10; // Отступ между кнопками

    imageButtons.forEach(button => {
      button.style.width = `${buttonWidth}px`;
      button.style.marginRight = `${marginRight}px`;
    });
  }

  // Вызов функции установки ширины и отступов при загрузке страницы
  setButtonStyles();

  // Функция скроллинга
  function scrollContent(direction) {
    if (direction === 'next') {
      scrollAmount += scrollStep;
    } else {
      scrollAmount -= scrollStep;
    }
    scrollContainer.scroll({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }

  // Привязка кнопок для скролла
  nextButton.addEventListener('click', () => scrollContent('next'));
  prevButton.addEventListener('click', () => scrollContent('prev'));

  // Обновление главного изображения и активация кнопки
  imageButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Убираем класс active у всех кнопок
      imageButtons.forEach(btn => btn.classList.remove('active'));

      // Устанавливаем выбранное изображение как основное
      const newSrc = this.querySelector('img').src;
      mainImageContainer.src = newSrc;

      // Добавляем класс active к нажатой кнопке
      this.classList.add('active');
    });
  });

  // Функция для отслеживания свайпов
  let isDown = false;
  let startX;
  let scrollLeft;

  // Обработка начала свайпа
  scrollContainer.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
  });

  // Обработка окончания свайпа
  scrollContainer.addEventListener('touchend', () => {
    isDown = false;
  });

  // Обработка движения пальца
  scrollContainer.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.touches[0].pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 2; // Ускорение скролла
    scrollContainer.scrollLeft = scrollLeft - walk;
  });

  // Пересчет размеров кнопок при изменении размера окна
  window.addEventListener('resize', setButtonStyles);
});

/* Карточка товара - изменение цвета */

document.addEventListener("DOMContentLoaded", function () {
    // Получаем все кнопки и блоки изображений
  const colorButtons = document.querySelectorAll('.productCard-hero__content-specifications__block-colors button');
  const imageBlocks = document.querySelectorAll('.productCard-hero__content-images__container-scroll__block');

  // Функция для удаления класса active у всех элементов
  function removeActiveClass(elements) {
    elements.forEach(element => {
      element.classList.remove('active');
    });
  }

  // Добавляем обработчики событий для каждой кнопки
  colorButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // Убираем класс active у всех кнопок и блоков изображений
      removeActiveClass(colorButtons);
      removeActiveClass(imageBlocks);

      // Добавляем класс active выбранной кнопке и соответствующему блоку изображений
      button.classList.add('active');
      imageBlocks[index].classList.add('active');
    });
  });

});

/* Карточка товара - переключение активного окна  */

document.addEventListener("DOMContentLoaded", function () {
  // Находим все кнопки и блоки
  const buttons = document.querySelectorAll('.productCard-information__btns button');
  const contentBlocks = document.querySelectorAll('.productCard-information__content-block');

  // Функция для переключения классов active
  function toggleActiveClass(targetId) {
    // Убираем класс active у всех кнопок и блоков
    buttons.forEach(button => button.classList.remove('active'));
    contentBlocks.forEach(block => block.classList.remove('active'));

    // Добавляем класс active выбранной кнопке
    const activeButton = document.getElementById(targetId);
    activeButton.classList.add('active');

    // Добавляем класс active соответствующему блоку
    const activeBlock = document.querySelector(`.productCard-information__content-block[data-target="${targetId}"]`);
    activeBlock.classList.add('active');
  }

  // Назначаем обработчик событий для каждой кнопки
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      toggleActiveClass(button.id);
    });
  });

});





/* СТраница Рассрочка */

document.addEventListener('DOMContentLoaded', function () {
  const devices = document.querySelectorAll('.installmentPlan-hero__content-devices__selector-device');
  const movingLine = document.getElementById('moving-line');
  const formsContainer = document.querySelector('.installmentPlan-hero__content-devices__forms');
  const contents = document.querySelectorAll('.installmentPlan-hero__content-devices__forms-form');

  // Функция для установки динамической высоты контейнера
  function updateContainerHeight(activeContent) {
      const contentHeight = activeContent.offsetHeight; // Получаем высоту активного блока
      formsContainer.style.height = `${contentHeight}px`; // Устанавливаем высоту контейнера
  }

  devices.forEach((device, index) => {
      device.addEventListener('click', () => {
          // Удаляем активный класс у всех устройств
          devices.forEach(d => d.classList.remove('active'));
          // Добавляем активный класс к нажатому устройству
          device.classList.add('active');

          // Перемещаем внутреннюю линию
          movingLine.style.left = `${index * 25}%`; // Перемещение в процентах

          // Отображаем соответствующий контент
          contents.forEach(content => content.classList.remove('active'));
          const targetContent = document.getElementById(device.getAttribute('data-target'));
          targetContent.classList.add('active');

          // Обновляем высоту контейнера
          updateContainerHeight(targetContent);
      });
  });

  // Устанавливаем начальную высоту контейнера
  const initialActiveContent = document.querySelector('.installmentPlan-hero__content-devices__forms-form.active');
  if (initialActiveContent) {
      updateContainerHeight(initialActiveContent);
  }
});

/* Секция - частые вопросы */

document.querySelectorAll('.questions__content-faq__item-header').forEach(header => {
  header.addEventListener('click', () => {
      const faqItem = header.parentElement;

      // Закрыть все остальные блоки
      document.querySelectorAll('.questions__content-faq__item').forEach(item => {
          if (item !== faqItem) {
              item.classList.remove('active');
          }
      });

      // Переключить активное состояние для текущего блока
      faqItem.classList.toggle('active');
  });
});

/* Страница расрочка - форма */

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('installmentForm');
  const nameInput = document.getElementById('installmentPlan__pop-app__name');
  const phoneInput = document.getElementById('installmentPlan__pop-app__tel');
  const checkbox = document.getElementById('checkbox');

  // Устанавливаем +7 автоматически при фокусе на поле телефона
  phoneInput.addEventListener('focus', function () {
      if (!phoneInput.value) {
          phoneInput.value = '+7';
      }
  });

  // Блокируем ввод любых символов кроме цифр после +7
  phoneInput.addEventListener('input', function () {
      let numbersOnly = phoneInput.value.replace(/[^\d]/g, '');  // Удаляем все, кроме цифр

      if (!numbersOnly.startsWith('7')) {
          numbersOnly = '7' + numbersOnly.substring(1);
      }

      // Ограничиваем количество символов до 11 (1 символ 7 + 10 цифр)
      if (numbersOnly.length > 11) {
          numbersOnly = numbersOnly.substring(0, 11);
      }

      phoneInput.value = '+7' + numbersOnly.substring(1);  // Возвращаем значение с форматом +7
  });

  // Валидация формы перед отправкой
  form.addEventListener('submit', function (event) {
      let isValid = true;

      // Проверка имени: поле не должно быть пустым и не должно содержать цифры
      const nameRegex = /^[А-Яа-яЁёA-Za-z\s]+$/;  // Регулярное выражение для проверки только букв и пробелов
      if (nameInput.value.trim() === '' || !nameRegex.test(nameInput.value)) {
          nameInput.classList.add('error');  // Добавляем красный бордер
          isValid = false;
      } else {
          nameInput.classList.remove('error');
      }

      // Проверка телефона: точно 12 символов (+7 и 10 цифр)
      const phoneRegex = /^\+7\d{10}$/;
      if (!phoneRegex.test(phoneInput.value)) {
          phoneInput.classList.add('error');  // Добавляем красный бордер
          isValid = false;
      } else {
          phoneInput.classList.remove('error');
      }

      // Если есть ошибки, отменяем отправку формы
      if (!isValid) {
          event.preventDefault();  // Отменяем отправку
      }
  });
});





