window.addEventListener('load', function () {


    // hromada-map
    if (document.querySelector("#hromada-info-map") != null) {

        const map = L.map('hromada-info-map').setView(setView.coord, setView.zoom);

        L.tileLayer('https://tiles.openstreetmap.org.ua/osm/{z}/{x}/{y}.png', {
            attribution: '<a href="https://www.minregion.gov.ua/" rel="nofollow" target="_blank">Мінрегіон</a>; <a href="https://github.com/tomchadwin/qgis2web" target="_blank" rel="nofollow">qgis2web</a> &middot; <a href="https://qgis.org" rel="nofollow" target="_blank">QGIS</a> &copy; <a href="https://tiles.openstreetmap.org.ua/#6/48.959/32.311" rel="nofollow" target="_blank">OSM UA volunteer\'s server</a>',
        }).addTo(map);

        const institutionIcon = L.icon({
            iconUrl: 'https://api.tiles.mapbox.com/v3/marker/pin-m-warehouse+1BCFC4.png',
            iconSize: [30, 70]
        });

        const bigIcon = L.icon({
            iconUrl: 'https://api.tiles.mapbox.com/v3/marker/pin-l-town-hall+FF831A.png',
            iconSize: [35, 90]
        });

        L.marker(
            [
                mainLocaton.lat,
                mainLocaton.lon
            ],
            {
                icon: bigIcon,
                riseOnHover: true,
                draggable: false
            }
        ).addTo(map).bindPopup(
            mainLocaton.description,
            {
                closeOnClick: false,
                autoClose: false
            }
        )

        geoAreas.forEach(function (element) {
            var polygon = L.polygon(element, {
                weight: 5,
                color: '#1699B4',
                fill: true,
                fillColor: '#1ACEC4',
            }).addTo(map);
        });

        for (let i = 0; i < locations.length; i++) {
            L.marker(
                [
                    locations[i].lat,
                    locations[i].lon
                ],
                {
                    icon: institutionIcon,
                    riseOnHover: true,
                    draggable: false
                }
            ).addTo(map).bindPopup(
                locations[i].description,
                {
                    closeOnClick: false,
                    autoClose: false
                }
            )
        }
    }


    // cnap-map
    if (document.querySelector("#cnap-map") != null) {
        const map = L.map('cnap-map').setView(setView.coord, setView.zoom);

        L.tileLayer('https://tiles.openstreetmap.org.ua/osm/{z}/{x}/{y}.png', {
            attribution: '<a href="https://www.minregion.gov.ua/" rel="nofollow" target="_blank">Мінрегіон</a>; <a href="https://github.com/tomchadwin/qgis2web" target="_blank" rel="nofollow">qgis2web</a> &middot; <a href="https://qgis.org" rel="nofollow" target="_blank">QGIS</a> &copy; <a href="https://tiles.openstreetmap.org.ua/#6/48.959/32.311" rel="nofollow" target="_blank">OSM UA volunteer\'s server</a>',
        }).addTo(map);

        const institutionIcon = L.icon({
            iconUrl: 'https://api.tiles.mapbox.com/v3/marker/pin-m-warehouse+1BCFC4.png',
            iconSize: [30, 70]
        });

        for (let i = 0; i < locations.length; i++) {
            L.marker(
                [
                    locations[i].lat,
                    locations[i].lon
                ],
                {
                    icon: institutionIcon,
                    riseOnHover: true,
                    draggable: false
                }
            ).addTo(map).bindPopup(
                locations[i].description,
                {
                    closeOnClick: false,
                    autoClose: false
                }
            )
        }
    }


    // rozdil-map
    if (document.querySelector("#rozdil-info-map") != null) {
        const map = L.map('rozdil-info-map').setView(setView.coord, setView.zoom);

        L.tileLayer('https://tiles.openstreetmap.org.ua/osm/{z}/{x}/{y}.png', {
            attribution: '<a href="https://www.minregion.gov.ua/" rel="nofollow" target="_blank">Мінрегіон</a>; <a href="https://github.com/tomchadwin/qgis2web" target="_blank" rel="nofollow">qgis2web</a> &middot; <a href="https://qgis.org" rel="nofollow" target="_blank">QGIS</a> &copy; <a href="https://tiles.openstreetmap.org.ua/#6/48.959/32.311" rel="nofollow" target="_blank">OSM UA volunteer\'s server</a>',
        }).addTo(map);

        const institutionIcon = L.icon({
            iconUrl: 'https://api.tiles.mapbox.com/v3/marker/pin-s-building+0BBFFF.png',
            iconSize: [30, 70]
        });

        for (let i = 0; i < locations.length; i++) {
            L.marker(
                [
                    locations[i].lat,
                    locations[i].lon
                ],
                {
                    icon: institutionIcon,
                    riseOnHover: true,
                    draggable: false
                }
            ).addTo(map).bindPopup(
                locations[i].description,
                {
                    closeOnClick: false,
                    autoClose: false
                }
            )
        }
    }
});