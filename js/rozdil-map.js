const setView = {
  coord: [48.447, 31.182],
  zoom: 6
}

const locations = [
  {
    lat: 49.80000517271609,
    lon: 30.328118562698368,
    description: 'ЦНАП'
  },
  {
    lat: 49.70000517271609,
    lon: 30.428118562698368,
    description: 'ЦНАП 2'
  }
]

window.addEventListener('load', function () {

  const map = L.map('rozdil-info-map').setView(setView.coord, setView.zoom);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const institutionIcon = L.icon({
    iconUrl: 'https://api.tiles.mapbox.com/v3/marker/pin-s-building+0BBFFF.png',
    iconSize: [30, 70]
  });

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

})