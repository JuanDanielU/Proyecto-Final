import { EnvironmentProviders, importProvidersFrom } from "@angular/core";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { environment } from "../environments/environments";
import { getStorage, provideStorage } from "@angular/fire/storage";

const firebaseProviders: EnvironmentProviders = importProvidersFrom([
  provideFirebaseApp(() => initializeApp(environment.firebase)),
  provideAuth(() => getAuth()),
  provideFirestore(() => getFirestore()),
  provideStorage(() => getStorage()),
]);

export { firebaseProviders };
