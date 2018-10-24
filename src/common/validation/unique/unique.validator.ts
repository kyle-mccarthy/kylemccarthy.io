import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Connection, getRepository } from 'typeorm';

@ValidatorConstraint({
  async: true,
})
export class UniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly connection: Connection) {}

  public async validate(text: string, args: ValidationArguments) {
    const repository = getRepository(args.targetName as string);
    const value: any = (args.object as any)[args.property];
    const res = await repository.findOne({
      where: {
        [args.property]: value,
      },
    });
    return res === undefined;
  }
}
