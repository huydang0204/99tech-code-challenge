import { Request, Response } from 'express';
import { UserService } from '@app/services/user';
import { CreateUserDto, UpdateUserDto, UserFilters } from '@app/dto/user';
import { validateDto } from '@app/middlewares/validation';
import { BaseController } from './base-ctrl';

export class UserController extends BaseController {
  private userService: UserService;

  constructor() {
		super();
    this.userService = new UserService();
		this.initializeRoutes();
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Email already exists') {
          res.status(409).json({ error: error.message });
        } else {
          console.error('Error creating user:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const filters: UserFilters = {
        name: req.query.name as string,
        email: req.query.email as string,
        minAge: req.query.minAge ? parseInt(req.query.minAge as string) : undefined,
        maxAge: req.query.maxAge ? parseInt(req.query.maxAge as string) : undefined,
        limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
        offset: req.query.offset ? parseInt(req.query.offset as string) : undefined,
      };

      const result = await this.userService.getUsers(filters);
      
      res.json({
        users: result.users,
        total: result.total,
        count: result.users.length,
        pagination: {
          limit: filters.limit || result.users.length,
          offset: filters.offset || 0,
          hasMore: (filters.offset || 0) + result.users.length < result.total
        }
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }

      const user = await this.userService.getUserById(id);
      
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }

      const user = await this.userService.updateUser(id, req.body);
      
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Email already exists') {
          res.status(409).json({ error: error.message });
        } else {
          console.error('Error updating user:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }

      const deleted = await this.userService.deleteUser(id);
      
      if (!deleted) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

	private initializeRoutes(): void {
		// Create a new user
		this.router.post('/', validateDto(CreateUserDto), (req, res) => this.createUser(req, res));

		// Get all users with optional filters
		this.router.get('/', (req, res) => this.getUsers(req, res));

		// Get a specific user by ID
		this.router.get('/:id', (req, res) => this.getUserById(req, res));

		// Update a user
		this.router.put('/:id', validateDto(UpdateUserDto), (req, res) => this.updateUser(req, res));

		// Delete a user
		this.router.delete('/:id', (req, res) => this.deleteUser(req, res));
	}
}