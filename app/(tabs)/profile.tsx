import {
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import { useQuery, useInfiniteQuery } from "react-query";
import {
  Placeholder,
  PlaceholderLine,
  Fade,
  PlaceholderMedia,
} from "rn-placeholder";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { chunk } from "lodash";
import { FlatList } from "react-native-gesture-handler";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { Text, View } from "../../components/Themed";
import Layout from "../../components/layout";
import { grayColor, secondaryColor, textColor } from "../../constants/Colors";
import Icon from "../../components/icons";
import UserAPI, { UpdateBody } from "../../services/user";
import phoneNumberFormatter from "../../utilities/phone-number-formatter";
import Modal from "../../components/modal";
import Button from "../../components/button";
import Input from "../../components/textInput";
import { storage } from "../../services/firebase";
import Image from "../../components/image";

const validation = Yup.object().shape({
  name: Yup.string().required("Full name is required"),
  phoneNumber: Yup.string().matches(
    /^\+(?:[0-9] ?){6,14}[0-9]$/,
    "Invalid phone number"
  ),
  bio: Yup.string().max(150),
  profileUrl: Yup.string().url(),
});

function Loader() {
  return (
    <>
      <Placeholder
        Animation={Fade}
        Left={(props) => <PlaceholderMedia {...props} isRound />}
        style={{ marginVertical: 15 }}
      >
        <PlaceholderLine />
        <PlaceholderLine width={70} />
      </Placeholder>
      <Placeholder
        Animation={Fade}
        style={{ alignItems: "center", marginBottom: 5 }}
        Left={(props) => <PlaceholderMedia {...props} size={20} isRound />}
      >
        <PlaceholderLine noMargin width={60} />
      </Placeholder>
      <Placeholder
        Animation={Fade}
        style={{ alignItems: "center" }}
        Left={(props) => <PlaceholderMedia {...props} size={20} isRound />}
      >
        <PlaceholderLine noMargin width={50} />
      </Placeholder>
    </>
  );
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const {
    isLoading,
    data: { data: profile } = {},
    refetch,
  } = useQuery("profile", () => UserAPI.current());

  const { isLoading: postLoading, data, refetch: refetchPosts, fetchNextPage, hasNextPage, isFetching } =
  useInfiniteQuery(
    "userPosts",
    ({ pageParam = 1 }) => UserAPI.posts({ page: pageParam }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.meta.page < lastPage.meta.totalPages) {
          return lastPage.meta.page + 1;
        }
        return false;
      },
    }
  );
  const meta = data?.pages?.[0]?.meta;

  const toggleEditingMode = () => {
    setIsEditing((isEditing) => !isEditing);
  };

  const onSubmit = async (body: UpdateBody) => {
    try {
      setIsSaving(true);
      await UserAPI.update(body);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Profile updated!",
      });
      refetch();
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Profile Update Failed!",
        text2:
          error?.message || error || "Something went wrong, try again later",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUploadProfile = async (
    setFieldValue: (field: string, value: string) => {}
  ) => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1],
        allowsMultipleSelection: false,
        allowsEditing: true,
      });
      if (!res.canceled) {
        setIsSaving(true);
        const item = res.assets[0];
        setFieldValue("profileUrl", item.uri);
        const response = await fetch(item.uri);
        const blob = await response.blob();
        const fileName = item.fileName || item.uri.split("/").pop() || ".jpg";
        const storageRef = ref(
          storage,
          `media/a1000hills-${new Date().getTime()}-${fileName}`
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
            Toast.show({
              type: "error",
              text1: "Profile image failed",
              text2: "Something went wrong, try again later",
            });
            setIsSaving(false);
          },
          async () => {
            const profileUrl = await getDownloadURL(uploadTask.snapshot.ref);
            onSubmit({ profileUrl });
          }
        );
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Profile image failed",
        text2: "Something went wrong, try again later",
      });
      setIsSaving(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    await refetchPosts();
    setRefreshing(false);
  };

  const onEndReached = async () => {
    if(hasNextPage) {
      fetchNextPage()
    }
  }

  return (
    <Layout noScroll>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity disabled={isLoading} onPress={toggleEditingMode}>
          <Icon name="edit" />
        </TouchableOpacity>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          isLoading ? (
            <Loader />
          ) : (
            <>
              <View style={styles.overview}>
                <Image style={styles.image} source={{ uri: profile.profileUrl }} />
                <View style={{ flex: 1 }}>
                  {profile?.name && (
                    <Text style={styles.name} numberOfLines={1}>
                      {profile?.name}
                    </Text>
                  )}
                  {profile.bio && <Text>{profile.bio}</Text>}
                </View>
              </View>

              {profile?.phoneNumber && (
                <View style={styles.contactItem}>
                  <Icon name="phone" size={20} />
                  <Text style={styles.contactItemText}>
                    {phoneNumberFormatter(profile?.phoneNumber)}
                  </Text>
                </View>
              )}
              <View style={styles.contactItem}>
                <Icon name="mail" size={20} />
                <Text style={styles.contactItemText}>{profile?.email}</Text>
              </View>
              <View style={styles.statCards}>
                <View style={styles.statCardItem}>
                  <Text style={styles.statValue}>{meta?.stats?.image}</Text>
                  <Text style={styles.statTitle}>Artifacts</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.statCardItem}>
                  <Text style={styles.statValue}>{meta?.stats?.video}</Text>
                  <Text style={styles.statTitle}>Virtual Tours</Text>
                </View>
              </View>
            </>
          )
        }
        showsVerticalScrollIndicator={false}
        data={chunk(data?.pages?.map((page) => page.data).flat(), 3)}
        renderItem={({ item: groupedItems }: any) => (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {groupedItems.map((item: any, index: number) => (
              <View style={{ marginBottom: 5 }} key={item._id}>
                <Image
                  source={{ uri: item.assets[0].url }}
                  style={{ width: wp("33") - 15, height: 100 }}
                />
              </View>
            ))}
          </View>
        )}
        keyExtractor={(item: any) => item[0]._id}
        onEndReached={onEndReached}
        ListFooterComponent={
          <>
            {(isFetching && !isLoading) ? (
              <View>
                <ActivityIndicator color={textColor} />
              </View>
            ) : (
              <></>
            )}
          </>
        }
      />
      <Modal
        title="Edit Profile"
        visible={isEditing}
        onRequestClose={toggleEditingMode}
      >
        <Formik
          initialValues={{
            name: profile?.name,
            phoneNumber: profile?.phoneNumber,
            bio: profile?.bio,
            profileUrl: profile?.profileUrl,
          }}
          onSubmit={onSubmit}
          validationSchema={validation}
        >
          {({
            values,
            handleBlur,
            handleChange,
            handleSubmit,
            errors,
            setFieldValue,
          }) => {
            const hasChange =
              profile.bio !== values.bio ||
              profile.phoneNumber !== values.phoneNumber ||
              profile.name !== values.name;
            return (
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <View style={[styles.overview, styles.input]}>
                  <TouchableOpacity
                    style={{ opacity: isSaving ? 0.2 + progress / 100 : 1 }}
                    onPress={() => handleUploadProfile(setFieldValue)}
                  >
                    <Image
                      style={styles.image}
                      source={{ uri: values.profileUrl }}
                    />
                  </TouchableOpacity>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.name} numberOfLines={1}>
                      {values?.name}
                    </Text>
                    <Text numberOfLines={2}>{values.bio}</Text>
                  </View>
                </View>
                <Input
                  containerStyle={styles.input}
                  placeholder="Add your full name"
                  label="Full Name"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  error={errors.name}
                />
                <Input
                  containerStyle={styles.input}
                  placeholder="Add your phone number"
                  label="Phone Number"
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  value={values.phoneNumber}
                  error={errors.phoneNumber}
                />
                <Input
                  multiline
                  containerStyle={styles.input}
                  placeholder="Add your bio"
                  label="Short Biography"
                  numberOfLines={10}
                  onChangeText={handleChange("bio")}
                  onBlur={handleBlur("bio")}
                  value={values.bio}
                  error={errors.bio}
                />
                <Button
                  loading={isSaving}
                  disabled={!hasChange}
                  title="Save"
                  onPress={() => handleSubmit()}
                />
              </KeyboardAvoidingView>
            );
          }}
        </Formik>
      </Modal>
    </Layout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: grayColor,
    marginRight: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 5,
  },
  overview: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  contactItem: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  contactItemText: {
    marginLeft: 10,
  },
  statCards: {
    flexDirection: "row",
    marginTop: 40,
    marginBottom: 15,
  },
  statCardItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderColor: grayColor,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  statValue: {
    fontWeight: "600",
    color: secondaryColor,
  },
  statTitle: {
    fontWeight: "600",
  },
  logout: {
    marginBottom: 10,
  },
  separator: {
    width: 1,
    backgroundColor: grayColor,
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    marginBottom: 25,
  },
});
