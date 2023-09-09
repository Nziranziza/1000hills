import { TextInput, TextInputProps, StyleSheet, ViewStyle } from "react-native";
import { useState } from "react";
import { View } from "react-native";

import {
  grayColor,
  secondaryColor,
  textColor,
  whiteColor,
} from "../constants/Colors";
import { Text } from "./Themed";

export type InputProps = TextInputProps & {
  error?: string;
  containerStyle?: ViewStyle;
};

export default function Input({
  style,
  onFocus = () => {},
  onBlur = () => {},
  error = "",
  containerStyle,
  ...props
}: InputProps) {
  const [isFocused, setFocus] = useState<Boolean>(false);
  let _styles = styles.input;

  const onFocusHandler: typeof onFocus = (e) => {
    setFocus(true);
    onFocus(e);
  };

  const onBlurHandler: typeof onBlur = (e) => {
    setFocus(false);
    onBlur(e);
  };

  if (isFocused) {
    _styles = {
      ..._styles,
      borderColor: textColor,
    };
  }

  if (error) {
    _styles = {
      ..._styles,
      borderColor: secondaryColor,
    };
  }

  return (
    <View  style={containerStyle}>
      <TextInput
        style={[_styles, style]}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        {...props}
      />
      {Boolean(error) && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: whiteColor,
    minHeight: 56,
    paddingHorizontal: 10,
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderColor: grayColor,
  },
  error: {
    fontSize: 12,
    marginTop: 5,
    color: secondaryColor,
  },
});
