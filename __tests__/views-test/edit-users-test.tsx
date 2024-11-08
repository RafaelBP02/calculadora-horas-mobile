import React from "react";
import { render, act, fireEvent } from "@testing-library/react-native";
import TokenContext from "@/contexts/Token";
import { CustomUser } from "@/app/models/userModel";
import { AdministrationController } from "@/app/controller/administrationController";
import EditUsers from "@/app/views/editUsers";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "@/constants/customTypes";

const mockTokenContext = {
  token: "mock-token",
  setToken: jest.fn(),
};

jest.mock("@/app/controller/administrationController", () => ({
  AdministrationController: {
    listAllUsers: jest.fn(),
  },
}));

const mockUsers: CustomUser[] = [
  {
    id: 1,
    name: "User One",
    workplace: "Office 1",
    eMail: "mail1@mail.com",
    role: { id: 1, details: "detalhe1", roleName: "USUARIO" },
    surename: "sure",
  },
  {
    id: 2,
    name: "User Two",
    workplace: "Office 2",
    eMail: "mail2@mail.com",
    role: { id: 1, details: "detalhe2", roleName: "USUARIO" },
    surename: "sure",
  },
  {
    id: 3,
    name: "User Three",
    workplace: "Office 3",
    eMail: "mail3@mail.com",
    role: { id: 1, details: "detalhe2", roleName: "USUARIO" },
    surename: "sure",
  },
  {
    id: 4,
    name: "User Four",
    workplace: "Office 4",
    eMail: "mail4@mail.com",
    role: { id: 1, details: "detalhe2", roleName: "USUARIO" },
    surename: "sure",
  },
  {
    id: 5,
    name: "User Five",
    workplace: "Office 5",
    eMail: "mail5@mail.com",
    role: { id: 1, details: "detalhe2", roleName: "USUARIO" },
    surename: "sure",
  },
  {
    id: 6,
    name: "User Six",
    workplace: "Office 6",
    eMail: "mail6@mail.com",
    role: { id: 1, details: "detalhe2", roleName: "USUARIO" },
    surename: "sure",
  },
  {
    id: 7,
    name: "User Seven",
    workplace: "Office 7",
    eMail: "mail7@mail.com",
    role: { id: 1, details: "detalhe2", roleName: "USUARIO" },
    surename: "sure",
  },
];

type NavProps = NativeStackNavigationProp<RootStackParamList, "EditUsers">;


describe("EditUsers", () => {
  const mockNavigate = jest.fn();
  const mockNavigation: NavProps = {
    navigate: mockNavigate,
  } as any;
  const mockRoute: any = {};
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders users correctly", async () => {
    (AdministrationController.listAllUsers as jest.Mock).mockResolvedValue(
      mockUsers
    );

    const { getByText, queryByText } = render(
      <TokenContext.Provider value={mockTokenContext}>
        <EditUsers navigation={mockNavigation} route={mockRoute} />
      </TokenContext.Provider>
    );

    expect(getByText("CARREGANDO...")).toBeTruthy();

    await act(async () => {});

    expect(queryByText("CARREGANDO...")).toBeNull();
    expect(getByText("User One")).toBeTruthy();
    expect(getByText("Office 1")).toBeTruthy();
    expect(getByText("User Two")).toBeTruthy();
    expect(getByText("Office 2")).toBeTruthy();
  });

  it("loads more users on scroll", async () => {
    (AdministrationController.listAllUsers as jest.Mock).mockResolvedValue(
      mockUsers
    );

    const { getByText, queryByText, getByTestId } = render(
      <TokenContext.Provider value={mockTokenContext}>
        <EditUsers  navigation={mockNavigation} route={mockRoute} />
      </TokenContext.Provider>
    );

    await act(async () => {});

    expect(getByText("User One")).toBeTruthy();

    fireEvent.scroll(getByTestId("flatlist"), {
      nativeEvent: {
        contentOffset: { y: 500 },
        contentSize: { height: 1000, width: 100 },
        layoutMeasurement: { height: 100, width: 100 },
      },
    });
  });
});
