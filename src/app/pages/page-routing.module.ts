import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { PageComponent } from './page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from '../guards/auth.guard';

const pagesRoutes: Routes = [
  {path: '',
  component: PageComponent,
  canActivate: [ AuthGuard ],
  children: [
    { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
    { path: 'users', component: UsersComponent, data: { title: 'Usuarios' } },
    { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
