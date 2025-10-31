import 'zone.js'; // 👈 must be the very first import

import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { provideZoneChangeDetection } from '@angular/core';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideZoneChangeDetection({ eventCoalescing: true }), // ✅ keep this
  ],
}).catch(err => console.error(err));
