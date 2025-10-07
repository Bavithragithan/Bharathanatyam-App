import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="get-started" options={{ animation: 'none' }} />
        <Stack.Screen name="sign-up" />
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="theory" />
        <Stack.Screen name="techniques" />
        <Stack.Screen name="workouts" />
        <Stack.Screen name="community" />
        <Stack.Screen name="theory-description" />
        <Stack.Screen name="theory-topic" />
        <Stack.Screen name="quiz" />
        <Stack.Screen name="quiz-interface" />
        <Stack.Screen name="media" />
        <Stack.Screen name="main-menu" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="reset-password" />
        <Stack.Screen name="otp-verification" />
        <Stack.Screen name="challenge-details" />
        <Stack.Screen name="live-class" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
