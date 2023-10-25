import { Tabs, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

import Icon, { IconNames } from "../../components/icons";

function TabBarIcon(props: { name: IconNames; color: string }) {
  return <Icon size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {

  const router = useRouter();

  const onSettingsPress = () => {
    router.push("/settings")
  }

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarShowLabel: false,
        headerShadowVisible: false,
        headerTitle: "",
        headerLeft: () => (
          <Icon name="logo" size={30} style={{ marginLeft: 20 }} />
        ),
        headerRight: () => (
          <TouchableOpacity style={{ marginRight: 20 }} onPress={onSettingsPress}>
            <Icon name="settings"  />
          </TouchableOpacity>
        ),
        headerStyle: {
          height: 75,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="profile" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
