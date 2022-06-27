var tree = document.getElementById('tree');
var burger = document.getElementById('burger');

var map = L.map('map', {
    zoomSnap: 0.5,
    zoomAnimation: true,
    minZoom: 7.5,
    maxBounds: [
        [50.28933925329178,75.498046875],
        [50.331436330838834,89.3408203125],
        [54.92714186454645,89.4287109375],
        [55.00282580979323,75.65185546874999],
        [50.28933925329178,75.498046875]
    ]
}).fitWorld();

$.getJSON('static/files/kray.json').then(function(geoJSON) {
  var osm = new L.TileLayer.BoundaryCanvas('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    boundary: geoJSON,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
});


map.setView(new L.LatLng(52.6097204210268, 82.19761583222313), 7.5);
L.Control.geocoder({
    position:"topleft"
}).addTo(map);

map.on("zoomend", function(){
    let zoom = map.getZoom()

    if (zoom >=9.5 && zoom < 10.5){
        changeOpacity(0.7)
    };
    if (zoom >=10.5 && zoom < 12.5) {
        changeOpacity(0.6)
    };
    if (zoom >=12.5 && zoom < 14) {
        changeOpacity(0.4)
    };
    if (zoom >= 14) {
        changeOpacity(0.2)
    };
    if (zoom < 9.5) {
        changeOpacity(0.8)
    };
    //map.setZoomAround(new L.LatLng(52.6097204210268, 82.19761583222313), zoom)
})

var markers = L.markerClusterGroup()

var options = {
    position: "topleft",
    drawMarker: false,
    drawPolygon: false,
    removalMode: false,
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
	        var fillOpacity = region.fillOpacity
            var id_region = region.id_region
            var polygon = L.polygon(coordinates, {
                fillColor: color,
                color: 'white',
                "name": name,
                "id_region": id_region,
                fillOpacity: 0.8,
                weight: 4,
                "type": "region",
            });
            polygon.addTo(map);
            menu_create_region_item(polygon);
        };
        return
    });
};

function create_menu(){
    let li = document.createElement('li');
    li.innerHTML += "Выберите округ";
    li.id = "li:select_region";
    let ul = document.createElement('ul');
    ul.id = "select_region";
    ul.className = "list-two";
    li.appendChild(ul);
    tree.appendChild(li);
}


function menu_create_region_item(region){
    var select_region = document.getElementById('select_region');
    let li = document.createElement('li');
    let ul = document.createElement('ul');
    let span = document.createElement('span');
    span.innerHTML += region.options.name;
    span.id = "span:id_region=" + region.options.id_region;
    span.onmouseover = function () {
        region._path.setAttribute('filter', 'drop-shadow(3px 5px 2px rgb(0 0 0 / 0.8))');
    };
    span.onmouseout = function () {
        region._path.removeAttribute('filter');
    };
    span.onclick = function(){
        deleteLayersForRegion(region.options.id_region);
        map.flyTo(region.getBounds().getCenter(), 8.5);
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
        district._path.setAttribute('filter', 'drop-shadow(3px 5px 2px rgb(0 0 0 / 0.8))');
    };
    span.onmouseout = function () {
        district.setStyle({
            fillOpacity: 0
        });
        district._path.removeAttribute('filter');
    };
    span.onclick = async function () {
        let ul = document.createElement('ul');
	    deleteLayersForDistrict(span.innerHTML);
        if (span.className == "closed hide"){
            var schools = await getSchools(district);
            for (school of schools){
                if (school.coordinates != ""){
                    if (li.childElementCount == 1){
                        var school_li = document.createElement('li');
                        var school_span = document.createElement('span');
                        school_span.className = "list-four";
                        school_span.innerHTML+= school.oo_name;
                        school_span.setAttribute('coordinates', school.coordinates);
                        school_span.onclick = function(){
                            let coordinates = this.getAttribute('coordinates')
                            coordinates = coordinates.split(";").map(str => parseFloat(str));
                            var latLon = new L.LatLng(coordinates[0], coordinates[1]);
			                map.flyTo(latLon, 16.5);
                            map.once('moveend', ()=>openSchoolPopUp(this.innerHTML));
                        };
                        school_li.appendChild(school_span);
                        ul.appendChild(school_li);
                    }
                    create_marker(school, district.options.name, district.options.id_region);
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
                    color: "#FFFFFF",
                    "name": name,
                    "id_district": id_district,
                    "id_region": id_region,
                    fillOpacity: 0,
                    weight: 1,
		            "type": "district",
                });
                polygon.bindTooltip(name,
                   {permanent: false, direction: "center"}
                ).openTooltip()
                menu_create_district_item(polygon);
                polygon.addTo(map);
                polygon.on('click', async function () {
                    var open_menu = document.getElementById("open-menu");
                    open_menu.click()
                    var menu_select_region_item = document.getElementById("li:select_region");
                    if (menu_select_region_item.firstChild.className == "show closed" || menu_select_region_item.firstChild.className == "closed hide"){
                        menu_select_region_item.firstChild.click()
                    }
                    var menu_region_item = document.getElementById("span:id_region=" + this.options.id_region);
                    if (menu_region_item.className != "closed active open show"){
                        menu_region_item.click()
                    };
                    var menu_district_item = document.getElementById("id_district=" + this.options.id_district);
                    menu_district_item.click();
                });
            };
        };
        return
    });
};

async function load_data(){
    create_menu();
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

async function create_marker(data, district_name, id_region){
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
        "id_region": id_region,
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

function deleteLayersForDistrict(district_name){
    markers.eachLayer(async function(layer) {
        if (layer instanceof L.Marker){
            if (layer.options.district_name == district_name){
                markers.removeLayer(layer);
            }
        };
    })
};

function openSchoolPopUp(oo_name){
    markers.eachLayer(async function(layer) {
        if (layer instanceof L.Marker){
            if (layer.options.oo_name == oo_name){
                layer.openPopup();
            }
            else{
                layer.closePopup();
            }
        };
    })
};

function deleteLayersForRegion(id_region){
    markers.eachLayer(async function(layer) {
        if (layer instanceof L.Marker){
            if (layer.options.id_region == id_region){
                markers.removeLayer(layer);
            }
        };
    })
};

function changeOpacity(value){
    map.eachLayer(async function(layer) {
        if (layer instanceof L.Polygon && layer.options.type == "region"){
            layer.setStyle({
                fillOpacity: value
            });
        };
    })
};
