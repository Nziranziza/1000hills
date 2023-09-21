import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import * as Yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import Toast from "react-native-toast-message";

import { Layout } from "./_layout";
import Input from "../../components/textInput";
import Button from "../../components/button";
import Link from "../../components/link";
import { View, Text } from "../../components/Themed";
import AuthAPI from "../../services/auth";

type Body = {
  email: string
}
const INITIAL_VALUES: Body = {
  email: "",
};

const validation = Yup.object().shape({
  email: Yup.string()
    .email("Email must be valid")
    .required("Email is required"),
});

export default function ForgotPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async ({ email }: Body, { resetForm }: any) => {
    try {
      setLoading(true);
      await AuthAPI.forgotPassword(email);
      Toast.show({
        type: "success",
        text1: "Check your email",
        text2: "A reset password link was sent to your email",
        autoHide: false,
      });
    } catch(error: any) {
      Toast.show({
        type: "error",
        text1: "Reset email failed!",
        text2: error.message || "Something went wrong!",
      })
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout
      title="Forgot Password?"
      description="Enter your email to reset the password"
    >
       <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={onSubmit}
        validationSchema={validation}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <Input
              placeholder="Email"
              containerStyle={styles.input}
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              error={errors.email}
              autoCapitalize="none"
            />
            <Button
              loading={loading}
              title="Send"
              onPress={() => handleSubmit()}
            />
          </>
        )}
      </Formik>
      <View style={styles.footer}>
        <Text>Remember the password?</Text>
        <Link href="/(auth)/signin">Sign in</Link>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    marginBottom: 30,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
});
