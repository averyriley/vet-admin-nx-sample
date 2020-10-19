
import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { UserSchemaInterface } from '../schema/user.schema';
import { ProviderKeysEnum } from '../provider-keys.enum';
import { UserLoginDTO } from '../../models/user.model';

@Injectable()
export class UserMongoDBService {
  constructor(@Inject(ProviderKeysEnum.USER) private document: Model<UserSchemaInterface>) {}

  async findByUsername(username: string): Promise<UserSchemaInterface> {
    return this.document.findOne({ username }).exec();
  }

  create(userLogin: UserLoginDTO) {
    return this.document.create(userLogin);
  }
}
