import { Inject, Injectable } from '@angular/core'
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Offset } from './times';
import { Location } from './places';

@Injectable()
export class ServerDataService {
    req: any;
    
    constructor (private http: Http) { 
        this.req = Observable
            .interval(2000)
            .flatMap( () => http.get('http://localhost:8050/travel?from=home&to=work') )
            .map( res => res.json() )
    }
    
    /**
     * Returns a stream that returns the source object (i.e. 'home').
     */
    from() {
        return this.req.map( (res) => res.places.from );
    }
    
    /**
     * Returns a stream that returns the destination object (i.e. 'work').
     */
    to() {
        return this.req.map( (res) => res.places.to );
    }
    
    /**
     * Returns a stream that returns an object containing various offsets. The
     * offsets all share a common structure (see times.Offset interface).
     */
    offsets() {
        return this.req.map(function (res) {
            return {
                hours: res.travel.hours + res.prep.hours,
                minutes: res.travel.minutes + res.prep.minutes,
            };
        });
    }
    
    offset_prep() {
        return this.req.map( res => res.prep );
    }
    
    offset_travel() {
        return this.req.map( res => res.travel );
    }
}