
export const useSession = jest.fn()

useSession.mockImplementation(() => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    userData: {
      playerCalls: []
    }
  }
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return {data: mockSession, status: 'authenticated'}  // return type is [] in v3 but changed to {} in v4
    }),
  };
});