const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://broker.mqttdashboard.com');

client.on('message', (topic, message) => {
  // message is Buffer
  // eslint-disable-next-line no-console
  console.log(topic.toString());
  // eslint-disable-next-line no-console
  console.log(message.toString());
});

client.subscribe('fhstplocationtracking/lngCell', { qos: 1 });

client.on('connect', () => {
  // client.subscribe('fhstplocationtracking/latCell', (err) => {
  //   if (!err) {
  //     client.publish('presence', 'Hello mqtt');
  //   }
  // });
  console.log('connected');
});
