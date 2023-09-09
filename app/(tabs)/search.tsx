import { FlatList, StyleSheet } from "react-native";
import { faker } from "@faker-js/faker";

import Layout from "../../components/layout";
import Input from "../../components/textInput";
import { FeedCard } from ".";

const samples = Array.from({ length: 10 }).map(() => ({
  id: new Date().getTime(),
  title: faker.lorem.sentence(),
  location: faker.lorem.words({ min: 1, max: 3 }),
  description: faker.lorem.paragraphs(1),
  likes: faker.number.int(1000),
  date: faker.date.anytime(),
}));


export default function Search() {
  return (
    <Layout noScroll>
      <Input containerStyle={styles.input} placeholder="Search" />
      <FlatList
        data={samples}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item: { title, location, description, likes, date }}) => (
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
    </Layout>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10
  },
  flatlist: {
    flex: 1
  }
});
