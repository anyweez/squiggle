import { Inject, Injectable } from '@angular/core'
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

interface Offset {
    hours: number,
    minutes: number,
};

/**
 * A Clock is a basic wrapper for a moment.js moment object. It will automatically
 * update as time passes, and provides accessor methods for the rest of the application
 * to use.
 */
export class Clock {
    protected _offset = {
        hours: 0,
        minutes: 0,
    }
    
    protected moment;

    constructor(offset: Offset = {hours: 0, minutes: 0}) {
        this.updateTime();
    }

    private applyOffset() {
        return moment(this.moment)
            .add(this._offset.hours, 'hours')
            .add(this._offset.minutes, 'minutes')
    }
    
    private updateTime() {
        this.moment = moment();
    }

    get _moment() {
        return this.moment;
    }

    get hrs() {
        this.updateTime();
        return this.applyOffset().format('h');
    }

    get mins() {
        this.updateTime();
        return this.applyOffset().format('mm');
    }

    get ampm() {
        this.updateTime();
        return this.applyOffset().format('a');
    }
    
    offset(os: Offset) {
        this._offset.hours = os.hours;
        this._offset.minutes = os.minutes;
        
        return this;
    }
    
    until() {
        this.updateTime();
        return this.applyOffset().from(moment(), true);
    }
}

@Injectable()
export class ClockService {
    private currentTime: Clock;
    private arrivalTime: Clock;

    constructor( private http: Http ) {
        this.currentTime = new Clock(); // keep track of now
        this.arrivalTime = new Clock(); // keep track of estimated arrival time
    }
    
    getCurrentTime() {
        return Observable
            .interval(1000) // every second; too frequent
            .map( () => this.currentTime )
    }

    getArrivalTime() {
        return Observable
            .interval(1000) // every second; too frequent
            .map( () => this.arrivalTime.offset({
                hours: 0,
                minutes: 37,
            })); 
    }
}