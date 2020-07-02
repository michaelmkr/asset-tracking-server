const hardcodedLocations = [
  {
    id: 0,
    lat: 48.2138508,
    lng: 15.6296502,
  },
  {
    id: 1,
    lat: 50.9412818,
    lng: 6.9560927,
  },
  {
    id: 2,
    lat: 43.7669973,
    lng: 11.2459052,
  },
];

const details = [
  {
    id: 0,
    location: {
      lat: 48.2138508,
      lng: 15.6296502,
      timestamp: 1589444836,
    },
    allowedLocation: {
      lat: 48.2138508,
      lng: 15.6296502,
      radius: 1,
    },
    name: 'FH St. Pölten',
    customer: 'FH St. Pölten GmbH',
    validUntil: '15.05.2021',
  },
  {
    id: 1,
    location: {
      lat: 50.9412818,
      lng: 6.9560927,
      timestamp: 1589444836,
    },
    allowedLocation: {
      lat: 50.9412818,
      lng: 6.9560927,
      radius: 3,
    },
    name: 'Kölner Dom',
    customer: 'Stadt Köln',
    validUntil: '15.05.2021',
  },
  {
    id: 2,
    location: {
      lat: 43.7669973,
      lng: 11.2459052,
      timestamp: 1589444836,
    },
    allowedLocation: {
      lat: 43.7669973,
      lng: 11.2459052,
      radius: 5,
    },
    name: 'Basilica di Santa Croce di Firenze',
    customer: 'Stadt Florenz in Italien',
    validUntil: '15.05.2021',
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
ALSO --> LOCATION HISTORY = PATH
ACTIVE / INACTIVE

Advantage of the Blockchain -> a good showcase -> Drone showcase

*/

async function getAll() {
  // const result = await LocationController.assist(data);
  return hardcodedLocations;
}

async function getId(id) {
  return details.find(x => x.id === Number(id));
}

module.exports = {
  getAll,
  getId,
};
