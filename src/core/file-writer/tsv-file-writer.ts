import { FileWriterInterface } from './file-writer.interface.js';
import { WriteStream } from 'node:fs';
import {FileHandle} from 'node:fs/promises';

export default class TSVFileWriter implements FileWriterInterface {
  private stream: WriteStream;

  constructor(public readonly fileHandle: FileHandle, start: number) {
    this.stream = fileHandle.createWriteStream({start: start});
  }

  public async write(row: string): Promise<void> {
    if (!this.stream.write(`${row}\n`)) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve());
      });
    }
    return Promise.resolve();
  }
}
