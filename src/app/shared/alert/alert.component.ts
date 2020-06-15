import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
//
import Swal from 'sweetalert2';
//
import { AlertModel } from '../../models/_index';
import { AlertService } from '../../services/_index';
import { AlertType } from '../../helpers/enums.enum';
//

@Component({
  selector: 'app-alert',
  template: ``,
  styles: [
  ]
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() id = 'default-alert';
  @Input() fade = true;
  //
  alerts: AlertModel[] = [];
  alertSubscription: Subscription;
  routeSubscription: Subscription;

  constructor(private router: Router,
              private alertService: AlertService) { }

              ngOnInit() {
                // subscribe to new alert notifications
                this.alertSubscription = this.alertService
                  .onAlert(this.id)
                  .subscribe((alert) => {

                    switch (alert.type) {
                      case AlertType.Error:
                        Swal.fire({
                          icon: 'error',
                          title: `Error ${alert.status}: ${alert.statusText}`,
                          text: alert.message
                        });
                        break;
                        case AlertType.Success:
                          Swal.fire({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            icon: 'success',
                            title: `${alert.statusText}`,
                            text: alert.message
                          });
                          break;
                        default:
                        break;
                    }

                  });

                // clear alerts on location change
                this.routeSubscription = this.router.events.subscribe((event) => {
                  if (event instanceof NavigationStart) {
                    this.alertService.clear(this.id);
                  }
                });
              }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }


}
