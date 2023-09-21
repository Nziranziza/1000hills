import { Stack } from "expo-router";
import { ReactNode } from "react";
import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { SvgXml } from "react-native-svg";
import { ScrollView } from "react-native-gesture-handler";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { View, Text } from "../../components/Themed";
import Icon from "../../components/icons";

export const unstable_settings = {
  initialRouteName: 'signin',
};


export type LayoutProps = {
  children: ReactNode;
  title: string;
  description: string;
};

export function Layout({ title, children, description }: LayoutProps) {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
     <View style={styles.effects} lightColor="transparent" darkColor="transparent">
        <SvgXml
          xml={`<svg width="329" height="497" viewBox="0 0 329 497" fill="none">
                  <ellipse cx="164.5" cy="216" rx="164.5" ry="216" fill="#009688"/>
                  <ellipse cx="199" cy="438" rx="61" ry="59" fill="#FF6B6B"/>
                </svg>
              `}
        />
      </View>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Icon name="logo" size={40} style={styles.logo} />
        <Text style={styles.title}>{title}</Text>
        <Text>{description}</Text>
        <View style={styles.chilren} lightColor="transparent" darkColor="transparent">{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default function AuthLayout() {
  return (
    <Stack initialRouteName="signin" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signin" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="forgotPassword" />
    </Stack>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    marginBottom: 14,
    marginTop: 70,
    fontWeight: '500'
  },
  effects: {
    position: "absolute",
    left: "50%",
    top: -206,
  },
  logo: {
    alignSelf: "flex-start",
  },
  container: {
    margin: 30,
    height: hp('100%'),
    justifyContent: 'center'
  },
  chilren: {
    marginVertical: 50
  }
});
