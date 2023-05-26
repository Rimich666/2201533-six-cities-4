import { DataGeneratorInterface } from './data-generator.interface.js';
import {MockData} from '../../types/mock-data.type.js';
import {
  generateRandomValue,
  getRandomBoolean,
  getRandomItem,
  getRandomItems,
  makeFakeLocation,
  getRandomizeParam
} from '../../core/helpers/random.js';
import {cities} from '../../types/cities.enum.js';
import {
  BASE_DATE,
  BoolkinString,
  NumberFields,
  UNIT_DURATION
} from '../../core/cli-consts/consts.js';
import {OfferType} from '../../types/offer-type.enum.js';
import {Goods} from '../../types/goods.enum.js';

export default class OfferGenerator implements DataGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const date = BASE_DATE.subtract(generateRandomValue(...getRandomizeParam(NumberFields.Duration)), UNIT_DURATION);
    const city = getRandomItem(Object.values(cities));
    const images = getRandomItems(this.mockData.images, 6);
    const previewImage = getRandomItem(images);
    const isPremium = getRandomBoolean();
    const isFavorite = getRandomBoolean();
    const rating = generateRandomValue(...getRandomizeParam(NumberFields.Rating));
    const type = getRandomItem(Object.values(OfferType));
    const bedrooms = generateRandomValue(...getRandomizeParam(NumberFields.Bedrooms));
    const maxAdults = generateRandomValue(...getRandomizeParam(NumberFields.MaxAdults));
    const price = generateRandomValue(...getRandomizeParam(NumberFields.Price));
    const goods = getRandomItems(Object.values(Goods));
    const host = getRandomItem(this.mockData.emails);
    const commentsCount = generateRandomValue(...getRandomizeParam(NumberFields.CommentCount));
    const location = makeFakeLocation(city.location);

    return [
      [title, description, date.toISOString(), city.name, previewImage, images.join(';'),
        BoolkinString.get(isPremium), BoolkinString.get(isFavorite), rating, type, bedrooms, maxAdults,
        price, goods.join(';'), host, commentsCount, location.latitude, location.longitude].join('\t')
    ].join('\n');
  }
}
