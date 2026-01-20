import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyB3U8-CsYxHm_zDqfVqH-JwrODyn3ADW60",
  authDomain: "kingscup-6e3ec.firebaseapp.com",
  projectId: "kingscup-6e3ec",
  storageBucket: "kingscup-6e3ec.firebasestorage.app",
  messagingSenderId: "500136486012",
  appId: "1:500136486012:web:62c432b9f6fdf83b5b15f9",
  measurementId: "G-N4M2JPXW7F"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ]
};
