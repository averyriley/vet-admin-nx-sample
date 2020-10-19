import { Schema } from 'mongoose';
import { SchemaProvider } from '../providers/schema.provider';
import { BaseSchemaInterface } from './base-interface.schema';

const { Types } = Schema

export const AppointmentsSchema = SchemaProvider.provideSchema({
  startTime: Types.Number,
  endTime: Types.Number,
  date: Types.Number,
  description: Types.String,
  fee: Types.Number,
  isPaid: Types.Boolean,
  patientId: Types.String
})

export interface AppointmentsSchemaInterface extends BaseSchemaInterface {
  patientId: string
  startTime: number,
  endTime: number,
  date: number,
  description: string,
  fee: number,
  isPaid: boolean
}
