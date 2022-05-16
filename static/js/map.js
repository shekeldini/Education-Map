console.log("hi");
var map = L.map('map').fitWorld();

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
//    maxZoom: 20,
//    subdomains:['mt0','mt1','mt2','mt3']
//});
//googleStreets.addTo(map);
map.setView(new L.LatLng(52.61558902526749, 83.57275390625), 7);
$.getJSON("static/files/districts.json", function(json) {
    for(district of json){
        var name = district.name
        var coordinates = district.coordinates
        var id_district = district.id_district
        for (coord of coordinates){
            var polygon = L.polygon(coord, {
                color: "#4747A1",
                "name": name,
                "id_district": id_district
            });
            polygon.bindTooltip(name,
               {permanent: false, direction: "center"}
            ).openTooltip()
            polygon.addTo(map);
            polygon.on('click', async function () {
                var schools = await getSchools(this);
                for (school of schools){
                    create_marker(school);
                };
            });
        };
    };
});

function getSchools(polygon){
    send_data = {
        year: 2022,
        id_district: polygon.options.id_district
    }
    return $.ajax({
        type : 'GET',
        url : "oo/get_all_by_year_and_id_district/",
        data: send_data
    });
};

async function create_marker(school){
    var marker = L.marker(coordinates, {
        "name": name,
        "value": value,
        'color': color,
        "oo_login": oo_login,
        "coordinates": coordinates,
        "district": district,
        "text": text
    });
    if (marker.options.value == "Не учавстовал"){
        var text = "<p>" + marker.options.district + "</p>" +
            "<p>" + marker.options.name + "</p>" +
            "<p>" + marker.options.value.toString() + "</p>";
    }
    else {
        var text = "<p>" + marker.options.district + "</p>" +
            "<p>" + marker.options.name + "</p>" +
            "<p>" + marker.options.text + marker.options.value.toString() + "</p>";
    }


    marker.bindPopup(text, {autoClose:false}).openPopup();

    marker.on('click', function(){
        // console.log(this.options);
        marker.openPopup();
    });
    marker.addTo(map);
};