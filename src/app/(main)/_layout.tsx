import { StyleSheet, Platform, DynamicColorIOS } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";
import { NativeTabs } from "expo-router/build/native-tabs";
import fontSizes from "../../constants/fontSizes";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";

export default function MainLayout() {
  if (Platform.OS === "ios") {
    return <IOsTabs />;
  } else {
    return <AndroidTabs />;
  }
}

const IOsTabs = () => {
  const styles = useThemedStyles(createStyles);

  return (
    <NativeTabs tintColor={styles.active.color} backgroundColor={styles.iOSBackgroundColor.backgroundColor}>
      <NativeTabs.Trigger name="home">
        <NativeTabs.Trigger.Label>Gallary</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{
            default: "square.split.2x2",
            selected: "square.split.2x2.fill",
          }}
          md="home"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="favourites">
        <NativeTabs.Trigger.Label>Favourites</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: "heart", selected: "heart.fill" }}
          md="home"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="upload">
        <NativeTabs.Trigger.Label>Uploads</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{
            default: "tray.and.arrow.up",
            selected: "tray.and.arrow.up.fill",
          }}
          md="home"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Icon sf="gear" md="settings" />
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

const AndroidTabs = () => {
  const styles = useThemedStyles(createStyles);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarIconStyle: styles.iconContainer,
        tabBarItemStyle: styles.itemContainer,
        tabBarActiveTintColor: styles.active.color,
        tabBarInactiveTintColor: styles.nonActive.color,
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
              color={focused ? styles.active.color : styles.nonActive.color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          tabBarLabel: "Favourites",
          tabBarIcon: ({ focused }) => (
            <AntDesign
              size={28}
              name="heart"
              color={focused ? styles.active.color : styles.nonActive.color}
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
              color={focused ? styles.active.color : styles.nonActive.color}
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
              color={focused ? styles.active.color : styles.nonActive.color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    tabBarStyle: {
      backgroundColor: theme.colors.secondaryTransluscent,
      position: "absolute",
      bottom: Platform.OS === "ios" ? 30 : 50,
      height: 60,
      marginHorizontal: 16,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      borderTopWidth: 0,
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
    active: {
      color: theme.colors.accent,
    },
    nonActive: {
      color: theme.colors.secondaryText,
    },
    iOSBackgroundColor: {
      backgroundColor: theme.colors.secondaryTransluscent,
    },
  });

/*export default function MainLayout() {
  const styles = useThemedStyles(createStyles);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarIconStyle: styles.iconContainer,
        tabBarItemStyle: styles.itemContainer,
        tabBarActiveTintColor: styles.active.color,
        tabBarInactiveTintColor: styles.nonActive.color,
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
              color={focused ? styles.active.color : styles.nonActive.color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          tabBarLabel: "Favourites",
          tabBarIcon: ({ focused }) => (
            <AntDesign
              size={28}
              name="heart"
              color={focused ? styles.active.color : styles.nonActive.color}
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
              color={focused ? styles.active.color : styles.nonActive.color}
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
              color={focused ? styles.active.color : styles.nonActive.color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    tabBarStyle: {
      backgroundColor: theme.colors.secondaryTransluscent,
      position: "absolute",
      bottom: Platform.OS === "ios" ? 30 : 50,
      height: 60,
      marginHorizontal: 16,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      borderTopWidth: 0,
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
    active: {
      color: theme.colors.accent,
    },
    nonActive: {
      color: theme.colors.secondaryText,
    },
  });*/
