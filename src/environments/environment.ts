// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBdk80oIxGrUs54CGEBuugaqUga26H-1JE',
    authDomain: 'platzinger-945cd.firebaseapp.com',
    databaseURL: 'https://platzinger-945cd.firebaseio.com',
    projectId: 'platzinger-945cd',
    storageBucket: 'platzinger-945cd.appspot.com',
    messagingSenderId: '113198572543'
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
