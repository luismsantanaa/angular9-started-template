import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AlertModel } from '../models/_index';
import { AlertType } from '../helpers/enums.enum';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<AlertModel>();
  private defaultId = 'default-alert';

  // enable subscribing to alerts observable
  onAlert(id = this.defaultId): Observable<AlertModel> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
}

// convenience methods
success(message: string, options?: any) {
    this.alert(new AlertModel({ ...options, type: AlertType.Success, message }));
}

error(message: any, options?: any) {
  let myErrors: string;
  if (message.error.errors) {
      myErrors = message.errors.message;
  } else if (message.error) {
    myErrors = message.error.message;
  }
  else if (message) {
    myErrors = message;
  }

  this.alert(new AlertModel({ ...options, type: AlertType.Error,
      status: message.status,
      statusText: message.statusText,
      message: myErrors }));
}

info(message: string, options?: any) {
    this.alert(new AlertModel({ ...options, type: AlertType.Info, message }));
}

warn(message: string, options?: any) {
    this.alert(new AlertModel({ ...options, type: AlertType.Warning, message }));
}

// main alert method
alert(alert: AlertModel) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
}

// clear alerts
clear(id = this.defaultId) {
    this.subject.next(new AlertModel({ id }));
}

}
