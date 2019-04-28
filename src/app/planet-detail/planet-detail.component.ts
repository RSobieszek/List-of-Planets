import { Component, OnInit } from '@angular/core';
import { PlanetService } from '../planet.service';
import { Planet } from '../planet';

import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-planet-detail',
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.scss']
})
export class PlanetDetailComponent implements OnInit {

  constructor(
    private planetService: PlanetService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPlanet();
  }

  planet: Planet = {name: ' '};
  planetKeys: any;

  getPlanet() {
    const id = this.route.snapshot.paramMap.get('id');

    this.planetService.changePage(`https://swapi.co/api/planets/${id}/?format=json`)
      .subscribe((res: any) => {
        this.planet = res;
        this.planetKeys = Object.keys(this.planet);
      })
  }
}
