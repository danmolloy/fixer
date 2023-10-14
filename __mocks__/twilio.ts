const twilioClientMock = {
  twilioClient: {
    messages: {
      create: jest.fn()
    },
  },
  twiml: () => ({
    MessagingResponse: jest.fn()
  })
};

module.exports = twilioClientMock;