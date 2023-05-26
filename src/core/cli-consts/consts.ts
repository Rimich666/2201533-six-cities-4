import dayjs from 'dayjs';
import {GenerateConfig} from '../../types/generate-config.type.js';

export const ACADEMY_URL = 'https://12.react.pages.academy/six-cities/hotels';
export const BASE_DATE = dayjs();
export const UNIT_DURATION = 'day';

export const BIG_SIZE = 2 ** 31;

export const DEFAULT_CONFIG_PATH = './src/core/cli-consts/generate.config.json';
export const DefaultConfig: GenerateConfig = {
  jsonURL: 'http://localhost:3123',
  offersEnd: 'offerApi',
  usersEnd: 'userApi',
  count: 10,
  mockPath: './temp/mock-data.tsv',
  isCreatePath: false,
  isCreateBig: false
};

export const NumberFields = {
  Rating: 'Rating',
  Bedrooms: 'Bedrooms',
  MaxAdults: 'MaxAdults',
  Price: 'Price',
  Duration: 'Duration',
  CommentCount: 'CommentCount',
  PasswordLength: 'PasswordLength'
};

export const Min = {
  Price: 100,
  Duration: 0,
  CommentCount: 0,
  Default: 1,
  PasswordLength: 6
};

export const Max = {
  Rating: 5,
  Bedrooms: 8,
  MaxAdults: 10,
  Price: 100000,
  Duration: 180,
  CommentCount: 10,
  Default: 100000,
  PasswordLength: 12
};

export const Precision = {
  Rating: 1,
  Default: 0
};

export const BoolkinString = new Map();

BoolkinString.set(true, 'true');
BoolkinString.set(false, 'false');

export const Parameters = {
  url: 'jsonURL',
  offer: 'endpoints.offers',
  user: 'endpoints.users',
  count: 'count',
  mock: 'mockPath',
  createpath: 'isCreatePath',
  big: 'isCreateBig'
};

export const BIGGEST_INT_SIZE = (2 ** 128).toString().length;
export const EMPTY_BIGGEST_INT = new Array(BIGGEST_INT_SIZE).fill('*').join('');
export const BUFFER_SIZE = (BIGGEST_INT_SIZE + 1) * 2;
