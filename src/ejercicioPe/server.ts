import * as net from 'net';

/**
 * Socket servidor
 */
const server = net.createServer((connection) => {
  console.log('A client has connected.');

  /**
   * Escribe el mensaje por defecto
   */
  connection.write(JSON.stringify({'type': 'done', 'data': 'hello world'}) +
  '\n');

  /**
   * Acaba la conexión con el socket
   */
  const timer = setTimeout(() => {
    connection.end();
  }, 500);

  /**
   * Limpia del Timeout apuntado por timer
   */
  connection.on('end', () => {
    clearTimeout(timer);
  });

  /**
   * Detecta cuando se desconecta el cliente
   */
  connection.on('close', () => {
    console.log('A client has disconnected');
  });
});

server.listen(60300, () => {
  console.log('Waiting for clients to connect.');
});
