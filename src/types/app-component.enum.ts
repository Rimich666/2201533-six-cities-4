export const AppComponent = {
  RestApplication: Symbol.for('RestApplication'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DatabaseInterface: Symbol.for('DatabaseInterface'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  OfferServiceInterface: Symbol.for('OfferServiceInterface'),
  CityServiceInterface: Symbol.for('CityServiceInterface'),
  CommentServiceInterface: Symbol.for('CommentServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  CityModel: Symbol.for('CityModel'),
  OfferModel: Symbol.for('OfferModel'),
  CommentModel: Symbol.for('CommentModel'),
  OfferController: Symbol.for('OfferController'),
  UserController: Symbol.for('UserController')
} as const;
