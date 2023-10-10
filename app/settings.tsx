import { StatusBar } from "expo-status-bar";
import { Platform, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

import Layout from "../components/layout";
import { Text, View } from "../components/Themed";
import Button from "../components/button";
import { removeToken } from "../utilities/token";
import Icon from "../components/icons";

const isOS = Platform.OS === "ios";

export default function Settings() {
  const router = useRouter();

  const onLogout = async () => {
    try {
      await removeToken()
      router.push("/(auth)")
    } catch(error) {
    }
  }

  return (
    <Layout style={styles.layout}>
      <StatusBar style={isOS ? "light" : "auto"} />
      <TouchableOpacity style={styles.iconText}>
        <Icon name="lock" />
        <Text style={styles.text}>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconText}>
        <Icon name="document" />
        <Text style={styles.text}>Terms of Use</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconText}>
        <Icon name="info" />
        <Text style={styles.text}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconText}>
        <Icon name="message" />
        <Text style={styles.text}>Help</Text>
      </TouchableOpacity>
      <View style={{ flex: 1 }}/>
      <Button onPress={onLogout} title="Logout" />
    </Layout>
  );
}

const styles = StyleSheet.create({
  iconText: {
    flexDirection: 'row',
    alignItems: "center",
    marginBottom: 30
  },
  text: {
    fontWeight: '600',
    marginLeft: 10
  },
  layout: {
    marginBottom: 60,
    marginTop: 60
  }
});
