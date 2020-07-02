const mqtt = require('mqtt');
const logToFile = require('../utils/fileLogger');

function logMessage(topic, message) {
  logToFile.mqtt({
    method: 'MQTT',
    topic,
    message: message.toString(),
  });
}

const brokerUrl = 'mqtt://broker.mqttdashboard.com';
const client = mqtt.connect(brokerUrl);
const topics = {
  'fhstplocationtracking/latCell': { qos: 1 },
  'fhstplocationtracking/lngCell': { qos: 1 },
  'fhstplocationtracking/latGps': { qos: 1 },
  'fhstplocationtracking/lngGps': { qos: 1 },
};

client.on('message', (topic, message) => {
  // eslint-disable-next-line no-console
  console.log(`received new message on ${topic.toString()} with content ${message.toString()}`);
  logMessage(topic, message);
});

client.subscribe(topics);

client.on('connect', () => {
  console.log(`connected to ${brokerUrl}`);
});
