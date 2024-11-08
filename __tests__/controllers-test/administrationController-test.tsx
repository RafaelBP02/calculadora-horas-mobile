import { AdministrationController } from "@/app/controller/administrationController";
import { API_ENDPOINTS } from "@/app/controller/api-endpoints";

describe('AdministrationController', () => {
  const mockToken = 'mockToken';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and returns a list of users successfully', async () => {
    const mockUsers = [
      { id: 1, name: 'User One', workplace: 'Office 1' },
      { id: 2, name: 'User Two', workplace: 'Office 2' },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      })
    ) as jest.Mock;

    const users = await AdministrationController.listAllUsers(mockToken);
    expect(users).toEqual(mockUsers);
    expect(fetch).toHaveBeenCalledWith(API_ENDPOINTS.ADMIN_ALL_USERS, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${mockToken}`,
      },
    });
  });

  it('throws an error when the fetch fails', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      })
    ) as jest.Mock;

    await expect(AdministrationController.listAllUsers(mockToken)).rejects.toThrow(
      'Error: 404'
    );
    expect(fetch).toHaveBeenCalledWith(API_ENDPOINTS.ADMIN_ALL_USERS, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${mockToken}`,
      },
    });
  });

  it('throws an error when fetch throws an exception', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network error'))
    ) as jest.Mock;

    await expect(AdministrationController.listAllUsers(mockToken)).rejects.toThrow(
      'Network error'
    );
  });
});
