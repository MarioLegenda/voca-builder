import { useEffect, useState } from 'react';

import { Country } from '../app/http/model/Country';
import { SelectOption } from './contracts';

export function useCountries(initial: Country[]): SelectOption[] {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const options: SelectOption[] = initial.map((c: Country) => {
      return {
        value: c.alpha2Code,
        label: c.name,
      };
    }, []);

    setCountries(() => options);
  }, [initial]);

  return countries;
}
