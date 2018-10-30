import { registerDecorator, ValidationOptions } from 'class-validator';
import { ConfirmedValidator } from './confirmed.validator';

export function IsConfirmed(options?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    registerDecorator({
      propertyName,
      name: 'isConfirmed',
      target: object.constructor,
      options,
      constraints: [],
      validator: ConfirmedValidator,
    });
  };
}
