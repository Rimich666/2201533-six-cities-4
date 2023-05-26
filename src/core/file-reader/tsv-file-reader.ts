import EventEmitter from 'node:events';
import { FileReaderInterface } from './file-reader.interface.js';
import { Offer } from '../../types/offer.type.js';
import {cities} from '../../types/cities.enum.js';
import {Goods} from '../../types/goods.enum.js';
import {OfferType} from '../../types/offer-type.enum.js';
import {FileHandle} from 'node:fs/promises';

const CHUNK_SIZE = 2 ** 10;

export default class TSVFileReader extends EventEmitter implements FileReaderInterface {
  constructor(public fileHandle: FileHandle) {
    super();
  }

  public async read(): Promise<void> {
    const stream = this.fileHandle.createReadStream({
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let importedRowCount = 0;

    for await (const chunk of stream) {
      remainingData += chunk.toString();
      this.emit('read', CHUNK_SIZE);
      const lastRowEnd = remainingData.lastIndexOf('\n');
      remainingData.slice(0, lastRowEnd).split('\n').forEach((row) => {
        importedRowCount ++;
        this.emit('line', this.createOffer(row), importedRowCount);
      });
      remainingData = remainingData.slice(lastRowEnd + 1);
    }

    this.emit('end', importedRowCount);
  }

  public createOffer(rawRow: string): Offer {
    const [title, description, date, city, previewImage, images, isPremium,
      isFavorite, rating, type, bedrooms, maxAdults, price, goods,
      host, commentsCount, latitude, longitude] = rawRow.split('\t');

    return {
      title,
      description,
      date: new Date(date),
      city: cities[city as keyof typeof cities],
      previewImage,
      images: images.split(';'),
      isPremium: isPremium.trim().toUpperCase() === 'TRUE',
      isFavorite: isFavorite.trim().toUpperCase() === 'TRUE',
      rating: parseFloat(rating),
      type: OfferType[type[0].toUpperCase().concat(type.substring(1)) as keyof typeof OfferType],
      bedrooms: parseInt(bedrooms, 10),
      maxAdults: parseInt(maxAdults, 10),
      price: parseInt(price, 10),
      goods: goods.split(';').map((good) =>
        Goods[good.split(' ').reduce((acc, word) =>
          acc.concat(word[0].toUpperCase().concat(word.substring(1)))) as keyof typeof Goods]),
      host: host,
      commentsCount: parseInt(commentsCount, 10),
      location: {latitude: parseFloat(latitude), longitude: parseFloat(longitude)}
    };
  }
}
