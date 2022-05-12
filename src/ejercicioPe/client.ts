import {connect} from 'net';

/**
 * Socket cliente
 */
const client = connect({port: 60300});

let wholeData = '';
client.on('data', (dataChunk) => {
  wholeData += dataChunk;
});

/**
 * Emite el evento
 */
client.emit('end');

/**
 * Recibe el mensaje del servidor y los muestra
 */
client.on('end', () => {
  const message = JSON.parse(wholeData);
  if (message.type === 'done') {
    console.log(`Server Message: ${message.data}`);
  } else {
    console.log(`Message type ${message.type} is not valid`);
  }
});
