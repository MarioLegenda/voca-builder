import IConstraint, { ConstraintValue } from "./IConstraint"

export default class MinLength implements IConstraint {
  constructor(public minLength: number) {}

  validate(val: ConstraintValue): string {
    if (this.minLength > (val as string).length) return 'minLength';
  }
}