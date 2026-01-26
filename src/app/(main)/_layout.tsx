import { StyleSheet, Platform } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";
import Colors from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.secondaryText,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarStyle: styles.tabBarStyle,
        tabBarIconStyle: styles.iconContainer,
        tabBarItemStyle: styles.itemContainer,
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
          tabBarLabel: 'Котики',
          tabBarIcon: ({ focused }) => (
            <FontAwesome6
              size={28}
              name="cat"
              color={focused ? Colors.accent : Colors.secondaryText}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          tabBarLabel: "Избранное",
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
        name="settings"
        options={{
          tabBarLabel: "Мои загрузки",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              size={28}
              name="upload"
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
  },
  tabBarLabelStyle: {
    fontSize: fontSizes.FONT10,
    fontFamily: "ShantellBold",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    height: 60,
  }
});
