// import 'zone.js/dist/zone';
// import 'zone.js/dist/long-stack-trace-zone';
import 'reflect-metadata';
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { ClockService } from './services/times';
import { LocationService } from './services/places';

bootstrap(AppComponent, [ClockService, LocationService]);
// bootstrap(AppComponent);