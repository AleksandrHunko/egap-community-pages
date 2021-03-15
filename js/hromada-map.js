const setView = {
  coord: [48.447, 31.182],
  zoom: 6
}

const locations = [
  {
    lat: 49.80000517271609,
    lon: 30.328118562698368,
    description: 'Локація 1'
  },
  {
    lat: 49.70000517271609,
    lon: 30.428118562698368,
    description: 'Локація 2'
  }
]

const mainLocaton = {
  lat: 49.80000517271609,
  lon: 30.528118562698368,
  description: 'Адмінцентр'
}

const border = {"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[29.537,50.116656],[29.537,50.116656],[29.537,50.116656],[30.525607,50.095524],[30.525607,50.095524],[30.525607,50.095524],[31.151724,49.727751],[31.151724,49.727751],[31.151724,49.727751],[31.107786,48.817725],[31.107786,48.817725],[31.107786,48.817725],[30.163117,49.084585],[30.163117,49.084585],[30.163117,49.084585],[30.877111,49.292747],[30.877111,49.292747],[30.877111,49.292747],[29.493062,49.435798],[29.493062,49.435798],[29.493062,49.435798],[29.009743,49.88369],[29.009743,49.88369],[29.009743,49.88369],[29.537,50.116656]]]}}


window.addEventListener('load', function () {

  const map = L.map('hromada-info-map').setView(setView.coord, setView.zoom);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
    [mainLocaton.lat, mainLocaton.lon], 
    { 
      icon: bigIcon, 
      riseOnHover: true, 
      draggable: false 
    }
  ).addTo(map).bindPopup(
    mainLocaton.description, 
    { closeOnClick: false, autoClose: false }
  )

  for (let i = 0; i < locations.length; i++) {
    L.marker(
      [locations[i].lat, locations[i].lon], 
      { 
        icon: institutionIcon, 
        riseOnHover: true, 
        draggable: false 
      }
    ).addTo(map).bindPopup(
      locations[i].description, 
      { closeOnClick: false, autoClose: false }
    )
  }

  L.geoJSON(border).addTo(map);

})
