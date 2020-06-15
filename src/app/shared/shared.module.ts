import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router';

// Modules
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { GoogleMapsModule } from '@angular/google-maps';

// Components
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './layout/breadcrumbs/breadcrumbs.component';
import { AlertComponent } from './alert/alert.component';
import { P404Component } from './errors-pages/p404.component';
import { AreaComponent } from './widgets/area/area.component';
import { CardComponent } from './widgets/card/card.component';
import { PieComponent } from './widgets/pie/pie.component';
import { MapComponent } from './widgets/map/map.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    AlertComponent,
    P404Component,
    AreaComponent,
    CardComponent,
    PieComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    GoogleMapsModule,
    FlexLayoutModule,
    MaterialModule,
    HighchartsChartModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    AlertComponent,
    P404Component,
    AreaComponent,
    CardComponent,
    PieComponent,
    MapComponent
  ]
})
export class SharedModule { }
