import { Component, OnInit } from '@angular/core';
import { HomeComponent } from 'src/app/pages/components/home/home.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public homeComponent: HomeComponent) { }

  ngOnInit(): void {
  }

  reset() {
    window.location.reload();
  }

}
