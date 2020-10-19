import { Document } from 'mongoose';

export interface BaseSchemaInterface extends Document {
  creation?: number;
  lastUpdated?: number;
}
