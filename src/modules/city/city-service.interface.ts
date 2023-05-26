import CreateCityDto from './dto/create-city.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {CityEntity} from './city.entity.js';

export interface CityServiceInterface {
  create(dto: CreateCityDto): Promise<DocumentType<CityEntity>>;
  findByName(name: string): Promise<DocumentType<CityEntity> | null>;
  findById(cityId: string): Promise<DocumentType<CityEntity> | null>;
  getCount(): Promise<number>;
}
