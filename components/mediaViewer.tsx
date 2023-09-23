import { FlatList, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Video, ResizeMode } from "expo-av";

import Image from "./image";
import { blackColor } from "../constants/Colors";
import Modal from './modal';
import { Text } from "./Themed";

type Media = {
  url: string;
  type: string;
  _id: string;
};

type MediaItemProps = {
  media: Media;
};

function MediaItem({ media }: MediaItemProps) {
  const isImage = media.type === "image";

  if (isImage) {
    return <Image source={{ uri: media.url }} style={styles.media} />;
  }

  return (
    <Video
      resizeMode={ResizeMode.COVER}
      source={{ uri: media.url }}
      style={styles.media}
      useNativeControls
    />
  );
}

type MediaViewerProps = {
  media?: Media[];
};

export default function MediaViewer({ media = [] }: MediaViewerProps) {
  return (
    <>
      <FlatList
        data={media}
        renderItem={({ item }) => <MediaItem media={item} />}
        keyExtractor={(item) => item._id}
        horizontal
        pagingEnabled
        style={{ backgroundColor: blackColor }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  media: {
    width: wp("100%") - 40 - 30 - 1,
    minHeight: 200,
    marginVertical: 10,
    objectFit: "cover",
  },
});
