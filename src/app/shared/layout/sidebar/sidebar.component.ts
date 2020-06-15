import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { observable } from 'rxjs';
import { UserService } from 'src/app/services/_index';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  private mediaMatcher: MediaQueryList =
  matchMedia(`(max-width: ${ SMALL_WIDTH_BREAKPOINT }px)`);

  isDarkTheme: boolean = false;
  dir: string = 'ltr';

  fullName: string;
  avatar: string;
  job: string;

  constructor(
    zone: NgZone,
    private router: Router,
    private userService: UserService
    ) {
    // this.mediaMatcher.addListener((mql) =>
    //   this.mediaMatcher = mql;
    //   zone.run(() => this.mediaMatcher = mql));
    //
    const user = this.userService.userValue();
    this.fullName = user.fullName;
    this.avatar = user.avatar;
    this.job = user.jobTitle;
  }

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  toggleDir() {
    this.dir = this.dir === 'ltr' ? 'rtl' : 'ltr';
    this.sidenav.toggle().then(() => this.sidenav.toggle());
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    });
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

}
