import {spawn} from 'child_process';

/**
 * @param cmd Comando a ejecutar
 * @param args Argumentos del comando
 * @param callback Manejador que contendrá los posibles errores y resultados
 */
export function serverSpawn(cmd: string, args: string[],
    callback: (err: string | undefined, result: string | undefined)
      => void): void {
  /**
   * Proceso hijo
   */
  const command = spawn(cmd, args);

  /**
   * Posible salida del comando
   */
  let commandOutput = '';
  command.stdout.on('data', (piece) => commandOutput += piece);

  /**
   * Posibles errores del comando
   */
  let errorOutput = '';
  command.stderr.on('data', (piece) => errorOutput += piece);

  /**
   * Error en caso de comando desconocido
   */
  command.on('error', (err) => {
    callback(err.message, undefined);
  });

  /**
   * Callback con la salida o el error del comando
   */
  command.on('close', () => {
    if (commandOutput) callback(undefined, commandOutput);
    else if (errorOutput) callback(errorOutput, undefined);
  });
}
