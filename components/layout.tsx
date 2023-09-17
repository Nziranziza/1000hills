import { ReactNode } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

export type LayoutProps = {
  children: ReactNode;
  noScroll?: boolean;
  style?: ViewStyle;
};

export default function Layout({ children, noScroll, style }: LayoutProps) {
  if (noScroll) {
    return <View style={[styles.container, style]}>{children}</View>;
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.container, style]}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 10,
    flex: 1
  },
});
