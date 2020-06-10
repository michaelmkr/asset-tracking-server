const hardcodedLocations = [
  {
    id: 0,
    lat: 7.21456,
    lng: 7.21456,
  },
  {
    id: 1,
    lat: 7.21796,
    lng: 7.36456,
  },
  {
    id: 2,
    lat: 7.79856,
    lng: 7.35914,
  },
];

// Infos from BC
// lat
// long
// timestamp
// isSet
// isActive

/*
{
  "id": 5213848,
  "location": {
    "lat": 1,
    "lng": 2,
    "timestamp": 1589444836
},
  "allowedLocation": {
    "lat": 1,
    "lng": 2,
    "radius": 5
},
  "customer": "Casino Baden",
  "valid-until": "15.05.2021"
}
*/

async function getAll() {
  // const result = await LocationController.assist(data);
  return hardcodedLocations;
}

async function getId(id) {
  return hardcodedLocations.find(x => x.id === Number(id));
}

module.exports = {
  getAll,
  getId,
};
