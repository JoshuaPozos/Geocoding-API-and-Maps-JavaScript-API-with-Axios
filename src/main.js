const locationForm = document.querySelector('#address-location');
const geoKey = 'API_KEY';
let map;
let marker;
function initialize() {
  console.log('init');
  let mapElement = document.getElementById('map');
  const myLatLng = { lat: 19.4326018, lng: -99.1332049 };
  let mapOptions = {
    zoom: 11,
    center: myLatLng
  };
  map = new google.maps.Map(mapElement, mapOptions);
  marker = new google.maps.Marker({
    position: myLatLng,
    animation: google.maps.Animation.DROP,
    map: map
  });
}

if (locationForm) {
  locationForm.addEventListener('submit', geocode);
}

function geocode(e) {
  e.preventDefault();

  const location = document.querySelector('#address-location-input').value;

  axios
    .get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: location,
        key: geoKey
      }
    })
    .then(res => {
      const latitude = res.data.results[0].geometry.location.lat;
      const longitude = res.data.results[0].geometry.location.lng;

      const latitudeOutput = `
        <label>Latitude: </label>
        <input type="text" id="latitude-input" value="${latitude}" placeholder="${latitude}" />
      `;

      const longitudeOutput = `
        <label>Longitude: </label>
        <input type="text" id="longitude-input" value="${longitude}" placeholder="${longitude}" />
      `;

      document.querySelector('#latitude').innerHTML = latitudeOutput;
      document.querySelector('#longitude').innerHTML = longitudeOutput;

      map.setCenter({ lat: latitude, lng: longitude });
      map.setZoom(18);
      marker.setPosition({ lat: latitude, lng: longitude });
      marker.setMap(map);
    })
    .catch(err => {
      console.log(err);
    });
}
