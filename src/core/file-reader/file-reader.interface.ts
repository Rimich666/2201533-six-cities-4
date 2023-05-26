import {FileHandle} from 'node:fs/promises';

export interface FileReaderInterface {
  readonly fileHandle: FileHandle;
  read(): void;
  getRowsCount(): Promise<[number, number]>;
}
