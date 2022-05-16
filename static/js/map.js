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
        for (coord of coordinates){
            var polygon = L.polygon(coord, {color: "#4747A1", "name": name});
            polygon.bindTooltip(name,
               {permanent: false, direction: "center"}
            ).openTooltip()
            polygon.addTo(map);

        };
    };
});

function getSchoolsCoordinates(polygon){
    send_data = {
            year: 2022,
            id_parallels: polygon.options.id_parallels,
            id_subjects: polygon.options.id_subjects,
            id_report: polygon.options.id_report,
            district_name: polygon.options.name
    }
    return $.ajax({

        type : 'GET',
        url : "api/select/map/get_oo_info/",
        data: send_data
    });
};