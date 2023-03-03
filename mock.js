global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({ /* your test data goes here */ }),
  }));
  