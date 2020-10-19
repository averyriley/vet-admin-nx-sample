import { Schema } from 'mongoose';
import { BaseSchemaInterface } from './base-interface.schema';

export const UserSchema = new Schema({
  username: Schema.Types.String,
  password: Schema.Types.String,
})

export interface UserSchemaInterface extends BaseSchemaInterface {
  username: string;
  password: string;
}
