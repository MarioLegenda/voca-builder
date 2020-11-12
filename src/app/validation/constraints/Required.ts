import IConstraint, { ConstraintValue } from "./IConstraint"

export default class Required implements IConstraint {
  validate(val: ConstraintValue): string {
    if (!val) return 'required';
  }
}