import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService, UserService } from 'src/app/services/_index';
import * as moment from '../../../../assets/login/vendor/daterangepicker/moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();
  @Output() toggleDir = new EventEmitter<void>();
  //
  fullName: string = 'error!';
  jobTitle: string = 'error!';
  menberFor: string = 'error!';
  avatar: string = '#';

  constructor(
    private authService: LoginService,
    private userService: UserService
  ) {
    //
    const user = this.userService.userValue();
    //
    const date = moment(user.crateDate);
    //
    this.avatar = user.avatar;
    this.menberFor = date.format('MMM. YYYY');
    this.fullName = user.fullName;
    this.jobTitle = user.jobTitle;
  }

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }

}
