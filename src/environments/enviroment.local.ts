// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  apiUrl: 'http://localhost',
  apiBaseMain: {
    main: 'sigasac',
    configuration: 'configurations',
    users: 'users',
    data: 'data',
    documents : 'documents'
  },
  versions: {
    v1: 'v1',
    v2: 'v2.0.1'
  },
  useHash: true,
  hmr: false,
};
