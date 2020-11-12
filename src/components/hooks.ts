import { useEffect, useState } from 'react';

import { Country } from '../app/http/model/Country';

interface Option {
  value: string;
  label: string;
}

export function useCountries(initial: Country[]): Option[] {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const options: Option[] = initial.map((c: Country) => {
      return {
        value: c.alpha2Code,
        label: c.name,
      };
    }, []);

    setCountries(() => options);
  }, [initial]);

  return countries;
}
