import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import CalculatorTab from "@/app/(tabs)/calculatorTab";
import { Text, View } from "react-native";
import AuthContext, { AuthContextProvider, PropsUserContext } from "@/contexts/Auth";


const mockUserContext: PropsUserContext = {
    user: { id: 1, email: 'teste@exemplo.com', role: 'user' },
    setUser: jest.fn(),
  };

describe("CalculatorTab", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <CalculatorTab />
      </NavigationContainer>
    );

    expect(getByTestId("calc-component")).toBeTruthy();
  });

  it("renders header", () => {
    const { getByText, getByTestId } = render(
      <AuthContext.Provider value={mockUserContext}>
        <NavigationContainer>
          <CalculatorTab />
        </NavigationContainer>
      </AuthContext.Provider>
    );

    expect(getByText('Bem vindo(a) teste@exemplo.com')).toBeTruthy();
    expect(getByTestId('logged-component')).toBeTruthy();
  });
});
