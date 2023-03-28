var newYorkCoords = [40.73, -74.0059];
var mapZoomLevel = 12;

// Create the createMap function.
function createMap(layerGroup){
  // Create the tile layer that will be the background of our map.
  var streetMapTiles=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

  // Create a baseMaps object to hold the lightmap layer.
  var baseMapLayersObject={'streetmap': streetMapTiles};

  // Create an overlayMaps object to hold the bikeStations layer.
  var overlayLayersObject={'bikes': layerGroup};

  // Create the map object with options.
  var myMap=L.map('map-id', {
    'center': newYorkCoords, 
    'zoom': mapZoomLevel, 
    'layers': [streetMapTiles]
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMapLayersObject, overlayLayersObject).addTo(myMap);

}; 

// Create the createMarkers function.
function createMarkers(data){

  // Pull the "stations" property from response.data.
  var stationsArray=data['data']['stations'];

  // Initialize an array to hold the bike markers.
  var bikeMarkerArray=[];

  // Loop through the stations array.
  for (let i=0; i<stationsArray.length; i++){  
    // For each station, create a marker, and bind a popup with the station's name.
    let currentStation=stationsArray[i];
    // L.marker([lat, lon])
    // Add the marker to the bikeMarkers array.
    bikeMarkerArray.push(L.marker([currentStation['lat'], currentStation['lon']]));
  }; 

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  var bikeMarkerLayerGroup=L.layerGroup(bikeMarkerArray);

  createMap(bikeMarkerLayerGroup);
};

// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
// d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json")
d3.json('static/data/station_information.json').then(createMarkers);





