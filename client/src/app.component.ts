'use strict'
import { Component } from '@angular/core';
import { LocationService } from './services/places';
import { ClockService, Clock } from './services/times';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

/**
 * Component that displays the current time as a minor view in the UI. The current
 * time is tracked in one of the clocks in the ClockService.
 */
@Component({
  selector: 'current-time',
  templateUrl: 'templates/current-time.html',
})
export class CurrentTimeComponent {
  time: Clock;
  loc = {
    source: this.locations.src,
    dest: this.locations.dest,
  };
  
  constructor(private clock: ClockService, private locations: LocationService) { 
    clock.getCurrentTime().subscribe( clock => this.time = clock );  
  }

}

@Component({
  selector: 'next-alarm',
  templateUrl: 'templates/next-alarm.html',
})
export class NextAlarmComponent {
  time: Clock;
  
  constructor(private clock: ClockService) { 
    clock.getArrivalTime().subscribe( clock => this.time = clock );
  }
}

@Component({
  selector: 'squiggle-app',
  templateUrl: 'templates/app.html',
  directives: [CurrentTimeComponent, NextAlarmComponent],
})
export class AppComponent {
  time = {
    current: null as Clock,
    arrival: null as Clock,
  };

  loc = this.locations;
  
  constructor(private clock: ClockService, private locations: LocationService) {
    this.clock.getCurrentTime().subscribe( (clock) => this.time.current = clock )
    this.clock.getArrivalTime().subscribe( (clock) => this.time.arrival = clock )
  }
}