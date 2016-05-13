'use strict'
import { Component } from '@angular/core';
import { LocationService } from './services/places';
import { ClockService, DerivedClock, Clock } from './services/times';

let clock = new ClockService();

/**
 * Component that displays the current time as a minor view in the UI. The current
 * time is tracked in one of the clocks in the ClockService.
 */
@Component({
  selector: 'current-time',
  templateUrl: 'templates/current-time.html',
})
export class CurrentTimeComponent {
  constructor(private clock: ClockService, private locations: LocationService) { }

  time = this.clock.getCurrentTime();
  loc = {
    source: this.locations.src,
    dest: this.locations.dest,
  };
}

@Component({
  selector: 'next-alarm',
  templateUrl: 'templates/next-alarm.html',
})
export class NextAlarmComponent {
  constructor(private clock: ClockService) { }

  time = new DerivedClock(new Clock(), function() {
    return new Promise((resolve, reject) => resolve({
      hours: 0,
      minutes: 30,
    }));
  }, false);
}

@Component({
  selector: 'squiggle-app',
  templateUrl: 'templates/app.html',
  directives: [CurrentTimeComponent, NextAlarmComponent],
})
export class AppComponent {
  constructor(private clock: ClockService, private locations: LocationService) { }
  time = {
    current: this.clock.getCurrentTime(),
    arrival: this.clock.getArrivalTime(),
  };

  loc = this.locations;
}