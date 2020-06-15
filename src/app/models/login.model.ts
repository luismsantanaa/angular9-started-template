export class LoginModel {
  public userName: string = '';
  public password: string = '';
  public remenberMe: boolean = false;

  constructor(init?: Partial<LoginModel>) {
    Object.assign(this, init);
  }
}
