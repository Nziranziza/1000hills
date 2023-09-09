import { faker } from "@faker-js/faker";
import { FlatList } from "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";

import { Text } from "../../components/Themed";
import Card from "../../components/card";
import Layout from "../../components/layout";
import { Image } from "react-native";
import { grayColor } from "../../constants/Colors";

type CardProp = {
  profile: {
    image: string;
    name: string;
  },
  content: string;
  date: Date;
}

const notifications = Array.from({ length: 10 }).map(() => ({
  id: new Date().getTime(),
  profile: {
    image: faker.image.avatar(),
    name: faker.person.fullName()
  },
  content: faker.lorem.words({ min: 3, max: 5 }),
  date: faker.date.anytime()
}));

function NotificationCard({ profile, content, date }: CardProp) {
  return <Card style={styles.card}>
    <Image style={styles.image} source={{ uri: profile.image }} />
    <View style={{ flex: 1 }}>
      <Text style={styles.text}>
        <Text style={styles.name}>{profile.name}</Text>
        {' '}
        {content}
      </Text>
    </View>
  </Card>
}

export default function Search() {
  return (
    <Layout noScroll>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={notifications}
        renderItem={({ item: { profile, content, date } }) => (
          <NotificationCard profile={profile} content={content} date={date} />
        )}
        keyExtractor={(item) => `${item.id}`}
        ItemSeparatorComponent={() => <View style={{ height: 10 }}/>}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: grayColor,
    marginRight: 10
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    flexWrap: 'wrap'
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 5,
    marginLeft: 10
  },
  name: {
    fontWeight: '500',
  }
});
