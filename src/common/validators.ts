import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'positiveStringNumber', async: false })
export class PositiveStringNumber implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return !!text && +text > 0;
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return '$property must be a positive number';
  }
}
