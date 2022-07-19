var tree = document.getElementById('tree');
var burger = document.getElementById('burger');
let start_position = new L.LatLng(52.726338, 82.466781)
let start_zoom = 7.5
let current_filter = "info"
let this_polygon = null
let iconOptions = {
    iconUrl: '/static/images/school.png',
    iconSize: [50, 50]
}
let customIcon = L.icon(iconOptions);

let maxBounds = [
        [50.28933925329178,75.498046875],
        [50.331436330838834,89.3408203125],
        [54.92714186454645,89.4287109375],
        [55.00282580979323,75.65185546874999],
        [50.28933925329178,75.498046875]
    ]
window_height = window.screen.height
window_width = window.screen.width

if (window_width == 1920 && window_height == 1080){
    maxBounds = [
        [50.28933925329178,75.498046875],
        [50.331436330838834,89.3408203125],
        [54.92714186454645,89.4287109375],
        [55.00282580979323,75.65185546874999],
        [50.28933925329178,75.498046875]
    ]
}

if (window_width == 2560 && window_height == 1440){
    maxBounds = [
        [49.51094351526262,74.0478515625],
        [49.69606181911566,91.16455078125],
        [56.206703980680814,90.98876953125],
        [56.12106042504407,73.916015625],
        [49.51094351526262,74.0478515625]
    ]
}



var map = L.map('map', {
    zoomSnap: 0.5,
    zoomAnimation: true,
    minZoom: 7.5,
    maxBounds: maxBounds,
    zoomControl: false
}).fitWorld();
map.setView(start_position, start_zoom);
map.doubleClickZoom.disable();

$.getJSON('static/files/kray.json').then(function(geoJSON) {
    var osm = new L.TileLayer.BoundaryCanvas('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    boundary: geoJSON,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var coordinates = geoJSON["features"][0]["geometry"]["coordinates"][0]
    coordinates.forEach(arr => [arr[0], arr[1]] = [arr[1], arr[0]])
    var polygon = L.polygon(coordinates, {
                color: 'white',
                "name": name,
                fillOpacity: 0,
                weight: 2,
            });
    polygon.addTo(map)
    polygon._path.setAttribute('filter', 'drop-shadow(5px 6px 2px rgb(0 0 0 / 0.8))');

});


map.on("zoomend", function(){
    let zoom = map.getZoom()

    if (zoom >=9.5 && zoom < 10.5){
        changeOpacity(0.7)
    };
    if (zoom >=10.5 && zoom < 12.5) {
        changeOpacity(0.6)
        if (this_polygon != null){
            this_polygon.setStyle({
                fillOpacity: 0.3
            });
            this_polygon._path.setAttribute('filter', 'drop-shadow(3px 5px 2px rgb(0 0 0 / 0.8))');
        };
    };
    if (zoom >=12.5 && zoom < 14) {
        changeOpacity(0.4)
        if (this_polygon != null){
            this_polygon.setStyle({
                fillOpacity: 0
            });
            this_polygon._path.removeAttribute('filter');
        };
    };
    if (zoom >= 14) {
        changeOpacity(0.2)
    };
    if (zoom < 9.5) {
        changeOpacity(0.8)
    };
})

var markers = L.markerClusterGroup({singleMarkerMode: true})
let regions_layers = L.layerGroup()
let districts_layers = L.layerGroup()


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
    editMode: false,
    drawText: false
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
            regions_layers.addLayer(polygon);
            menu_create_region_item(polygon);
        };
        return
    });
};

function create_menu(){
    let li = document.createElement('li');
    li.id = "li:select_region";

    let span = document.createElement('span');
    span.innerHTML += "Выберите округ";
    span.className = "closed hide"
    span.onclick = function(){

	    if (this.className != "closed hide"){
	        close_children(this.parentNode)
	        deleteAllMarkers()
	    }

        map.flyTo(start_position, start_zoom);
    };

    let ul = document.createElement('ul');
    ul.id = "select_region";
    ul.className = "list-two";
    li.appendChild(span);
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
        if (this.className != "closed hide"){
	        close_children(this.parentNode)
	        deleteLayersForRegion(region.options.id_region);
	    }
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

async function menu_create_district_item(district){
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

    let ul = document.createElement('ul');
    ul.hidden = true;
    var schools = await getSchools(district);

    for (school of schools){
        if (school.coordinates != ""){
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
        };
    };


    span.onclick = async function () {
	    deleteLayersForDistrict(span.innerHTML);
        if (span.className == "closed hide"){
            var schools = await getSchools(district);
            for (school of schools){
                if (school.coordinates != ""){
                    create_marker(school, district.options.name, district.options.id_region);
                }
            }
            markers.addTo(map);
            span.className = "closed open show active";
        };
    };
    li.appendChild(span);
    li.appendChild(ul);
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

                districts_layers.addLayer(polygon);

                polygon.on("mouseover", function() {
                    this_polygon = this
                    if (map.getZoom() < 12.5){
                        this.setStyle({
                            fillOpacity: 0.3
                        });
                        this._path.setAttribute('filter', 'drop-shadow(3px 5px 2px rgb(0 0 0 / 0.8))');
                    };
                });
                polygon.on("mouseout", function() {
                    this.setStyle({
                        fillOpacity: 0
                    });
                    this._path.removeAttribute('filter');
                    this_polygon = null
                });

                polygon.on('click', async function () {
                    if (current_filter == "info"){
                        var menu_select_region_item = document.getElementById("li:select_region");
                        if (menu_select_region_item.firstChild.className == "show closed" || menu_select_region_item.firstChild.className == "closed hide"){
                            menu_select_region_item.firstChild.click()
                        }
                        var menu_region_item = document.getElementById("span:id_region=" + this.options.id_region);
                        if (menu_region_item.className != "closed active open show"){
                            menu_region_item.click()
                        }
                        else{
                            flyToRegion(this.options.id_region)
                        }
                        var menu_district_item = document.getElementById("id_district=" + this.options.id_district);
                        menu_district_item.click();
                    };


                });
            };
        };
        return
    });
};

async function load_data(){
    create_menu();
    await load_regions();
    regions_layers.addTo(map);
    await load_districts();
    districts_layers.addTo(map);


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

    var marker = L.marker(coordinates, {
        "id_oo": data.id_oo,
        "oo_login": data.oo_login,
        'year': data.year,
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
        marker.openPopup();
    });

    markers.addLayer(marker);
};

function deleteAllMarkers(){
    markers.eachLayer(async function(layer) {
        if (layer instanceof L.Marker){
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
    regions_layers.eachLayer(async function(layer) {
        if (layer instanceof L.Polygon && layer.options.type == "region"){
            layer.setStyle({
                fillOpacity: value
            });
        };
    })
};

function search(value){
    $("#search_result").empty();
    if (value.length > 3){
        var data = $.ajax({
            type : 'GET',
            url : "oo/search?oo_name=" + value,
            success: function(data) {
                for (item of data.items){
                    $("#search_result").append("<div class='menu-search__wrapper-item'>" + "<p>" + item.oo_name + "</p>" + "<div>" + item.district_name + "</div>" + "</div>");
                }
            },
        });
    }
};

function flyToRegion(id_region){
    regions_layers.eachLayer(async function(layer) {
        if (layer instanceof L.Polygon && layer.options.id_region == id_region){
            map.flyTo(layer.getBounds().getCenter(), 8.5)
        };
    })
}

async function create_digital_markers(parent){
    deleteAllMarkers()
    if (parent.open == false){
        current_filter = "digital"
        var digital_items = await get_digital_items(2022)
        for (item of digital_items.items){
            var coordinates = item.coordinates.split(";").map(str => parseFloat(str));
            var marker = L.marker(coordinates, {
                "oo_login": item.oo_login,
                'year': item.year,
                "oo_name": item.oo_name,
                "oo_address": item.oo_address,
                "director": item.director,
                "email_oo": item.email_oo,
                "phone_number": item.phone_number,
                "coordinates": item.coordinates,
                "url": item.url,
                "district_name": item.district_name,
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
                marker.openPopup();
            });

            markers.addLayer(marker);
        }
        markers.addTo(map);
    }
    else{
        current_filter = "info"
    }

};

function get_digital_items(year){
    send_data = {
        year: year
    }
    return $.ajax({
        type : 'GET',
        url : "digital_environment/get_all",
        data: send_data
    });
};

function close_children(parent){
    let ul_element = parent.querySelector("ul")
    if (ul_element){
        for (let i = 0; i < ul_element.children.length; i++) {
            if (ul_element.children[i].children.length == 2){
                // span
                ul_element.children[i].children[0].className = "closed hide"
                // ul
                ul_element.children[i].children[1].hidden = true
                close_children(ul_element.children[i])
            }
        }
    }
};

