import { useEffect, useRef, useState } from 'react';

import { Country } from '../app/http/model/Country';
import { IRepository, SelectOption } from './contracts';

export function useCountries(initial: Country[]): SelectOption[] {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const options: SelectOption[] = initial.map((c: Country) => {
      return {
        value: c.alpha2Code,
        label: c.name,
      };
    });

    setCountries(() => options);
  }, [initial]);

  return countries;
}

// EXPERIMENTAL
export function useRepositoryContainer<T>(key: string, repository: IRepository): T {
  const containerRef = useRef({});

  useEffect(() => {
    containerRef.current = {};

    return () => (containerRef.current = null);
  }, []);

  useEffect(() => {
    containerRef.current[key] = repository;
  }, [key, repository]);

  return containerRef.current[key];
}
