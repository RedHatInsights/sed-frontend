import { authenticateUser } from '../platformServices';

beforeEach(() => {
  window.insights = {
    chrome: {
      auth: {
        getUser: () => {},
      },
    },
  };
});

describe('Authenticate User method', () => {
  it('should return a promise with user data', () => {
    window.insights.chrome.auth.getUser = jest.fn().mockResolvedValue({
      identity: {
        account_number: 1,
        internal: {
          org_id: 1,
        },
      },
    });

    expect(authenticateUser()).resolves.toEqual({
      identity: {
        account_number: 1,
        internal: {
          org_id: 1,
        },
      },
    });
  });

  it('should throw an error if rejected', () => {
    window.insights.chrome.auth.getUser = jest.fn().mockImplementation(() => {
      throw new Error('Error getting user');
    });

    try {
      authenticateUser();
    } catch (e) {
      expect(e.message).toEqual(
        'Error authenticating user: Error getting user'
      );
    }
  });
});
