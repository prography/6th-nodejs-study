import { BaseModel } from './BaseModel';

export class User extends BaseModel {
  public name!: string;
  public password!: string;
  public age!: number;
}
