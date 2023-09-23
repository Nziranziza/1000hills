import {
  TouchableOpacity,
  ButtonProps,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { ReactNode, useMemo } from "react";

import { Text } from "./Themed";
import { primaryColor, whiteColor } from "../constants/Colors";

type Props = Omit<ButtonProps, "title"> &
  TouchableOpacityProps & {
    title: ReactNode;
    loading?: boolean;
  };
export default function Button({
  style,
  title,
  loading = false,
  disabled = false,
  ...props
}: Props) {
  const _styles = useMemo(() => {
    if (loading || disabled) {
      return {
        ...styles.button,
        opacity: 0.5,
      };
    }
    return styles.button;
  }, [loading, disabled]);
  
  return (
    <TouchableOpacity
      disabled={loading || disabled}
      style={[_styles, style]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={whiteColor} />
      ) : (
        <Text
          style={styles.text}
          lightColor={whiteColor}
          darkColor={whiteColor}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    backgroundColor: primaryColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  text: {
    fontWeight: "500",
  },
});
