const mymap = L.map('mapid');
const tileUrl =
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
mymap.setView([0, 0], 1);

const tiles = L.tileLayer(tileUrl, {
  attribution
});
tiles.addTo(mymap);


// get response data
async function getData() {
  const response = await fetch('/api');
  const data = await response.json();
  console.log(data);
  for (item of data) {
    let marker = L.marker([item.lat, item.lng]).addTo(mymap);
    const info = `The weather here at latitude: ${item.lat}, longitude: ${item.lng} is ${item.darksky.sumary} with temperature: ${item.darksky.temperature}&deg;. And
    last concentration of particulate matter (${item.aq.parameter}) is ${item.aq.value}${item.aq.unit}`;

    marker.bindPopup(info);
  }
}
getData();