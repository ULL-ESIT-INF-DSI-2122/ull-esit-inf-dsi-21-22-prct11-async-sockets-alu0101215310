import {EventEmitter} from 'events';

/**
 * Clase con la que trabajará el cliente
 */
export class MessageEventEmitterClient extends EventEmitter {
  constructor(connection: EventEmitter) {
    super();

    /**
     * Emite el evento con los datos parseados
     */
    let wholeData = '';
    connection.on('data', (dataChunk) => {
      wholeData += dataChunk;
      this.emit('message', JSON.parse(wholeData));
    });
  }
}
