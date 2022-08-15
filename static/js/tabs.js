const zip = (a, b) => a.map((k, i) => [k, b[i]]);

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

    tabContent.hidden = !active

    let tabcontent_oo = document.createElement('div');
    tabcontent_oo.className = "tabcontent-oo";
    let tabcontent_oo__title = document.createElement('div');
    tabcontent_oo__title.className = "tabcontent-oo__title";
    if (base_info.oo_name){
        tabcontent_oo__title.innerHTML += base_info.oo_name;
    }
    else{
        tabcontent_oo__title.innerHTML += base_info.name;
    };

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

    if (base_info.oo_address){
        tabcontent_address__descr.innerHTML += base_info.oo_address;
    }
    else{
        tabcontent_address__descr.innerHTML += base_info.address;
    }

    let tabcontent_director = document.createElement('div');
    tabcontent_director.className ="tabcontent-director";
    let tabcontent_director__title = document.createElement('div');
    tabcontent_director__title.className = "tabcontent-director__title";

    let tabcontent_director__descr = document.createElement('div');
    tabcontent_director__descr.className = "tabcontent-director__descr";

    if (base_info.director){
        tabcontent_director__title.innerHTML = 'Директор';
        tabcontent_director__descr.innerHTML += base_info.director;
    }
    else{
        tabcontent_director__title.innerHTML = 'Руководитель комитета';
        tabcontent_director__descr.innerHTML += base_info.executive;
    }


    let tabcontent_mail = document.createElement('div');
    tabcontent_mail.className = "tabcontent-mail";
    let tabcontent_mail__title = document.createElement('div');
    tabcontent_mail__title.className = "tabcontent-mail__title";
    tabcontent_mail__title.innerHTML = "Почта";
    let tabcontent_mail__descr = document.createElement('a');
    tabcontent_mail__descr.className = "tabcontent-mail__descr";
    tabcontent_mail__descr.href = `mailto: ${base_info.email_oo}`;
    if (base_info.email_oo){
        tabcontent_mail__descr.innerHTML = base_info.email_oo;
    }
    else{
        tabcontent_mail__descr.innerHTML = base_info.email;
    }


    let tabcontent_phone = document.createElement('div');
    tabcontent_phone.className= "tabcontent-phone";
    let tabcontent_phone__title = document.createElement('div');
    tabcontent_phone__title.className = "tabcontent-phone__title";
    tabcontent_phone__title.innerHTML = "Телефон";
    let tabcontent_phone__descr = document.createElement('a');
    tabcontent_phone__descr.className ="tabcontent-phone__descr";
    tabcontent_phone__descr.href = `tel:${base_info.phone_number}`;
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

    tabContent.hidden = !active

    let sreda_wrapper = document.createElement('div');
    sreda_wrapper.className ="sreda-wrapper";

    let sreda_wrapper__district = document.createElement('div');
    sreda_wrapper__district.className = "sreda-wrapper__district";

    let sreda_wrapper__district_descr = document.createElement('div');
    sreda_wrapper__district_descr.className = "sreda-wrapper__district-descr";
    if (digital.oo_name){
        sreda_wrapper__district_descr.innerHTML += digital.district_name;
    }

    let sreda_wrapper__oo = document.createElement('div');
    sreda_wrapper__oo.className  = "sreda-wrapper__oo";

    let sreda_wrapper__oo_descr = document.createElement('div');
    sreda_wrapper__oo_descr.className = "sreda-wrapper__oo-descr";

    if (digital.oo_name){
        sreda_wrapper__oo_descr.innerHTML += digital.oo_name;
    }
    else{
        sreda_wrapper__oo_descr.innerHTML += digital.district_name;
    };
    let flag = false;
    let sreda_wrapper__oo_osnash = document.createElement('div');
    sreda_wrapper__oo_osnash.className = "sreda_wrapper__ul-last";

    if (digital.cos2020){
        flag = true
        sreda_wrapper__oo_osnash.innerHTML += 'Год поступления оборудования: ' + '<span>2020 </span>';
    }
    if (digital.cos2021){
        flag = true
        sreda_wrapper__oo_osnash.innerHTML += 'Год поступления оборудования: ' + '<span>2021 </span>';
    }

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
    let osnash;
    if (digital.osnash !== undefined){
        osnash = digital.osnash ? "Да" : "Нет"
    }
    else{
        osnash = `${digital.osnash_true} из ${digital.count_all}`
    };
    sreda_wrapper__ul_last.innerHTML = '<span>Оснащенность ОО ИТ-инфраструктурой</span>, в том числе беспроводными сетями, в рамках ГП "Информационное общество": '
     + '<span>' + osnash + '</span>';

    if (digital.cos2022) {
        sreda_wrapper__ul.innerHTML = 'Информация о поступлении оборудования в 2022 году будет доступна позже';
    }
    else{
        if (digital.i_panel || digital.notebook || digital.mfu || digital.smart_tv || digital.ip_camera || digital.ik || digital.arm_ped || digital.arm_adm || digital.server){
            if(flag){
                sreda_wrapper__ul.appendChild(sreda_wrapper__oo_osnash)
            }
            sreda_wrapper__ul.innerHTML += 'Количество поступившего оборудования:'
            for (const [key, value] of Object.entries(arr_keys)){
                if (digital[key]){
                    let sreda_wrapper__ul_li = document.createElement('li')
                    sreda_wrapper__ul_li.className = "sreda_wrapper__ul-li"
                    sreda_wrapper__ul_li.innerHTML += arr_keys[key] + digital[key];

                    sreda_wrapper__ul.appendChild(sreda_wrapper__ul_li);
                };
            };
        }
        else{
            sreda_wrapper__ul.innerHTML = 'Информация о поступлении оборудования в 2022 году будет доступна позже'
        }

    };
    sreda_wrapper__district.appendChild(sreda_wrapper__district_descr);

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

    tabContent.hidden = !active

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
    function wrapper(){
        var args = Array.prototype.slice.call(arguments);
        let result  = func(args)
        result.hidden = !active
        return result
    };
    return wrapper
};


function create_ege_info(ege, active) {
    let tabContent = document.createElement('div')
    tabContent.className = "tabcontent"

    tabContent.hidden = !active

    let ege_wrapper = document.createElement('div');
    ege_wrapper.className = "ege-wrapper";
    ege_wrapper.innerHTML = "ЕГЭ";

    tabContent.appendChild(ege_wrapper);

    let ege_wrapper__oo = document.createElement('div');
    ege_wrapper__oo.className = "ege-wrapper-oo";
    ege_wrapper__oo.innerHTML += ege.oo_name;

    tabContent.appendChild(ege_wrapper__oo);

    let ege_wrapper__district = document.createElement('div');
    ege_wrapper__district.className = "ege-wrapper--district";
    ege_wrapper__district.innerHTML += ege.district_name;

    tabContent.appendChild(ege_wrapper__district);

    let table = document.createElement('table');
    table.className = "table table-ege";



    let table_header = document.createElement('tr');
    table_header.className= "table-header";

    let th_arr = {
        0: "ПРЕДМЕТ",
        1: "Ниже<br> базового",
        2: "Базовый<br> уровень",
        3: "Выше<br> базового"
    }

    for (const [key, value] of Object.entries(th_arr)) {
        let table_header__item = document.createElement('th');
        table_header__item.className = "table-header__item";
        table_header__item.innerHTML += th_arr[key];

        table_header.appendChild(table_header__item);
    }

    table.appendChild(table_header);

    let keys = {"rus": "Русский язык", "math_prof": "Профильная<br> математика", "math_base": "Базовая<br> математика"}

    for (const [key, value] of Object.entries(keys)){
        // subject_name
        let tr = document.createElement('tr');
        tr.className = "table-main"
        let td = document.createElement('td');
        td.className = "table-main__cell"
        td.innerHTML = value;
        tr.appendChild(td);

        if (ege.subject[key]){
            //low
            let td_low = document.createElement('td');
            td_low.className = "table-main__cell"
            if (ege.subject[key].low > 0){
                td_low.innerHTML = `${ege.subject[key].low}% / ${ege.subject[key].count_low} чел.`
            }
            else{
                td_low.innerHTML = "-"
            }
            tr.appendChild(td_low);

            // medium
            let td_medium = document.createElement('td');
            td_medium.className = "table-main__cell";

            if (ege.subject[key].medium > 0){
                td_medium.innerHTML = `${ege.subject[key].medium}% / ${ege.subject[key].count_medium} чел.`
            }
            else{
                td_medium.innerHTML = "-"
            }

            tr.appendChild(td_medium);

            // high
            if (key == "math_base"){
                let td_high = document.createElement('td');
                td_high.className = "table-main__cell";
                td_high.innerHTML = "-"
                tr.appendChild(td_high);
            }
            else{
                td_high = document.createElement('td');
                td_high.className = "table-main__cell";
                if (ege.subject[key].high > 0){
                    td_high.innerHTML = `${ege.subject[key].high}% / ${ege.subject[key].count_high} чел.`
                }
                else{
                    td_high.innerHTML = "-"
                }
                tr.appendChild(td_high);
            }
            table.appendChild(tr);
        }
        else{
            //low
            let td_low = document.createElement('td');
            td_low.className = "table-main__cell"
            td_low.innerHTML = "-"
            tr.appendChild(td_low);

            // medium
            let td_medium = document.createElement('td');
            td_medium.className = "table-main__cell";
            td_medium.innerHTML = "-"
            tr.appendChild(td_medium);

            // high
            let td_high = document.createElement('td');
            td_high.className = "table-main__cell";
            td_high.innerHTML = "-"
            tr.appendChild(td_high);

            table.appendChild(tr);
        }
    }

    let info = document.createElement('div');
    info.className = "info";
    // info.innerHTML = "*В таблице приведены сведения об обучающихся демонстрирующие уровень знаний в процентах";

    tabContent.appendChild(table);
    tabContent.appendChild(info);
    return tabContent

}

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

function create_vpr_info(vpr, active) {
    let tabContent = document.createElement('div')
    tabContent.className = "tabcontent"

    tabContent.hidden = !active

    let vpr_wrapper = document.createElement('div');
    vpr_wrapper.className = "ege-wrapper";
    vpr_wrapper.innerHTML = "ВПР";

    tabContent.appendChild(vpr_wrapper);

    let vpr_wrapper__oo = document.createElement('div');
    vpr_wrapper__oo.className = "ege-wrapper-oo";
    vpr_wrapper__oo.innerHTML += vpr.oo_name;

    tabContent.appendChild(vpr_wrapper__oo);

    let vpr_wrapper__district = document.createElement('div');
    vpr_wrapper__district.className = "ege-wrapper--district";
    vpr_wrapper__district.innerHTML += vpr.district_name;

    tabContent.appendChild(vpr_wrapper__district);

    let table = document.createElement('table');
    table.className = "table";

    let table_header = document.createElement('tr');
    table_header.className= "table-header";

    let vpr_obj = {
        0: "",
        1: "РУССКИЙ ЯЗЫК",
        2: "МАТЕМАТИКА"
    }


    for (const [key, value] of Object.entries(vpr_obj)) {
        let table_header__item = document.createElement('th');
        table_header__item.className = "table-header__item table-header__item-group";
        let my_colSpan = key != 0 ? 3 : 1
        table_header__item.setAttribute("colspan", my_colSpan)
        table_header__item.innerHTML = value;

        table_header.appendChild(table_header__item);
    }

    table.appendChild(table_header);

    let table_header_low = document.createElement('tr');
    table_header_low.className= "table-header";

    let vpr_obj_low = [
        "",
        "Ниже<br> базового",
        "Базовый<br> уровень",
        "Выше<br> базового",
        "Ниже<br> базового",
        "Базовый<br> уровень",
        "Выше<br> базового"
    ]

    for (const [key, value] of Object.entries(vpr_obj_low)) {
        let table_header__item = document.createElement('th');
        table_header__item.className = "table-header__item table-header__item-group";
        table_header__item.innerHTML = value;

        table_header_low.appendChild(table_header__item);
    }

    table.appendChild(table_header);
    table.appendChild(table_header_low);

    let keys = {
        "parallel_4": "4 класс",
        "parallel_5": "5 класс",
        "parallel_6": "6 класс",
        "parallel_7": "7 класс",
        "parallel_8": "8 класс"
    };

    for (const [parallel, value] of Object.entries(keys)){
        // subject_name
        let tr = document.createElement('tr');
        tr.className = "table-main";
        let td = document.createElement('td');
        td.className = "table-main__cell";
        td.innerHTML = value;
        tr.appendChild(td);


        for (subj of ["rus", "math"]){
            if(vpr[parallel][subj]){
                for (const [grade, count] of zip(["low", "medium", "high"], ["count_low", "count_medium", "count_high"])){
                    let td = document.createElement('td');
                    td.className = "table-main__cell";
                    if (vpr[parallel][subj][grade] > 0){
                        td.innerHTML = `${vpr[parallel][subj][grade]}% / ${vpr[parallel][subj][count]} чел.`;
                    }
                    else{
                        td.innerHTML = "-";
                    }
                    tr.appendChild(td);
                };
            }
            else{
                for (grade of ["low", "medium", "high"]){
                    let td = document.createElement('td');
                    td.className = "table-main__cell";
                    td.innerHTML = "-";
                    tr.appendChild(td);
                };
            };
        };
        table.appendChild(tr);
    }

    let info = document.createElement('div');
    info.className = "info";
    //info.innerHTML = "*В таблице приведены сведения об обучающихся демонстрирующие уровень знаний в процентах";

    tabContent.appendChild(table);
    tabContent.appendChild(info);
    return tabContent;

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
    // base_info
    tabContainer.appendChild(create_base_info(data.base_info, tabs_active[0]));
    // digital
    if (data.digital) {
        tabContainer.appendChild(create_digital_info(data.digital, tabs_active[1]));
    }
    else{
        tabContainer.appendChild(decorator(create_text_error, tabs_active[1])("Образовательная организация не получила оборудование в рамках Федерального проекта «Цифровая образовательная среда»"))
    };
    if (!data.base_info.filial){
        // ege
        if (data.ege.subject){
            tabContainer.appendChild(create_ege_info(data.ege, tabs_active[2]));
        }
        else{
            tabContainer.appendChild(decorator(create_text_error, tabs_active[2])("Информация о результатах ЕГЭ отсутствует"));
        };
        // vpr
        if (data.vpr){
            tabContainer.appendChild(create_vpr_info(data.vpr, tabs_active[3]));
        }
        else{
            tabContainer.appendChild(decorator(create_text_error, tabs_active[3])("Информация о результатах ВПР отсутствует"));
        }

        // growing_point
        if (data.growing_point){
            tabContainer.appendChild(decorator(create_text_error, tabs_active[4])("Образовательная организация участвует в программе Центров образования цифрового и гуманитарного профиля «Точка роста» "));
        }
        else{
            tabContainer.appendChild(decorator(create_text_error, tabs_active[4])("Образовательная организация не содержит центр образования цифрового и гуманитарного профилей «Точка роста» "));
        };
    }
    else{
        tabContainer.appendChild(decorator(create_text_error, tabs_active[2])("Информация размещена в юридическом лице"));
        tabContainer.appendChild(decorator(create_text_error, tabs_active[3])("Информация размещена в юридическом лице"));
        tabContainer.appendChild(decorator(create_text_error, tabs_active[4])("Информация размещена в юридическом лице"));
    }

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

function create_committee_text(data, active){
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
    tabContainer.appendChild(create_base_info(data.base_info, tabs_active[0]));
    if (data.digital) {
        tabContainer.appendChild(create_digital_info(data.digital, tabs_active[1]));
    }
    else{
        tabContainer.appendChild(decorator(create_text_error, tabs_active[1])("Муниципальный район не получил оборудование в рамках Федерального проекта «Цифровая образовательная среда»"))
    };
    tabContainer.appendChild(create_committee_ege_info(data, tabs_active[2]));
    tabContainer.appendChild(create_committee_vpr_info(data, tabs_active[3]));
    // growing_point
    if (data.growing_point.items){
        tabContainer.appendChild(create_committee_growing_point_info(data.growing_point, tabs_active[4]))
    }
    else{
        tabContainer.appendChild(decorator(create_text_error, tabs_active[4])("Муниципальный район не содержит центры образования цифрового и гуманитарного профилей «Точка роста»"))
    }


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
};

function create_committee_ege_info(item, active) {
    let tabContent = document.createElement('div')
    tabContent.className = "tabcontent"

    tabContent.hidden = !active

    let ege_wrapper = document.createElement('div');
    ege_wrapper.className = "ege-wrapper";
    ege_wrapper.innerHTML = "ЕГЭ";

    tabContent.appendChild(ege_wrapper);

    let ege_wrapper__oo = document.createElement('div');
    ege_wrapper__oo.className = "ege-wrapper-oo";
    ege_wrapper__oo.innerHTML += item.base_info.name;

    tabContent.appendChild(ege_wrapper__oo);

    let ege_wrapper__district = document.createElement('div');
    ege_wrapper__district.className = "ege-wrapper--district";
    ege_wrapper__district.innerHTML += item.base_info.district_name;

    tabContent.appendChild(ege_wrapper__district);

    let table = document.createElement('table');
    table.className = "table table-ege";



    let table_header = document.createElement('tr');
    table_header.className= "table-header";

    let th_arr = {
        0: "ПРЕДМЕТ",
        1: "Ниже<br> базового",
        2: "Базовый<br> уровень",
        3: "Выше<br> базового"
    }

    for (const [key, value] of Object.entries(th_arr)) {
        let table_header__item = document.createElement('th');
        table_header__item.className = "table-header__item";
        table_header__item.innerHTML += th_arr[key];

        table_header.appendChild(table_header__item);
    }

    table.appendChild(table_header);

    let keys = {"rus": "Русский язык", "math_prof": "Профильная<br> математика", "math_base": "Базовая<br> математика"}

    for (const [key, value] of Object.entries(keys)){
        // subject_name
        let tr = document.createElement('tr');
        tr.className = "table-main"
        let td = document.createElement('td');
        td.className = "table-main__cell"
        td.innerHTML = value;
        tr.appendChild(td);

        if (item.ege[key]){
            //low
            let td_low = document.createElement('td');
            td_low.className = "table-main__cell"
            if (item.ege[key].low > 0){
                td_low.innerHTML = `${item.ege[key].low}% / ${item.ege[key].count_low} чел.`
            }
            else{
                td_low.innerHTML = "-"
            }
            tr.appendChild(td_low);

            // medium
            let td_medium = document.createElement('td');
            td_medium.className = "table-main__cell";
            if (item.ege[key].medium > 0){
                td_medium.innerHTML = `${item.ege[key].medium}% / ${item.ege[key].count_medium} чел.`
            }
            else{
                td_medium.innerHTML = "-"
            }
            tr.appendChild(td_medium);

            // high
            if (key == "math_base"){
                let td_high = document.createElement('td');
                td_high.className = "table-main__cell";
                td_high.innerHTML = "-"
                tr.appendChild(td_high);
            }
            else{
                td_high = document.createElement('td');
                td_high.className = "table-main__cell";
                if (item.ege[key].high > 0){
                    td_high.innerHTML = `${item.ege[key].high}% / ${item.ege[key].count_high} чел.`
                }
                else{
                    td_high.innerHTML = "-"
                }
                tr.appendChild(td_high);
            }
            table.appendChild(tr);
        }
        else{
            //low
            let td_low = document.createElement('td');
            td_low.className = "table-main__cell"
            td_low.innerHTML = "-"
            tr.appendChild(td_low);

            // medium
            let td_medium = document.createElement('td');
            td_medium.className = "table-main__cell";
            td_medium.innerHTML = "-"
            tr.appendChild(td_medium);

            // high
            let td_high = document.createElement('td');
            td_high.className = "table-main__cell";
            td_high.innerHTML = "-"
            tr.appendChild(td_high);

            table.appendChild(tr);
        }
    }

    let info = document.createElement('div');
    info.className = "info";
    //info.innerHTML = "*В таблице приведены сведения об обучающихся демонстрирующие уровень знаний в процентах";

    tabContent.appendChild(table);
    tabContent.appendChild(info);
    return tabContent

}

function create_committee_vpr_info(item, active) {
    let tabContent = document.createElement('div')
    tabContent.className = "tabcontent"

    tabContent.hidden = !active

    let vpr_wrapper = document.createElement('div');
    vpr_wrapper.className = "ege-wrapper";
    vpr_wrapper.innerHTML = "ВПР";

    tabContent.appendChild(vpr_wrapper);

    let vpr_wrapper__oo = document.createElement('div');
    vpr_wrapper__oo.className = "ege-wrapper-oo";
    vpr_wrapper__oo.innerHTML += item.base_info.name;

    tabContent.appendChild(vpr_wrapper__oo);

    let vpr_wrapper__district = document.createElement('div');
    vpr_wrapper__district.className = "ege-wrapper--district";
    vpr_wrapper__district.innerHTML += item.base_info.district_name;

    tabContent.appendChild(vpr_wrapper__district);

    let table = document.createElement('table');
    table.className = "table";

    let table_header = document.createElement('tr');
    table_header.className= "table-header";

    let vpr_obj = {
        0: "",
        1: "РУССКИЙ ЯЗЫК",
        2: "МАТЕМАТИКА"
    }


    for (const [key, value] of Object.entries(vpr_obj)) {
        let table_header__item = document.createElement('th');
        table_header__item.className = "table-header__item table-header__item-group";
        let my_colSpan = key != 0 ? 3 : 1
        table_header__item.setAttribute("colspan", my_colSpan)
        table_header__item.innerHTML = value;

        table_header.appendChild(table_header__item);
    }

    table.appendChild(table_header);

    let table_header_low = document.createElement('tr');
    table_header_low.className= "table-header";

    let vpr_obj_low = [
        "",
        "Ниже<br> базового",
        "Базовый<br> уровень",
        "Выше<br> базового",
        "Ниже<br> базового",
        "Базовый<br> уровень",
        "Выше<br> базового"
    ]

    for (const [key, value] of Object.entries(vpr_obj_low)) {
        let table_header__item = document.createElement('th');
        table_header__item.className = "table-header__item table-header__item-group";
        table_header__item.innerHTML = value;

        table_header_low.appendChild(table_header__item);
    }

    table.appendChild(table_header);
    table.appendChild(table_header_low);

    let keys = {
        "parallel_4": "4 класс",
        "parallel_5": "5 класс",
        "parallel_6": "6 класс",
        "parallel_7": "7 класс",
        "parallel_8": "8 класс"
    };

    for (const [parallel, value] of Object.entries(keys)){
        // subject_name
        let tr = document.createElement('tr');
        tr.className = "table-main";
        let td = document.createElement('td');
        td.className = "table-main__cell";
        td.innerHTML = value;
        tr.appendChild(td);

        for (subj of ["rus", "math"]){
            if(item.vpr[parallel][subj]){
                for (const [grade, count] of zip(["low", "medium", "high"], ["count_low", "count_medium", "count_high"])){
                    let td = document.createElement('td');
                    td.className = "table-main__cell";
                    if (item.vpr[parallel][subj][grade] > 0){
                        td.innerHTML = `${item.vpr[parallel][subj][grade]}% / ${item.vpr[parallel][subj][count]} чел.`;
                    }
                    else{
                        td.innerHTML = "-";
                    }
                    tr.appendChild(td);
                };
            }
            else{
                for (grade of ["low", "medium", "high"]){
                    let td = document.createElement('td');
                    td.className = "table-main__cell";
                    td.innerHTML = "-";
                    tr.appendChild(td);
                };
            };
        };
        table.appendChild(tr);
    }

    let info = document.createElement('div');
    info.className = "info";
    // info.innerHTML = "*В таблице приведены сведения об обучающихся демонстрирующие уровень знаний в процентах";

    tabContent.appendChild(table);
    tabContent.appendChild(info);
    return tabContent;

}

function create_committee_growing_point_info(growing_point, active){
    let tabContent = document.createElement('div')
    tabContent.className = "tabcontent"

    tabContent.hidden = !active

    let sreda_wrapper = document.createElement('div');
    sreda_wrapper.className ="sreda-wrapper";

    let sreda_wrapper__district = document.createElement('div');
    sreda_wrapper__district.className = "sreda-wrapper__district";

    let title = document.createElement('div');
    title.className = "growing_point_title"
    title.innerHTML = 'Центры «Точка роста» в Муниципальном районе:'

    let schools_list = document.createElement('div');
    schools_list.className = 'schools_list'
    for (item of growing_point.items){
        let school = document.createElement('div');
        school.className = 'growing_point_school'
        school.innerHTML = item.oo_name
        schools_list.appendChild(school)
    }

    sreda_wrapper__district.appendChild(schools_list);
    sreda_wrapper__district.appendChild(title);

    sreda_wrapper.appendChild(sreda_wrapper__district);

    tabContent.appendChild(sreda_wrapper);
    return tabContent
}