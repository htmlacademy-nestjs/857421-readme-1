import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BlogUserMemoryRepository } from '../blog-user/blog-user-memory.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import {
  AUTH_USER_EXIST,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG,
} from './auth.constants';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly blogUserRepository: BlogUserMemoryRepository) {}

  public async register(dto: CreateUserDto) {
    const { email, password } = dto;

    const isUserExist = await this.blogUserRepository.findByEmail(email);

    if (isUserExist) {
      throw new ConflictException(AUTH_USER_EXIST);
    }

    const userEntity = await new BlogUserEntity(dto).setPassword(password);

    return await this.blogUserRepository.create(userEntity);
  }

  public async getUser(id: string) {
    return this.blogUserRepository.findById(id);
  }

  public async verifyUser({ email, password }: LoginUserDto) {
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const blogUserEntity = new BlogUserEntity(existUser);
    const comparePassword = await blogUserEntity.comparePassword(password);

    if (!comparePassword) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return blogUserEntity.toObject();
  }
}
