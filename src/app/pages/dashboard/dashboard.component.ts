import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DashboardTestDataService } from './dashboardTestData.service';
import { PeriodicElement } from 'src/app/models/contracts/IPeriodicElement';
import { LocationService } from 'src/app/services/_index';
import { MyMarkerModel } from 'src/app/models/_index';
import { MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  bigChart = [];
  cards = [];
  pieChart = [];
  elementData: PeriodicElement[] = [];
  dataSource: MatTableDataSource<PeriodicElement>;
  // Google Maps
  mapCenter: google.maps.LatLngLiteral;
  mapAcurracy: number;
  mapMarker: MyMarkerModel[] = [];
  mapHight: string;
  mapWidth: string;
  // mapMakers = [];
  //
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private dashboardService: DashboardTestDataService,
              private locationService: LocationService) { }

  ngOnInit(): void {

    this.bigChart = this.dashboardService.bigChart();
    this.cards = this.dashboardService.cards();
    this.pieChart = this.dashboardService.pieChart();
    //
    this.elementData = this.dashboardService.elementData();
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.elementData);
    this.dataSource.paginator = this.paginator;
    //
    this.locationService.getPosition()
    .then(pos => {
      //
      const myData = new MyMarkerModel({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        title: 'Usuario',
        desc: 'Este es un Texto de Ejemplo',
        labelColor: 'blue',
        labetext: 'Usuario'
      });
      //
      this.mapCenter = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      this.mapAcurracy = pos.coords.accuracy;
      this.mapMarker.push(myData);
      this.mapWidth = '100%';
      this.mapHight = '500px';
      this.locationService.getMarkers(pos).then( mark => {
       mark.forEach( dat => {
        this.mapMarker.push(dat);
       });
      });
      // this.addMarkers();
    });
  }

}
