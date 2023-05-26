import EventEmitter from 'node:events';
import { FileReaderInterface } from './file-reader.interface.js';
import {FileHandle} from 'node:fs/promises';
import {BIGGEST_INT_SIZE, BUFFER_SIZE} from '../cli-consts/consts.js';

const CHUNK_SIZE = 2 ** 10;

export default class TSVFileReader extends EventEmitter implements FileReaderInterface {
  constructor(public fileHandle: FileHandle) {
    super();
  }

  public async read(): Promise<void> {
    const stream = this.fileHandle.createReadStream({
      start: BUFFER_SIZE,
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let importedRowCount = 0;

    for await (const chunk of stream) {
      remainingData += chunk.toString();
      this.emit('read', CHUNK_SIZE);
      const lastRowEnd = remainingData.lastIndexOf('\n');
      for (const row of remainingData.slice(0, lastRowEnd).split('\n')) {
        importedRowCount ++;
        await new Promise((resolve) => {
          this.emit('line', row, importedRowCount, resolve);
        });
      }
      remainingData = remainingData.slice(lastRowEnd + 1);
    }

    this.emit('end', importedRowCount);
  }

  public async getRowsCount(): Promise<[number, number]> {
    const buffer = Buffer.alloc(BUFFER_SIZE);
    await this.fileHandle.read({buffer: buffer, length: BUFFER_SIZE});
    const row = buffer.toString('utf-8');
    if (row[BIGGEST_INT_SIZE] !== '\t' || !row.endsWith('\n')) {
      throw new Error('invalid file format');
    }
    const userCount = parseInt(row.substring(0, BIGGEST_INT_SIZE), 10);
    const offerCount = parseInt(row.substring(BIGGEST_INT_SIZE), 10);
    if (userCount === 0) {
      throw new Error('missing users data');
    }
    if (offerCount === 0) {
      throw new Error('missing offers data');
    }
    return [userCount, offerCount];
  }
}
