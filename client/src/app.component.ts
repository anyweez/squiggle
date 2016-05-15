'use strict'
import { Component } from '@angular/core';
// import { LocationService } from './services/places';
import { ServerDataService } from './services/serverdata';
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
  from: Location;
  
  constructor(private clock: ClockService, private sd: ServerDataService) { 
    clock.getCurrentTime().subscribe( clock => this.time = clock );  
    
    sd.from().subscribe( res => this.from = res );
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
  
  // Only using the 'to' location in the main component.
  to: Location;
  
  constructor(private clock: ClockService, private sd: ServerDataService) {
    this.clock.getCurrentTime().subscribe( (clock) => this.time.current = clock )
    this.clock.getArrivalTime().subscribe( (clock) => this.time.arrival = clock )
    
    // Set up listeners on locations.
    sd.to().subscribe( res => this.to = res );
  }
}