const twilioClientMock = {
  twilioClient: {
    messages: {
      create: jest.fn()
    },
  }
};

module.exports = twilioClientMock;