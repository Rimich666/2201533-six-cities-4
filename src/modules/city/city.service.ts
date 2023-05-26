import {CityServiceInterface} from './city-service.interface.js';
import {injectable, inject} from 'inversify';
import {AppComponent} from '../../types/app-component.enum.js';
import {LoggerInterface} from '../../core/logger/logger.interface.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {CityEntity} from './city.entity.js';
import CreateCityDto from './dto/create-city.dto.js';

@injectable()
export default class CityService implements CityServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.CityModel) private readonly cityModel: types.ModelType<CityEntity>
  ) {}

  public async create(dto:CreateCityDto): Promise<DocumentType<CityEntity>> {
    const city = new CityEntity(dto);
    const result = this.cityModel.create(city);
    this.logger.info(`Created ${city.name} city.`);

    return result;
  }

  public async getCount(): Promise<number> {
    return this.cityModel.find().estimatedDocumentCount();
  }

  public async findById(cityId: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findById(cityId).exec();
  }

  public async findByName(name:string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findOne({name});
  }
}
