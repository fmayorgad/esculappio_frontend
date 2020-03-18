// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  apiUrl: 'http://167.172.127.180',
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
  production: false,
  useHash: true,
  hmr: true,
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
