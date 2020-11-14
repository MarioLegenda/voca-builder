import IConstraint, { ConstraintValue } from './constraints/IConstraint';

export default class ConstraintProcessor {
  constructor(private constraints: IConstraint[] = []) {}

  add(constraint: IConstraint): void {
    this.constraints.push(constraint);
  }

  validate(val: ConstraintValue): string[] {
    const validations: string[] = [];

    for (const c of this.constraints) {
      const vString = c.validate(val);

      if (vString) {
        validations.push(vString);
      }
    }

    return validations;
  }
}
