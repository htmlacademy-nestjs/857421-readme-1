import { IUser } from '@project/shared/shared-types';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './blog-user.constants';

export class BlogUserEntity implements IUser {
  public _id?: string;
  public name: string;
  public email: string;
  public password: string;
  public avatar?: string;

  constructor(blogUser: IUser) {
    this.fillEntity(blogUser);
  }

  public toObject() {
    return {
      _id: this._id,
      name: this.name,
      email: this.email,
      password: this.password,
      avatar: this.avatar,
    };
  }

  private fillEntity(blogUser: IUser) {
    this._id = blogUser._id;
    this.name = blogUser.name;
    this.email = blogUser.email;
    this.password = blogUser.password;
    this.avatar = blogUser.avatar;
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.password = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}
