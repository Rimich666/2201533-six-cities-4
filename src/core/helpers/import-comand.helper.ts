import {ProgressBar} from './progress-bar.js';
import {stdout as output} from 'node:process';
import {formatInt} from './format-int.js';

export const log = {
  debug: console.debug,
  error: console.error,
  info: console.info,
  warn: console.warn
};

export type ImportProgressType = {
  row: (rowCount: number) => void;
  loaded: (loaded: number) => void;
  message: (type: string, msg: string) => void;
  param: (sz: number, rc: number) => void;
}

const WIDTH = 30;
const REVERT_ROWS_COUNT = -3;
export function createProgressImport (): ImportProgressType {
  let progressLoad: ProgressBar;
  let progressRows: ProgressBar;
  let rowNumber = 0;
  let barBytes = '';
  let barRows = '';
  let byteCount = 0;
  let message = '';
  let rowsCount = 0;
  let size = 0;
  // let msgType: keyof typeof log = 'info';
  const setParam = (sz: number, rc: number) => {
    size = sz;
    rowsCount = rc;
    progressLoad = new ProgressBar(size, WIDTH);
    progressRows = new ProgressBar(rowsCount, WIDTH);
  };
  const outputProgress = () => {
    if (rowNumber > 0) {
      output.moveCursor(0, REVERT_ROWS_COUNT);
    }
    // log[msgType](message);
    output.write(message);
    output.clearLine(1);
    output.write('\n');
    output.write(`${barRows} Загружено: ${formatInt(rowNumber)} строк из ${rowsCount}.`);
    output.clearLine(1);
    output.write('\n');
    console.log(`${barBytes} Загружено: ${byteCount} байт из ${size}`);
  };
  const setRow = (rowCount: number) => {
    rowNumber = rowCount;
    barRows = progressRows.getProgress(rowCount);
    outputProgress();
  };
  const setLoaded = (loaded: number) => {
    byteCount = loaded;
    barBytes = progressLoad.getProgress(loaded);
    outputProgress();
  };
  const setMessage = (_type: string, msg: string) => {
    // msgType = type as keyof typeof log;
    message = msg;
    outputProgress();
  };
  return ({row: setRow, loaded: setLoaded, message: setMessage, param: setParam});
}
