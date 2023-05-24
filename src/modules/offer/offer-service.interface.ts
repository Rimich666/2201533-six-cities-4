import CreateOfferDto from './dto/create-offer.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';

export interface OfferServiceInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>
}
