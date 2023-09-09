import { Stack } from "expo-router";

export default function ModalLayout() {
  return (
    <Stack >
      <Stack.Screen name="index" options={{ title: 'Create' }} />
    </Stack>
  );
}
