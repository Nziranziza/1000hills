import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import { Layout } from './_layout';
import Input from '../../components/textInput';
import Button from '../../components/button';
import Link from '../../components/link';
import { View, Text } from '../../components/Themed';

export default function Signup() {

  const router = useRouter();
  
  const onSubmit = () => {
    router.push("/(tabs)")
  };


  return (
    <Layout title="Sign Up" description='Welcome, Please sign up'>
      <Input placeholder='Email' containerStyle={styles.input} />
      <Input placeholder='Password' containerStyle={styles.input} />
      <Input placeholder='Confirm Password' containerStyle={styles.input} />
      <Button title="Sign Up" onPress={onSubmit} />
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
