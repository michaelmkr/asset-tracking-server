const haversine = require('haversine');
const blockchain = require('../interfaces/blockchain');

const details = [
  {
    id: 0,
    location: {
      lat: 48.2139233,
      lng: 15.6316765,
      timestamp: 1611569866775,
    },
    allowedLocation: {
      lat: 48.2139233,
      lng: 15.6316765,
      radius: 0.05,
    },
    name: 'Crypdrone',
    customer: 'FH St. Pölten GmbH',
    validUntil: '15.05.2021',
    active: true,
    history: [
      {
        lat: 48.2139233,
        lng: 15.6316765,
        timestamp: 1593712794109,
      },
      {
        lat: 48.2134274,
        lng: 15.6313857,
        timestamp: 1593712794111,
      },
      {
        lat: 48.2132934,
        lng: 15.6311733,
        timestamp: 1593712794112,
      },
      {
        lat: 48.2130776,
        lng: 15.6317809,
        timestamp: 1593712794113,
      },
      {
        lat: 48.2130776,
        lng: 15.6317809,
        timestamp: 1593712794115,
      },
      {
        lat: 48.2139233,
        lng: 15.6316765,
        timestamp: 1593712794118,
      },
    ],
  },
  {
    id: 1,
    location: {
      lat: 50.9412818,
      lng: 6.9560927,
      timestamp: 1593712794109,
    },
    allowedLocation: {
      lat: 50.9412818,
      lng: 6.9560927,
      radius: 3,
    },
    name: 'Kölner Dom',
    customer: 'Stadt Köln',
    validUntil: '15.05.2021',
    active: true,
    history: [
      {
        lat: 50.9412818,
        lng: 6.9560927,
        timestamp: 1593712794109,
      },
      {
        lat: 50.9422818,
        lng: 6.9570927,
        timestamp: 1593712794109,
      },
      {
        lat: 50.9432818,
        lng: 6.9580927,
        timestamp: 1593712794109,
      },
      {
        lat: 50.9432818,
        lng: 6.9600927,
        timestamp: 1593712794109,
      },
    ],
  },
  {
    id: 2,
    location: {
      lat: 43.7669973,
      lng: 11.2459052,
      timestamp: 1593712794109,
    },
    allowedLocation: {
      lat: 43.7669973,
      lng: 11.2459052,
      radius: 5,
    },
    name: 'Basilica di Santa Croce di Firenze',
    customer: 'Stadt Florenz in Italien',
    validUntil: '15.05.2021',
    active: false,
    history: [
      {
        lat: 43.7669973,
        lng: 11.2459052,
        timestamp: 1593712794109,
      },
      {
        lat: 43.7657973,
        lng: 11.2447052,
        timestamp: 1593712794109,
      },
    ],
  },
  {
    id: 3,
    location: {
      lat: 48.2610,
      lng: 15.7210,
      timestamp: 1602691906161,
    },
    allowedLocation: {
      lat: 48.2819,
      lng: 15.7122,
      radius: 1.0,
    },
    name: 'Microcontroller',
    customer: 'Christoph Braun',
    validUntil: '15.05.2021',
    active: true,
    history: [
      {
        lat: 48.2820,
        lng: 15.7123,
        timestamp: 1593712794109,
      },
      {
        lat: 48.2810,
        lng: 15.7110,
        timestamp: 1593712794109,
      },
      {
        lat: 48.2750,
        lng: 15.7270,
        timestamp: 1593712794109,
      },
      {
        lat: 48.2650,
        lng: 15.7240,
        timestamp: 1593712794109,
      },
      {
        lat: 48.2610,
        lng: 15.7210,
        timestamp: 1593712794109,
      },
    ],
  },
  {
    id: 4,
    location: {
      lat: 48.2125139,
      lng: 15.6304385,
      timestamp: 1611569824036,
    },
    allowedLocation: {
      lat: 48.2139233,
      lng: 15.6316765,
      radius: 0.05,
    },
    name: 'Research Drohne',
    customer: 'FH St. Pölten GmbH',
    validUntil: '15.05.2021',
    active: true,
    history: [
      {
        lat: 48.2125139,
        lng: 15.6304385,
        timestamp: 1593712794109,
      },
      {
        lat: 48.2139233,
        lng: 15.6316765,
        timestamp: 1593712794111,
      },
    ],
  },
];

const latCell = {
  timestamp: 0,
  value: 0,
};

const lonCell = {
  timestamp: 0,
  value: 0,
};

const latGps = {
  timestamp: 0,
  value: 0,
};

const lonGps = {
  timestamp: 0,
  value: 0,
};

/*
Infos from BC
lat
long
timestamp
isSet
isActive

ALSO --> LOCATION HISTORY = PATH
ACTIVE / INACTIVE
Advantage of the Blockchain -> a good showcase -> Drone showcase
*/

async function getAll() {
  const locations = [];
  details.forEach((element) => {
    let isInZone = false;
    const start = { latitude: element.location.lat, longitude: element.location.lng };
    const end = { latitude: element.allowedLocation.lat, longitude: element.allowedLocation.lng };
    const distance = haversine(start, end);
    if (distance < element.allowedLocation.radius) {
      isInZone = true;
    }

    locations.push(
      {
        id: element.id,
        lat: element.location.lat,
        lng: element.location.lng,
        active: element.active,
        isInZone,
      },
    );
  });
  return locations;
}

async function getId(id) {
  return details.find(x => x.id === Number(id));
}

async function updateDetails(payload) {
  if (details.find(x => x.id === Number(payload.id))) {
    const index = details.findIndex(element => element.id === payload.id);
    details[index] = payload;
    console.log(index);
    return '200 OK';
  }
  return '422 invalid id';
}

function checkForLocationUpdate(id, lat, lng, timestamp) {
  console.log('updating data:\n', lat, lng, timestamp);
  const start = { latitude: details[id].location.lat, longitude: details[id].location.lng };
  const end = { latitude: lat, longitude: lng };
  const distance = haversine(start, end);
  console.log(`distance between old and new coordinates is ${distance} kilometers`);

  if (distance > 0.001) {
    console.log('needs to be updated!!');
    const location = {
      lat: details[id].location.lat,
      lng: details[id].location.lng,
      timestamp: details[id].location.timestamp,
    };
    details[id].history.push(location);

    details[id].location.lat = lat;
    details[id].location.lng = lng;
    details[id].location.timestamp = timestamp;
    // TODO Send Data to Smart Contract
    blockchain.encodeData(id, lat, lng, timestamp);
  } else if (distance < 0.001) {
    console.log('no need to be updated!!');
  }
}

function updateMqttData() {
  const id = 3;
  if (latGps.value === 0.0000 || lonGps.value === 0.0000) {
    console.log('GPS is 0.0000');
    if (Math.abs(latCell.timestamp - lonCell.timestamp) > 2000) {
      console.log('more than 1 second between updates - not updating');
    } else if (Math.abs(latCell.timestamp - lonCell.timestamp) < 2000) {
      console.log('less than 1 second between updates - passing data to next function');
      checkForLocationUpdate(id, latCell.value, lonCell.value, Math.max(latCell.timestamp, lonCell.timestamp));
    }
  } else if (latGps.value !== 0.0000 || lonGps.value !== 0.0000) {
    console.log('GPS is not 0.0000');
    if (Math.abs(latGps.timestamp - lonGps.timestamp) > 2000) {
      console.log('more than 1 second between updates - not updating');
    } else if (Math.abs(latGps.timestamp - lonGps.timestamp) < 2000) {
      console.log('less than 1 second between updates - passing data to next function');
      checkForLocationUpdate(id, latGps.value, lonGps.value, Math.max(latGps.timestamp, lonGps.timestamp));
    }
  }
}


function onMqttDataReceived(topic, message, date) {
  // eslint-disable-next-line default-case
  switch (topic.toString()) {
    case 'fhstplocationtracking/latCell':
      latCell.value = parseFloat(message.toString());
      latCell.timestamp = date;
      updateMqttData();
      break;
    case 'fhstplocationtracking/lonCell':
      lonCell.value = parseFloat(message.toString());
      lonCell.timestamp = date;
      updateMqttData();
      break;
    case 'fhstplocationtracking/latGps':
      latGps.value = parseFloat(message.toString());
      latGps.timestamp = date;
      updateMqttData();
      break;
    case 'fhstplocationtracking/lonGps':
      lonGps.value = parseFloat(message.toString());
      lonGps.timestamp = date;
      updateMqttData();
      break;
  }
}

module.exports = {
  getAll,
  getId,
  onMqttDataReceived,
  updateDetails,
};

// TODO location history
