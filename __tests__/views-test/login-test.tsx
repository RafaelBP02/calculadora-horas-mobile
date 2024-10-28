import { UserAuthentication } from "@/app/controller/authenticationController";
import Login from "@/app/views/login";
import AuthContext, { DEFAULT_VALUE, UserType } from "@/contexts/Auth";
import { RootStackParamList } from "@/constants/customTypes";
import { fireEvent, render, RenderAPI, waitFor } from "@testing-library/react-native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

jest.mock("@/app/controller/authenticationController", () => ({
  UserAuthentication: {
    login: jest.fn().mockResolvedValue({ token: 'mockedToken' }),
    registration: jest.fn().mockResolvedValue({ concluido: true }),
  },
}));

type NavProps = NativeStackNavigationProp<RootStackParamList, "Login">;

describe("Registration Component", () => {
  let setUser: jest.Mock;
  let user: UserType
  const mockNavigate = jest.fn();
  const mockNavigation: NavProps = {
    navigate: mockNavigate,
  } as any;
  const mockRoute: any = {};

  let getByPlaceholderText: RenderAPI["getByPlaceholderText"];
  let getByText: RenderAPI["getByText"];

  beforeEach(() => {
    setUser = jest.fn();
    user = DEFAULT_VALUE.user;

    const rendered = render(
      <AuthContext.Provider value={{ user, setUser }}>
        <Login navigation={mockNavigation} route={mockRoute}/>
      </AuthContext.Provider>
    );
    getByPlaceholderText = rendered.getByPlaceholderText;
    getByText = rendered.getByText;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    expect(getByPlaceholderText('usuaruio@mail.com')).toBeTruthy();
  });

  it('should handle login submission', async () => {

    fireEvent.changeText(getByPlaceholderText('usuaruio@mail.com'), 'test@test.com');
    fireEvent.changeText(getByPlaceholderText('digite sua senha'), 'password');

    fireEvent.press(getByText('Enviar'));

    await waitFor(() => {
      expect(UserAuthentication.login).toHaveBeenCalledWith('test@test.com', 'password');
    });

    expect(mockNavigate).toHaveBeenCalledWith('Home');
  });

  it('should not proceed with invalid email', async () => {

    fireEvent.changeText(getByPlaceholderText('usuaruio@mail.com'), 'invalid-email');

    fireEvent.press(getByText('Enviar'));

    await waitFor(() => {
      expect(UserAuthentication.login).not.toHaveBeenCalled();
    });
  });

  it('should navigate to Registration screen when "Não possui uma conta?" is pressed', () => {
    fireEvent.press(getByText('Não possui uma conta?'));

    expect(mockNavigate).toHaveBeenCalledWith('Registration');
  });
});
