import { mockSession } from '../session';

module.exports = {
  __esModule: true,
  ...jest.requireActual('next-auth/react'),
  auth: jest.fn(() => {
    return mockSession;
  }),
  signIn: jest.fn(),
  signOut: jest.fn(),
  useSession: jest.fn(),
};
