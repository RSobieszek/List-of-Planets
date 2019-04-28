import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { PlanetService } from '../planet.service';
import { Planet } from '../planet';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss']
})
export class PlanetListComponent implements OnInit {

  planetList: Planet[] = [];
  listSize: number = 10;
  listPage: number = 0;
  planetCount: number;
  planetArray: any[] = [];
  nxt: string = 'https://swapi.co/api/planets/?format=json';
  
  constructor(
    private planetService: PlanetService,
    private router: Router  
  ) { }

  ngOnInit() {
    this.populate();
  }

  // controls how big is planet list that will be displayed
  changeListSize(number: number) {
    this.listSize = number;
    if (this.listSize > this.planetList.length) {
      this.listPage -= this.listSize - 1;
      if(this.listPage < 0) {
        this.listPage = 0;
      }
    }
    this.populateList(this.listSize, this.listPage);
  }

  // populate array with planets from server
  populate() {
    this.planetService.changePage(this.nxt).subscribe((res: any) => {
      this.planetCount = res.count;

      for (let e of res.results) {
        this.planetArray.push(e);
      }
      this.nxt = res.next;

      if (this.nxt !== null) {
        this.populate()
      } else return;
    })

    this.populateList(this.listSize, this.listPage);
  }

  // create list of planets to display
  populateList(listSize, listPage) {
    this.planetList.length = 0;
    if (this.planetArray.length >= listSize) {
      for(let i = listPage; i < listPage + listSize; i++) {
        if (this.planetArray[i].name !== undefined) {
          this.planetList.push(this.planetArray[i]);
        }
      }
    }
  }
  
  // change page to specific planet's details
  showDetails(planet: Planet) {
    const id = planet.url.match(/\d+/g)[0];
    this.router.navigate([`/planet-detail/${id}`]);
  }

  // show next planets from list
  next() {
    this.listPage += this.listSize;
    
    if (this.planetCount < this.listPage) {
      this.listPage = 61;
    }

    this.populateList(this.listSize, this.listPage) ;
  }

  // show previous planets from list
  previous() {
    this.listPage -= this.listSize;
    if (this.listSize > this.listPage){
      this.listPage = 0;
    }
    this.populateList(this.listSize, this.listPage);
  }  

  // searches through planet array and searches
  // for specific value. Returns list to display
  search(val) {
    val = val.toLowerCase();
    let result = this.planetArray.filter((e) => {
      return e.name.toLowerCase().includes(val);
    })
    this.planetList.length = 0;
    for(let i = 0; i < result.length; i++) {
      this.planetList.push(result[i]);
    }
    if (val.length === 0){
      this.populateList(this.listSize, this.listPage)
    }
  }
}
