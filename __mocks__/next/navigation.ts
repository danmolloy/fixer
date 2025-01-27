export const useRouter = jest.fn();

useRouter.mockImplementation(() => ({
  route: '/',
  query: {},
  push: jest.fn(),
  refresh: jest.fn(),
  replace: jest.fn(),
}));

export const useSearchParams = jest.fn();
useSearchParams.mockImplementation(() => ({
  get: jest.fn().mockReturnValue(null),
}));
