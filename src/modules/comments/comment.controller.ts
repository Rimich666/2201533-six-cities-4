import {Request, Response} from 'express';
import {Controller} from '../../core/controller/controller-abstract.js';
import {inject} from 'inversify';
import {AppComponent} from '../../types/app-component.enum.js';
import {LoggerInterface} from '../../core/logger/logger.interface.js';
import {OfferServiceInterface} from '../offer/offer-service.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import HttpError from '../../core/errors/http-error.js';
import {StatusCodes} from 'http-status-codes';
import {fillDTO} from '../../core/helpers/common.js';
import CommentRdo from './rdo/comment.rdo.js';
import {CommentServiceInterface} from './comment.service.interface.js';
import {DocumentExistsMiddleware} from '../middlewares/document-exists.middleware.js';
import {AuthenticateMiddleware} from '../middlewares/authenticate/authenticate-middleware.js';
import {UserServiceInterface} from '../user/user-service.interface.js';
import {ConfigInterface} from '../../core/config/config.interface.js';
import {RestSchema} from '../../core/config/rest.schema.js';
import dayjs from 'dayjs';
import {ValidateDtoMiddleware} from '../middlewares/validators/dto.validator.js';
import CreateCommentDto from './dto/create-comment.dto.js';

export default class CommentController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) logger: LoggerInterface,
    @inject(AppComponent.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(AppComponent.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    @inject(AppComponent.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(AppComponent.ConfigInterface) private readonly configService: ConfigInterface<RestSchema>
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new AuthenticateMiddleware(this.configService.get('JWT_SECRET'), this.userService),
        new ValidateDtoMiddleware(CreateCommentDto)
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
  }

  public async index(req: Request, res: Response) : Promise<void> {
    const offerId = req.params.offerId;
    if (!await this.offerService.exists(offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'CommentController'
      );
    }
    const comments = await this.commentService.findByOffer(offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async create(req: Request, res: Response): Promise<void> {
    const offerId = req.params.offerId;
    const comment = await this.offerService.addComment(offerId,{
      ...req.body,
      date: dayjs().toISOString(),
      author: res.locals.user.id,
      offer: offerId
    });
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
