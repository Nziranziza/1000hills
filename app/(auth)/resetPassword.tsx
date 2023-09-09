import { StyleSheet } from 'react-native';

import { Layout } from './_layout';
import Input from '../../components/textInput';
import Button from '../../components/button';
import Link from '../../components/link';
import { View, Text } from '../../components/Themed';
import { useRouter } from 'expo-router';

export default function ForgotPassword() {

  const router = useRouter();

  const onSubmit = () => {
    router.push("/(auth)/signin")
  }

  return (
    <Layout title="Reset Password" description='Create your new password'>
      <Input placeholder='Email' containerStyle={styles.input} />
      <Button title="Reset" onPress={onSubmit} />
      <View style={styles.footer}>
        <Text>Remember the password? </Text>
        <Link href="/(auth)/signin">Sign in</Link>
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
    alignItems: 'center',
    marginTop: 30
  }
});
