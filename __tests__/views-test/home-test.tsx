import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AuthContext, { UserType } from "@/contexts/Auth";
import Home from "@/app/views/home";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "@/constants/customTypes";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

describe("Home Screen", () => {
  const mockNavigation: HomeScreenNavigationProp = {
    navigate: jest.fn(),
  } as any;
  const mockRoute: any = {};
  let getByText: Function;

  beforeEach(() => {
    const user: UserType = { id: 1, email: "test@test.com", role: "user" };
    const setUser = jest.fn();
    const rendered = render(
      <AuthContext.Provider value={{ user, setUser }}>
        <Home navigation={mockNavigation} route={mockRoute} />
      </AuthContext.Provider>
    );
    getByText = rendered.getByText;
  });

  test("navigates to Calculator screen when calculator button is pressed", () => {
    fireEvent.press(getByText("calculadora"));
    expect(mockNavigation.navigate).toHaveBeenCalledWith("Calculator");
  });

  describe("when user is not logged in", () => {
    beforeEach(() => {
      const user: UserType = { id: 0, email: "", role: "" };
      const setUser = jest.fn();
      const rendered = render(
        <AuthContext.Provider value={{ user, setUser }}>
          <Home navigation={mockNavigation} route={mockRoute} />
        </AuthContext.Provider>
      );
      getByText = rendered.getByText;
    });

    test("displays login button", () => {
      expect(getByText("login")).toBeTruthy();
    });

    test("navigates to Login screen when login button is pressed", () => {
      fireEvent.press(getByText("login"));
      expect(mockNavigation.navigate).toHaveBeenCalledWith("Login");
    });
  });
});
