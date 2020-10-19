import * as mongoose from 'mongoose';

export class SchemaProvider {
  public static readonly provideSchema = (schema: any, options?: any) => {
    const newSchemaObject = {
      creation:  { type: mongoose.Schema.Types.Number, required: true, default: Date.now },
      lastUpdated:  { type: mongoose.Schema.Types.Number, required: true, default: Date.now }
    };
    Object.keys(schema).forEach(key => {
      newSchemaObject[key] = schema[key];
    });
    const newSchema = new mongoose.Schema(newSchemaObject, options || {
      versionKey: 'version'
    });
    newSchema.pre('save', function(next) {
      // @ts-ignore
      this.lastUpdated = Date.now();
      next();
    });
    return newSchema;
  }
}
