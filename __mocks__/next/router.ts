export const useRouter = jest.fn();
useRouter.mockImplementation(() => ({
  route: '/',
  query: {},
  push: jest.fn(),
}));
