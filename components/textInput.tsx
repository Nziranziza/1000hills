import {
  TextInput,
  TextInputProps,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useState, useMemo } from "react";
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
  label?: string;
};

export default function Input({
  style,
  onFocus = () => {},
  onBlur = () => {},
  error = "",
  containerStyle,
  label,
  multiline,
  numberOfLines,
  ...props
}: InputProps) {
  const [isFocused, setFocus] = useState<Boolean>(false);
  const onFocusHandler: typeof onFocus = (e) => {
    setFocus(true);
    onFocus(e);
  };

  const onBlurHandler: typeof onBlur = (e) => {
    setFocus(false);
    onBlur(e);
  };

  const _styles = useMemo(() => {
    let style: TextStyle = styles.input;
    if (isFocused) {
      style = {
        ...style,
        borderColor: textColor,
      };
    }

    if (error) {
      style = {
        ...style,
        borderColor: secondaryColor,
      };
    }

    if (multiline) {
      style = {
        ...style,
        minHeight: numberOfLines ? numberOfLines * 16 : style.minHeight,
        textAlignVertical: "top",
        paddingTop: 10,
      };
    }
    return style;
  }, [isFocused, error, multiline]);

  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[_styles, style]}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        multiline={multiline}
        numberOfLines={numberOfLines}
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
  label: {
    fontWeight: "600",
    marginBottom: 5,
  },
});
