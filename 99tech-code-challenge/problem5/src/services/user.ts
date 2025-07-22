import { UserRepository } from '@app/repositories/user';
import { User } from '@app/entities/user';
import { CreateUserDto, UpdateUserDto, UserFilters } from '@app/dto/user';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Check if email already exists
    const existingUser = await this.userRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    return await this.userRepository.create(createUserDto);
  }

  async getUsers(filters: UserFilters = {}): Promise<{ users: User[]; total: number }> {
    const [users, total] = await Promise.all([
      this.userRepository.findAll(filters),
      this.userRepository.count(filters)
    ]);

    return { users, total };
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      return null;
    }

    // Check if email is being updated and if it conflicts with another user
    if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
      const userWithEmail = await this.userRepository.findByEmail(updateUserDto.email);
      if (userWithEmail) {
        throw new Error('Email already exists');
      }
    }

    return await this.userRepository.update(id, updateUserDto);
  }

  async deleteUser(id: number): Promise<boolean> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      return false;
    }

    return await this.userRepository.delete(id);
  }
}