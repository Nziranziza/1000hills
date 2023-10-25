import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import * as Yup from "yup";
import { Formik } from "formik";
import { useEffect } from "react";
import Toast from 'react-native-toast-message';

import { Layout } from "./_layout";
import Input from "../../components/textInput";
import Button from "../../components/button";
import Link from "../../components/link";
import { View, Text } from "../../components/Themed";
import { Credentials } from "../../services/auth";
import login from "../../atoms/login";

const INITIAL_VALUES: Credentials = {
  email: "",
  password: "",
};

const validation = Yup.object().shape({
  email: Yup.string()
    .email("Email must be valid")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Signin() {
  const router = useRouter();
  const [{ loading, data }, handleLogin] = useAtom(login) as any;

  const onSubmit = (values: Credentials, { resetForm }: any) => {
    handleLogin({
      body: values,
      onSuccess: () => {
        resetForm()
      },
      onError: (message: string) => {
        Toast.show({
          type: 'error',
          text1: 'Login failed!',
          text2: message
        });
      }
    });
  };

  useEffect(() => {
    if(data.token) {
      router.push("/(tabs)");
    }
  }, [data.token])

  return (
    <Layout title="Sign In" description="Welcome back, Please sign in">
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
              editable={!loading}
              selectTextOnFocus={!loading}
            />
            <Input
              placeholder="Password"
              containerStyle={styles.input}
              secureTextEntry
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              error={errors.password}
              editable={!loading}
              selectTextOnFocus={!loading}
            />
            <Button
              title="Sign In"
              loading={loading}
              onPress={() => handleSubmit()}
            />
          </>
        )}
      </Formik>
      <Link containerStyle={styles.link} href="/forgotPassword">
        Forgot Password?
      </Link>
      <View style={styles.footer}>
        <Text>Don't have an account?{" "}</Text>
        <Link href="/signup">Sign up</Link>
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
  },
  link: {
    marginVertical: 30,
    alignSelf: "center",
  },
});
