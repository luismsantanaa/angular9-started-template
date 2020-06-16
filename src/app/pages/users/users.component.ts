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
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  users: UserModel[] = [];
  dataSource: MatTableDataSource<UserModel>;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private dialog: MatDialog
  ) {}

  displayedColumns: string[] = [
    'userName',
    'name',
    'jobTitle',
    'role',
    'img',
    'active',
    'action',
  ];

  ngOnInit(): void {
    this.loadData();
  }

  configDialog(dialog: MatDialogConfig): MatDialogConfig {
    dialog.disableClose = true;
    dialog.autoFocus = true;
    dialog.hasBackdrop = true;
    dialog.width = '500px';
    return dialog;
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
    const dialogConfig = this.configDialog(new MatDialogConfig());
    //
    dialogConfig.data = { title: 'Crear Usuario' };
    const dialogRef = this.dialog.open(CreateEditComponent, dialogConfig);
    //
    dialogRef
      .afterClosed()
      .subscribe((data) => { if (data === 'Ok') { this.loadData(); } });
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
