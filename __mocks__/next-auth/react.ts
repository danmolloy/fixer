module.exports = {
  __esModule: true,
  ...jest.requireActual('next-auth/react'),
  //auth: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
  useSession: jest.fn(),
}
