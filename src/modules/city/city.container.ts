import {Container} from 'inversify';
import {AppComponent} from '../../types/app-component.enum.js';
import {types} from '@typegoose/typegoose';
import {CityEntity, CityModel} from './city.entity.js';
import CityService from './city.service.js';
import {CityServiceInterface} from './city-service.interface.js';

export function createCityContainer() {
  const cityContainer = new Container();
  cityContainer.bind<CityServiceInterface>(AppComponent.CityServiceInterface).to(CityService);
  cityContainer.bind<types.ModelType<CityEntity>>(AppComponent.CityModel).toConstantValue(CityModel);
  return cityContainer;
}
