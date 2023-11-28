import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    required: true,
    example: 'my@email.com',
  })
  public email: string;

  @ApiProperty({
    description: 'User name',
    required: true,
    minLength: 3,
    maxLength: 50,
    example: 'John Smith',
  })
  public name: string;

  @ApiProperty({
    required: false,
  })
  public avatar?: string;

  @ApiProperty({
    description: 'User password',
    minLength: 6,
    maxLength: 12,
    required: true,
    example: '123456',
  })
  public password: string;
}
