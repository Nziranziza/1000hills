import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import { Layout } from './_layout';
import Input from '../../components/textInput';
import Button from '../../components/button';
import Link from '../../components/link';
import { View, Text } from '../../components/Themed';

export default function Signin() {

  const router = useRouter();

  const onSubmit = () => {
    router.push('/(tabs)')
  }

  return (
    <Layout title="Sign In" description='Welcome back, Please sign in'>
      <Input placeholder='Email' containerStyle={styles.input} error="Invalid Email" />
      <Input placeholder='Password' containerStyle={styles.input} secureTextEntry />
      <Button title="Sign In" onPress={onSubmit} />
      <Link containerStyle={styles.link} href="/forgotPassword">Forgot Password</Link>
      <View style={styles.footer}>
        <Text>Don't have an account? </Text>
        <Link href="/signup">Sign up</Link>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    marginBottom: 30
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  link: {
    marginVertical: 30,
    alignSelf: 'center'
  }
});
