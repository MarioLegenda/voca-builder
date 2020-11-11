import { Country } from "../http/model/Country"
import CommonRepository from "./CommonRepository"
import { Http } from "../http/Http"

export default class CountryRepository extends CommonRepository {
  private static inst: CountryRepository;

  // VERY DANGEROUS, REMOVE WHEN CONTAINER CREATED
  static instance(): CountryRepository {
    if (!this.inst) {
      this.inst = new CountryRepository(new Http());
    }

    return this.inst;
  }

  public getCodes(transformer: Function): Country[] {
    return [
      {
        alpha2Code: "AF",
        alpha3Code: "AFG",
        name: "Afghanistan"
      },
      {
        alpha2Code: "MX",
        alpha3Code: "MEX",
        name: "Mexico"
      }
    ];
  }
}