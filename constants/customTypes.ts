import { CustomUser } from "@/app/models/userModel";

export type RootStackParamList = {
    Home: undefined; 
    Calculator: undefined;
    Login: undefined;
    Registration: undefined;
    EditUsers: undefined;
    NotificationConfig: undefined;
    UserEditorTool:  { selectedUser: CustomUser };
  };