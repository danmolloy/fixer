import { mockUser } from '../models/user';

const mockAdapter = () => ({
  getUser: jest.fn().mockResolvedValue(mockUser),
  createUser: jest.fn().mockResolvedValue(mockUser),
  updateUser: jest.fn().mockResolvedValue(mockUser),
  deleteUser: jest.fn().mockResolvedValue(mockUser),
});

export const PrismaAdapter = jest.fn(mockAdapter);
