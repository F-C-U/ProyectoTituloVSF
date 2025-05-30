// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyArYhqdO0lwnt6mBS7h9uH6joEZ89g_Myc",
    authDomain: "proyectotitulovsf.firebaseapp.com",
    projectId: "proyectotitulovsf",
    storageBucket: "proyectotitulovsf.firebasestorage.app",
    messagingSenderId: "1057387407677",
    appId: "1:1057387407677:web:ce60d8f9e75a4cdda23d54",
    measurementId: "G-45XVJK2LYQ"
  }
};
const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
