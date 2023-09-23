import {
  Modal,
  ModalProps,
  SafeAreaView,
  View,
  StyleSheet,
} from "react-native";

import Layout from "./layout";
import Button from "./button";
import Icon from "./icons";
import { Text } from "./Themed";

type Props = ModalProps & {
  title?: string;
  withSafeArea?: boolean;
};

export default function CustomModal({
  children,
  withSafeArea,
  title,
  ...props
}: Props) {
  return (
    <Modal animationType="slide" {...props}>
      <SafeAreaView style={{ flex: 1 }}>
        <Layout>
          <View style={styles.header}>
            <Button
              style={styles.button}
              title={<Icon name="chevronBack" style={{ marginTop: -6 }} />}
            />
            <Text>{title}</Text>
          </View>
          {children}
        </Layout>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "transparent",
    width: 56,
    height: 56,
    borderRadius: 56,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {},
});
