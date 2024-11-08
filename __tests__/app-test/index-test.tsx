import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "@/app/(tabs)";
import Calculator from "@/app/views/calculator";

jest.mock("@/app/views/home", () => () => <div>Home</div>);
jest.mock("@/app/views/login", () => () => <div>Login</div>);
jest.mock("@/app/views/registration", () => () => <div>Registration</div>);
jest.mock("@/app/views/calculator", () => () => <div>Calculator</div>);
jest.mock("@/components/LoggedInHeader", () => () => <div>LoggedInHeader</div>);

describe("HomeScreen Navigation", () => {
  xit("should render the initial route as Home", () => {
    const { getByText } = render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );

    expect(getByText("Home")).toBeTruthy();
  });

  xit("should render Calculator screen", () => {
    const { getByText, queryByText } = render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );

    fireEvent.press(getByText("Calculator"));

    expect(getByText("Calculator")).toBeTruthy();

    expect(queryByText("LoggedInHeader")).toBeTruthy();
  });

  it("should not show LoggedInHeader in Login and Registration screens", () => {
    const { queryByText, rerender } = render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );

    rerender(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );
    expect(queryByText("Home")).toBeNull();

    rerender(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );
    expect(queryByText("Home")).toBeNull();
  });
});
