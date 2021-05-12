export class Planets {
    name: string;
    distance: string;
    disabled: boolean;
    constructor(name: string, distance: string, disabled: boolean) {
        this.name = name != null ? name : '';
        this.distance = distance != null ? distance : '';
        this.disabled = disabled != true ? disabled : false;

    }
}

export class SelectedPlanets {
    planetOne!: string;
    planetTwo!: string;
    planetThree!: string;
    planetFour!: string;
}
export class SearchUnit {
    selectedPlanet: Planets ;
    constructor(search: any) {
        this.selectedPlanet = search.selectedPlanet;
    }
}


export class Vehicles {
    name: string;
    total_no: number;
    max_distance: number;
    speed: number;
    id: number;
    constructor(vehicle: any) {
        this.name = vehicle.name;
        this.total_no = vehicle.total_no;
        this.max_distance = vehicle.max_distance;
        this.speed = vehicle.number;
        this.id = vehicle.id;
    }
}

export class VehicleDisplay {
    vehicle: Vehicles;
    available: number;
    disabled: boolean;
    constructor(response: any) {
        this.vehicle = response.vehicle;
        this.available = response.available;
        this.disabled = response.disabled;
    }
}

export class FindFalcon {
    token!: string;
    planet_names!: string[];
    vehicle_names!: string[];
}
export class SuccessFind {
    planet_name!: string;
    status!: string;
}