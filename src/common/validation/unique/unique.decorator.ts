import { registerDecorator, ValidationOptions } from 'class-validator';
import { UniqueValidator } from './unique.validator';

export function IsUnique(options?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    registerDecorator({
      propertyName,
      name: 'isUnique',
      target: object.constructor,
      options,
      constraints: [],
      validator: UniqueValidator,
    });
  };
}
