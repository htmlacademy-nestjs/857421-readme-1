import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'User id',
  })
  @Expose({ name: '_id' })
  public id: string;

  @ApiProperty({
    description: 'User access token',
  })
  @Expose()
  public token: string;
}
