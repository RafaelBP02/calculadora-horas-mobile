import { StyleSheet } from "react-native";

const colors = {
  primary: "#407cff",
  secondary: "#9da2a6",
  text: "#2c3e50",
  white: "#ffffff",
  black: "#000000",
};

const spacing = {
  small: 8,
  medium: 16,
  large: 24,
};

const fontSizes = {
  small: 12,
  medium: 16,
  large: 20,
};

const formCss = StyleSheet.create({
  button: {
    width:'90%',
    gap: 10,
    marginBottom: 10,
  },
  formContainer: {
    width: '80%',
    height: '50%',

    alignItems: 'center',
    justifyContent: "space-between",

    backgroundColor: '#f0f0f0',
    elevation: 5
  },
  formItems: {
    width:'80%',
    gap: 20,
  },
  formInput:{
    fontSize: fontSizes.medium,
    padding: 5,
    justifyContent: 'center',
    backgroundColor: '#e0e0e0'
  }
});

export { formCss, colors };
