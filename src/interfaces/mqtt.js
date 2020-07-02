const mqtt = require('mqtt');
const logToFile = require('../utils/fileLogger');
const locationController = require('../controllers/location-controller');

function logMessage(topic, message) {
  logToFile.mqtt({
    method: 'MQTT',
    topic,
    message: message.toString(),
  });
}

const brokerUrl = 'mqtt://test.mosquitto.org:1883';
const client = mqtt.connect(brokerUrl);
const topics = {
  '/fhstplocationtracking/latCell': { qos: 1 },
  '/fhstplocationtracking/lonCell': { qos: 1 },
  '/fhstplocationtracking/latGps': { qos: 1 },
  '/fhstplocationtracking/lonGps': { qos: 1 },
};

client.on('message', (topic, message) => {
  // eslint-disable-next-line no-console
  console.log(`MQTT: received new message on ${topic.toString()} with content ${message.toString()}`);
  logMessage(topic, message);
  locationController.onMqttDataReceived(topic, message, Date.now());
});

client.subscribe(topics);

client.on('connect', () => {
  console.log(`MQTT: connected to ${brokerUrl}`);
});
