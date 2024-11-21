import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthContextProvider } from "@/contexts/Auth";
import { TokenContextProvider } from "@/contexts/Token";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NotificationTriggerContextProvider } from "@/contexts/NotificationTrigger";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <TokenContextProvider>
          <AuthContextProvider>
            <NotificationTriggerContextProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
            </NotificationTriggerContextProvider>
          </AuthContextProvider>
        </TokenContextProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
