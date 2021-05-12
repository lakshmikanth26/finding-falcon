import { Component, HostListener, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/shared/services/error/error.service';
import { FindFalcon, Planets, SelectedPlanets, SuccessFind, Vehicles } from '../../models/home.model';
import { CommonService } from '../../services/apiServices/common.service';
import { AppConstants } from 'src/app/app.constants';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  
  success: boolean = true;
  findFalcone: boolean = true;
  totalPlanets: string[];
  planets: Planets[] = [];
  col: number;
  selectedPlanets!: SelectedPlanets;
  availableVehicles!: Vehicles[];
  vehicle: boolean[];
  spaceShip: number[] = [];
  totalNum: number[] = [];
  distance: number[] = [];
  time1: number = 0;
  time2: number = 0;
  time3: number = 0;
  time4: number = 0;
  timeTaken: number = 0;
  finalSelectedPlanets: string[] = [];
  finalSelectedVehicles: string[] = [];
  falcon: FindFalcon;
  successFind: SuccessFind;

  constructor(private commonService: CommonService,
    private errorService: ErrorService) {
    this.selectedPlanets = new SelectedPlanets();
    this.falcon = new FindFalcon();
    this.successFind = new SuccessFind();
    this.totalPlanets = AppConstants.PLANETNAMES;
    this.vehicle = AppConstants.VEHICLE;
    this.col = AppConstants.COLS;
    this.getPlanets();
    this.getVehicles();
  }

  ngOnInit(): void {
  }

  getPlanets() {
    this.commonService.getPlanets().subscribe((response: any) => {
      this.planets = response;
      this.planets = this.planets.map((arr) => {
        arr.disabled = false;
        return arr;
      });
    }, (err) => this.errorService.showError("Unable to fetch Planets!"));
  }

  getVehicles() {
    let i = 0;
    this.commonService.getVehicles().subscribe((response: any) => {
      this.availableVehicles = response;
      this.availableVehicles = this.availableVehicles.map((arr) => {
        arr.id = i++;
        return arr;
      });
      this.getTotalVehicles();
    }, (err) => this.errorService.showError("Unable to fetch Vehciles!"));
  }

  getTotalVehicles() {
    for (let i = 0; i < this.availableVehicles.length; i++) {
      this.totalNum[i] = this.availableVehicles[i].total_no;
    }
  }

  selectPlanet(event: any, planet: string) {
    if (planet == 'Planet One') {
      this.selectedPlanets.planetOne = event.value.name;
      this.distance[0] = event.value.distance;
      this.vehicle[0] = true;
      this.finalSelectedPlanets[0] = event.value.name;
    } else if (planet == 'Planet Two') {
      this.selectedPlanets.planetTwo = event.value.name;
      this.distance[1] = event.value.distance;
      this.vehicle[1] = true;
      this.finalSelectedPlanets[1] = event.value.name;
    } else if (planet == 'Planet Three') {
      this.selectedPlanets.planetThree = event.value.name;
      this.distance[2] = event.value.distance;
      this.vehicle[2] = true;
      this.finalSelectedPlanets[2] = event.value.name;
    } else if (planet == 'Planet Four') {
      this.selectedPlanets.planetFour = event.value.name;
      this.distance[3] = event.value.distance;
      this.vehicle[3] = true;
      this.finalSelectedPlanets[3] = event.value.name;
    }
    let allPlanets = this.planets;

    for (let i = 0; i < allPlanets.length; i++) {
      if (this.selectedPlanets.planetOne == allPlanets[i].name ||
        this.selectedPlanets.planetTwo == allPlanets[i].name ||
        this.selectedPlanets.planetThree == allPlanets[i].name ||
        this.selectedPlanets.planetFour == allPlanets[i].name) {
        allPlanets[i].disabled = true;
      } else {
        allPlanets[i].disabled = false;
      }
    }
  }

  selectVehicle(event: any, name: string, i: number) {
    if (name == 'Planet One') {
      this.time1 = (this.distance[0] / event.value.speed);
    } else if (name == 'Planet Two') {
      this.time2 = (this.distance[1] / event.value.speed);
    } else if (name == 'Planet Three') {
      this.time3 = (this.distance[2] / event.value.speed);
    } else if (name == 'Planet Four') {
      this.time4 = (this.distance[3] / event.value.speed);
    }

    if (i == 0) {
      this.spaceShip[0] = event.value.id;
      this.finalSelectedVehicles[0] = event.value.name;
    } else if (i == 1) {
      this.spaceShip[1] = event.value.id;
      this.finalSelectedVehicles[1] = event.value.name;
    } else if (i == 2) {
      this.spaceShip[2] = event.value.id;
      this.finalSelectedVehicles[2] = event.value.name;
    } else if (i == 3) {
      this.spaceShip[3] = event.value.id;
      this.finalSelectedVehicles[3] = event.value.name;
    }

    this.getTotalVehicles();
    for (let j = 0; j < this.spaceShip.length; j++) {
      this.totalNum[this.spaceShip[j]] -= 1;
    }

    if (this.spaceShip.length == 4) {
      this.falcon.planet_names = this.finalSelectedPlanets;
      this.falcon.vehicle_names = this.finalSelectedVehicles;
      this.findFalcone = false;
    }

    this.timeTaken = this.time1 + this.time2 + this.time3 + this.time4;
  }

  findingFalcone() {
    let postData = null;
    this.commonService.getToken(postData).subscribe((response: any) => {
      this.falcon.token = response.token;
      this.commonService.findFalcon(this.falcon).subscribe((response: any) => {
        this.success = false;
        this.successFind = response;
      }, (err) => this.errorService.showError("Unable to find falcon!"));
    }, (err) => this.errorService.showError("Unable to fetch token!"));
  }

  @HostListener("window:resize", []) columns() {
    if (window.innerWidth >= 1200) {
      this.col = 4; // lg
    } else if (window.innerWidth >= 992) {
      this.col = 3;//md
    } else if (window.innerWidth >= 768) {
      this.col = 3;//sm
    } else if (window.innerWidth < 768) {
      this.col = 2;//xs
    }

  }


}
