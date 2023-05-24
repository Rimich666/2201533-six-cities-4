import TSVFileReader from '../file-reader/tsv-file-reader.js';
import { CliCommandInterface } from './cli-command.interface.js';
import chalk from 'chalk';
import {Offer} from '../../types/offer.type.js';
import {FileHandle, open} from 'node:fs/promises';
import {createProgressImport, ImportProgressType} from '../helpers/import-comand.helper.js';
import {fstatSync} from 'node:fs';
import {stdout as output} from 'node:process';
import {LoggerInterface} from '../logger/logger.interface.js';
import {UserServiceInterface} from '../../modules/user/user-service.interface.js';
import {OfferServiceInterface} from '../../modules/offer/offer-service.interface.js';
import {CityServiceInterface} from '../../modules/city/city-service.interface.js';
import {config, DotenvConfigOutput} from 'dotenv';
import ImportLoggerService from '../logger/import-logger.service.js';
import UserService from '../../modules/user/user.service.js';
import CityService from '../../modules/city/city.service.js';
import {UserModel} from '../../modules/user/user.entity.js';
import {CityModel} from '../../modules/city/city.entity.js';
import {OfferModel} from '../../modules/offer/offer.entity.js';
import OfferService from '../../modules/offer/offer.service.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private progress: ImportProgressType | undefined;
  private loaded = 0;
  private userCount = 0;
  private offerCount = 0;
  private readonly salt: string = '';
  private readonly logger?: LoggerInterface;
  private readonly config?: DotenvConfigOutput;
  private readonly userService?: UserServiceInterface;
  private readonly offerService?: OfferServiceInterface;
  private readonly cityService?: CityServiceInterface;

  constructor() {
    this.progress = createProgressImport();
    this.logger = new ImportLoggerService(this.progress.message);
    this.config = config();
    this.userService = new UserService(this.logger, UserModel);
    this.offerService = new OfferService(this.logger, OfferModel);
    this.cityService = new CityService(this.logger, CityModel);
  }

  private onLine = (_offer: Offer, rowNumber: number) => {
    this.progress?.row(rowNumber);
  };

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
  }

  private onRead = (chunkSize: number) => {
    this.progress?.loaded(this.loaded += chunkSize);
  };

  public async execute(filename: string): Promise<void> {
    console.log(
      this.userCount, this.userService, this.offerService, this.offerCount, this.cityService, this.salt,
      this.logger, this.config
    );
    if (!filename){
      console.log(`
  ${chalk.redBright('после')} --import ${chalk.redBright('укажите путь к файлу')}
  ${chalk.cyanBright('пример:')} npm run ts ./src/main.cli.ts -- --import ./mocks/mock-data.tsv`);
      return;
    }
    let fileHandle: FileHandle;
    try {
      fileHandle = await open(filename.trim());
    } catch {
      console.log(`Can't open file: ${filename}`);
      return;
    }
    this.progress?.param(fstatSync(fileHandle.fd).size, this.userCount + this.offerCount);
    const fileReader = new TSVFileReader(fileHandle);
    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);
    fileReader.on('read', this.onRead);
    output.write('\u001B[?25l');
    console.log(chalk.greenBright(`Импорт строк предложений из ${filename}`));
    try {
      await fileReader.read();

    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.log(`Не удалось импортировать данные из файла по причине: «${err.message}»`);
    } finally {
      output.write('\u001B[?25h');
      await fileHandle.close();
    }
  }
}
