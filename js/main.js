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
