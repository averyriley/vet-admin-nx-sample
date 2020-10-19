import * as mongoose from 'mongoose';
import { Connection, Schema } from 'mongoose';
import { UserSchema } from '../schema/user.schema';
import { ProviderKeysEnum } from '../provider-keys.enum';
import { PatientSchema } from '../schema/patients.schema';
import { AppointmentsSchema } from '../schema/appointments.schema';


const createSchemaProvider = (key: ProviderKeysEnum, name: string, schema: Schema) => {
  return {
    provide: key,
    useFactory: (connection: Connection) => connection.model(name, schema),
    inject: [ProviderKeysEnum.DATABASE_CONNECTION],
  }
}

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.DATABASE),
  },
  createSchemaProvider(ProviderKeysEnum.USER,'user', UserSchema),
  createSchemaProvider(ProviderKeysEnum.PATIENTS,'patients', PatientSchema),
  createSchemaProvider(ProviderKeysEnum.APPOINTMENTS,'appointments', AppointmentsSchema)
];


