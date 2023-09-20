import { StyleSheet } from "react-native";
import { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Toast from "react-native-toast-message";

import { Layout } from "./_layout";
import Input from "../../components/textInput";
import Button from "../../components/button";
import Link from "../../components/link";
import { View, Text } from "../../components/Themed";
import { Credentials } from "../../services/auth";
import AuthAPI from "../../services/auth";


type Body = Credentials & { confirmPassword: string };
const INITIAL_VALUES: Body = {
  email: "",
  password: "",
  confirmPassword: "",
};

const validation = Yup.object().shape({
  email: Yup.string()
    .email("Email must be valid")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one digit")
    .matches(
      /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export default function Signup() {
  const [loading, setLoading] = useState(false)

  const onSubmit = async (
    { confirmPassword, ...credentials }: Body,
    { resetForm }: any
  ) => {
    try {
      setLoading(true)
      await AuthAPI.signup(credentials);
      Toast.show({
        type: "success",
        text1: "Confirm your email",
        text2: "A confirmation link was sent to your email",
        autoHide: false,
      });
      resetForm();
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Registration failed",
        text2: error.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Sign Up" description="Welcome, Please sign up">
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
            <Input
              placeholder="Password"
              containerStyle={styles.input}
              secureTextEntry
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              error={errors.password}
            />
            <Input
              placeholder="Confirm Password"
              containerStyle={styles.input}
              secureTextEntry
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              error={errors.confirmPassword}
            />
            <Button loading={loading} title="Sign Up" onPress={() => handleSubmit()} />
          </>
        )}
      </Formik>
      <View style={styles.footer}>
        <Text>Already have an account? </Text>
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
