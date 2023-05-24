export const AppComponent = {
  RestApplication: Symbol.for('RestApplication'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DatabaseInterface: Symbol.for('DatabaseInterface'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  CityModel: Symbol.for('CityModel'),
  OfferModel: Symbol.for('OfferModel')
} as const;
