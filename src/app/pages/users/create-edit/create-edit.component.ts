import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { UserModel } from './../../../models/_index';
import { UserService, AlertService } from 'src/app/services/_index';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['../users.component.scss'],
})
export class CreateEditComponent implements OnInit {
  hideMdal = '';
  title: string;
  roles = [
    { id: 'Unassigned', value: 'Sin Definir' },
    { id: 'Cashier', value: 'Cajero' },
    { id: 'PowerUser', value: 'Super Usuario' },
    { id: 'Admin', value: 'Administrador' },
  ];
  //
  usrForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    userName: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    jobTitle: new FormControl('', Validators.required),
    role: new FormControl(0),
    img: new FormControl(null),
    password: new FormControl('', Validators.required),
    password2: new FormControl('', Validators.required),
    blocked: new FormControl(false),
    active: new FormControl(true),
  });
  //
  initializeFormGroup(data: UserModel) {
    this.usrForm.setValue({
      $key: data._id,
      name: data.name,
      lastName: data.lastName,
      userName: data.userName,
      jobTitle: data.jobTitle,
      role: data.role,
      img: data.img,
      password: '',
      password2: '',
      blocked: data.blocked,
      active: data.active,
    });
  }
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private userService: UserService,
    private alertService: AlertService
  ) {
    this.title = data.title;
  }

  ngOnInit(): void {}

  saveChange() {
    if (this.usrForm.valid) {
      const user = new UserModel({
        _id: this.usrForm.value.$key,
        name: this.usrForm.value.name,
        lastName: this.usrForm.value.lastName,
        userName: this.usrForm.value.userName,
        jobTitle: this.usrForm.value.jobTitle,
        role: this.usrForm.value.role,
        img: this.usrForm.value.img,
        password: this.usrForm.value.password,
        blocked: this.usrForm.value.blocked,
        active: this.usrForm.value.active,
      });

      this.userService
        .createUser(user)
        .pipe(first())
        .subscribe(
          (data) => {
            this.alertService.success('Usuario Guardado Correctamente');
            this.dialogRef.close('Ok');
          },
          (error) => {
           this.alertService.error(error);
          }
        );
    }
  }

  close() {
    this.usrForm.reset();
    this.dialogRef.close();
  }
}
