import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageRoutingModule } from './page-routing.module';
import { MaterialModule } from '../material/material.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { PageComponent } from './page.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { CreateEditComponent } from './users/create-edit/create-edit.component';


@NgModule({
  declarations: [
    PageComponent,
    DashboardComponent,
    UsersComponent,
    CreateEditComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    PageRoutingModule,
    FlexLayoutModule,
    GoogleMapsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule
  ],
  exports: [ PageComponent,
    DashboardComponent,
    UsersComponent,
    CreateEditComponent
  ],
  entryComponents: [
    CreateEditComponent
  ]
})
export class PageModule { }
