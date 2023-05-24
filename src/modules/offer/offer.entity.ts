import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {entitiesName} from '../../types/entities-name.enum.js';
import {OfferType} from '../../types/offer-type.enum.js';
import {Goods} from '../../types/goods.enum.js';
import {CityEntity} from '../city/city.entity.js';
import {UserEntity} from '../user/user.entity.js';
import {LocationEntity} from '../location/location-entity.js';

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({options: {customName: entitiesName.offers}})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({required: true, type: String})
  public title!: string;

  @prop({required: true, type: String})
  public description!: string;

  @prop({required: true, type: Date})
  public date!: Date;

  @prop({ref: CityEntity, required: true})
  public city!: Ref<CityEntity>;

  @prop({required: true, type: String})
  public previewImage!: string;

  @prop({required: true, type: [String], default: []})
  public images!: string[];

  @prop({required: true, type: Boolean})
  public isPremium!: boolean;

  @prop({required: true, type: Boolean})
  public isFavorite!: boolean;

  @prop({required: true, type: Number})
  public rating!: number;

  @prop({required: true, enum: OfferType, type: String})
  public type!: OfferType;

  @prop({required: true, type: Number})
  public bedrooms!: number;

  @prop({required: true, type: Number})
  public maxAdults!: number;

  @prop({required: true, type: Number})
  public price!: number;

  @prop({required: true, enum: Goods, type: [String]})
  public goods!: Goods[];

  @prop({ref: UserEntity, required: true, _id: false})
  public host!: Ref<UserEntity>;

  @prop({required: true, type: Number})
  public commentsCount!: number;

  @prop({required: true, _id: false})
  public location!: LocationEntity;
}

export const OfferModel = getModelForClass(OfferEntity);
