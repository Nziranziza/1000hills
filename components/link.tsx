import { Link, LinkProps } from "expo-router";
import { StyleSheet, ViewStyle } from "react-native";

import { View } from "./Themed";
import { secondaryColor } from "../constants/Colors";

export type Props = LinkProps<any> & {
  containerStyle?: ViewStyle
}

export default function CustomLink({ children, containerStyle, ...props }: Props) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Link style={styles.link} {...props}>
        {children}
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  link: {
    color: secondaryColor,
    fontSize: 16
  },
  container: {
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: secondaryColor,
    alignSelf: "flex-start",
  },
});
