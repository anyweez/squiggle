// import 'zone.js/dist/zone';
// import 'zone.js/dist/long-stack-trace-zone';
import 'reflect-metadata';
import 'rxjs/Rx'; // todo: need to convert to a smaller subset one day
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';   // Include this in bootstrap so it's available to all components
import { AppComponent } from './app.component';
import { ClockService } from './services/times';
import { LocationService } from './services/places';

bootstrap(AppComponent, [HTTP_PROVIDERS, ClockService, LocationService]);