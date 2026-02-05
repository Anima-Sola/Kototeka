import { StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";
import Colors from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarIconStyle: styles.iconContainer,
        tabBarItemStyle: styles.itemContainer,
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.secondaryText,
        tabBarLabelStyle: styles.tabBarLabelStyle,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Gallary",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="paw-sharp"
              size={28}
              color={focused ? Colors.accent : Colors.secondaryText}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          tabBarLabel: "Favourites",
          tabBarIcon: ({ focused }) => (
            <AntDesign
              size={28}
              name="heart"
              color={focused ? Colors.accent : Colors.secondaryText}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="upload"
        options={{
          tabBarLabel: "Uploads",
          tabBarIcon: ({ focused }) => (
            <Feather
              name="upload"
              size={28}
              color={focused ? Colors.accent : Colors.secondaryText}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ focused }) => (
            <Feather
              name="settings"
              size={28}
              color={focused ? Colors.accent : Colors.secondaryText}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: Colors.secondary,
    position: "absolute",
    bottom: Platform.OS === "ios" ? 30 : 50,
    height: 60,
    marginHorizontal: 16,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    marginTop: 4,
  },
  tabBarLabelStyle: {
    fontSize: fontSizes.FONT10,
    fontFamily: "ShantellBold",
  },
  itemContainer: {
    height: 60,
  },
});
