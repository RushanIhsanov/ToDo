let form = document.querySelector('#addForm');
let itemsList = document.querySelector('#items');

// 1. Добавление новой задачи прослушка события
form.addEventListener('submit', addItem);

// 1.1 Добавление новой задачи функция
function addItem(event) {
    //отменяем отправку формы
    event.preventDefault();

    //Находим инпут с текстом для новой задачи
    let newItemInput = document.querySelector('#newItemText');

    //Получаем текст из инпута
    let newItemText = newItemInput.value;

    //Создаем элемент для новой задачи
    //Используем метод createElement(tagName)
    let newElement = document.createElement('li');

    // Задаем класс нашему новому элементу li с помощью метода className
    newElement.className = 'list-group-item';

    // Добавляем текст в новый элемент с помощью метода
    // document.createTextNode();

    let newTextNode = document.createTextNode(newItemText);

    // Добавляем наш новый текст в элемент li
    // Используем метод: можно appendChild, node.prepend, inserAdjasmentElement

    newElement.appendChild(newTextNode);

    // Создаем кнопку
    let deleteBtn = document.createElement('button');
    //Добавляем текстовую ноду в кнопку.
    deleteBtn.appendChild(document.createTextNode('Удалить'));
    //Добавляем CSS класс в кнопку
    deleteBtn.className = 'btn btn-light btn-sm float-right';
    //Добавляем дата атрибут c помощью метода (универсального)
    // elem.setAttribute(name,value)
    deleteBtn.dataset.action = 'delete';
    // Помещаем кнопку в созданный тег li
    newElement.appendChild(deleteBtn);

    // Добавляем созданный виртуальный li в список на страницу
    // сначала находим сам список
    itemsList.prepend(newElement);

    // Очистим текст в инпуте после добавления задачи

    newItemInput.value = '';
}

// 2. Удаление элемента из списка

itemsList.addEventListener('click', removeItem);

function removeItem(event) {
    // console.log(event.target); // Слушаем событие по клику в каком месте был совершен клик

    if (event.target.hasAttribute('data-action') && event.target.getAttribute('data-action') == 'delete') {
        if (confirm('Удалить задачу?')) {
            event.target.parentNode.remove(); // удаляем родительский элемент в котором лежит кликнутая кнопка, используем метод parentNode
        }
    }
}

// 3 Фильтрация

// Находим инпут "Поиск по списку"

let filter = document.querySelector('#filter');
// Прослушка ввода
filter.addEventListener('keyup', filterItems);

// функция для фильтрации списка
function filterItems(event) {
    // получили значение в инпуте через event.target и переводим в нижний регистр
    let searchedText = event.target.value.toLowerCase();

    // 1. Получаем список всех задач
    let items = itemsList.querySelectorAll('li');
    // 2. Перебираем циклом все теги li с задачами
    items.forEach(function (item) {
        // получили текстовую ноду задачи, firstChild т.к исключили текст кнопки "Удалить"
        let itemText = item.firstChild.textContent.toLocaleLowerCase();
        // Проверяем вхождение искомой подстроки в текст задачи
        if (itemText.indexOf(searchedText) != -1) {
            // если вхождение есть, то показываем эл.
            item.style.display = 'block';
            // если эл нет, скрываем
        } else {
            item.style.display = 'none';
        }
    });
}
