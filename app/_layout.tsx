import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { Provider as AtomProvider } from "jotai";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

export { ErrorBoundary } from "expo-router";

import Colors, {
  grayColor,
  primaryColor,
  secondaryColor,
  whiteColor,
} from "../constants/Colors";

const queryClient = new QueryClient();

export const unstable_settings = {
  initialRouteName: "(auth)",
};

SplashScreen.preventAutoHideAsync();

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: primaryColor, backgroundColor: primaryColor }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        color: whiteColor,
        fontSize: 18,
      }}
      text2Style={{
        color: whiteColor,
        fontSize: 14,
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: secondaryColor,
        backgroundColor: secondaryColor,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        color: whiteColor,
        fontSize: 18,
      }}
      text2Style={{
        color: whiteColor,
        fontSize: 14,
      }}
    />
  ),
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Montserrat: require("../assets/fonts/Montserrat-VariableFont_wght.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const { dark, light } = Colors;
  const customDarkTheme = {
    ...DarkTheme,
    dark: false,
    colors: {
      ...DarkTheme.colors,
      background: dark.background,
      card: dark.background,
      border: grayColor,
      primary: dark.tint,
      text: dark.text,
    },
  };
  const lightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: light.background,
      card: light.background,
      border: grayColor,
      primary: light.tint,
      text: light.text,
    },
  };

  return (
    <AtomProvider>
      <ThemeProvider
        value={colorScheme === "dark" ? customDarkTheme : lightTheme}
      >
        <QueryClientProvider client={queryClient}>
          <Stack
            initialRouteName="(auth)"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(modal)" options={{ presentation: "modal" }} />
          </Stack>
          <Toast config={toastConfig} />
        </QueryClientProvider>
      </ThemeProvider>
    </AtomProvider>
  );
}
