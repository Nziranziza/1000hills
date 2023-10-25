import {
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useInfiniteQuery } from "react-query";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useState } from "react";
import { range } from "lodash";

import { Text } from "../../components/Themed";
import Layout from "../../components/layout";
import Card from "../../components/card";
import Icon from "../../components/icons";
import { View } from "../../components/Themed";
import Button from "../../components/button";
import PostAPI from "../../services/posts";
import Loader from "../../components/placeholder";
import { textColor } from "../../constants/Colors";
import MediaViewer from "../../components/mediaViewer";

type Media = {
  url: string;
  type: string;
  _id: string;
};

export type FeedCardProps = {
  title: string;
  location: string;
  description: string;
  likes: number;
  date: Date;
  media?: Media[];
};

export function FeedCard({
  title,
  location,
  description,
  media,
}: FeedCardProps) {
  return (
    <Card style={styles.separator}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.location}>{location}</Text>
      <MediaViewer media={media} />
      <Text style={styles.description}>{description}</Text>
      <View
        lightColor="transparent"
        darkColor="transparent"
        style={styles.action}
      >
        <Icon style={styles.actionItem} name="heart" size={25} />
        <Icon style={styles.actionItem} name="chat" size={25} />
        <Icon style={styles.actionItem} name="send" size={25} />
      </View>
    </Card>
  );
}

export default function Home() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading, data, refetch, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery(
      "posts",
      ({ pageParam = 1 }) => PostAPI.getAll({ page: pageParam }),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage.meta.page < lastPage.meta.totalPages) {
            return lastPage.meta.page + 1;
          }
          return false;
        },
      }
    );

  const onCreate = () => {
    router.push("/(modal)");
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const onEndReached = async () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <Layout noScroll>
      {isLoading || refreshing ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={range(0, 3)}
          renderItem={() => <Loader style={styles.separator} />}
        />
      ) : (
        <FlatList
          data={data?.pages.map((page) => page.data).flat()}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({
            item: { title, location, description, likes, date, assets },
          }) => (
            <FeedCard
              title={title}
              location={location}
              description={description}
              likes={likes}
              date={date}
              media={assets}
            />
          )}
          style={styles.flatlist}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={
            <>
              {isFetching ? (
                <View style={styles.separator}>
                  <ActivityIndicator color={textColor} />
                </View>
              ) : (
                <></>
              )}
            </>
          }
          onEndReached={onEndReached}
        />
      )}
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
    marginBottom: 15,
  },
  title: {
    fontWeight: "600",
  },
  location: {
    fontSize: 10,
  },
  description: {
    fontSize: 14,
  },
  image: {
    width: wp("100%") - 40 - 30 - 1,
    minHeight: 200,
    marginVertical: 10,
    objectFit: "cover",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
  },
  actionItem: {
    marginRight: 10,
  },
  flatlist: {
    flex: 1,
  },
  actionButton: {
    position: "absolute",
    height: 60,
    width: 60,
    borderRadius: 30,
    bottom: 10,
    right: 0,
  },
});
