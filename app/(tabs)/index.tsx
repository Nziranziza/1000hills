import { StyleSheet, FlatList } from "react-native";
import { faker } from '@faker-js/faker';
import { useRouter } from "expo-router";

import { Text } from "../../components/Themed";
import Layout from "../../components/layout";
import Card from "../../components/card";
import Image from "../../components/image"
import Icon from "../../components/icons";
import { View } from "../../components/Themed";
import Button from "../../components/button";


const samples = Array.from({ length: 10 }).map(() => ({
  id: new Date().getTime(),
  title: faker.lorem.sentence(),
  location: faker.lorem.words({ min: 1, max: 3 }),
  description: faker.lorem.paragraphs(1),
  likes: faker.number.int(1000),
  date: faker.date.anytime(),
}));

export type FeedCardProps = {
  title: string;
  location: string;
  description: string;
  likes: number;
  date: Date;
  media?: string;
};

export function FeedCard({ title, location, description }: FeedCardProps) {
  return (
    <Card style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.location}>{location}</Text>
      <Image source={{ uri: faker.image.urlPicsumPhotos() }} style={styles.image} />
      <Text style={styles.description}>{description}</Text>
      <View lightColor="transparent" darkColor="transparent" style={styles.action}>
        <Icon style={styles.actionItem} name="heart" size={25} />
        <Icon style={styles.actionItem} name="chat" size={25} />
        <Icon style={styles.actionItem} name="send" size={25} />
      </View>
    </Card>
  );
}

export default function Home() {
  const router = useRouter()

  const onCreate = () => {
    router.push("/(modal)")
  }

  return (
    <Layout noScroll>
      <FlatList
        key={samples.length}
        data={samples}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({
          item: { title, location, description, likes, date },
        }) => (
          <FeedCard
            title={title}
            location={location}
            description={description}
            likes={likes}
            date={date}
          />
        )}
        style={styles.flatlist}
      />
      <Button
        onPress={onCreate}
        style={styles.actionButton}
        title={<Icon style={{ marginTop: -6 }} name="plus" color="white" />}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  card: {
    marginBottom: 15
  },
  title: {
    fontWeight: '600'
  },
  location: {
    fontSize: 10
  },
  description: {
    fontSize: 14
  },
  image: {
    width: '100%', 
    height: 200,
    marginVertical: 10
  },
  action: {
    flexDirection: 'row',
    marginTop: 10
  },
  actionItem: {
    marginRight: 10
  },
  flatlist: {
    flex: 1
  },
  actionButton: {
    position: 'absolute',
    height: 60,
    width: 60,
    borderRadius: 30,
    bottom: 10,
    right: 0
  }
});
