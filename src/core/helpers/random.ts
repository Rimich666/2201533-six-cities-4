import {faker} from '@faker-js/faker';
import {MapLocation} from '../../types/location.type.js';
import {Max, Min, NumberFields, Precision} from '../cli-consts/consts.js';

export function generateRandomValue(min:number, max: number, precision = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(precision);
}

export function getRandomItem<T>(items: T[]):T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getRandomItems<T>(items: T[], count = 0):T[] {
  const array = items.slice();
  const arraySize = items.length;
  if (count >= arraySize) {
    return array;
  }
  const size = count === 0 ? generateRandomValue(1, arraySize) : count;
  return Array.from(new Array(size), (_, index) =>
    array.splice(generateRandomValue(0, arraySize - index - 1), 1)[0]);
}

export function getRandomBoolean() {
  return generateRandomValue(0, 1) === 1;
}

export const makeFakeLocation = (loc: MapLocation): MapLocation => {
  const coordinates = faker.address.nearbyGPSCoordinate([loc.latitude, loc.longitude]);
  return {
    longitude: parseFloat(coordinates[1]),
    latitude: parseFloat(coordinates[0]),
  };
};

export const getRandomizeParam = (key: string) =>
  ([
    Min[key as keyof typeof Min] || Min.Default,
    Max[key as keyof typeof Max] || Max.Default,
    Precision[key as keyof typeof Precision] || Precision.Default,
  ] as [number, number, number]);

export function getRandomSymbol() {
  return String.fromCharCode(generateRandomValue(32, 126, 0));
}

const exclamation = 32;
const tilda = 126;
export function getRandomSymbols(count: number) {
  const symbols = Array.from(new Array(tilda - exclamation), (_, index) =>
    String.fromCharCode(index + exclamation));
  return getRandomItems(symbols, count);
}

export function generatePassword() {
  return getRandomSymbols(generateRandomValue(...getRandomizeParam(NumberFields.PasswordLength))).join('');
}
