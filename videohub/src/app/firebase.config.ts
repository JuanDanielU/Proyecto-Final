import { EnvironmentProviders, importProvidersFrom } from "@angular/core";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";

const firebaseProviders: EnvironmentProviders = importProvidersFrom([
  provideFirebaseApp(() => initializeApp(
    {
    "projectId":"videohub-71345",
    "appId":"1:1029643336428:web:fcfe33f4ab8537ca5243c9",
    "storageBucket":"videohub-71345.appspot.com",
    "apiKey":"AIzaSyDXZUrCbPcWpRMs3-PaAnxUFs12RwaJo2k",
    "authDomain":"videohub-71345.firebaseapp.com",
    "messagingSenderId":"1029643336428",
    "measurementId":"G-1GS11GJBP3"
  })),
  (provideAuth(() => getAuth())),
  (provideFirestore(() => getFirestore()))
]);

export { firebaseProviders };
