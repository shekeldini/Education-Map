let edit = false


let info = document.getElementById('info');
var tree = document.getElementById('tree');
var burger = document.getElementById('burger');
let table = document.getElementById('filter');
let selectedTd = info.firstChild;
let info_select;
let start_position = new L.LatLng(52.526338, 82.466781);
let start_zoom = 7.5;
let region_weight = 5;
let current_filter = "info";
let this_polygon = null;
let iconOptions = {
    iconUrl: '/static/images/school.png',
    iconSize: [50, 50]
};
let customIcon = L.icon(iconOptions);

let maxBounds = [
        [50.28933925329178,75.498046875],
        [50.331436330838834,89.3408203125],
        [54.92714186454645,89.4287109375],
        [55.00282580979323,75.65185546874999],
        [50.28933925329178,75.498046875]
];
window_height = $(window).height();
window_width = $(window).width();

if (window_width == 2560 && window_height == 1440){
    maxBounds = [
        [49.51094351526262,74.0478515625],
        [49.69606181911566,91.16455078125],
        [56.206703980680814,90.98876953125],
        [56.12106042504407,73.916015625],
        [49.51094351526262,74.0478515625]
    ]
}

if (window_width <= 1580) {
    start_zoom = 6.75;
    region_weight = 3;
    maxBounds = [
        [50.28933925329178,75.498046875],
        [50.331436330838834,89.3408203125],
        [54.92714186454645,89.4287109375],
        [55.00282580979323,75.65185546874999],
        [50.28933925329178,75.498046875]
    ]
}

if (window_width == 768) {
    start_zoom = 5.8;
    region_weight = 2;
    maxBounds = [
        [50.28933925329178,75.498046875],
        [50.331436330838834,89.3408203125],
        [54.92714186454645,89.4287109375],
        [55.00282580979323,75.65185546874999],
        [50.28933925329178,75.498046875]
    ]
}


var map = L.map('map', {
    zoomSnap: 0.25,
    zoomAnimation: true,
    minZoom: start_zoom,
    maxBounds: maxBounds,
    zoomControl: false,
    edgeBufferTiles: 5,
    maxZoom: 17
});


map.options.crs = L.CRS.EPSG3395;
map.on('drag', () => {
  map.fitBounds(map.getBounds());
});


map.setView(start_position, start_zoom);
map.doubleClickZoom.disable();

$.getJSON('static/files/kray.json').then(function(geoJSON) {
    var osm = new L.TileLayer.BoundaryCanvas('https://core-renderer-tiles.maps.yandex.net/tiles?l=map&v=22.07.19-2-b220606200930&x={x}&y={y}&z={z}&scale=1&lang=ru_RU&ads=enabled', {
    boundary: geoJSON,
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
//    if (zoom < 7.5) {
//        changeBorderWeight(1)
//    };
})

var markers = L.markerClusterGroup({singleMarkerMode: true})
markers.addTo(map);

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
            var color = "#0e4677"
	        var fillOpacity = region.fillOpacity
            var id_region = region.id_region
            var polygon = L.polygon(coordinates, {
                fillColor: color,
                color: 'white',
                "name": name,
                "id_region": id_region,
                fillOpacity: 0.8,
                weight: region_weight,
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
        flyToStartPosition()
    };

    let ul = document.createElement('ul');
    ul.id = "select_region";
    ul.className = "list-two";
    li.appendChild(span);
    li.appendChild(ul);
    tree.appendChild(li);
}


function menu_create_region_item(region){
    var select_region = tree;
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
	    flyToRegion(region.getBounds().getCenter())
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

    span.onclick = async function () {
	    deleteLayersForDistrict(district.options.id_district);

        if (span.className == "closed hide"){
            let schools = await getSchools(district.options.id_district);

            if (!ul.childElementCount){
	            for (school of schools){
                    let school_li = document.createElement('li');
                    let school_span = document.createElement('span');
                    school_span.className = "list-four";
                    school_span.innerHTML+= school.oo_name;
                    school_span.setAttribute('coordinates', school.coordinates);
                    school_span.setAttribute('id_oo', school.id_oo);
                    school_span.onclick = function(){
                        let coordinates = this.getAttribute('coordinates')
                        coordinates = coordinates.split(",").map(str => parseFloat(str));
                        var latLon = new L.LatLng(coordinates[0], coordinates[1]);
                        flyToSchool(latLon);
                        map.once('moveend', ()=>openSchoolPopUp(this.getAttribute('id_oo')));
                    };
                    school_li.appendChild(school_span);
                    ul.appendChild(school_li);
                    create_marker(school.id_oo, district.options.id_region, district.options.id_district, school.coordinates);
                };
	        }
	        else{
	            for (school of schools){
                    create_marker(school.id_oo, district.options.id_region, district.options.id_district, school.coordinates);
                }
	        };
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
                        info.open = true
//                        if (!edit){
//
//                            this.pm.enable({
//                            allowSelfIntersection: true,
//                            });
//                            this.on('pm:edit', ({ layer }) => {
//                                console.log(layer.toGeoJSON().geometry.coordinates);
//                            })
//                        }
//                        edit = true
                        var menu_region_item = document.getElementById("span:id_region=" + this.options.id_region);
                        selectedTd = info_select
                        if (menu_region_item.className != "closed active open show"){
                            menu_region_item.click()
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
    // create_menu();
    await load_regions();
    regions_layers.addTo(map);
    await load_districts();
    districts_layers.addTo(map);


};

load_data();

function getSchools(id_district){
    return $.ajax({
        type : 'GET',
        url : `oo/get_by_district/${id_district}`
    });
};

function get_digital_by_id(id_oo){
    return $.ajax({
        type : 'GET',
        url : `digital/${id_oo}`
    });
};


function getSchoolInfo(id_oo){
    return $.ajax({
        type : 'GET',
        url : `info/${id_oo}`
    });
};

function get_all_growing_points(){
    return $.ajax({
        type : 'GET',
        url : "growing_points/get_all"
    });
};

function get_all_digital_items(){
    return $.ajax({
        type : 'GET',
        url : "digital/get_all"
    });
};

function create_marker(id_oo, id_region, id_district, coordinates){

    var marker = L.marker(coordinates, {"id_region": id_region, "id_district": id_district, "id_oo": id_oo});

    marker.bindPopup("",{autoClose:false});

    marker.on('click', async function(){
        if (!marker._popup._content){
            let info = await getSchoolInfo(id_oo);
            let text = create_text(info);
            marker._popup._content = text;
        }
        marker.openPopup();
    });

    markers.addLayer(marker);
};

function deleteAllMarkers(){
    markers.eachLayer(function(layer) {
        if (layer instanceof L.Marker){
            markers.removeLayer(layer);
        };
    })
};

function deleteLayersForDistrict(id_district){
    markers.eachLayer(function(layer) {
        if (layer instanceof L.Marker){
            if (layer.options.id_district == id_district){
                markers.removeLayer(layer);
            }
        };
    })
};

function openSchoolPopUp(id_oo){
    markers.eachLayer(function(layer) {
        if (layer instanceof L.Marker){
            if (layer.options.id_oo == id_oo){
		layer.getPane().firstChild.click()
            }
            else{
                layer.closePopup();
            }
        };
    })
};

function deleteLayersForRegion(id_region){
    markers.eachLayer(function(layer) {
        if (layer instanceof L.Marker){
            if (layer.options.id_region == id_region){
                markers.removeLayer(layer);
            }
        };
    })
};

function changeOpacity(value){
    regions_layers.eachLayer(function(layer) {
        if (layer instanceof L.Polygon && layer.options.type == "region"){
            layer.setStyle({
                fillOpacity: value
            });
        };
    })
};

function changeBorderWeight(value){
    regions_layers.eachLayer(function(layer) {
        if (layer instanceof L.Polygon && layer.options.type == "region"){
            layer.setStyle({
                weight: value
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
                    createFoundItem(item)
                }
            },
        });
    }
};


function createFoundItem(item){
    let div = document.createElement('div');
    div.className = 'menu-search__wrapper-item'
    div.innerHTML += "<p>" + item.oo_name + "</p>" + "<div>" + item.district_name + "</div>"
    div.onclick = function(){
        deleteAllMarkers();
        create_marker(item.id_oo, null, item.id_district, item.coordinates)
        markers.addTo(map);
        //flyToSchool(item.coordinates.split(";").map(str => parseFloat(str)))
        map.once('moveend', ()=>openSchoolPopUp(item.oo_name));
    }
    $("#search_result").append(div);
};

function flyToRegion(point){
    map.flyTo(point, 8.5)
}

function flyToRegionById(id_region){
    regions_layers.eachLayer(function(layer) {
        if (layer instanceof L.Polygon && layer.options.id_region == id_region){
            flyToRegion(layer.getBounds().getCenter())
            return
        };
    })
};

function flyToStartPosition(){
    map.flyTo(start_position, start_zoom);
};

function flyToSchool(latLon){
    map.flyTo(latLon, 16.5);
};

function create_marker(id_oo, id_region, id_district, coordinates){

    var marker = L.marker(coordinates, {"id_region": id_region, "id_district": id_district, "id_oo": id_oo});

    marker.bindPopup("", {autoClose:false});

    marker.on('click', async function(){
        if (!this._popup._content){
            let info = await getSchoolInfo(id_oo);
            let text = create_text(info, 0);
            this._popup._content = text;
        }
        this.openPopup();
    });

    markers.addLayer(marker);
};


async function create_digital_markers(parent){
    deleteAllMarkers()
    if (parent.open == false){
        current_filter = "digital"
        var digital_items = await get_all_digital_items()
        for (item of digital_items.items){

            var marker = L.marker(item.coordinates, {"id_oo": item.id_oo});

            marker.bindPopup("", {autoClose:false});

            marker.on('click', async function(){
                if (!this._popup._content){
                    let info = await getSchoolInfo(this.options.id_oo);
                    let text = create_text(info, 1);
                    this._popup._content = text;
                }
                this.openPopup();
            });
            markers.addLayer(marker);
        }
        markers.addTo(map);
    }
    else{
        current_filter = "info"
    }

};


async function create_growing_points_markers(parent){
    deleteAllMarkers()
    if (parent.open == false){
        current_filter = "growing_point"
        let growing_points = await get_all_growing_points()
        for (item of growing_points.items){
            var marker = L.marker(item.coordinates, {"id_oo": item.id_oo});
            marker.bindPopup("", {autoClose:false});
            marker.on('click', async function(){
                if (!this._popup._content){
                    let info = await getSchoolInfo(this.options.id_oo);
                    let text = create_text(info, 4);
                    this._popup._content = text;
                }
                this.openPopup();
            });

            markers.addLayer(marker);
        }
        markers.addTo(map);
    }
    else{
        current_filter = "info"
    }

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


info_select = info.querySelector('summary')
table.onclick = function(event) {
    let target = event.target;
    let flag = false
    if (target.className === 'menu-filter__title') {
        flag = true
    }
    if (target.className.baseVal === 'menu-filter__title-icon'){
        flag = true
        target = target.parentNode
    }
    if (target.tagName === 'path'){
        flag = true
        target = target.parentNode.parentNode
    }
    if (flag){
        deleteAllMarkers();
        if (target == selectedTd){
            if (target == info_select){
                for (let i = 0; i < tree.children.length; i++){
                    close_children(tree.children[i])

                    tree.children[i].children[0].className = "closed hide"
                    tree.children[i].children[1].hidden = true
                }
            }
            current_filter = "info";
            return
        };
        if(selectedTd){
            if (selectedTd == info_select){
                for (let i = 0; i < tree.children.length; i++){
                    close_children(tree.children[i])

                    tree.children[i].children[0].className = "closed hide"
                    tree.children[i].children[1].hidden = true
                };
            };
            console.log(selectedTd)
            selectedTd.parentNode.open = false;
        };
        selectedTd = target;
        current_filter = target.parentNode.id;
    }
};
