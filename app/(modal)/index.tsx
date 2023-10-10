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
import * as Yup from "yup";
import { Formik } from "formik";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

import Input from "../../components/textInput";
import Layout from "../../components/layout";
import Button from "../../components/button";
import MediaUploader from "../../components/mediaUploader";
import PostAPI, { PostBody } from "../../services/posts";


const isOS = Platform.OS === "ios";

const INITIAL_VALUES: PostBody = {
  title: "",
  description: "",
  assets: [],
};

const validation = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  assets: Yup.array()
    .of(
      Yup.object().shape({
        url: Yup.string().required(),
        type: Yup.string().oneOf(["image", "video"]).required(),
      })
    )
    .min(1, "An image or video is required")
    .required(),
});

export default function ModalScreen() {
  const [upload, setUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const onUpload = () => {
    setUpload(true);
  };

  const onSubmit = async (values: PostBody) => {
    try {
      setUploading(true);
      setUpload(false);
      await PostAPI.create(values);
      Toast.show({
        type: 'success',
        text1: "Created!",
        text2: "Your post is now live"
      })
      router.push("/(tabs)");
    } catch(error) {
      Toast.show({
        type: "error",
        text1: "Post creation failed",
        text2: "Something went wrong, please try again later!"
      })
    } finally {
      setUploading(false);
    }
  }

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
            <Formik
              initialValues={INITIAL_VALUES}
              onSubmit={onUpload}
              validationSchema={validation}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (
                <>
                  <Input
                    label="Title"
                    placeholder="Title"
                    containerStyle={styles.input}
                    value={values.title}
                    onChangeText={handleChange("title")}
                    onBlur={handleBlur("title")}
                    error={errors.title}
                  />
                  <Input
                    placeholder="Description"
                    multiline
                    numberOfLines={10}
                    containerStyle={styles.input}
                    label="Description"
                    value={values.description}
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                    error={errors.description}
                  />
                  <MediaUploader
                    onChange={(items) => setFieldValue('assets', items)}
                    upload={upload}
                    title="Add an image or video"
                    error={errors.assets as string}
                    onUploadSuccess={(items) => {
                      const { assets, ...body } = values;
                      onSubmit({
                        ...body,
                        assets: items
                      })
                    }}
                  />
                  <Button
                    title="Create"
                    style={styles.saveBtn}
                    onPress={() => handleSubmit()}
                    loading={uploading}
                    disabled={upload}
                  />
                </>
              )}
            </Formik>
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
    height: hp("100%"),
  },
});
