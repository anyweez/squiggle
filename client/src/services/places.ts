class Location {
  label: string;

  constructor(name) {
    this.label = name;
    // TODO: add place ID of some kind
  }
}

export class LocationService {
  private source: Location;
  private destination: Location;

  private available: Location[];

  constructor() {
    let home = new Location('Home');
    let work = new Location('Work');

    this.available = [];

    this.available.push(home);
    this.available.push(work);

    this.src = home;
    this.dest = work;
  }

  getLocations() {
    return this.available;
  }

  get dest() {
      return this.destination;
  }
  
  get src() {
      return this.source;
  }
  
  set dest(place) {
      this.destination = place;
  }
  
  set src(place) {
      this.source = place;
  }
}