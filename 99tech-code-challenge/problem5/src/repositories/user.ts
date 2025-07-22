import { Repository } from 'typeorm';
import { AppDataSource } from '@app/database/data-source';
import { UserFilters } from '@app/dto/user';
import { User } from '@app/entities/user';

export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.repository.create(userData);
    return await this.repository.save(user);
  }

  async findAll(filters: UserFilters = {}): Promise<User[]> {
    const queryBuilder = this.repository.createQueryBuilder('user');

    if (filters.name) {
      queryBuilder.andWhere('user.name LIKE :name', { name: `%${filters.name}%` });
    }

    if (filters.email) {
      queryBuilder.andWhere('user.email LIKE :email', { email: `%${filters.email}%` });
    }

    if (filters.minAge !== undefined) {
      queryBuilder.andWhere('user.age >= :minAge', { minAge: filters.minAge });
    }

    if (filters.maxAge !== undefined) {
      queryBuilder.andWhere('user.age <= :maxAge', { maxAge: filters.maxAge });
    }

    queryBuilder.orderBy('user.createdAt', 'DESC');

    if (filters.limit) {
      queryBuilder.limit(filters.limit);
    }

    if (filters.offset) {
      queryBuilder.offset(filters.offset);
    }

    return await queryBuilder.getMany();
  }

  async findById(id: number): Promise<User | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, userData: Partial<User>): Promise<User | null> {
    await this.repository.update(id, userData);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected != undefined && result.affected > 0;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({ where: { email } });
  }

  async count(filters: UserFilters = {}): Promise<number> {
    const queryBuilder = this.repository.createQueryBuilder('user');

    if (filters.name) {
      queryBuilder.andWhere('user.name LIKE :name', { name: `%${filters.name}%` });
    }

    if (filters.email) {
      queryBuilder.andWhere('user.email LIKE :email', { email: `%${filters.email}%` });
    }

    if (filters.minAge !== undefined) {
      queryBuilder.andWhere('user.age >= :minAge', { minAge: filters.minAge });
    }

    if (filters.maxAge !== undefined) {
      queryBuilder.andWhere('user.age <= :maxAge', { maxAge: filters.maxAge });
    }

    return await queryBuilder.getCount();
  }
}