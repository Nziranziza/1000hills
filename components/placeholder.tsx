import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";
import { View } from "react-native";
import { StyleSheet } from "react-native";

import { grayColor } from "../constants/Colors";
import Card from "./card";

export default function Loader(props: any) {
  return (
    <Card {...props}>
      <Placeholder
        style={{ marginBottom: 0, paddingBottom: 0 }}
        Animation={Fade}
      >
        <PlaceholderLine style={styles.background} width={70} />
        <PlaceholderLine style={styles.card} />
        <View style={{ flexDirection: "row" }}>
          <PlaceholderLine style={[styles.button, styles.background]} />
          <View style={styles.separator} />
          <PlaceholderLine style={[styles.button, styles.background]} />
          <View style={styles.separator} />
          <PlaceholderLine style={[styles.button, styles.background]} />
        </View>
      </Placeholder>
    </Card>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 35,
    width: 35,
    borderRadius: 35,
    marginBottom: 0
  },
  card: {
    height: 200,
  },
  separator: {
    width: 10,
  },
  background: {
    backgroundColor: grayColor,
  },
});
