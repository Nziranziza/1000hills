import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import Colors, { grayColor } from '../constants/Colors';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(auth)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat-VariableFont_wght.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
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
    <ThemeProvider value={colorScheme === 'dark' ? customDarkTheme : lightTheme}>
      <Stack initialRouteName='(auth)' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(modal)" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
