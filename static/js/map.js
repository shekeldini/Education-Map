var map = L.map('map').fitWorld();

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
map.setView(new L.LatLng(52.61558902526749, 83.57275390625), 7);
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
            var polyline = L.polygon(coordinates, {
                color: color,
                "name": name,
                fillOpacity: 0.25,
                weight: 4
            });
            polyline.addTo(map);
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
            for (coord of coordinates){
                var polygon = L.polygon(coord, {
                    color: "#139BF0",
                    "name": name,
                    "id_district": id_district,
                    fillOpacity: 0,
                    weight: 1
                });
                polygon.bindTooltip(name,
                   {permanent: false, direction: "center"}
                ).openTooltip()
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
                 "<div>" + 'Адрес' + "</div>" +
                 "<div class='address'>" + marker.options.oo_address + "</div>" +
            "</div>" +
            "<div class='block'>" +
                 "<div>" + 'Директор' + "</div>" +
                 "<div class='director'>" + marker.options.director + "</div>" +
            "</div>" +
            "<div class='block'>" +
                 "<div>" + 'Почта' + "</div>" +
                 "<div class='oo'>" + marker.options.email_oo + "</div>" +
            "</div>" +
            "<div class='block'>" +
                 "<div>" + 'Телефон' + "</div>" +
                 "<div class='phone'>" + marker.options.phone_number + "</div>" +
            "</div>" +
            "<div class='block'>" +
                 "<div>" + 'Сайт' + "</div>" +
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
