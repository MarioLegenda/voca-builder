import IConstraint, { ConstraintValue } from './IConstraint';

export default class NotEqual implements IConstraint {
  constructor(private val: string) {}

  validate(val: ConstraintValue): string {
    if (val === this.val) return 'equal';
  }
}
