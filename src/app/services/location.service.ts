import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyMarkerModel } from '../models/_index';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
//
  constructor() {}

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve(resp);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getMarkers(position): Promise<MyMarkerModel[]> {
    return new Promise((resolve, reject) => {
      try {
        const myMarkers: MyMarkerModel[] = [];
        const count = 5;
        for (let i = 0; i < count; i++) {
          const myData = new MyMarkerModel({
            lat: Number(position.lat + ((Math.random() - 0.5) * 2) / 15),
            lng: Number(position.lng + ((Math.random() - 0.5) * 2) / 15),
            title: 'This is a Title #' + i,
            desc: 'This is a Decription #' + i,
            labelColor: 'red',
            labetext: 'This is a Label Text #' + i,
          });
          myMarkers.push(myData);
          }
        resolve(myMarkers);
        }
      catch (err){
          reject(err);
      }
    });
  }

}
