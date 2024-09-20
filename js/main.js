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

document.addEventListener('DOMContentLoaded', function () {
  const devices = document.querySelectorAll('.installmentPlan-hero__trade-devices__selector-device');
  const movingLine = document.getElementById('trade-moving-line');
  const formsContainer = document.querySelector('.installmentPlan-hero__trade-devices__forms');
  const contents = document.querySelectorAll('.installmentPlan-hero__trade-devices__forms-form');

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
          movingLine.style.left = `${index * 50}%`; // Перемещение в процентах

          // Отображаем соответствующий контент
          contents.forEach(content => content.classList.remove('active'));
          const targetContent = document.getElementById(device.getAttribute('data-target'));
          targetContent.classList.add('active');

          // Обновляем высоту контейнера
          updateContainerHeight(targetContent);
      });
  });

  // Устанавливаем начальную высоту контейнера
  const initialActiveContent = document.querySelector('.installmentPlan-hero__trade-devices__forms-form.active');
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
