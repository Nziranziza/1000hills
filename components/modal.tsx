import {
  Modal,
  ModalProps,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

import Layout from "./layout";
import Button from "./button";
import Icon from "./icons";
import { Text } from "./Themed";
import { grayColor, primaryColor, secondaryColor, whiteColor } from "../constants/Colors";
import { View } from "./Themed";

type Props = ModalProps & {
  title?: string;
  withSafeArea?: boolean;
};

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: primaryColor, backgroundColor: primaryColor }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        color: whiteColor,
        fontSize: 18,
      }}
      text2Style={{
        color: whiteColor,
        fontSize: 14,
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: secondaryColor,
        backgroundColor: secondaryColor,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        color: whiteColor,
        fontSize: 18,
      }}
      text2Style={{
        color: whiteColor,
        fontSize: 14,
      }}
    />
  ),
};

export default function CustomModal({
  children,
  withSafeArea,
  title,
  onRequestClose,
  ...props
}: Props) {
  return (
    <Modal
      animationType="slide"
      presentationStyle="formSheet"
      {...props}
      onRequestClose={onRequestClose}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Layout noScroll style={styles.headerLayout}>
            <Button
              style={styles.button}
              title={<Icon name="chevronBack" style={{ marginTop: -6 }} />}
              onPress={onRequestClose}
            />
            <Text style={styles.title}>{title}</Text>
          </Layout>
        </View>
        <Layout>{children}</Layout>
      </SafeAreaView>
      <Toast config={toastConfig} />
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
    borderStyle: "solid",
    borderColor: grayColor,
    borderBottomWidth: 1,
  },
  headerLayout: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0,
  },
  title: {
    fontWeight: "600"
  },
});
