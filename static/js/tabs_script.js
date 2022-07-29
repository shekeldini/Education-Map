"use strict";

window.addEventListener('DOMContentLoaded', () => {





    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => { //Вещаем событие(а также дилегирование) на табы
        const target = event.target; //Создаем переменную target, в которую помещаем event.target чтобы потом сочетание event.target прописывать часто, заменяя его просто target

        if (target && target.classList.contains('tabheader-item')) {
            tabs.forEach((item, i) => { //В качестве второго аргумента(i) у forEach используется номер перебираемого элемента по порядку, аргумент item сам элемент
                if (target == item) { //Если элемент(target) в который мы кликнули будет совпадать с элементом, который мы перебираем в цикле forEach, то мы вызываем функции
                    hideTabContent(); //2 функции нужны для того, чтобы скрывать остальные элементы
                    showTabContent(i); //i номер элемента в условии, в котором мы перебираем элементы
                }
            });
        }

    });
})
