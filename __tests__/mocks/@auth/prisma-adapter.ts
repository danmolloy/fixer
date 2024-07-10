module.exports = {
  PrismaAdapter: jest.fn(() => ({
    getUser: jest.fn(),
    getSession: jest.fn(),
    // Add other methods you want to mock
  })),
};