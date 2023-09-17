import { useState, useMemo, useEffect, useCallback } from "react";
import { StyleSheet } from "react-native";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import { FlatList } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { ResizeMode } from "expo-av";

import { View, Text } from "./Themed";
import Button from "./button";
import Icon from "./icons";
import Image from "./image";
import {
  darkGrayColor,
  grayColor,
  primaryColor,
  secondaryColor,
  whiteColor,
} from "../constants/Colors";
import { storage } from "../services/firebase";

type MediaProps = {
  item: any;
  onRemove?: () => void;
  upload?: boolean;
  onChange?: (item: { url: string; type: "image" | "video" }) => void;
};

enum UploadStatus {
  PENDING = "pending",
  PROGRESSING = "progressing",
  DONE = "done",
  FAILED = "failed",
}

type ProgressBarProps = {
  progress: number;
};

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return <View style={[styles.progressBar, { width: `${progress}%` }]} />;
};

const MediaItem = ({
  item,
  onRemove = () => {},
  upload = false,
  onChange = () => {},
}: MediaProps) => {
  const [status, setStatus] = useState<UploadStatus>(UploadStatus.PENDING);
  const [progress, setProgress] = useState(0);
  const isImage = item.type === "image";
  const isDone = useMemo(() => status === UploadStatus.DONE, [status]);
  const isError = useMemo(() => status === UploadStatus.FAILED, [status]);
  const isProgressing = useMemo(
    () => status === UploadStatus.PROGRESSING,
    [status]
  );
  const statusColor: string = useMemo(() => {
    let color = grayColor;
    if (isDone) {
      color = primaryColor;
    } else if (isError) {
      color = secondaryColor;
    }
    return color;
  }, [isDone, isError]);

  const onUpload = async () => {
    setStatus(UploadStatus.PROGRESSING);
    const response = await fetch(item.uri);
    const blob = await response.blob();
    const storageRef = ref(
      storage,
      `media/a1000hills-${new Date().getTime()}-${item.fileName}`
    );
    const uploadTask = uploadBytesResumable(storageRef, blob);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      () => {
        setStatus(UploadStatus.FAILED);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setStatus(UploadStatus.DONE);
        onChange({
          url,
          type: item.type,
        });
      }
    );
  };

  useEffect(() => {
    if (upload) {
      onUpload();
    }
  }, [upload]);

  return (
    <View style={styles.mediaItemContainer}>
      <View style={[styles.mediaItemStatus, { borderColor: statusColor }]}>
        {isImage ? (
          <Image
            style={[styles.media, { opacity: isProgressing ? 0.5 : 1 }]}
            source={{ uri: item.uri }}
          />
        ) : (
          <Video
            resizeMode={ResizeMode.COVER}
            source={{ uri: item.uri }}
            style={[styles.media, { opacity: isProgressing ? 0.5 : 1 }]}
            useNativeControls
          />
        )}
        {isProgressing && <ProgressBar progress={progress} />}
      </View>
      <Button
        style={[styles.closeButton, { backgroundColor: statusColor }]}
        title={
          <Icon
            style={styles.iconButton}
            size={12}
            color={whiteColor}
            name="x"
          />
        }
        onPress={onRemove}
      />
      {isError && (
        <Button
          style={[styles.closeButton, { bottom: 0 }]}
          onPress={onUpload}
          title={
            <Icon
              color={whiteColor}
              size={15}
              style={styles.iconButton}
              name="refresh"
            />
          }
        />
      )}
    </View>
  );
};

type MediaUploaderProps = {
  upload?: boolean;
  title: string;
  onChange?: (items: any[]) => void;
};

export default function MediaUploader({
  upload,
  title,
  onChange = () => {},
}: MediaUploaderProps) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [assets, setAssets] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);

  const openFileSelector = async () => {
    try {
      setIsSelecting(true);
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
        videoQuality: 1,
      });
      setIsSelecting(false);
      if (!res.canceled) {
        setAssets((assets) => [...assets, ...res.assets]);
      }
    } catch (error) {
      setIsSelecting(false);
    }
  };

  const onRemove = (index: number) => {
    setAssets((assets) =>
      assets.filter((item, assetIndex) => index !== assetIndex)
    );
  };

  const onChangeHandler = useCallback(() => {
    onChange(results);
  }, [results]);

  useEffect(() => {
    if (results.length && results.length === assets.length) {
      onChangeHandler();
    }
  }, [results, assets]);

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      {!assets.length ? (
        <Button
          onPress={openFileSelector}
          title={<Icon name="upload" color={grayColor} size={65} />}
          style={styles.upload}
        />
      ) : (
        <FlatList
          data={assets}
          renderItem={({ item, index: itemIdex }) => (
            <MediaItem
              item={item}
              onRemove={() => onRemove(itemIdex)}
              upload={upload}
            />
          )}
          keyExtractor={(item, index) => `${item.assetId}-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={
            isSelecting ? (
              <View
                style={[
                  styles.media,
                  { marginTop: 15, backgroundColor: grayColor },
                ]}
              />
            ) : (
              <View style={styles.addButtonContainer}>
                <Button
                  style={styles.addButton}
                  title={
                    <Icon
                      style={styles.iconButton}
                      color={whiteColor}
                      name="plus"
                    />
                  }
                  onPress={openFileSelector}
                />
              </View>
            )
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  upload: {
    height: 150,
    justifyContent: "center",
    backgroundColor: whiteColor,
    borderStyle: "dashed",
    borderColor: darkGrayColor,
    borderWidth: 1,
  },
  media: {
    height: 150,
    width: wp("30%"),
    borderRadius: 10,
  },
  title: {
    marginBottom: 5,
    fontWeight: "600",
  },
  addButton: {
    backgroundColor: darkGrayColor,
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  addButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginLeft: 20,
  },
  separator: {
    width: 15,
  },
  iconButton: {
    marginTop: -6,
  },
  closeButton: {
    backgroundColor: darkGrayColor,
    width: 30,
    height: 30,
    borderRadius: 30,
    alignSelf: "flex-end",
    position: "absolute",
  },
  mediaItemContainer: {
    paddingVertical: 15,
    paddingRight: 10,
  },
  mediaItemStatus: {
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: grayColor,
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBar: {
    position: "absolute",
    height: 5,
    backgroundColor: primaryColor,
    width: "0%",
    bottom: 0,
  },
});
