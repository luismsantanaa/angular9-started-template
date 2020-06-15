import { Component, OnInit, OnChanges, ViewChild, Input, SimpleChange } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { LocationService } from './../../../services/_index';
import { MyMarkerModel } from 'src/app/models/_index';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-widget-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnChanges {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;
  //
  @Input() hight: string = '500px';
  @Input() width: string = '100%';
  @Input() myMarkers: MyMarkerModel[] = [];
  @Input() center: google.maps.LatLngLiteral;
  @Input() accurracy = 0;
  // Vars
  markers = [];
  infoContent = '';
  zoom = 15;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: false,
    maxZoom: 25,
    minZoom: 10,
  };
  circle: google.maps.CircleOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    center: this.center,
    radius: this.accurracy,
  };

  changeLog: string[] = [];

  constructor() {}

  ngOnInit(): void { }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    const log: string[] = [];
    // tslint:disable-next-line: forin
    for (const propName in changes) {
      const changedProp = changes[propName];
      if ( this.myMarkers.length > 0)
      {
        this.addMarkers();
      }
      const to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        log.push(`Initial value of ${propName} set to ${to}`);
      } else {
        const from = JSON.stringify(changedProp.previousValue);
        log.push(`${propName} changed from ${from} to ${to}`);
      }
    }
    this.changeLog.push(log.join(', '));
  }

  addMarkers() {
    this.myMarkers.forEach(element => {
      this.markers.push({
        position: {
          lat: element.lat,
          lng: element.lng,
        },
        label: {
          color: element.labelColor,
          text: element.labetext,
        },
        title: element.title,
        info: `${element.labetext}:
               ${element.title}`,
        options: { animation: google.maps.Animation.BOUNCE },
      });
    });
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) {
      this.zoom++;
    }
  }
  zoomOut() {
    if (this.zoom > this.options.minZoom) {
      this.zoom--;
    }
  }

  openInfo(marker: MapMarker, content) {
    this.infoContent = content;
    this.info.open(marker);
  }

}
