let edit = false
let size_popup = {
    0: "340px",
    1: "340px",
    2: "650px",
    3: "650px",
    4: "340px",
}

let tabs_routs = {
    "ege": getEgeSchools,
    "base": getBaseSchools,
    "vpr": getVprSchools
}
let duration_to_region = null;
let duration_to_school = 1.25;

let info = document.getElementById('info');
var tree = document.getElementById('tree');
var ege = document.getElementById('ul_ege');
var vpr = document.getElementById('ul_vpr');
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
    [48.03401915864286,73.828125],
    [48.03401915864286, 90.9228515625],
    [56.8609857506449, 90.9228515625],
    [56.8609857506449, 73.828125],
    [48.03401915864286, 73.828125]
];


window_height = $(window).height();
window_width = $(window).width();

if (window_width <= 1580) {
    start_zoom = 6.75;
    region_weight = 3;
}

if (window_width == 768) {
    start_zoom = 5.8;
    region_weight = 2;
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
        duration_to_school = 1.5;

    };
    if (zoom >=10.5 && zoom < 12.5) {
        changeOpacity(0.6)

        duration_to_region = 1.5
        if (this_polygon != null){
            this_polygon.setStyle({
                fillOpacity: 0.3
            });
            this_polygon._path.setAttribute('filter', 'drop-shadow(3px 5px 2px rgb(0 0 0 / 0.8))');
        };
    };
    if (zoom >=12.5 && zoom < 14) {
        changeOpacity(0.4)
        duration_to_region = 2
        if (this_polygon != null){
            this_polygon.setStyle({
                fillOpacity: 0
            });
            this_polygon._path.removeAttribute('filter');
        };
    };
    if (zoom >= 14) {
        changeOpacity(0.2)
        duration_to_school = null;
        duration_to_region = null
    };
    if (zoom < 9.5) {
        changeOpacity(0.8)
        duration_to_region = null
        duration_to_school = 1.25;
    };
//    if (zoom < 7.5) {
//        changeBorderWeight(1)
//    };
})

var markers = L.markerClusterGroup({singleMarkerMode: true})
var committee_markers = L.markerClusterGroup()
markers.addTo(map);
committee_markers.addTo(map);

let regions_layers = L.layerGroup()
let districts_layers = L.layerGroup()


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
            menu_create_region_item(polygon, tree, "base");
        };
        return
    });
};


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
                menu_create_district_item(polygon, 'base');
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
                        var menu_region_item = document.getElementById("span_base:id_region=" + this.options.id_region);
                        selectedTd = info_select
                        if (menu_region_item.className != "closed active open show"){
                            menu_region_item.click()
                        }
                        var menu_district_item = document.getElementById("base_id_district=" + this.options.id_district);
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

function getBaseSchools(id_district){
    return $.ajax({
        type : 'GET',
        url : `oo/get_by_district/${id_district}`
    });
};


function getEgeSchools(){
    return $.ajax({
        type : 'GET',
        url : `ege/get_all`
    });
};


function getVprSchools(){
    return $.ajax({
        type : 'GET',
        url : `vpr/get_all`
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

function get_committee_info(id_district){
    return $.ajax({
        type : 'GET',
        url : `committee/get_by_id/${id_district}`
    });
}

function get_committee_coordinates(id_district){
    return $.ajax({
        type : 'GET',
        url : `committee/get_coordinates/${id_district}`
    });
}


function deleteAllMarkers(){
    markers.eachLayer(function(layer) {
        if (layer instanceof L.Marker){
            markers.removeLayer(layer);
        };
    })
    committee_markers.eachLayer(function(layer) {
        if (layer instanceof L.Marker){
            committee_markers.removeLayer(layer);
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
    committee_markers.eachLayer(function(layer) {
        if (layer instanceof L.Marker){
            if (layer.options.id_district == id_district){
                committee_markers.removeLayer(layer);
            }
        };
    })
};
let found;
function openSchoolPopUp(id_oo){
    markers.eachLayer(function(layer) {
        if (layer instanceof L.Marker){
            if (layer.options.id_oo == id_oo){
                setTimeout(function(){}, 200);
                found = map.getPane(layer)._icon
                while (!found){
                    found = map.getPane(layer)._icon
                };
		        found.click()
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
    committee_markers.eachLayer(function(layer) {
        if (layer instanceof L.Marker){
            if (layer.options.id_region == id_region){
                committee_markers.removeLayer(layer);
                console.log(123)
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
    if (value.length > 0){
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
    div.innerHTML += "<p>" + item.oo_name + "</p>" + "<div>" + item.district_name +', ' + item.oo_address + "</div>"
    div.onclick = async function(){
        deleteAllMarkers();
        flyToSchool(item.coordinates);

        map.once('moveend', function(){
            create_marker(item.id_oo, null, null, item.coordinates, 0);
            markers.addTo(map);
            setTimeout(function(){}, 200);
            openSchoolPopUp(item.id_oo)
        });
    }
    $("#search_result").append(div);
};

function flyToRegion(point){
    map.flyTo(point, 8.5, {animate: true, duration: duration_to_region})
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
    map.flyTo(latLon, 16.5, {animate: true, duration: duration_to_school});
};

function create_committee_marker(item){
    var marker = L.marker(item.coordinates, {
        "id_district": item.id_district,
        "id_region": item.id_region,
        icon: customIcon
    });
    marker.bindPopup("", {autoClose:false});

    marker.on('click', async function(){
        if (!this._popup._content){
            let info = await get_committee_info(this.options.id_district);
            let text = create_committee_text(info, 0);
            this._popup._content = text;
        }
        this.openPopup();
        let popup = this.getPopup().getPane()
        popup.onclick = function(){
            let tabheader = this.firstChild.firstChild.firstChild.firstChild.firstChild
            for (let i = 0; i < tabheader.children.length; i++){
                if (tabheader.children[i].className == "tabheader-item tabheader-item__active"){
                    this.firstChild.firstChild.setAttribute(
                        'style',
                        `min-width: ${size_popup[i]};`
                    )
                }
            }
        }
    });

    committee_markers.addLayer(marker);

};


function create_marker(id_oo, id_region, id_district, coordinates, active_tab){

    var marker = L.marker(coordinates, {
        "id_region": id_region,
        "id_district": id_district,
        "id_oo": id_oo,
        "active_tab": active_tab
    });

    marker.bindPopup("", {autoClose:false});

    marker.on('click', async function(){
        if (!this._popup._content){
            let info = await getSchoolInfo(this.options.id_oo);
            let text = create_text(info, active_tab);
            this._popup._content = text;
        }

        let popup = this.getPopup().getPane()
        this.openPopup();
        popup.onclick = function(){
            let tabheader = this.firstChild.firstChild.firstChild.firstChild.firstChild
            for (let i = 0; i < tabheader.children.length; i++){
                if (tabheader.children[i].className == "tabheader-item tabheader-item__active"){
                    this.firstChild.firstChild.setAttribute(
                        'style',
                        `min-width: ${size_popup[i]};`,
                    )
                }
            }
        }
    });

    markers.addLayer(marker);
};


async function create_digital_markers(parent){
    deleteAllMarkers()
    if (parent.open == false){
        current_filter = "digital"
        var digital_items = await get_all_digital_items()
        for (item of digital_items.items){
            create_marker(item.id_oo, null, null, item.coordinates, 1)
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
            create_marker(item.id_oo, null, null, item.coordinates, 4)
        }
        markers.addTo(map);
    }
    else{
        current_filter = "info"
    }

};


async function create_ege_markers(parent){
    deleteAllMarkers()
    if (parent.open == false){
        current_filter = "ege"
        let ege_points = await getEgeSchools()
        for (item of ege_points.items){
            create_marker(item.id_oo, null, null, item.coordinates, 2)
        }
        markers.addTo(map);
    }
    else{
        current_filter = "info"
    }

};


async function create_vpr_markers(parent){
    deleteAllMarkers()
    if (parent.open == false){
        current_filter = "vpr"
        let vpr_points = await getVprSchools()
        for (item of vpr_points.items){
            create_marker(item.id_oo, null, null, item.coordinates, 3)
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
    if (target.className.baseVal === 'menu-filter__title-icon' ){
        flag = true
        target = target.parentNode
    }
    if (target.className === 'menu-filter__title-description' ){

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
            selectedTd.parentNode.open = false;
        };
        selectedTd = target;
        current_filter = target.parentNode.id;
    }
};
