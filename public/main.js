let lat, lng, darksky, aq;

function setup() {

  // initially get our location if geolocation works
  if ("geolocation" in navigator) {
    console.log('geolocation works');
    getLoc();
  } else {
    console.log('geolocation now works');
  }

}

// functio for get our location
function getLoc() {
  navigator.geolocation.getCurrentPosition(async position => {
    try {
      lat = position.coords.latitude;
      lng = position.coords.longitude;
      document.getElementById('lat').textContent = lat;
      document.getElementById('lng').textContent = lng;
      let weather_api = `/weather/${lat},${lng}`;
      // let dark_api = `/weather`;
      let fetch_api = await fetch(weather_api);
      let weather = await fetch_api.json();
      console.log(weather);
      darksky = weather.darksky.currently;
      aq = weather.aq.results[0].measurements[0];
      document.getElementById('sum').textContent = darksky.summary;
      document.getElementById('tmp').textContent = darksky.temperature;
      document.getElementById('param').textContent = aq.parameter;
      document.getElementById('val').textContent = aq.value;
      document.getElementById('unit').textContent = aq.unit;

      // if there an error in try scope, it will skip the other code and jump to catch so the code before error still got executed

    } catch (error) {
      console.error(error);
      document.getElementById('no-read').textContent = 'NO READING FOR WEATHER!';
    }
  });
}


// send our location with post via fest json to server
async function postLoc() {
  let data = {
    lat,
    lng,
    darksky,
    aq
  };

  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  let response = await fetch('/api', options);
  let res = await response.json();
  console.log(res);
}