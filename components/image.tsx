import { Image, ImageProps, StyleSheet } from "react-native";
import { grayColor } from "../constants/Colors";

export default function CustomImage({style, ...props}: ImageProps) {
  return <Image style={[styles.image, style]} {...props} />
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: grayColor
  }
})