import { CRUDRepository } from '@project/util/util-types';
import { BlogUserEntity } from './blog-user.entity';
import { IUser } from '@project/shared/shared-types';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

@Injectable()
export class BlogUserMemoryRepository
  implements CRUDRepository<BlogUserEntity, string, IUser>
{
  private repository: { [key: string]: IUser } = {};

  findById(id: string): Promise<IUser | null> {
    if (this.repository[id]) {
      return Promise.resolve({ ...this.repository[id] });
    }

    return null;
  }

  findByEmail(email: string): Promise<IUser | null> {
    const existUser = Object.values(this.repository).find(
      (user) => user.email === email
    );
    if (existUser) {
      return Promise.resolve(existUser);
    }

    return null;
  }

  create(item: BlogUserEntity): Promise<IUser> {
    const user = { ...item.toObject(), _id: randomUUID() };
    this.repository[user._id] = user;
    return Promise.resolve(user);
  }

  update(id: string, item: BlogUserEntity): Promise<IUser> {
    this.repository[id] = { ...item.toObject(), _id: id };
    return this.findById(id);
  }

  destroy(id: string): Promise<void> {
    delete this.repository[id];
    return;
  }
}
