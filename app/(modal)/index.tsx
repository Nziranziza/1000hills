import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  FlatList,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import Input from "../../components/textInput";
import Layout from "../../components/layout";
import Button from "../../components/button";
import MediaUploader from "../../components/mediaUploader";

const isOS = Platform.OS === "ios";

export default function ModalScreen() {
  const [upload, setUpload] = useState(false);

  const onUpload = (assets: any[]) => {
    console.log(assets);
  };

  return (
    <Layout noScroll style={styles.container}>
      <StatusBar style={isOS ? "light" : "auto"} />
      <FlatList
        data={[]}
        style={styles.list}
        renderItem={() => <View />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <KeyboardAvoidingView
            behavior={isOS ? "padding" : "height"}
            style={styles.input}
          >
            <Input label="Title" placeholder="Title" style={styles.input} />
            <Input
              placeholder="Description"
              multiline
              numberOfLines={10}
              style={styles.input}
              label="Description"
            />
            <MediaUploader
              onChange={onUpload}
              upload={upload}
              title="Add an image or video"
            />
            <Button
              title="Create"
              style={styles.saveBtn}
              onPress={() => setUpload(true)}
            />
          </KeyboardAvoidingView>
        }
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  input: {
    marginBottom: 30,
  },
  saveBtn: {
    marginTop: 60,
  },
  list: {
    flex: 1, 
    height: hp("100%")
  }
});
