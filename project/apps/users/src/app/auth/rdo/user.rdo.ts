import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserRdo {
  @ApiProperty({
    description: 'User id',
  })
  @Expose({ name: '_id' })
  public id: string;

  @ApiProperty({
    description: 'User name',
    required: true,
    minLength: 3,
    maxLength: 50,
    example: 'John Smith',
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User unique address',
    required: true,
    example: 'my@email.com',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User avatar',
  })
  @Expose()
  public avatar: string;
}
