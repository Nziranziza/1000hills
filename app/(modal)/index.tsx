import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';


import Input from '../../components/textInput';
import Layout from '../../components/layout';
import Button from '../../components/button'
import Icon from '../../components/icons';
import { darkGrayColor, grayColor, whiteColor } from '../../constants/Colors';
import { View, Text } from '../../components/Themed';

export default function ModalScreen() {
  return (
    <Layout style={styles.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Input placeholder='Title' style={styles.input} />
      <Input placeholder='Description' multiline numberOfLines={10} style={styles.input} />
      <View>
        <Text>Add an image or video</Text>
        <Button title={<Icon name="upload" color={grayColor} size={65} />} style={styles.upload} />
      </View>
      <Button title="Create" style={styles.saveBtn} />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: { 
    justifyContent: 'center'
  },
  input: {
    marginBottom: 30
  },
  saveBtn: {
    marginTop: 60
  },
  upload: {
    height: 150,
    justifyContent: 'center',
    backgroundColor: whiteColor,
    marginTop: 10,
    borderStyle: 'dashed',
    borderColor: darkGrayColor,
    borderWidth: 1
  }
});
