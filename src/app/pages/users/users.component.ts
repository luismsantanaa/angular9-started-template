import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserService, AlertService } from '../../services/_index';
import { UserModel } from '../../models/_index';
import { CreateEditComponent } from './create-edit/create-edit.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  users: UserModel[] = [];
  dataSource: MatTableDataSource<UserModel>;

  constructor(private userService: UserService,
              private alertService: AlertService,
              private dialog: MatDialog) { }

    displayedColumns: string[] = [
      'userName',
      'name',
      'jobTitle',
      'role',
      'img',
      'active',
      'action'
    ];

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.userService
    .getAllUsers()
    .pipe()
    .subscribe(
      (data) => {
        this.users = data;
        //
        this.dataSource = new MatTableDataSource<UserModel>(this.users);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        this.alertService.error(error);
      }
    );
  }

  addUser() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = '500px';
    //
    dialogConfig.data = { title: 'Crear Usuario' };
    this.dialog.open(CreateEditComponent, dialogConfig);
  }

  updateDeleteUsr(action, obj) {
    obj.action = action;
   //
    if (action === 'Update') {
     // logica para actualizar el Usuario
    } else {
    // logica para borrar el Usuario
    }
  }

}
