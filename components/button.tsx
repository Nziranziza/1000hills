import {
  TouchableOpacity,
  ButtonProps,
  TouchableOpacityProps,
  StyleSheet
} from "react-native";
import { ReactNode } from "react";

import { Text } from "./Themed";
import { primaryColor, whiteColor } from "../constants/Colors";

type Props = Omit<ButtonProps, "title"> & TouchableOpacityProps & {
  title: ReactNode
}
export default function Button({
  style,
  title,
  ...props
}: Props) {
  return (
    <TouchableOpacity style={[styles.button, style]} {...props}>
      <Text style={styles.text} lightColor={whiteColor} darkColor={whiteColor}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    backgroundColor: primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  text: {
    fontWeight: '500'
  }
});
