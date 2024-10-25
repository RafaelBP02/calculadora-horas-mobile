import { API_ENDPOINTS } from "@/app/controller/api-endpoints";
import { UserAuthentication } from "@/app/controller/authenticationController";
import { RegistrationResponse } from "@/app/models/authenticationModel";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe('UserAuthentication', () => {

    beforeEach(() => {
        fetchMock.resetMocks();
    });

    test('login returns a token for valid email and password', async () => {
        const token = 'Bearer token';
        fetchMock.mockResponseOnce(JSON.stringify({ token }));

        const response = await UserAuthentication.login('test@test.com', 'password');

        expect(response.token).toEqual(token);
        expect(fetchMock).toHaveBeenCalledWith(
            API_ENDPOINTS.LOGIN,
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({
                    username: 'test@test.com',
                    password: 'password'
                })
            })
        );
    });

    test('login throws error for invalid email or password', async () => {
        fetchMock.mockReject(new Error('Invalid email or password'));

        await expect(UserAuthentication.login('test@test.com', 'wrongpassword')).rejects.toThrow('Invalid email or password');
    });

    test('registration returns success for valid details', async () => {
        const responseMock = { concluido: true };
        fetchMock.mockResponseOnce(JSON.stringify(responseMock));

        const response: RegistrationResponse = await UserAuthentication.registration('test@test.com', 'password', 'John', 'Doe', 'Workplace');

        expect(response.concluido).toEqual(true);
        expect(fetchMock).toHaveBeenCalledWith(
            API_ENDPOINTS.SIGNUP,
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({
                    username: 'test@test.com',
                    password: 'password',
                    name: 'John',
                    sureName: 'Doe',
                    workPlace: 'Workplace'
                })
            })
        );
    });

    test('registration throws error for invalid details', async () => {
        fetchMock.mockReject(new Error('Invalid details'));

        await expect(UserAuthentication.registration('test@test.com', 'password', '', '', '')).rejects.toThrow('Invalid details');
    });
});
