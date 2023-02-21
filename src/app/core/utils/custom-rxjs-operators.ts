import { map, pipe } from 'rxjs';

export const filterEnabled = () =>
  pipe(
    map((plural: any[]) =>
      plural.filter(singular => singular.status === 'ENABLED')
    )
  );

export const orderById = () =>
  pipe(
    map((plural: any[]) =>
      plural.sort((singA, singB) => (singA.id > singB.id ? 1 : -1))
    )
  );
