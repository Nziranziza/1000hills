import { Placeholder, PlaceholderLine, Fade, PlaceholderMedia } from "rn-placeholder";
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
        <PlaceholderLine color={grayColor} width={70} />
        <PlaceholderLine style={styles.card} />
        <View style={{ flexDirection: "row" }}>
          <PlaceholderMedia size={35} isRound />
          <View style={styles.separator} />
          <PlaceholderMedia size={35} isRound />
          <View style={styles.separator} />
          <PlaceholderMedia size={35} isRound />
        </View>
      </Placeholder>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 200,
  },
  separator: {
    width: 10,
  }
});
