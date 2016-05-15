import { Inject, Injectable } from '@angular/core'
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Offset } from './times';
import { Location } from './places';

@Injectable()
export class ServerDataService {
    _src: Location;
    _dest: Location;
    _offsets = {
        travel: { hours: 0, minutes: 0 },
        prep: { hours: 0, minutes: 0 },
    };
    
    req: any;
    
    constructor (private http: Http) { 
        this.req = Observable
            .interval(1000)
            .flatMap( () => http.get('http://localhost:8050/travel?from=home&to=work') )
            .map( res => res.json() )
            // .subscribe( result => {
            //     this._src = result.places.from;
            //     this._dest = result.places.to;
                
            //     this._offsets.travel = result.travel;
            //     this._offsets.prep = result.prep;
            // });
    }
    
    /**
     * Returns a stream that returns the source object (i.e. 'home').
     */
    from() {
        return this.req.map( (res) => res.places.from );
        // return this._src;
    }
    
    /**
     * Returns a stream that returns the destination object (i.e. 'work').
     */
    to() {
        return this.req.map( (res) => res.places.to );
        // return this._dest;
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
        // return {
        //     hours: this._offsets.travel.hours + this._offsets.prep.hours,
        //     minutes: this._offsets.travel.minutes + this._offsets.prep.minutes,
        // };
    }
}