import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({
  async: true,
})
export class ConfirmedValidator implements ValidatorConstraintInterface {
  public async validate(text: string, args: ValidationArguments) {
    const value: any = (args.object as any)[args.property];
    const confirmedValue: any = (args.object as any)[
      `${args.property}Confirmed`
    ];
    return value === confirmedValue;
  }
}
