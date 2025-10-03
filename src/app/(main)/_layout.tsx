import { StyleSheet } from "react-native";
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
          title: "Котики",
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
          title: "Избранное",
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
          title: "Настройки",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              size={28}
              name="cog"
              color={focused ? Colors.accent : Colors.secondaryText}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: fontSizes.FONT12,
    fontFamily: "ShantellBold",
    fontWeight: 300,
  },
  tabBarStyle: {
    backgroundColor: Colors.secondary,
  },
});
