import { Schema } from 'mongoose';
import { BaseSchemaInterface } from './base-interface.schema';
import { SchemaProvider } from '../providers/schema.provider';

export const PatientSchema = SchemaProvider.provideSchema({
  name: Schema.Types.String,
  type: Schema.Types.Number,
  contactInfo: {
    name: Schema.Types.String,
    phone: Schema.Types.Number
  }
})

export interface PatientSchemaInterface extends BaseSchemaInterface {
  name: string,
  type: string,
  contactInfo: {
    name: string,
    phone: number
  }
}
