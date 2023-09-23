import { ViewProps, StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { View } from "./Themed";
import { grayColor, whiteColor } from "../constants/Colors";

export type Props = TouchableOpacityProps & {};

export default function Card({ children, style, ...props }: ViewProps) {
  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: whiteColor,
    padding: 15,
    borderRadius: 5,
    borderStyle: "solid",
    borderColor: grayColor,
    borderWidth: 0.5,
    shadowColor: grayColor,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.9,
    elevation: 5,
    overflowX: 'hidden',
  },
});
