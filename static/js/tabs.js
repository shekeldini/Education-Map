function createTabHeaderItem(i, active){
    let tabheader_item = document.createElement('div');
    if (i === active){
        tabheader_item.className = "tabheader-item tabheader-item__active";
    }
    else{
        tabheader_item.className = "tabheader-item";
    }

    let tabheader_item__icon = document.createElement('svg');
    tabheader_item__icon.className = "tabheader-item__icon";

    tabheader_item.appendChild(tabheader_item__icon);

    return tabheader_item;
}
function create_base_info(base_info, active){
    let tabContent = document.createElement('div')
    tabContent.className = "tabcontent"
    if (active != 0){
        tabContent.hidden = true
    }

    let tabcontent_oo = document.createElement('div');
    tabcontent_oo.className = "tabcontent-oo";
    let tabcontent_oo__title = document.createElement('div');
    tabcontent_oo__title.className = "tabcontent-oo__title";
    tabcontent_oo__title.innerHTML += base_info.oo_name;
    let tabcontent_oo__descr = document.createElement('div');
    tabcontent_oo__descr.className = "tabcontent-oo__descr";
    tabcontent_oo__descr.innerHTML += base_info.district_name;

    let tabcontent_address = document.createElement('div');
    tabcontent_address.className = "tabcontent-address";
    let tabcontent_address__title = document.createElement('div');
    tabcontent_address__title.className = "tabcontent-address__title";
    tabcontent_address__title.innerHTML = 'Адрес';
    let tabcontent_address__descr = document.createElement('div');
    tabcontent_address__descr.className = "tabcontent-address__descr";
    tabcontent_address__descr.innerHTML += base_info.oo_address;

    let tabcontent_director = document.createElement('div');
    tabcontent_director.className ="tabcontent-director";
    let tabcontent_director__title = document.createElement('div');
    tabcontent_director__title.className = "tabcontent-director__title";
    tabcontent_director__title.innerHTML = 'Директор';
    let tabcontent_director__descr = document.createElement('div');
    tabcontent_director__descr.className = "tabcontent-director__descr";
    tabcontent_director__descr.innerHTML += base_info.director;

    let tabcontent_mail = document.createElement('div');
    tabcontent_mail.className = "tabcontent-mail";
    let tabcontent_mail__title = document.createElement('div');
    tabcontent_mail__title.className = "tabcontent-mail__title";
    tabcontent_mail__title.innerHTML = "Почта";
    let tabcontent_mail__descr = document.createElement('a');
    tabcontent_mail__descr.className = "tabcontent-mail__descr";
    tabcontent_mail__descr.href = base_info.email_oo;
    tabcontent_mail__descr.innerHTML = base_info.email_oo;

    let tabcontent_phone = document.createElement('div');
    tabcontent_phone.className= "tabcontent-phone";
    let tabcontent_phone__title = document.createElement('div');
    tabcontent_phone__title.className = "tabcontent-phone__title";
    tabcontent_phone__title.innerHTML = "Телефон";
    let tabcontent_phone__descr = document.createElement('a');
    tabcontent_phone__descr.className ="tabcontent-phone__descr";
    tabcontent_phone__descr.href = base_info.phone_number;
    tabcontent_phone__descr.innerHTML = base_info.phone_number;

    let tabcontent_site = document.createElement('div');
    tabcontent_site.className = "tabcontent-site";
    let tabcontent_site__title = document.createElement('div');
    tabcontent_site__title.className = "tabcontent-site__title";
    tabcontent_site__title.innerHTML = "Сайт";
    let tabcontent_site__desrc = document.createElement('a');
    tabcontent_site__desrc.className = "tabcontent-site__desrc";
    tabcontent_site__desrc.href = base_info.url;
    tabcontent_site__desrc.innerHTML = base_info.url;


    tabcontent_oo.appendChild(tabcontent_oo__title);
    tabcontent_oo.appendChild(tabcontent_oo__descr);
    tabcontent_address.appendChild(tabcontent_address__title);
    tabcontent_address.appendChild(tabcontent_address__descr);

    tabcontent_director.appendChild(tabcontent_director__title);
    tabcontent_director.appendChild(tabcontent_director__descr);
    tabcontent_mail.appendChild(tabcontent_mail__title);
    tabcontent_mail.appendChild(tabcontent_mail__descr);
    tabcontent_phone.appendChild(tabcontent_phone__title);
    tabcontent_phone.appendChild(tabcontent_phone__descr);
    tabcontent_site.appendChild(tabcontent_site__title);
    tabcontent_site.appendChild(tabcontent_site__desrc);

    tabContent.appendChild(tabcontent_oo);
    tabContent.appendChild(tabcontent_address);
    tabContent.appendChild(tabcontent_director);
    tabContent.appendChild(tabcontent_mail);
    tabContent.appendChild(tabcontent_phone);
    tabContent.appendChild(tabcontent_site);
    return tabContent;
}

function create_digital_info(digital, active) {
    let tabContent = document.createElement('div')
    tabContent.className = "tabcontent"
    if (active != 1){
        tabContent.hidden = true
    }

    let sreda_wrapper = document.createElement('div');
    sreda_wrapper.className ="sreda-wrapper";

    let sreda_wrapper__district = document.createElement('div');
    sreda_wrapper__district.className = "sreda-wrapper__district";
    let sreda_wrapper__district_title = document.createElement('div');
    sreda_wrapper__district_title.className = "sreda-wrapper__district-title";
    sreda_wrapper__district_title.innerHTML = 'Наименование района';
    let sreda_wrapper__district_descr = document.createElement('div');
    sreda_wrapper__district_descr.className = "sreda-wrapper__district-descr";
    sreda_wrapper__district_descr.innerHTML += digital.district_name;

    let sreda_wrapper__oo = document.createElement('div');
    sreda_wrapper__oo.className  = "sreda-wrapper__oo";
    let sreda_wrapper__oo_title = document.createElement('div');
    sreda_wrapper__oo_title.className = "sreda-wrapper__oo-title";
    sreda_wrapper__oo_title.innerHTML = 'Наименование ОО';
    let sreda_wrapper__oo_descr = document.createElement('div');
    sreda_wrapper__oo_descr.className = "sreda-wrapper__oo-descr";
    sreda_wrapper__oo_descr.innerHTML += digital.oo_name;

    let sreda_wrapper__ul = document.createElement('ul');
    sreda_wrapper__ul.className =  "sreda-wrapper__ul";

    let arr_keys = {
        notebook: "Ноутбуков <span>(шт.)</span>: ",
        i_panel: "Интерактивных панелей <span>(шт.)</span>: ",
        mfu: "МФУ <span>(шт.)</span>: ",
        smart_tv: "Smart TV <span>(шт.)</span>: ",
        ip_camera: "IP камер <span>(шт.)</span>: ",
        ik: "Интерактивных комплексов <span>(шт.)</span>: ",
        arm_ped: "АРМ педагогов <span>(шт.)</span>: ",
        arm_adm: "АРМ административных <span>(шт.)</span>: ",
        server: "Серверов <span>(шт.)</span>: "

    }
    let sreda_wrapper__ul_last = document.createElement('ul');
    sreda_wrapper__ul_last.className = "sreda_wrapper__ul-last";
    let osnash = digital.osnash ? "Да" : "Нет"
    sreda_wrapper__ul_last.innerHTML = '<span>Оснащенность ОО ИТ-инфраструктурой</span>, в том числе беспроводными сетями, в рамках ГП "Информационное общество": '
     + '<span>' + osnash + '</span>';

    if (digital.cos2022) {
        sreda_wrapper__ul.innerHTML = 'Информация о поступлении оборудования в 2022 году будет доступна позже';
    }
    else{
        sreda_wrapper__ul.innerHTML = 'Количество поступившего оборудования:'
        for (const [key, value] of Object.entries(arr_keys)){
            if (digital[key]){
                let sreda_wrapper__ul_li = document.createElement('li')
                sreda_wrapper__ul_li.className = "sreda_wrapper__ul-li"
                sreda_wrapper__ul_li.innerHTML += arr_keys[key] + digital[key];

                sreda_wrapper__ul.appendChild(sreda_wrapper__ul_li);
            };
        };
    };
    sreda_wrapper__district.appendChild(sreda_wrapper__district_title);
    sreda_wrapper__district.appendChild(sreda_wrapper__district_descr);

    sreda_wrapper__oo.appendChild(sreda_wrapper__oo_title);
    sreda_wrapper__oo.appendChild(sreda_wrapper__oo_descr);

    //sreda_wrapper.appendChild(sreda_wrapper__district);
    sreda_wrapper.appendChild(sreda_wrapper__oo);
    sreda_wrapper.appendChild(sreda_wrapper__district);
    sreda_wrapper.appendChild(sreda_wrapper__ul);
    sreda_wrapper.appendChild(sreda_wrapper__ul_last);

    tabContent.appendChild(sreda_wrapper);
    return tabContent
}

function hideTabContent(tabsContent, tabs){
    tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
        item.classList.remove('tabheader-item__active');
    });
}

function showTabContent(tabsContent, tabs, i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader-item__active');
}


function create_text_error(text, active){
    let tabContent = document.createElement('div')
    tabContent.className = "tabcontent"
    tabContent.hidden = true

    let sreda_wrapper = document.createElement('div');
    sreda_wrapper.className ="sreda-wrapper";

    let sreda_wrapper__district = document.createElement('div');
    sreda_wrapper__district.className = "sreda-wrapper__district";
    let sreda_wrapper__district_title = document.createElement('div');
    sreda_wrapper__district_title.className = "sreda-wrapper__district-title-error";
    sreda_wrapper__district_title.innerHTML = text;

    sreda_wrapper__district.appendChild(sreda_wrapper__district_title);

    sreda_wrapper.appendChild(sreda_wrapper__district);

    tabContent.appendChild(sreda_wrapper);
    return tabContent
}

function decorator(func, active){
    function wrapper(text){
        let result  = func(text)
        result.hidden = !active
        return result
    };
    return wrapper
};


function create_text_error(text){
    let tabContent = document.createElement('div')
    tabContent.className = "tabcontent"

    let sreda_wrapper = document.createElement('div');
    sreda_wrapper.className ="sreda-wrapper";

    let sreda_wrapper__district = document.createElement('div');
    sreda_wrapper__district.className = "sreda-wrapper__district";
    let sreda_wrapper__district_title = document.createElement('div');
    sreda_wrapper__district_title.className = "sreda-wrapper__district-title-error";
    sreda_wrapper__district_title.innerHTML = text;

    sreda_wrapper__district.appendChild(sreda_wrapper__district_title);

    sreda_wrapper.appendChild(sreda_wrapper__district);

    tabContent.appendChild(sreda_wrapper);
    return tabContent
}

function create_text(data, active){

    let tabContainer = document.createElement('div')
    tabContainer.className = "tabcontainer"

    let tabHeader = document.createElement('div')
    tabHeader.className = "tabheader"


    for (let i = 0; i < 5; i++){
        tabHeader.appendChild(createTabHeaderItem(i, active));
    }

    tabContainer.appendChild(tabHeader)

    let tabs_active = {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
    }
    tabs_active[active] = true
    console.log(tabs_active)
    // base_info
    tabContainer.appendChild(create_base_info(data.base_info, active));
    // digital
    if (data.digital) {
        tabContainer.appendChild(create_digital_info(data.digital, active));
    }
    else{
        tabContainer.appendChild(decorator(create_text_error, tabs_active[1])("Образовательная организация не получила оборудование в рамках Федерального проекта «Цифровая образовательная среда»"))
    };
    // ege
    tabContainer.appendChild(decorator(create_text_error, tabs_active[2])("В разработке"));
    // vpr
    tabContainer.appendChild(decorator(create_text_error, tabs_active[3])("В разработке"));
    // growing_point
    tabContainer.appendChild(decorator(create_text_error, tabs_active[4])("Образовательная организация учавствует в программе Центров образования  цифрового и гуманитарного профиля «Точка роста» "));

    let tabsContent = tabContainer.querySelectorAll('.tabcontent');
    let tabs = tabHeader.querySelectorAll('.tabheader-item');
    tabHeader.addEventListener('click', (event) => { //Вещаем событие(а также дилегирование) на табы
        let target = event.target; //Создаем переменную target, в которую помещаем event.target чтобы потом сочетание event.target прописывать часто, заменяя его просто target
        if (target && (target.classList.contains('tabheader-item') || target.classList.contains('tabheader-item__icon'))) {
            if (target.classList.contains('tabheader-item__icon')){
                target = target.parentNode
            };
            tabs.forEach((item, i) => { //В качестве второго аргумента(i) у forEach используется номер перебираемого элемента по порядку, аргумент item сам элемент
                if (target == item) { //Если элемент(target) в который мы кликнули будет совпадать с элементом, который мы перебираем в цикле forEach, то мы вызываем функции
                    hideTabContent(tabsContent, tabs); //2 функции нужны для того, чтобы скрывать остальные элементы
                    showTabContent(tabsContent, tabs, i); //i номер элемента в условии, в котором мы перебираем элементы
                }
            });
        }

    });
    return tabContainer
}
