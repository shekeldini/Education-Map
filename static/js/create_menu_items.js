function menu_create_region_item(region, element, key){
    let li = document.createElement('li');
    let ul = document.createElement('ul');
    let span = document.createElement('span');
    span.innerHTML += region.options.name;
    span.id = `span_${key}:id_region=${region.options.id_region}`;
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
    ul.id = `${key}_id_region=${region.options.id_region}`;
    ul.className = "list-three";
    ul.hidden = true;
    li.appendChild(span);
    li.appendChild(ul);
    element.appendChild(li);
}

function menu_create_district_item(district, key){
    var selected_region = document.getElementById(`${key}_id_region=${district.options.id_region}`);
    let li = document.createElement('li');
    let span = document.createElement('span');
    span.innerHTML += district.options.name;
    span.className = "closed hide";
    span.id = `${key}_id_district=${district.options.id_district}`;
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
            let route = tabs_routs[key]
            let schools = await route(district.options.id_district);

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
                        let id_oo = this.getAttribute('id_oo')
                        map.once('moveend', function(e){
                            openSchoolPopUp(id_oo)
                        });
                    };
                    school_li.appendChild(school_span);
                    ul.appendChild(school_li);
                    create_marker(school.id_oo, district.options.id_region, district.options.id_district, school.coordinates, 0);
                };
	        }
	        else{
	            for (school of schools){
                    create_marker(school.id_oo, district.options.id_region, district.options.id_district, school.coordinates, 0);
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