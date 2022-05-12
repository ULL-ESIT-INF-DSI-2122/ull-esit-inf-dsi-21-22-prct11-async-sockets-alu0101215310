import * as express from 'express';
import {serverSpawn} from './spawn';

/**
 * Servidor express
 */
const app = express();

/**
 * Se accede a la ruta /execmd
 */
app.get('/execmd', (req, res) => {
  /**
   * Error si no se le pasa un comando
   */
  if (!req.query.cmd) {
    res.send({
      error: 'introduzca un comando',
    });
    return;
  } else {
    /**
     * Caso en el que se le pasa un comando con argumentos
     */
    if (typeof req.query.cmd == 'string' && typeof req.query.args == 'string') {
      serverSpawn(req.query.cmd, req.query.args.split(' '), (err, success) => {
        if (err) {
          res.send({
            error: err,
          });
          return;
        } else {
          res.send({
            output: success,
          });
          return;
        }
      });
      /**
       * Caso en el que se le pasa un comando sin argumentos
       */
    } else if (typeof req.query.cmd === 'string') {
      serverSpawn(req.query.cmd, [], (err, success) => {
        if (err) {
          res.send({
            error: err,
          });
          return;
        } else {
          res.send({
            output: success,
          });
          return;
        }
      });
    }
  }
});

/**
 * Acceso a una ruta no válida
 */
app.get('*', (_, res) => {
  res.send('<h1>Error 404</h1>');
});

/**
 * Muestra estado del servidor al ejecutarse
 */
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
