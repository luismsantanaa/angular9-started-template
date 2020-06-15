import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paged',
  templateUrl: './paged.component.html',
  styleUrls: ['./paged.component.scss']
})
export class PageComponent implements OnInit {

  sideBarOpen = true;

  constructor() { }

  ngOnInit(): void { }

  sideBarToggler(event) {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
