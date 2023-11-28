import { Expose } from 'class-transformer';

export class LoggedUserRdo {
  @Expose({ name: '_id' })
  public id: string;

  @Expose()
  public token: string;
}
