import { Tabs } from "expo-router";
import Icon, { IconNames } from "../../components/icons";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: IconNames; color: string }) {
  return <Icon size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarShowLabel: false,
        headerShadowVisible: false,
        headerTitle: "",
        headerLeft: () => <Icon name="logo" size={40} style={{ marginLeft: 30 }} />,
        headerRight: () => <Icon name="settings" style={{ marginRight: 30 }} />,
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
