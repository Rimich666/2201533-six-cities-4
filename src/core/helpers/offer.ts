import {Offer} from '../../types/offer.type.js';
import {cities} from '../../types/cities.enum.js';
import {OfferType} from '../../types/offer-type.enum.js';
import {Goods} from '../../types/goods.enum.js';

export function createOffer(rawRow: string): Offer {
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
