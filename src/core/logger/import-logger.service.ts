import {LoggerInterface} from './logger.interface.js';

export default class ImportLoggerService implements LoggerInterface {
  constructor(private callBack: (type: string, msg: string) => void){}
  public debug(message: string): void {
    this.callBack('debug', message);
  }

  public error(message: string): void {
    this.callBack('error', message);
  }

  public info(message: string): void {
    this.callBack('info', message);
  }

  public warn(message: string): void {
    this.callBack('warn', message);
  }
}
