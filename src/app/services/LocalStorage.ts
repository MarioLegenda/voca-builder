import { Country } from "../http/model/Country"

export default class LocalStorage {
  private storageEnabled: boolean = false;
  private storage: LocalStorage;

  constructor() {
    if (!window.localStorage) {
      this.storageEnabled = false;

      return;
    }

    this.storage = window.localStorage;
  }

  isEnabled(): boolean {
    return this.storageEnabled;
  }

  getCountries(): Country[] {
    return this.storage.getItems('countries');
  }

  setCountries(countries: Country[]): void {
    this.storage.setItem('countries', countries);
  }
}