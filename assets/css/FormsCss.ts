import { StyleSheet } from "react-native";

const colors = {
    primary: '#3498db',
    secondary: '#2ecc71',
    background: '#ecf0f1',
    text: '#2c3e50',
    white: '#ffffff',
    black: '#000000',
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
        backgroundColor: colors.primary,
        padding: spacing.medium,
        borderRadius: 5,
        alignItems: 'center',
      },
}) 

export {formCss}