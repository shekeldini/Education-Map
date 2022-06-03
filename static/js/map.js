var tree = document.getElementById('tree');
var div_legend = document.getElementById('legend');

var map = L.map('map', {
    zoomSnap: 0.5,
    zoomAnimation: true,
    fadeAnimation: true,
    minZoom: 7.5,
    maxBounds: [
        [52.84259457223949, 73.564453125], 
        [49.49667452747045, 73.6083984375], 
        [49.58222604462167, 82.77099609375], 
        [49.738681639280024, 90.32958984375], 
        [55.178867663281984, 90.21972656250001], 
        [55.178867663281984, 82.11181640625001], 
        [55.11608453987679, 73.47656249999999], 
        [52.84259457223949, 73.564453125]
    ]
}).fitWorld();

$.getJSON('static/files/kray.json').then(function(geoJSON) {
  var osm = new L.TileLayer.BoundaryCanvas('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    boundary: geoJSON,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
});


map.setView(new L.LatLng(52.61558902526749, 83), 7.5);
L.Control.geocoder({
    position:"topleft"
}).addTo(map);




var markers = L.markerClusterGroup()

var options = {
    position: "topleft",
    drawMarker: true,
    drawPolygon: true,
    removalMode: true,
    drawCircleMarker: false,
    drawPolyline: false,
    drawRectangle: false,
    drawCircle: false,
    dragMode: false,
    rotateMode: false,
    cutPolygon: false,
    editMode: false
}
map.pm.addControls(options)
map.pm.enableDraw('Polygon',{ snappable: false });
map.pm.enableDraw('Marker',{ snappable: false });
map.pm.disableDraw();

var points = [];

map.on('pm:drawstart', ({ workingLayer }) => {
    points = []
    workingLayer.on('pm:vertexadded', (e) => {
        points.push([e.latlng.lat, e.latlng.lng])
    });
});

map.on('pm:drawend', ({ workingLayer }) => {
    console.log(points);
});

map.on('pm:create', (e) => {
    e.layer.pm.enable()
    e.layer.on('pm:edit', ({ layer }) => {
        console.log(layer.toGeoJSON().geometry.coordinates);
  })
});

async function load_regions(){
    return $.getJSON("static/files/okruga.json", function(json) {
        for(region of json){
            var name = region.name
            var coordinates = region.coordinates
            var color = region.color
            var id_region = region.id_region
            var polygon = L.polygon(coordinates, {
                color: color,
                "name": name,
                "id_region": id_region,
                fillOpacity: 0.25,
                weight: 4
            });
            polygon.addTo(map);
            menu_create_region_item(polygon);
            create_legend_item(polygon);
        };
        return
    });
};

function create_menu(){
    let li = document.createElement('li');
    li.innerHTML += "Выберите округ";
    let ul = document.createElement('ul');
    ul.id = "select_region";
    ul.className = "list-two";
    li.appendChild(ul);
    tree.appendChild(li);
}

function create_legend(){

    let div_container = document.createElement('div');
    div_container.className = "container";

    let div_legend_title = document.createElement('div');
    div_legend_title.className = "legend-title";
    div_legend_title.innerHTML += "Обозначение округов Алтайского края";

    let div_legend_wrapper = document.createElement('div');
    div_legend_wrapper.className = "legend-wrapper";
    div_legend_wrapper.id = "legend-wrapper";

    div_container.appendChild(div_legend_title);
    div_container.appendChild(div_legend_wrapper);
    div_legend.appendChild(div_container);
};

function create_legend_item(region){
    let legend_wrapper = document.getElementById('legend-wrapper');

    let div_legend_block = document.createElement('div');
    div_legend_block.className = "legend-block";

    let div_legend_block_name = document.createElement('div');
    div_legend_block_name.className = "legend-block__name";
    div_legend_block_name.innerHTML += region.options.name;

    let div_legend_block_color = document.createElement('div');
    div_legend_block_color.className = "legend-block__color";
    div_legend_block_color.setAttribute(
        'style',
        'background:' + region.options.color + ';'
    );
    div_legend_block.onmouseover = function(){
        div_legend_block.setAttribute(
            'style',
            'background:' + region.options.color + ';'
        );
        region.setStyle({
            fillOpacity: 0.6
        });
    };
    div_legend_block.onmouseout = function () {
        div_legend_block.setAttribute(
            'style',
            'background: "white";'
        );
        region.setStyle({
            fillOpacity: 0.25
        });

    };
    div_legend_block.appendChild(div_legend_block_name);
    div_legend_block.appendChild(div_legend_block_color);
    legend_wrapper.appendChild(div_legend_block);
};

function menu_create_region_item(region){
    var select_region = document.getElementById('select_region');
    let li = document.createElement('li');
    let ul = document.createElement('ul');
    let span = document.createElement('span');
    span.innerHTML += region.options.name;
    span.onmouseover = function () {
        region.setStyle({
            fillOpacity: 0.6
        });
    };
    span.onmouseout = function () {
        region.setStyle({
            fillOpacity: 0.25
        });
    };
    span.className = "hide";
    span.classList.add('closed');
    ul.id = "id_region=" + region.options.id_region;
    ul.className = "list-three";
    ul.hidden = true;
    li.appendChild(span);
    li.appendChild(ul);
    select_region.appendChild(li);
}

function menu_create_district_item(district){
    var selected_region = document.getElementById("id_region=" + district.options.id_region);
    let li = document.createElement('li');
    let span = document.createElement('span');
    span.innerHTML += district.options.name;
    span.className = "closed hide";
    span.id = "id_district=" + district.options.id_district;
    span.onmouseover = function () {
        district.setStyle({
            fillOpacity: 0.3
        });
    };
    span.onmouseout = function () {
        district.setStyle({
            fillOpacity: 0
        });
    };
    span.onclick = async function () {
        let ul = document.createElement('ul');
        deleteLayers(L.Marker);
        if (span.className == "closed hide"){
            var schools = await getSchools(district);
            for (school of schools){
                if (school.coordinates != ""){
                    if (li.childElementCount == 1){
                        var school_li = document.createElement('li');
                        var school_span = document.createElement('span');
                        school_span.className = "list-four";
                        school_span.innerHTML+= school.oo_name;
                        school_li.appendChild(school_span);
                        ul.appendChild(school_li);
                    }
                    create_marker(school, district.options.name);
                };
            markers.addTo(map);
            span.className = "closed open show active";
            };
        };
        if (ul.childElementCount >= 1){
            li.appendChild(ul);
        };
    };

    li.appendChild(span);
    selected_region.appendChild(li);
}

async function load_districts(){
    return $.getJSON("static/files/districts.json", function(json) {
        for(district of json){
            var name = district.name
            var coordinates = district.coordinates
            var id_district = district.id
            var id_region = district.id_region
            for (coord of coordinates){
                var polygon = L.polygon(coord, {
                    color: "#139BF0",
                    "name": name,
                    "id_district": id_district,
                    "id_region": id_region,
                    fillOpacity: 0,
                    weight: 1
                });
                polygon.bindTooltip(name,
                   {permanent: false, direction: "center"}
                ).openTooltip()
                menu_create_district_item(polygon);
                polygon.addTo(map);
                polygon.on('click', async function () {
                    deleteLayers(L.Marker);
                    var schools = await getSchools(this);
                    for (school of schools){
                        if (school.coordinates != ""){
                            create_marker(school, this.options.name);
                        };
                    markers.addTo(map)
                    };
                });
            };
        };
        return
    });
};

async function load_data(){
    create_menu();
    create_legend();
    await load_regions();
    await load_districts();


};

load_data();

function getSchools(polygon){
    send_data = {
        year: 2022,
        id_district: polygon.options.id_district
    }
    return $.ajax({
        type : 'GET',
        url : "oo/get_all_by_year_and_id_district",
        data: send_data
    });
};

async function create_marker(data, district_name){
    var coordinates = data.coordinates.split(";").map(str => parseFloat(str));
    var iconOptions = {
            iconUrl: '/static/images/school.png',
            iconSize: [50, 50]
         }
    var customIcon = L.icon(iconOptions);
    var marker = L.marker(coordinates, {
        "id_oo": data.id_oo,
        "oo_login": data.oo_login,
        'year': data.year,
        "oo_login": data.oo_login,
        "oo_name": data.oo_name,
        "oo_address": data.oo_address,
        "director": data.director,
        "email_oo": data.email_oo,
        "phone_number": data.phone_number,
        "coordinates": data.coordinates,
        "url": data.url,
        "district_name": district_name,
	"icon": customIcon
    });

    var text =
            "<p class='district'>" + marker.options.district_name + "</p>" +

            "<div class='block'>" +

                 "<div class='name'>" + marker.options.oo_name + "</div>" +
            "</div>" +
	        "<div class='block'>" +
                 "<div>" + 'Адрес:' + "</div>" +
                 "<div class='address'>" + marker.options.oo_address + "</div>" +
            "</div>" +
            "<div class='block'>" +
                 "<div>" + 'Директор:' + "</div>" +
                 "<div class='director'>" + marker.options.director + "</div>" +
            "</div>" +
            "<div class='block'>" +
                 "<div>" + 'Почта:' + "</div>" +
                 "<div class='oo'>" + marker.options.email_oo + "</div>" +
            "</div>" +
            "<div class='block'>" +
                 "<div>" + 'Телефон:' + "</div>" +
                 "<div class='phone'>" + marker.options.phone_number + "</div>" +
            "</div>" +
            "<div class='block'>" +
                 "<div>" + 'Сайт:' + "</div>" +
                 "<a href='" + marker.options.url + "' class='url' >" + marker.options.url + "</a>" +
            "</div>";

    marker.bindPopup(text, {autoClose:false}).openPopup();

    marker.on('click', function(){
        console.log(this.options);
        marker.openPopup();
    });

    markers.addLayer(marker);
};

function deleteLayers(LayerType){
    markers.eachLayer(async function(layer) {
        if (layer instanceof LayerType){
            markers.removeLayer(layer);
        };
    })
};

