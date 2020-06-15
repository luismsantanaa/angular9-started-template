import { Roles } from '../helpers/enums.enum';

export class UserModel {
  public name: string;
  public lastName: string;
  public password: string;
  public userName: string;
  public jobTitle: string;
  public role: Roles = Roles.Unassigned;
  public createBy: string;
  public crateDate: Date;
  public img: string = null;
  public blocked: boolean;
  public updateBy: string = null;
  public updateDate: Date = null;
  public active: boolean = true;
  // tslint:disable-next-line: variable-name
  public _id: string = '';
  public token: string = '';
  public fullName: string = this.name + ' ' + this.lastName;

  constructor(init?: Partial<UserModel>) {
    Object.assign(this, init);
  }

}
