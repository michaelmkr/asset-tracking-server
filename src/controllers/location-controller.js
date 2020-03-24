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
