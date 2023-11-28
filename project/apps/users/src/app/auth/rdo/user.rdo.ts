import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose({ name: '_id' })
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public avatar: string;
}
