import * as moment from 'moment';

/**
 * A Clock is a basic wrapper for a moment.js moment object. It will automatically
 * update as time passes, and provides accessor methods for the rest of the application
 * to use.
 */
export class Clock {
    protected moment;

    constructor() {
        this.moment = moment();

        // Update the current time once per second.
        setInterval(() => this.moment = moment(), 1000);
    }

    get _moment() {
        return this.moment;
    }

    get hrs() {
        return this.moment.format('h');
    }

    get mins() {
        return this.moment.format('mm');
    }

    get ampm() {
        return this.moment.format('a');
    }
}

/**
 * A DerivedClock extends a standard Clock and is used for displaying times
 * based off of the current time. For example, alarms are 'static' DerivedClocks,
 * and arrival estimates are 'dynamic' DerivedClocks.
 * 
 * A static DC applies the offset once when the object is created.
 * A dynamic DC applies the offset to the current time.
 */
export class DerivedClock extends Clock {
    protected offsets = {
        hours: 0,
        minutes: 0,
    };

    protected target;
    protected offsetFunc;
    protected dynamic: boolean;

    constructor(base: Clock, offsetFunc, dynamic = true) {
        super();

        this.dynamic = dynamic;
        this.offsetFunc = offsetFunc;
              
        this.offsetFunc().then(function (offsets) {
            this.offsets = offsets;
            this.target = moment(base._moment)
                .add(offsets.hours, 'hours')
                .add(offsets.minutes, 'minutes');
        }.bind(this));
        
        return this;
    }

    updateOffset() {
        return this.offsetFunc().then(function (offsets) {
            this.offsets.hours = offsets.hours;
            this.offsets.minutes = offsets.minutes;
        }.bind(this));
    }

    /**
     * Return the modified moment object.
     */
    get _moment() {
        if (this.dynamic) {
            let target = moment(this.moment)
                .add(this.offsets.hours, 'hours')
                .add(this.offsets.minutes, 'minutes');

            return target;
        } else {
            return this.target;
        }
    }

    get hrs() {
        if (this.dynamic) {
            let target = moment(this.moment).add(this.offsets.hours, 'hours');
            return target.format('h');
        }
        else return this.target.format('h');
    }

    get mins() {
        if (this.dynamic) {
            let target = moment(this.moment).add(this.offsets.minutes, 'minutes');
            return target.format('mm');
        }
        else return this.target.format('mm');
    }

    until() {
        if (this.dynamic) {
            let target = moment(this.moment)
                .add(this.offsets.hours, 'hours')
                .add(this.offsets.minutes, 'minutes');

            return target.from(moment(), true);
        }
        else {
            return this.target.from(moment(), true);
        }
    }
}

export class ClockService {
    private currentTime: Clock;
    private arrivalTime: Clock;

    constructor() {
        this.currentTime = new Clock();
        this.arrivalTime = new DerivedClock(this.currentTime, function () {
            console.log('updating offsets');
            return new Promise((resolve, reject) => resolve({
                hours: 0,
                minutes: 30,
            }));
        });
    }

    getCurrentTime() {
        return this.currentTime;
    }

    getArrivalTime() {
        return this.arrivalTime;
    }
}