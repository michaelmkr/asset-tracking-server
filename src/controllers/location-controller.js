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
  {
    id: 3,
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
    active: true,
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
    active: true,
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
    active: false,
  },
  {
    id: 3,
    location: {
      lat: 48.2819,
      lng: 15.7118,
      timestamp: 1589444836,
    },
    allowedLocation: {
      lat: 48.2819,
      lng: 15.7118,
      radius: 5,
    },
    name: 'Microcontroller',
    customer: 'Christoph Braun',
    validUntil: '15.05.2021',
    active: true,
  },
];

// Infos from BC
// lat
// long
// timestamp
// isSet
// isActive

/*
ALSO --> LOCATION HISTORY = PATH
ACTIVE / INACTIVE
Advantage of the Blockchain -> a good showcase -> Drone showcase
*/

async function getAll() {
  const locations = [];
  details.forEach((element) => {
    locations.push(
      {
        id: element.id,
        lat: element.location.lat,
        lng: element.location.lng,
        active: element.active,
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

function updateMqttData() {
  const id = 3;
  // eslint-disable-next-line no-mixed-operators,max-len
  if (latCell.timestamp > latGps.timestamp && latCell.timestamp > latGps.timestamp + 100 || latGps.value === 0.0000) {
    details[id].location.lat = latCell.value;
    details[id].location.timestamp = latCell.timestamp;
  } else {
    details[id].location.lat = latGps.value;
    details[id].location.timestamp = latGps.timestamp;
  }

  if (lonCell.timestamp > lonGps.timestamp || lonGps.value === 0.0000) {
    details[id].location.lat = lonCell.value;
    details[id].location.timestamp = lonCell.timestamp;
  } else {
    details[id].location.lat = lonGps.value;
    details[id].location.timestamp = lonGps.timestamp;
  }

}


function onMqttDataReceived(topic, message, date) {
  // eslint-disable-next-line default-case
  switch (topic.toString()) {
    case '/fhstplocationtracking/latCell':
      latCell.value = parseFloat(message.toString());
      latCell.timestamp = date;
      updateMqttData();
      break;
    case '/fhstplocationtracking/lonCell':
      lonCell.value = parseFloat(message.toString());
      lonCell.timestamp = date;
      break;
    case '/fhstplocationtracking/latGps':
      latGps.value = parseFloat(message.toString());
      latGps.timestamp = date;
      break;
    case '/fhstplocationtracking/lonGps':
      lonGps.value = parseFloat(message.toString());
      lonGps.timestamp = date;
      break;
  }
}

module.exports = {
  getAll,
  getId,
  onMqttDataReceived,
  updateDetails,
};
