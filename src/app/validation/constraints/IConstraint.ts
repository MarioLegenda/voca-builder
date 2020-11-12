export type ConstraintValue = number | string | boolean | Array<number | string | boolean>;

export default interface IConstraint {
  validate(val: ConstraintValue): string;
}