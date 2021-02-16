let platform = new H.service.Platform({
  'apikey': '6GP-tCfv6VLFFMu1OS-D9nhf9S50Csyw5kiTSccNmXk'
});



function landmarkGeocode() {
  let title = document.querySelector('h1').textContent;
  let geocoder = platform.getSearchService(),
      landmarkGeocodingParameters = {
        q: title,
        at: '0,0',
        limit: 1
      };

  geocoder.discover(
    landmarkGeocodingParameters,
    showMap,
    (e) => console.log(e)
  );
}

function showMap(result)
{
  let location = result.items[0].position;
  console.log(location);
  let defaultLayers = platform.createDefaultLayers();
  // Instantiate (and display) a map object:
  let map = new H.Map(
    document.querySelector('.map'),
    defaultLayers.vector.normal.map,
    {
      zoom: 15,
      center: { lat: location.lat, lng: location.lng }
    });
  let locMarker = new H.map.Marker({lat:location.lat, lng:location.lng});
  map.addObject(locMarker);

  let ui = H.ui.UI.createDefault(map, defaultLayers);
}

landmarkGeocode();