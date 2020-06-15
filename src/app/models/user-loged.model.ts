import { Roles } from '../helpers/enums.enum';

export class UserLogedModel {
    public id: string = '';
    public token: string = '';
    public userName: string = '';
    public fullName: string = '';
    public avatar: string = '';
    public jobTitle: string = '';
    public role: Roles = Roles.Unassigned;
    public crateDate = Date.now();

    constructor(init?: Partial<UserLogedModel>) {
      Object.assign(this, init);
    }
  }
