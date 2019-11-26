"use strict";

var locationForm = document.querySelector('#address-location');
var geoKey = 'API_KEY';
var map;
var marker;

function initialize() {
  console.log('init');
  var mapElement = document.getElementById('map');
  var myLatLng = {
    lat: 19.4326018,
    lng: -99.1332049
  };
  var mapOptions = {
    zoom: 11,
    // center: new google.maps.LatLng( 18.5204, 73.8567 ),
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
  var location = document.querySelector('#address-location-input').value;
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address: location,
      key: geoKey
    }
  }).then(function (res) {
    // Log res
    var latitude = res.data.results[0].geometry.location.lat;
    var longitude = res.data.results[0].geometry.location.lng;
    var latitudeOutput = "\n        <label>Latitude: </label>\n        <input type=\"text\" id=\"latitude-input\" value=\"".concat(latitude, "\" placeholder=\"").concat(latitude, "\" />\n      ");
    var longitudeOutput = "\n        <label>Longitude: </label>\n        <input type=\"text\" id=\"longitude-input\" value=\"".concat(longitude, "\" placeholder=\"").concat(longitude, "\" />\n      ");
    document.querySelector('#latitude').innerHTML = latitudeOutput;
    document.querySelector('#longitude').innerHTML = longitudeOutput;
    map.setCenter({
      lat: latitude,
      lng: longitude
    });
    map.setZoom(18);
    marker.setPosition({
      lat: latitude,
      lng: longitude
    });
    marker.setMap(map);
    console.log('setCenter');
  })["catch"](function (err) {
    console.log(err);
  });
}